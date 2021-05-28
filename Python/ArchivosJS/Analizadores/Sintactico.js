const {Error} = require("../Error")
const {Asignacion} = require("../Traductores/Asignacion")
const {Blanco} = require("../Traductores/Blanco")
const {Bloque} = require("../Traductores/Bloque")
const {Clase} = require("../Traductores/Clase")
const {Codigo} = require("../Traductores/Codigo")
const {Constructor} = require("../Traductores/Constructor")
const {DentroP} = require("../Traductores/DentroP")
const {Do} = require("../Traductores/Do")
const {Else} = require("../Traductores/Else")
const {ElseIf} = require("../Traductores/ElseIf")
const {Exprecion} = require("../Traductores/Exprecion")
const {For} = require("../Traductores/For")
const {Funcion} = require("../Traductores/Funcion")
const {Identificador} = require("../Traductores/Identificador")
const {If} = require("../Traductores/If")
const {Imprimir} = require("../Traductores/Imprimir")
const {Llamado} = require("../Traductores/Llamado")
const {Llamados} = require("../Traductores/Llamados")
const {Mas} = require("../Traductores/Mas")
const {MasId} = require("../Traductores/MasId")
const {Metodo} = require("../Traductores/Metodo")
const {MP} = require("../Traductores/MP")
const {MParametro} = require("../Traductores/MParametro")
const {Parametro} = require("../Traductores/Parametro")
const {Parentesis} = require("../Traductores/Parentesis")
const {Retorno} = require("../Traductores/Retorno")
const {Variable} = require("../Traductores/Variable")
const {While} = require("../Traductores/While")
const {Main} = require("../Traductores/Main")


class Sintactico{
    preAnalisis =1
    numero = 0
    Tokens = new Array()
    ESintacticos = new Array();
    numError = 0;
    ListaClases = new Array();
    AST = ""
    NumTab = 0


    constructor(){
    }

    ErroresS(){
        return this.ESintacticos
    }

    Traducido(){
        return this.ListaClases 
    }

    Tabulador(numero){
        var tabular = "";
        for (let i = 0; i < numero; i++) {
            tabular += "\t";
        }
        return tabular;
    }

    Iniciar(Lista, Errores){
        this.Tokens = Lista;
        this.ESintacticos = Errores;
        //var valor = this.ESintacticos.length-1;
        //this.numError = this.ESintacticos[valor].Numero()+1;
        this.preAnalisis = this.Tokens[0].Numero();
        this.Inicio();
    }

    parea(entrada){
        var token = ""
        if(entrada == this.preAnalisis && this.numero < this.Tokens.length ){
            if (this.numero < this.Tokens.length) {
                token = this.Tokens[this.numero].descripcion;
            //console.log(this.Tokens[this.numero])
            this.numero++
                if(this.numero < this.Tokens.length){
                    this.preAnalisis = this.Tokens[this.numero].Numero()
                }
            }
        }else{
            if (this.numero < this.Tokens.length) {
                console.log("Error Sintactico:   entrada:  "+ entrada+ " Se Tiene: "+this.preAnalisis+" "+this.Tokens[this.numero].Descripcion()+" Fila: "+this.Tokens[this.numero].Fila())
            this.ESintacticos.push(new Error("Sintactico", this.Tokens[this.numero].fila, this.Tokens[this.numero].columna, this.Tokens[this.numero].descripcion))
            while (this.numero < this.Tokens.length) { 
                //console.log(this.Tokens[this.numero]);  
                if (this.Tokens[this.numero].Numero() == 20 
                    || this.Tokens[this.numero].Numero() == 13) {
                    this.numero++;
                    if (this.numero < this.Tokens.length) {
                        this.preAnalisis = this.Tokens[this.numero].Numero();
                    }
                    break;
                }
                this.numero++;
            }

            if (this.preAnalisis == 49 || this.preAnalisis == 23) {
                this.BLOQUE()
            } else {
                this.Codigo()
            }
            }
        
            /*if(this.numero < this.Token.length){
                this.ESintacticos.push(new Error(this.numError, "Sintactico", this.Token[this.numero].Fila(), this.Token[this.numero].Columna(), "Se encontro: "+this.Token[this.numero].Descripcion()))
                console.log("Error Sintactico:   entrada:  "+ entrada+ " Se Tiene: "+this.preAnalisis+" "+this.Token[this.numero].Descripcion())
                while (this.numero < this.Token.length) {
                    if (this.Token[this.numero].Numero() == 20 || this.Token[this.numero].Numero() == 12) {
                        this.numero++;
                        this.preAnalisis = this.Token[this.numero].Numero();
                        break;
                    }
                    this.numero++;
                }
                if (this.preAnalisis == 23 || this.preAnalisis == 27 || this.preAnalisis == 28 || this.preAnalisis == 29 || this.preAnalisis == 30 || this.preAnalisis == 33) {
                    this.Bloque();
                } else {
                    this.Codigo()
                }
            }*/
        }
        return token;
    }

