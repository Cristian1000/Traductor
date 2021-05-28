class MParametro{
    Parametro

    constructor(parametro){
        this.Parametro = parametro;
    }

    Traducir(){
        return ", " + this.Parametro.Traducir();
    }

    GetNombre(){
        return "Mas Parametro"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"coma\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        if (this.Parametro.Traducir() != "") {
            cadena = this.Parametro.Graficar(cadena, padre)
        }
        return cadena
    }
}
exports.MParametro = MParametro;