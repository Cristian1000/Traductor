class MP{
    Not = ""
    Valor = ""
    Exp 
    MP


    constructor(not, valor, exp, mp){
        this.Not = not;
        this.Valor = valor;
        this.Exp = exp;
        this.MP = mp;
    }

    Traducir(){
        if (this.Not != "") {
            return ", Not "+this.Valor +this.Exp.Traducir()+" "+this.MP.Traducir()
        } else {
            return ", "+this.Valor+this.Exp.Traducir()+" "+this.MP.Traducir()
        }
        /*if (this.MP != null) {
            return ", "+this.Exp.Traducir()+" "+this.MP.Traducir()
        }else{
            return ", "+this.Exp.Traducir()
        }*/
    }

    GetNombre(){
        return "Mas Parentesis"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

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

        if (this.MP.Traducir() != "") {
            cadena = this.MP.Graficar(cadena, padre)
        }

        return cadena
    }
}
exports.MP = MP;