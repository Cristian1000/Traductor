const {Token} = require("../Token.js")
const {Error} = require("../Error.js")
const {Sintactico} = require("./Sintactico")
const {Grafo} = require("../Grafo")
const fs = require('fs')
var process = require('child_process');

class Analizador{
    simbolos = ["(", ")", "{", "}", "=", "+", "-", "*", "<", ">", "&", "|", "[", "]", ".", ";", ",", "^", "!", "\\"];
    continuacion = ["&", "|", "=", "+", "-"]
    Reservadas = ["public", "class", "interface", "void", "int", "double", "char", "String", "for", "if", "boolean", "while", "System", "out", "println", "print", "false", "true", "do", "else", "break", "continue", "return", "static", "main"]
    letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    Tokens = new Array()
    Errores = new Array()
    comentarios = new Array()
    numToken = 1
    Traducido = new Array()

    constructor(Texto){
        this.AnalizadorL(Texto)
        let sintactico = new Sintactico()
        sintactico.Iniciar(this.Tokens, this.Errores)
        this.Errores = sintactico.ErroresS()
        this.Traducido = sintactico.Traducido()
        console.log("Analisis Terminado")
            //console.log(this.Tokens[this.Tokens.length]);
        //let sintactico = new Sintactico()
        //sintactico.Iniciar(this.Tokens, this.Errores)
        //console.log(this.Tokens[22].Descripcion())
        //this.Traducido = sintactico.Traducido()
    }

    Python(){
        var element = ""
        for (let i = 0; i < this.Traducido.length; i++) {
            element += this.Traducido[i].Traducir();
        }
        fs.writeFile("./Archivos/Archivo.py", element, (error)=>{
            if (error) {
                throw error;
            }
            console.log("arcrivo escr");
        });

        process.exec('dot -Tpdf ./Archivos/Archivo.py -o ./Archivos/Archivo.py',function (err,stdout,stderr) {
            if (err) {
                console.log("\n"+stderr);
            } else {
                console.log(stdout);
            }
        });

        return element;
    }

    Lexico(Texto){
        this.AnalizadorL(Texto)
        let sintactico = new Sintactico()
        sintactico.Iniciar(this.Tokens, this.Errores)
        this.Errores = sintactico.ErroresS()
        console.log("Analisis Terminado")
    }

    ErroresLyS(){
        var element = ""
        for (let i = 0; i < this.Errores.length; i++) {
            console.log(this.Errores[i]);
            element += "No. "+i.toString() +" Tipo: "+ this.Errores[i].tipoError + " Fila: " + this.Errores[i].fila + " Columna: "+this.Errores[i].columna+" Descripcion: "+this.Errores[i].descripcion+"\n";
        }
        return element
    }

