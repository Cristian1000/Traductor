class Exprecion{
    
    OP = ""
    Not = ""
    Valor = ""
    Exp2


    constructor(op, not, valor, exp){
        this.OP = op;
        this.Not = not;
        this.Valor = valor
        this.Exp2 = exp;
    }

    Operacion(){
        return this.OP
    }

    Traducir(){
            return this.OP+" "+this.Not+this.Valor+this.Exp2.Traducir();
        /*if (this.Exp1 != null && this.Exp2 != null) {
            return this.Exp1.Traducir()+" "+ this.OP+" "+this.Exp2.Traducir();
        } else {
            if (this.Exp2 == null) {
                return this.Exp1.Traducir()+" "+ this.OP;
            }else if(this.Exp1 == null){
                return this.OP+" "+this.Exp2.Traducir();
            }
        }*/
    }
    GetNombre(){
        return "Exprecion"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo
        
        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.OP+"\"];\n"
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

        if (this.Exp2.Traducir() != "") {
            cadena = this.Exp2.Graficar(cadena, padre)
        }

        return cadena
    }
}
exports.Exprecion = Exprecion;