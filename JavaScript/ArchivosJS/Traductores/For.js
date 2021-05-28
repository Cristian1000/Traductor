class For{
    ID = ""
    Exp
    Exp2
    Exp3
    Codigo  
 

    constructor(id, exp,  exp2, exp3, codigo){
        this.ID = id;
        this.Exp = exp;
        this.Exp2 = exp2;
        this.Exp3 = exp3;
        this.Codigo = codigo;
    }

    Traducir(){
        return "for("+this.ID+" = "+this.Exp.Traducir()+";"+this.Exp2.Traducir()+";"+this.Exp3.Traducir()+"){\n"+this.Codigo.Traducir()+"\n}\n"
        /*if (this.Codigo != null) {
            return "for("+this.ID+" = "+this.Exp.Traducir()+";"+this.Exp2.Traducir()+";"+this.Exp3.Traducir()+"){\n"+this.Codigo.Traducir()+"\n}\n"
        } else {
            return "for("+this.ID+" = "+this.Exp.Traducir()+";"+this.Exp2.Traducir()+";"+this.Exp3.Traducir()+"){\n"+"}\n"
        }*/
    }

    GetNombre(){
        return "For"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"for\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"(\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.ID+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"=\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        
        cadena = this.Exp.Graficar(cadena, padre)

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\";\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        cadena = this.Exp2.Graficar(cadena, padre)

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\";\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        cadena = this.Exp3.Graficar(cadena, padre)

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
exports.For = For;