    Lista(){
        var element = ""
        for (let i = 0; i < this.Tokens.length; i++) {
            element += "No. "+ i.toString() + " Fila: " + this.Tokens[i].fila + " Columna: " + this.Tokens[i].columna+ " Tipo: " + this.Tokens[i].tipo + " Descripcion: " + this.Tokens[i].descripcion+"\n";
        }
        return element
    }
    AnalizadorL(Texto) {
        var estado = 1;
        var palabra = "";
        let lineas = Texto.split('\n');
        for(var fila=0; fila<lineas.length;fila++){
            lineas[fila] += " "
            let letra = lineas[fila].split('')
            for(var columna=0;columna < letra.length; columna++){
                switch(estado){
                    case 1:
                        if(letra[columna] != '\n' && letra[columna] != '\t' && letra[columna] != ' '){
                            palabra += letra[columna];
                        }
                        if(letra[columna] == '/'){
                            estado = 2;
                        }
                        else if(this.esLetra(letra[columna])){
                            estado = 3;
                        }
                        else if(this.esDigito(letra[columna])){
                            estado = 4
                        }
                        else if(this.esSimbolo(letra[columna])){

                            if(letra[columna] == "("){
                                estado = this.Agregar(14, fila, columna, "parentesis que abre", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == ")"){
                                estado = this.Agregar(15, fila, columna, "parentesis que cierra", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == "["){
                                estado = this.Agregar(16, fila, columna, "Corchete que abre", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == "]"){
                                estado = this.Agregar(17, fila, columna, "Corchete que cierra", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == "{"){
                                estado = this.Agregar(12, fila, columna, "Llave que abre", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == "}"){
                                estado = this.Agregar(13, fila, columna, "Llave que cierra", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == "+"){
                                estado = this.Agregar(1, fila, columna, "Signo más", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == "-"){
                                estado = this.Agregar(2, fila, columna, "Signo Menos", letra[columna])
                                palabra = ""
                            }
                            if(letra[columna] == "*"){
                                estado = this.Agregar(4, fila, columna, "Asteristo", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == "\\"){
                                estado = this.Agregar(18, fila, columna, "Diagonal invertida", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == ","){
                                estado = this.Agregar(19, fila, columna, "Coma", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == "."){
                                estado = this.Agregar(21, fila, columna, "Punto", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == ";"){
                                estado = this.Agregar(20, fila, columna, "Punto y coma", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == "|"){
                                estado = this.Agregar(6, fila, columna, "Pleca", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == "="){
                                estado = this.Agregar(9, fila, columna, "Igual", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == "<"){
                                estado = this.Agregar(10, fila, columna, "Menor que", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == ">"){
                                estado = this.Agregar(11, fila, columna, "Mayor que", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == "!"){
                                estado = this.Agregar(7, fila, columna, "Signo de Admiracion", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == "&"){
                                estado = this.Agregar(5, fila, columna, "Y", palabra)
                                palabra = ""
                            }
                            if(letra[columna] == "^"){
                                estado = this.Agregar(8, fila, columna, "XOR", palabra)
                                palabra = ""
                            }
                        }
                        else if(letra[columna] == "\""){
                            palabra = "\\"+palabra
                            estado = 6
                        }
                        else if(letra[columna] == "'"){
                            estado = 7
                        }
                        else{palabra = this.AgregarError("Lexico", fila, columna, palabra)}
                        break;
                    case 2:
                        if(letra[columna] == '/'){
                            palabra += letra[columna];
                            estado = 8
                        }
                        else if(letra[columna] == '*'){
                            palabra += letra[columna];
                            estado = 9
                        }
                        else{
                            estado = this.Agregar(3, fila, columna, "Diagonal", palabra)
                            palabra = ""
                            columna--
                            estado = 1
                        }
                        break;
                    case 3:
                        if(this.esLetra(letra[columna])){
                            palabra += letra[columna];
                        }
                        else if(this.esDigito(letra[columna]) || letra[columna] == '$' || letra[columna] == '_'){
                            palabra += letra[columna];
                            estado = 10
                        }else{
                            if(this.esReservada(palabra)){
                                this.Agregar(this.numToken, fila, columna, "Reservada", palabra)
                                palabra = ""
                                this.numToken++
                                estado = 1
                                columna--
                            }else{
                                this.Agregar(49, fila, columna, "ID", palabra)
                                palabra = ""
                                estado = 1
                                columna--
                            }
                        }
                        break;
                    case 4:
                        if(this.esDigito(letra[columna])){
                            palabra += letra[columna]
                        }else if(letra[columna] == '.'){
                            palabra += letra[columna]
                            estado = 11
                        }else{
                            estado = this.Agregar(48, fila, columna, "Numero", palabra)
                            palabra = ""
                            columna--
                        }
                        break;
                    case 5:
                        estado = 1
                        break;
                    case 6:
                        if(letra[columna] == "\""){
                            palabra += "\\"
                            palabra += letra[columna]
                            this.Agregar(50, fila, columna, "Cadena de Texto", palabra)
                            estado = 1
                            palabra = ""
                        }else{
                            palabra += letra[columna]
                        }
                        break;
                    case 7:
                        if(letra[columna] == "'"){
                            palabra += letra[columna]
                            estado = this.Agregar(51, fila, columna, "Caracter", palabra)
                            palabra = ""
                        }else if(letra[columna] == "\\"){
                            palabra += letra[columna]
                            estado = 15
                        }else{
                            palabra += letra[columna]
                            estado = 14
                        }
                        break;
                    case 8:
                        if(columna == letra.length - 1){
                            this.comentarios.push(new Token(1, fila, columna, palabra, "Comentario Uni linea"))
                            palabra = ""
                            estado = 1
                        }else{
                            palabra += letra[columna]
                        }
                        break;
                    case 9:
                        if(letra[columna] == "*"){
                            palabra += letra[columna]
                            estado = 17
                        }else{
                            palabra += letra[columna]
                        }
                        break;
                    case 10:
                        if(this.esLetra(letra[columna]) || letra[columna] in this.numeros || letra[columna] == "_" || letra[columna] == "$"){
                            palabra += letra[columna]
                        }else{
                            estado = this.Agregar(49, fila, columna, "Caracter", palabra)
                            palabra = ""
                            columna--
                        }

                        break;
                    case 11:
                        if(this.esDigito(letra[columna])){
                            palabra += letra[columna]
                            estado = 18
                        }else{

                        }
                        break;
                    case 12:
                        estado = 1
                        break;
                    case 13:
                        estado = 1
                        break;
                    case 14:
                        if(letra[columna] == "'"){
                            palabra += letra[columna]
                            estado = this.Agregar(51, fila, columna, "Caracter", palabra)
                            palabra = ""
                        }else{
                            
                        }
                        break;
                    case 15:
                        if(this.esLetra(letra[columna]) || letra[columna] == "'" || letra[columna] == "\"" || letra[columna] == "\\" || letra[columna] == "|"){
                            palabra += letra[columna]
                            estado = 14 
                        }
                        break;
                    case 16:
                        estado = 1
                        break;
                    case 17:
                        if(letra[columna] == "/"){
                            palabra += letra[columna]
                            this.comentarios.push(new Token(1, fila, columna, palabra, "Comentario Uni linea"))
                            palabra = ""
                            estado = 1
                        }else{
                            palabra += letra[columna]
                            estado = 9
                        }
                        break;
                    case 18:
                        if(this.esDigito(letra[columna])){
                            palabra += letra[columna];
                        }else{
                            estado = this.Agregar(48, fila, columna, "Numero", palabra)
                            palabra = ""
                            columna--
                        }
                        break;
                    case 19:
                        estado = 1
                        break;
                        
                }
            }
        }
    }

    Agregar(num, fila, columna, tipo, descripcion){
        let lexema = new Token(num, fila, columna, tipo, descripcion)
        this.Tokens.push(lexema)
        this.numToken++
        return 1
    }
    
    AgregarError(tipo, fila, columan, descripcion){
        let errorE = new Error(tipo, fila, columan, descripcion)
        return ""
    }

    esSimbolo(letra){
        var res = false
        for(var i =0;i<this.simbolos.length;i++){
            if(letra == this.simbolos[i]){
                res = true
            }
        }
        return res
    }
    esLetra(letra){
        var res = false
        for(var i =0;i<this.letras.length;i++){
            if(letra.toLowerCase() == this.letras[i]){
                res = true
            }
        }
        return res
    }
    esDigito(letra){
        var res = false
        for(var i =0;i<this.numeros.length;i++){
            if(letra == this.numeros[i]){
                res = true
            }
        }
        return res
    }
    esReservada(texto){
        var res = false
        switch(texto){
            case "public":
                res = true;
                this.numToken = 23
                break
            case "class":
                res = true
                this.numToken = 24
                break
            case "interface":
                res = true
                this.numToken = 25
                break
            case "void":
                res = true
                this.numToken = 26
                break
            case "int":
                res = true
                this.numToken = 27
                break
            case "double":
                res = true
                this.numToken = 28
                break
            case "char":
                res = true
                this.numToken = 29
                break
            case "String":
                res = true
                this.numToken = 30
                break
            case "for":
                res = true
                this.numToken = 31
                break
            case "if":
                res = true
                this.numToken = 32
                break
            case "boolean":
                res = true
                this.numToken = 33
                break
            case "while":
                res = true
                this.numToken = 34
                break
            case "System":
                res = true
                this.numToken = 35
                break
            case "out":
                res = true
                this.numToken = 36
                break
            case "print":
                res = true
                this.numToken = 37
                break
            case "println":
                res = true
                this.numToken = 38
                break
            case "false":
                res = true
                this.numToken = 39
                break
            case "true":
                res = true
                this.numToken = 40
                break
            case "do":
                res = true
                this.numToken = 41
                break
            case "else":
                res = true
                this.numToken = 42
                break
            case "break":
                res = true
                this.numToken = 43
                break
            case "continue":
                res = true
                this.numToken = 44
                break
            case "return":
                res = true
                this.numToken = 45
                break
            case "static":
                res = true
                this.numToken = 46
                break
            case "main":
                res = true
                this.numToken = 47
                break
        }
        return res
    }
    //Graficacion del Arbol
    Graficar(){
        var cadena = new Grafo()
        let padre = "nodo0"
        cadena.dot += "digraph G{\n\n "; 
        cadena.dot += "\tnode[shape=box]; \n"    
        cadena.dot += "\trankdir=UD;\n"
        cadena.dot += "\tnodo0[label=\"Arbol Lexico\"];\n"
        cadena.nodo = 1
        for (let i = 0; i < this.Traducido.length; i++) {
            cadena = this.Traducido[i].Graficar(cadena, padre);
        }

        cadena.dot += "\n}";
        fs.writeFile("./Archivos/AST.dot", cadena.dot, (error)=>{
            if (error) {
                throw error;
            }
        });

        process.exec('dot -Tpdf ./Archivos/AST.dot -o ./Archivos/AST.pdf',function (err,stdout,stderr) {
            if (err) {
                console.log("\n"+stderr);
            } else {
                console.log(stdout);
            }
        });

        return cadena.dot;
    }
}exports.Analizador = Analizador;