    Inicio(){
        if(this.preAnalisis == 23){
            this.parea(23)
            this.Tipo()
            var id = this.parea(49)
            this.parea(12)
            var bloque = this.BLOQUE()
            this.parea(13)
            var nueva = new Clase(id, bloque)
            this.ListaClases.push(nueva)
            this.Inicio()
        }
    }

    Tipo(){
        if(this.preAnalisis == 24){
            return this.parea(24)
        }
        if(this.preAnalisis == 25){
            return this.parea(25)
        }
    }

    BLOQUE(){
        if(this.preAnalisis == 23){
            var metodo = this.Metodo()
            var a = this.BLOQUE()
            var bloc = new Bloque(metodo, a)
            return bloc
        }else if(this.preAnalisis == 27 || this.preAnalisis == 28 || this.preAnalisis == 29 || this.preAnalisis == 30 || this.preAnalisis == 33){
            var variable = this.Variable()
            var bloque2 = this.BLOQUE()
            var bloc2 = new Bloque(variable, bloque2)
            return bloc2
        }else if(this.preAnalisis == 49){
            var asig = this.Asignacion()
            var blo = this.BLOQUE()
            var blo3 = new Bloque(asig, blo)
            return blo3
        }else{
            return new Blanco()
        }
    }

    Variable(){
        this.NumTab++
        var cont = this.NumTab
        this.TipoDato()
        var ide = this.Identificador()
        this.parea(20)
        var va = new Variable(this.Tabulador(cont), ide)
        this.NumTab--
        return va
    }

    Identificador(){
        var id = this.parea(49)
        var mas = this.Mas()
        return new Identificador(id, mas)
    }

    Mas(){
        switch(this.preAnalisis){
            case 19:
                var mi =this.MasId()
                return mi
            case 9:
                this.parea(9)
                var not =this.Not()
                var va = this.Valor()
                var exp = this.Exp()
                var id = this.MasId()
                return new Mas(not, va, exp, id)
            default:
                return new Blanco()
        }
    }

    MasId(){
        if(this.preAnalisis == 19){
            this.parea(19)
            var iden = this.Identificador()
            var masid = new MasId(iden)
            return masid
        }else{
            return new Blanco()
        }
    }

    TipoDato(){
        switch(this.preAnalisis){
            case 27:
                return this.parea(27)
                break
            case 28:
                return this.parea(28)
                break
            case 29:
                return this.parea(29)
                break
            case 30:
                return this.parea(30)
                break
            case 33:
                return this.parea(33)
                break
            default:
                if (this.numero < this.Tokens.length) {
                    console.log("Error Sintactico:   entrada:  "+ entrada+ " Se Tiene: "+this.preAnalisis+" "+this.Tokens[this.numero].Descripcion())
                    this.ESintacticos.push(new Error("Sintactico", this.Tokens[this.numero].fila, this.Tokens[this.numero].columna, this.Tokens[this.numero].descripcion))
                while (this.numero < this.Tokens.length) { 
                    //console.log(this.Tokens[this.numero]);  
                    if (this.Tokens[this.numero].Numero() == 20 
                        || this.Tokens[this.numero].Numero() == 13) {
                        console.log();
                        this.numero++;
                        this.preAnalisis = this.Tokens[this.numero].Numero();
                        break;
                    }
                    this.numero++;
                }
    
                if (this.preAnalisis == 49 || this.preAnalisis == 23) {
                    this.BLOQUE()
                } else {
                    this.Codigo()
                }
                }
                
            break;
        }
    }

