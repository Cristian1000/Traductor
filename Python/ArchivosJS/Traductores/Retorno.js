class Retorno{
    TAB
    Return = ""
    Not;
    Valor;
    Exp

    constructor(tab, Return, not, valor, exp){
        this.TAB = tab
        this.Return = Return;
        this.Not = not;
        this.Valor = valor;
        this.Exp = exp;
    }

    

    Traducir(){
        return this.TAB+this.Return+" "+this.Not+this.Valor+this.Exp.Traducir()+"\n"
        
        /*if(this.Return == "break"){
            return "break;\n"
        }else if(this.Return == "continue"){
            return "continue;\n"
        }else if(this.Return == "return"){
            return "return "+this.Exp.Traducir()+";\n"
        }*/
    }

    GetNombre(){
        return "Retorno"
    }

    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.Return+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        if (this.Not != "") {
            hijo = "nodo"+cadena.nodo.toString()
            cadena.dot += "\t"+hijo+"[label=\""+this.Not+"\"];\n"
            cadena.dot += "\t"+padre+" -> "+hijo+";\n"
            cadena.nodo++
        }

        if (this.Valor != "") {
            hijo = "nodo"+cadena.nodo.toString()
            cadena.dot += "\t"+hijo+"[label=\""+this.Valor+"\"];\n"
            cadena.dot += "\t"+padre+" -> "+hijo+";\n"
            cadena.nodo++
        }

        if (this.Exp.Traducir() != "") {
            cadena = this.Exp.Graficar(cadena, padre)
        }

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\";\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        return cadena
    }

}
exports.Retorno = Retorno;