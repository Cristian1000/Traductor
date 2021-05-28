class Parametro{
    ID=""
    MParametro

    constructor(id, mparametro){
        this.ID = id;
        this.MParametro = mparametro;
    }
    
    Traducir(){
        return ", "+this.ID+this.MParametro.Traducir()
        /*if (this.MParametro != null) {
            return this.ID+this.MParametro.Traducir()
        } else {
            return this.ID
        }*/
    }

    GetNombre(){
        return "Parametro"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.ID+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        if (this.MParametro.Traducir() != "") {
            cadena = this.MParametro.Graficar(cadena, padre)
        }
        return cadena
    }
}
exports.Parametro = Parametro;