    Valor(){
        var v = ""
        switch(this.preAnalisis){
            case 2:
                this.parea(2)
                v =this.Valor()
                return "-"+v
            case 48:
                return this.parea(48)
                break
            case 49:
                return this.parea(49)
                break
            case 50:
                return this.parea(50)
                break
            case 51:
                return this.parea(51)
                break
            case 39:
                return this.parea(39)
                break
            case 40:
                return this.parea(40)
                break
            default:
                if (this.numero < this.Tokens.length) {
                    //console.log("Error Sintactico:   entrada:  "+ entrada+ " Se Tiene: "+this.preAnalisis+" "+this.Tokens[this.numero].Descripcion())
                    this.ESintacticos.push(new Error("Sintactico", this.Tokens[this.numero].fila, this.Tokens[this.numero].columna, this.Tokens[this.numero].descripcion))
                while (this.numero < this.Tokens.length) { 
                    //console.log(this.Tokens[this.numero]);  
                    if (this.Tokens[this.numero].Numero() == 20 
                        || this.Tokens[this.numero].Numero() == 13) {
                        console.log(this.Tokens[this.numero]);
                        this.numero++;
                        this.preAnalisis = this.Tokens[this.numero].Numero();
                        console.log(this.Tokens[this.numero]);
                        break;
                    }
                    this.numero++;
                }
    
                if (this.preAnalisis == 49 || this.preAnalisis == 23) {
                    console.log("Bloque");
                    this.BLOQUE()
                } else {
                    this.Codigo()
                }
                }
                break
        }
    }

    Parentesis(){
        if(this.preAnalisis == 14){
            this.parea(14)
            var dentro = this.DentroP()
            this.parea(15)
            return dentro;
        }else{
            if (this.numero < this.Tokens.length) {
                console.log("Error Sintactico:   entrada:  "+ entrada+ " Se Tiene: "+this.preAnalisis+" "+this.Tokens[this.numero].Descripcion())
            this.ESintacticos.push(new Error(this.numError, "Sintactico", this.Tokens[this.numero].Fila(), this.Tokens[this.numero].Columna(), "Se encontro: "+this.Tokens[this.numero].Descripcion()))
            while (this.numero < this.Tokens.length) { 
                //console.log(this.Tokens[this.numero]);  
                if (this.Tokens[this.numero].Numero() == 20 
                    || this.Tokens[this.numero].Numero() == 13) {
                    console.log();
                    this.numero++;
                    this.preAnalisis = this.Tokens[this.numero].Numero();
                    break;
                }
                this.numero++;
            }

            if (this.preAnalisis == 49 || this.preAnalisis == 23) {
                this.BLOQUE()
            } else {
                this.Codigo()
            }
            }
        }
    }

    DentroP(){
        if(this.preAnalisis == 48 || this.preAnalisis == 49 || this.preAnalisis == 50 || this.preAnalisis == 51 || this.preAnalisis == 39 || this.preAnalisis == 40 || this.preAnalisis == 7 ){
            var not = this.Not()
            var valor = this.Valor()
            var esp = this.Exp()
            var mp = this.MP()
            return new DentroP(not, valor, esp, mp)
        }else{
            return new Blanco()
        }
    }

    MP(){
        if(this.preAnalisis == 19){
            this.parea(19)
            var not = this.Not()
            var va = this.Valor()
            var exp = this.Exp()
            var m = this.MP()
            return new MP(not, va, exp, m)
        }else{
            return new Blanco()
        }
    }

    Not(){
        if(this.preAnalisis == 7){
            this.parea(7)
            return "not"
        }else{
            return ""
        }
    }

