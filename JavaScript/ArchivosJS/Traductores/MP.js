class MP{
    Exp 
    MPE
    Fila
    Columna


    constructor(exp, mp, fila, columna){
        this.Exp = exp;
        this.MPE = mp;
        this.Fila = fila;
        this.Columna = columna;
    }

    Traducir(){
        return ", "+this.Exp.Traducir()+" "+this.MPE.Traducir()
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

        cadena = this.Exp.Graficar(cadena, padre)

        if (this.MPE.Traducir() != "") {
            cadena = this.MPE.Graficar(cadena, padre)
        }

        return cadena
    }
}
exports.MP = MP;