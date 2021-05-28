class Variable{
    Tabular = ""
    Identificador
    constructor(tabular,identificador){
        this.Tabular = tabular;
        this.Identificador = identificador;
    }

    Traducir(){
        return this.Tabular+"var "+this.Identificador.Traducir()+";\n"
        /*if(this.Des == ""){
            return "var "+this.Identificador.Traducir()+" ;\n"
        }else{
            return ""
        }*/
    }

    GetNombre(){
        return "Variable"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"Tipo\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        if (this.Identificador.Traducir() != "") {
            cadena = this.Identificador.Graficar(cadena, padre)
        }

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\";\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        return cadena
    }
}
exports.Variable = Variable;