    Exp(){
        switch(this.preAnalisis){
            case 5:
                this.parea(5)
                this.parea(5)
                var not = this.Not()
                var va = this.Valor()
                var exp = this.Exp()
                return new Exprecion("and", not, va, exp)
            case 6:
                this.parea(6)
                this.parea(6)
                var not2 = this.Not()
                var va2 =  this.Valor()
                var exp2 = this.Exp()
                return new Exprecion("or", not2, va2, exp2)
            case 7:
                this.parea(7)
                var igual = this.Igual()
                var not3 = this.Not()
                var va3 = this.Valor()
                var exp3 = this.Exp()
                if(igual == ""){
                    return new Exprecion("not", "", va3, exp3)
                }else{
                    return new Exprecion("!=", not3, va3, esp3)
                }
            case 8:
                this.parea(8)
                var not4 =  this.Not()
                var va4 = this.Valor()
                var exp4 = this.Exp()
                return new Exprecion("xor", not4, va4, exp4)
            case 9:
                this.parea(9)
                var igual5 = this.Igual()
                var not5 = this.Not()
                var va5 = this.Valor()
                var exp5 = this.Exp()
                if (igual5 == "") {
                    return new Exprecion("=", not5, va5, exp5)
                } else {
                    return new Exprecion("==", not5, va5, exp5)
                }
            case 10:
                this.parea(10)
                var igual6 = this.Igual()
                var not6 = this.Not()
                var va6 = this.Valor()
                var exp6 = this.Exp()
                if (igual6 == "") {
                    return new Exprecion("<", not6, va6, exp6)
                } else {
                    return new Exprecion("<=", not6, va6, exp6)
                }
            case 11:
                this.parea(11)
                var igual7 = this.Igual()
                var not7 = this.Not()
                var va7 = this.Valor()
                var exp7 = this.Exp()
                if (igual7 == "") {
                    return new Exprecion(">", not7, va7, exp7)
                } else {
                    return new Exprecion(">=", not7, va7, exp7)
                }
            case 1:
                this.parea(1)
                var mas = this.MAS()
                if(mas.Operacion() == ""){
                    return new Exprecion("+", mas.Not, mas.Valor, mas.Exp2)
                }else{
                    return new Exprecion("+=", "", 1, new Blanco())
                }
            case 2:
                this.parea(2)
                var menos = this.MENOS()
                if(menos.Operacion() == ""){
                    var not8 = menos.Not
                    var va8 = menos.Valor
                    var exp8 = menos.Exp2
                    return new Exprecion("-", not8, va8, exp8)
                }else{
                    return new Exprecion("-=", "", 1, new Blanco())
                }
            case 3:
                this.parea(3)
                var not9 = this.Not()
                var va9 = this.Valor()
                var exp9 = this.Exp()
                return new Exprecion("/", not9, va9, exp9)
            case 4:
                this.parea(4)
                var not10 = this.Not()
                var va10 = this.Valor()
                var exp10 =  this.Exp()
                return new Exprecion("*", not10, va10, exp10)
            case 14:
                this.parea(14)
                var v = this.DentroP()
                this.parea(15)
                var exp11 = this.Exp()
                var p = new Parentesis(v)
                return new Codigo(p, exp11)
            default:
                return new Blanco();
        }
    }

    Igual(){
        if(this.preAnalisis == 9){
            return this.parea(9)
        }else{
            return ""
        }
    }

    MAS(){
        if(this.preAnalisis == 1){
            var a =this.parea(1)
            return new Exprecion(a, "", "", new Blanco())
        }else{
            var not = this.Not()
            var va = this.Valor()
            var exp = this.Exp()
            return new Exprecion("", not, va, exp)
        }
    }

    MENOS(){
        if(this.preAnalisis == 2){
            return new Exprecion(this.parea(2), "", "", new Blanco())
        }else{
            var not = this.Not()
            var va = this.Valor()
            var exp = this.Exp()
            return new Exprecion("", not, va, exp)
        }
    }

    Imprimir(){
        this.NumTab++
        this.parea(35)
        this.parea(21)
        this.parea(36)
        this.parea(21)
        var a = this.Print()
        this.parea(20)
        this.NumTab--
        return a;
    }

    Print(){
        var cont = this.NumTab
        switch(this.preAnalisis){
            case 37:
                this.parea(37)
                this.parea(14)
                var va = this.Valores()
                this.parea(15)
                return new Imprimir(this.Tabulador(cont), "print", va)
            case 38:
                this.parea(38)
                this.parea(14)
                var va2 = this.Valores()
                this.parea(15)
                return new Imprimir(this.Tabulador(cont), "println", va2)
        }
    }

    Valores(){
        if(this.preAnalisis == 48 || this.preAnalisis == 49 || this.preAnalisis == 50 || this.preAnalisis == 51 || this.preAnalisis == 39 || this.preAnalisis == 40 ){
            var not = this.Not()
            var va = this.Valor()
            var exp = this.Exp()
            return new Exprecion("", not, va, exp)
        }else{
            return new Blanco()
        }
    }

    Tip(){
        if(this.preAnalisis == 26){
            this.parea(26)
        }else{
            this.TipoDato()
        }
    }

    Metodo(){
        this.parea(23)
        var a = this.AUX()
        return a
    }

