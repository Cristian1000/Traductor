class DentroP{
    Exp;
    MP;
    Fila = 0;
    Columna = 0;
    constructor(exp, mp, fila, columna){
        this.Exp = exp;
        this.MP = mp,
        this.Fila = fila;
        this.Columna = columna;
    }


    Traducir(){
        return this.Exp.Traducir()+" "+this.MP.Traducir();
        /*if (MP != null) {
            return this.Exp.Traducir()+" "+this.MP.Traducir();
        }else{
            return this.Exp.Traducir();
        }*/
    }

    GetNombre(){
        return "Dentro de Parentesis"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        if (this.Exp.Traducir() != "") {
            cadena = this.Exp.Graficar(cadena, padre)
        }
        if (this.MP.Traducir() != "") {
            cadena = this.MP.Graficar(cadena, padre)
        }

        return cadena
    }
}
exports.DentroP = DentroP;