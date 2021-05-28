const {Grafo} = require("../Grafo")

class Bloque{
    Sentencia
    NBloque

    constructor(sentencia, bloque){
        this.Sentencia = sentencia;
        this.NBloque = bloque;
    }


    Traducir(){
        return this.Sentencia.Traducir()+this.NBloque.Traducir()
        /*if(this.NBloque != null){
            return this.Sentencia.Traducir()+this.NBloque.Traducir;
        }else{
            return this.Sentencia.Traducir();
        }*/
    }

    Graficar(cadena, padre){
        let hijo = "nodo"+cadena.getNodo().toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        padre = hijo
        cadena.nodo++
        if (this.Sentencia.Traducir() != "") {
            cadena = this.Sentencia.Graficar(cadena, padre)
        }
        if (this.NBloque.Traducir() != "") {
            cadena = this.NBloque.Graficar(cadena, padre)
        }
        return cadena
    }

    GetNombre(){
        return "Bloque"
    }
}
exports.Bloque = Bloque;