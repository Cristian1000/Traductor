class Funcion{
    TAB
    ID
    Parametro

    constructor(tab, id, parametro){
        this.TAB = tab
        this.ID = id;
        this.Parametro = parametro;
    }

    Traducir(){
        return this.TAB+"self "+this.ID+"(self "+this.Parametro.Traducir()+");\n"
        /*if (this.Parametro != null) {
            return "var funcion = "+this.ID+"("+this.Parametro.Traducir()+");\n"
        } else {
            return "var funcion = "+this.ID+"();\n"
        }*/
    }
    GetNombre(){
        return "Funcion"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"public\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.ID+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"(\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        
        if (this.Parametro.Traducir() != "") {
            cadena = this.Parametro.Graficar(cadena, padre)
        }

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\")\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\";\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        return cadena
    }
}
exports.Funcion = Funcion;