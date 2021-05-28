class ElseIf{
    ELSE = ""
    IF 


    constructor(ELse, If){
        this.ELSE = ELse;
        this.IF = If;
    }

    Traducir(){
        return this.ELSE+" "+this.IF.Traducir()
    }

    GetNombre(){
        return "Else If"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.ELSE+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        cadena = this.IF.Graficar(cadena, padre)

        return cadena
    }
}
exports.ElseIf = ElseIf;