const {Grafo} = require("./Grafo")
const fs = require('fs')
var process = require('child_process');

class Graficador{
    ListaToken
    ListaTo
    ListaER
    /*
    constructor(lista){
        this.ListaToken = lista;
    }*/

    Lista(lista){
        this.ListaToken = lista
    }

    Tokens(lista){
        this.ListaTo = lista
    }

    Retorno(){
        return this.ListaTo
    }

    Errores(lista){
        this.ListaER = lista
    }

    RetornoError(){
        return this.ListaER
    }
    
    Traducir(){
        console.log("Se inicia la traduccion")
        var codigo = ""
        for (let i = 0; i < this.ListaToken.length; i++) {
            codigo += this.ListaToken[i].Traducir();
        }
        fs.writeFile("./Archivos/Archivo.js", codigo, (error)=>{
            if (error) {
                throw error;
            }
        });
        
        return codigo
    }
    Grafica(){
        var cadena = new Grafo()
        let padre = "nodo0"
        cadena.dot += "digraph G{\n\n "; 
        cadena.dot += "\tnode[shape=box]; \n"    
        cadena.dot += "\trankdir=UD;\n"
        cadena.dot += "\tnodo0[label=\"Arbol Lexico\"];\n"
        cadena.nodo = 1
        for (let i = 0; i < this.ListaToken.length; i++) {
            cadena = this.ListaToken[i].Graficar(cadena, padre);
        }

        cadena.dot += "\n}";
        fs.writeFile("./Archivos/arbol.dot", cadena.dot, (error)=>{
            if (error) {
                throw error;
            }
            //console.log("arcrivo escr");
        });
        process.exec('dot -Tpdf ./Archivos/arbol.dot -o ./Archivos/arbol.pdf',function (err,stdout,stderr) {
            if (err) {
                console.log("\n"+stderr);
            } else {
                console.log(stdout);
            }
     });
        
        /*fs.appendFile("/Archivos/arbol.dot", cadena.dot, (error)=>{
            if (error) {
                throw error;
            }
            console.log("arcrivo escr");
        });*/
        return cadena.dot;
    }
}
exports.Graficador = Graficador;