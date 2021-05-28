class Retorno{

    Return = ""
    Exp

    constructor(Return, exp){
        this.Return = Return;
        this.Exp = exp;
    }

    

    Traducir(){
        return this.Return+" "+this.Exp.Traducir()+";\n"
        
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