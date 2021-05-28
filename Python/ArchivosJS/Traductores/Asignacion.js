
class Asignacion{
    TAB;
    ID;
    Not;
    Valor;
    Exp;

    constructor(tab, id, not, valor, exp){
        this.TAB = tab
        this.Not = not;
        this.Valor = valor;
        this.ID = id;;
        this.Exp = exp;
    }

    Traducir(){
        //console.log("var "+this.ID+" = "+this.Not+this.Valor+this.Exp.Traducir()+"\n")
        return this.TAB+""+this.ID+" = "+this.Not+this.Valor+this.Exp.Traducir()+"\n"
    }

    GetNombre(){
        return "Asignacion"
    }

    Graficar(cadena, padre){
        let hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre +" -> "+hijo+";\n"
        padre = hijo
        cadena.nodo++

        hijo = "nodo"+cadena.nodo
        cadena.dot += "\t"+hijo+"[label=\""+this.ID+"\"];\n"
        cadena.dot += "\t"+padre +" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo
        cadena.dot += "\t"+hijo+"[label=\"=\"];\n"
        cadena.dot += "\t"+padre +" -> "+hijo+";\n"
        cadena.nodo++

        if (this.Not != "") {
            hijo = "nodo"+cadena.nodo
            cadena.dot += "\t"+hijo+"[label=\""+this.Not+"\"];\n"
            cadena.dot += "\t"+padre +" -> "+hijo+";\n"
            cadena.nodo++
        }

        hijo = "nodo"+cadena.nodo
        cadena.dot += "\t"+hijo+"[label=\""+this.Valor+"\"];\n"
        cadena.dot += "\t"+padre +" -> "+hijo+";\n"
        cadena.nodo++

        if (this.Exp.Traducir() != "") {
            cadena = this.Exp.Graficar(cadena, padre)
        }

        hijo = "nodo"+cadena.nodo
        cadena.dot += "\t"+hijo+"[label=\";\"];\n"
        cadena.dot += "\t"+padre +" -> "+hijo+";\n"
        cadena.nodo++

        return cadena
    }
}
exports.Asignacion = Asignacion;