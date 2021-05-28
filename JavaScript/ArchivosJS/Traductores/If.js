class If{
    Exp
    Codigo
    Else

    constructor(exp, codigo, ELSE){
        this.Exp = exp;
        this.Codigo = codigo;
        this.Else = ELSE;
    }


    Traducir(){
        return "if("+this.Exp.Traducir()+"){\n"+this.Codigo.Traducir()+"\n}"+this.Else.Traducir()
        /*if (this.Codigo != null && this.Else != null) {
            return "if("+this.Exp.Traducir()+"){\n"+this.Codigo.Traducir()+"\n}"+this.Else.Traducir()
        } else {
            if (this.Codigo == null && this.Else == null) {
                return "if("+this.Exp.Traducir()+"){\n}"
            } else {
                if (this.Codigo == null) {
                    return "if("+this.Exp.Traducir()+"){\n}"+this.Else.Traducir()
                } else {
                    return "if("+this.Exp.Traducir()+"){\n"+this.Codigo.Traducir()+"\n}"
                }
            }
        }*/
    }

    GetNombre(){
        return "If"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"if\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"(\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        cadena = this.Exp.Graficar(cadena, padre)

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\")\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"{\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        if (this.Codigo.Traducir != "") {
            cadena = this.Codigo.Graficar(cadena, padre)
        }

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"}\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        if (this.Else.Traducir() != "") {
            cadena = this.Else.Graficar(cadena, padre)
        }

        return cadena
    }
}
exports.If = If;