    AUX(){
        this.NumTab++
        var cont = this.NumTab
        switch(this.preAnalisis){
            case 26:
                this.parea(26)
                var id = this.parea(49)
                this.parea(14)
                var parametro = this.Parametro()
                this.pareae(15)
                var Codigo = this.Funcion()
                if(Codigo.Traducir() == ""){
                    this.NumTab--
                    return new Funcion(this.Tabulador(cont), id, parametro)
                }else{
                    this.NumTab--
                    return new Metodo(this.Tabulador(cont), id, parametro, Codigo)
                }
            case 49:
                this.parea(49)
                this.parea(14)
                var parametro2 = this.Parametro()
                this.parea(15)
                this.parea(12)
                var codigo2 = this.Codigo()
                this.parea(13)
                this.NumTab--
                return new Constructor(this.Tabulador(cont), parametro2, codigo2)
            case 46:
                this.parea(46)
                this.parea(26)
                this.parea(47)
                this.parea(14)
                this.parea(30)
                this.MAIN()
                this.parea(15)
                this.parea(12)
                var codigo3 = this.Codigo()
                this.parea(13)
                var main = new Main(this.Tabulador(cont), codigo3)
                this.NumTab--
                return main
            case 27:
                this.TipoDato()
                var id4 = this.parea(49)
                this.parea(14)
                var parametro4 = this.Parametro()
                this.parea(15)
                var codigo4 = this.Funcion()
                if (codigo4.Traducir() == "") {
                    this.NumTab--
                    return new Funcion(this.Tabulador(cont), id4, parametro4)
                } else {
                    this.NumTab--
                    return new Metodo(this.Tabulador(cont), id4, parametro4, codigo4)
                }
            case 28:
                this.TipoDato()
                var id5 = this.parea(49)
                this.parea(14)
                var parametro5 = this.Parametro()
                this.parea(15)
                var codigo5 = this.Funcion()
                if (codigo5.Traducir() == "") {
                    this.NumTab--
                    return new Funcion(this.Tabulador(cont), id5, parametro5)
                } else {
                    this.NumTab--
                    return new Metodo(this.Tabulador(cont), id5, parametro5, codigo5)
                }
            case 29:
                this.TipoDato()
                var id6 = this.parea(49)
                this.parea(14)
                var paramet = this.Parametro()
                this.parea(15)
                var codigo6 = this.Funcion()
                if (codigo6.Traducir() == "") {
                    this.NumTab--
                    return new Funcion(this.Tabulador(cont), id6, paramet)
                } else {
                    this.NumTab--
                    return new Metodo(this.Tabulador(cont), id6, paramet, codigo6)
                }
            case 30:
                this.TipoDato()
                var id7 = this.parea(49)
                this.parea(14)
                var parametro7 = this.Parametro()
                this.parea(15)
                var codigo7 = this.Funcion()
                if (codigo7.Traducir() == "") {
                    this.NumTab--
                    return new Funcion(this.Tabulador(cont), id7, parametro7)
                } else {
                    this.NumTab--
                    return new Metodo(this.Tabulador(cont), id7, parametro7, codigo7)
                }
            case 33:
                this.TipoDato()
                var id8 = this.parea(49)
                this.parea(14)
                var parametro8 =  this.Parametro()
                this.parea(15)
                var codigo8 = this.Funcion()
                if (codigo8.Traducir() == "") {
                    this.NumTab--
                    return new Funcion(this.Tabulador(cont), id8, parametro8)
                } else {
                    this.NumTab--
                    return new Metodo(this.Tabulador(cont), id8, parametro8, codigo8)
                }
            default:
                
        }
    }

    MAIN(){
        switch (this.preAnalisis) {
            case 16:
                this.parea(16)
                this.parea(17)
                this.parea(49)
                break;
            default:
                if (this.numero < this.Tokens.length) {
                    console.log("Error Sintactico:   entrada:  "+ entrada+ " Se Tiene: "+this.preAnalisis+" "+this.Tokens[this.numero].Descripcion())
                this.ESintacticos.push(new Error(this.numError, "Sintactico", this.Tokens[this.numero].Fila(), this.Tokens[this.numero].Columna(), "Se encontro: "+this.Tokens[this.numero].Descripcion()))
                while (this.numero < this.Tokens.length) { 
                    //console.log(this.Tokens[this.numero]);  
                    if (this.Tokens[this.numero].Numero() == 20 
                        || this.Tokens[this.numero].Numero() == 13) {
                        console.log();
                        this.numero++;
                        this.preAnalisis = this.Tokens[this.numero].Numero();
                        break;
                    }
                    this.numero++;
                }
    
                if (this.preAnalisis == 49 || this.preAnalisis == 23) {
                    this.BLOQUE()
                } else {
                    this.Codigo()
                }
                }
                break;
        }
    }

