class While{
    TAB
    Not
    Valor
    Exp
    Codigo

    constructor(tab, not, valor, exp, codigo){
        this.TAB = tab
        this.Not = not;
        this.Valor = valor
        this.Exp = exp;
        this.Codigo = codigo;
    }

    Traducir(){
        return this.TAB+"while "+this.Not+this.Valor+this.Exp.Traducir()+":\n\t"+this.Codigo.Traducir()+"\n"
        /*if (this.Codigo != null) {
            return "while("+this.Exp.Traducir()+"){\n"+this.Codigo.Traducir()+"}\n"
        } else {
            return "while("+this.Exp.Traducir()+"){\n}\n"
        }*/
    }

    GetNombre(){
        return "While"
    }
    Graficar(cadena, padre, num){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"while\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"(\"];\n"
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

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\")\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"{\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        if (this.Codigo.Traducir() != "") {
            cadena = this.Codigo.Graficar(cadena, padre)
        }

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"}\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        return cadena
    }
}
exports.While = While;