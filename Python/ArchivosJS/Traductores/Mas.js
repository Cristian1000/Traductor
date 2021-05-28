class Mas{
    Exp
    MasId
    Not
    Valor

    constructor(not, valor, exp, masid){
        this.Not = not;
        this.Valor = valor;
        this.Exp = exp;
        this.MasId = masid;

    }

    Traducir(){
        return "= "+this.Not+this.Valor+this.Exp.Traducir()+" "+this.MasId.Traducir()
        /*if (this.MasId != null) {
            return " = "+this.Exp.Traducir()+" "+this.MasId.Traducir()
        } else {
            return " = "+this.Exp.Traducir()
        }*/
    }

    GetNombre(){
        return "Mas"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        hijo = "nodo"+cadena.nodo.toString()
            cadena.dot += "\t"+hijo+"[label=\"=\"];\n"
            cadena.dot += "\t"+padre+" -> "+hijo+";\n"
            cadena.nodo++

        if (this.Not != "") {
            hijo = "nodo"+cadena.nodo.toString()
            cadena.dot += "\t"+hijo+"[label=\""+this.Not+"\"];\n"
            cadena.dot += "\t"+padre+" -> "+hijo+";\n"
            cadena.nodo++
        }

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.Valor+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        if (this.Exp.Traducir() != "") {
            cadena = this.Exp.Graficar(cadena, padre)
        }
        
        if (this.MasId.Traducir() != "") {
            cadena = this.MasId.Graficar(cadena, padre)
        }
        return cadena

    }

}
exports.Mas = Mas;