    Funcion(){
        switch (this.preAnalisis) {
            case 12:
                this.parea(12)
                var codigo = this.Codigo()
                this.parea(13)
                return codigo;
            case 20:
                this.parea(20)
                return new Blanco()
            default:
                break;
        }
    }

    Parametro(){
        if(this.preAnalisis == 27 || this.preAnalisis == 28 || this.preAnalisis == 29 || this.preAnalisis == 30 || this.preAnalisis == 33){
            this.TipoDato()
            var id = this.parea(49)
            var mpara = this.MParametro()
            return new Parametro(id, mpara);
        }else{
            return new Blanco()
        }
    }

    MParametro(){
        if(this.preAnalisis == 19){
            this.parea(19)
            var pa = this.Parametro()
            return new MParametro(pa)
        }else{
            return new Blanco()
        }
    }

    IF(){
        this.NumTab++
        var cont = this.NumTab
        this.parea(32)
        this.parea(14)
        var not = this.Not()
        var va = this.Valor()
        var exp = this.Exp()
        this.parea(15)
        this.parea(12)
        var co = this.Codigo()
        this.parea(13)
        this.NumTab--
        var el = this.ELSE()
        var a = new If(this.Tabulador(cont), not, va, exp, co, el)
        return a
    }

    ELSE(){
        if(this.preAnalisis == 42){
            this.parea(42)
            return this.Cont()
        }else{
            return new Blanco()
        }
    }

    Cont(){
        this.NumTab++
        var cont = this.NumTab
        if(this.preAnalisis == 32){
            this.parea(32)
            this.parea(14)
            var not = this.Not()
            var va =this.Valor()
            var exp = this.Exp()
            this.parea(15)
            this.parea(12)
            var codigo =  this.Codigo()
            this.parea(13)
            var el = this.ELSE()
            var elif = new  ElseIf(this.Tabulador(cont), not, va, exp, codigo, el)
            this.NumTab--
            return elif

        }else if(this.preAnalisis == 12){
            this.parea(12)
            var codigo2 = this.Codigo()
            this.parea(13)
            var el = new Else(this.Tabulador(cont), codigo2)
            this.NumTab--
            return el
        }else{
            this.NumTab--
            return new Blanco()
        }
    }

    FOR(){
        this.NumTab++
        var cont = this.NumTab
        this.parea(31)
        this.parea(14)
        this.TipoDato()
        this.parea(49)
        this.parea(9)
        var valor = this.Valor()
        var exp = this.Exp()
        this.parea(20)
        this.Valor()
        var exp2 = this.Exp()
        this.parea(20)
        this.Valor()
        this.Exp()
        this.parea(15)
        this.parea(12)
        var codigo = this.Codigo()
        this.parea(13)
        
        var a = new For(this.Tabulador(cont), valor, exp, exp2, codigo)
        this.NumTab--

        return a
        //return new For(valor, exp, exp2, codigo)
    }

    WHILE(){
        this.NumTab++
        var cont = this.NumTab
        this.parea(34)
        this.parea(14)
        var not = this.Not()
        var valor =this.Valor()
        var exp = this.Exp()
        this.parea(15)
        this.parea(12)
        var codigo = this.Codigo()
        this.parea(13)
        var wi = new While(this.Tabulador(cont), not, valor, exp, codigo)
        this.NumTab--
        return wi
    }

    DO(){
        this.NumTab++
        var cont = this.NumTab
        this.parea(41)
        this.parea(12)
        var codigo = this.Codigo()
        this.parea(13)
        this.parea(34)
        this.parea(14)
        var not = this.Not()
        var valor = this.Valor()
        var exp = this.Exp()
        this.parea(15)
        var d = new Do(this.Tabulador(cont), codigo, not, valor, exp)
        this.NumTab--
        return d
    }

    Asignacion(){
        this.NumTab++
        var cont = this.NumTab
        var id =this.parea(49)
        var co = this.Llamado()
        if (co.Id == "=") {
            console.log(id);
            var asig = new Asignacion(this.Tabulador(cont), id, co.Not, co.Valor, co.Exp)
            this.NumTab--
            this.parea(20)
            return asig
        } else if(co.Id == "("){
            var lla = new Llamado(this.Tabulador(cont), id, co.Exp)
            this.NumTab--
            this.parea(20)
            return lla
        }
    }

    Llamado(){
        this.NumTab++
        var cont = this.NumTab
        switch (this.preAnalisis) {
            case 9:
                var id = this.parea(9)
                var not = this.Not()
                var va = this.Valor()
                var exp = this.Exp()
                var lla = new Llamados(id, not, va, exp)
                this.NumTab--
                return lla
            case 14:
                var i = this.parea(14)
                var e = this.DentroP()
                this.parea(15)
                var lla2 = new Llamados(i, "", "", e)
                this.NumTab--
                return lla2
            default:
                var lla2 = new Llamados("", "", "", new Blanco())
                break;
        }
    }

    Retorno(){
        this.NumTab++
        var cont = this.NumTab
        switch (this.preAnalisis) {
            case 43:
                 var a = this.parea(43)
                this.parea(20)
                var bre = new Retorno(this.Tabulador(cont), a, "", "", new Blanco())
                this.NumTab--
                return bre
            case 44:
                var b = this.parea(44)
                this.parea(20)
                var con =  new Retorno(this.Tabulador(cont), b, "", "", new Blanco())
                this.NumTab--
                return con
            case 45:
                var c =  this.parea(45)
                if(this.preAnalisis != 20){
                    var not = this.Not()
                    var va = this.Valor()
                    var exp = this.Exp()
                    this.parea(20)
                    var re = new Retorno(this.Tabulador(cont), c, not, va, exp)
                    this.NumTab--
                    return re
                }else{
                    this.parea(20)
                    var re2 = new Retorno(this.Tabulador(cont), c, "", "", new Blanco())
                    this.NumTab--
                    return re2
                }
                break;
            default:
                break;
        }
    }

    Codigo(){
        switch (this.preAnalisis) {
            case 31:
                var ins = this.FOR()
                var co = this.Codigo()
                return new Codigo(ins, co)
            case 32:
                var ins2 = this.IF()
                var co2 = this.Codigo()
                return new Codigo(ins2, co2)
            case 34:
                var ins3 = this.WHILE()
                var co3 = this.Codigo()
                return new Codigo(ins3, co3)
            case 35:
                var ins4 = this.Imprimir()
                var co4 = this.Codigo()
                return new Codigo(ins4, co4)
            case 41:
                var ins5 = this.DO()
                var co5 = this.Codigo()
                return new Codigo(ins5, co5)
            case 43:
                var ins6 = this.Retorno()
                var co6 = this.Codigo()
                return new Codigo(ins6, co6)
            case 44:
                var ins7 = this.Retorno()
                var co7 = this.Codigo()
                return new Codigo(ins7, co7)
                break;
            case 45:
                var ins8 = this.Retorno()
                var co8 = this.Codigo()
                return new Codigo(ins8, co8)
            case 49:
                var ins9  = this.Asignacion()
                var co9 = this.Codigo()
                return new Codigo(ins9, co9)
                /*
                if(this.preAnalisis+1 == 9){
                    var ins9  = this.Asignacion()
                    var co9 = this.Codigo()
                    return new Codigo(ins9, co9)
                }else{
                    var id = this.parea(49)
                    var exp = this.Exp()
                    this.parea(20)
                    var co10 = this.Codigo()
                    var a = new Exprecion("", "", id, exp)
                    return new Codigo(a, co10)
                }*/
                break;
            case 27:
                var ins11 = this.Variable()
                var co11 = this.Codigo()
                return new Codigo(ins11, co11)
            case 28:
                var ins12  = this.Variable()
                var co12 = this.Codigo()
                return new Codigo(ins12, co12)
            case 28:
                var ins13 = this.Variable()
                var co13 = this.Codigo()
                return new Codigo(ins13, co13)
            case 30:
                var ins14 = this.Variable()
                var co14 = this.Codigo()
                return new Codigo(ins14, co14)
            case 33:
                var ins15 = this.Variable()
                var co15 = this.Codigo()
                return new Codigo(ins15, co15)
            case 23:
                var ins16 = this.Funcion()
                var co16 = this.Codigo()
                return new Codigo(ins16, co16)
            default:
                return new Blanco()
        }
    }

}exports.Sintactico = Sintactico;