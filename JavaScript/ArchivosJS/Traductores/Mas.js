class Mas{
    Exp
    MasId
    Fila = 0
    Columna = 0

    constructor(exp, masid, fila, columna){
        this.Exp = exp;
        this.MasId = masid;
        this.Fila = fila;
        this.Columna = columna;

    }

    Traducir(){
        return "= "+this.Exp.Traducir()+" "+this.MasId.Traducir()
        /*if (this.MasId != null) {
            return " = "+this.Exp.Traducir()+" "+this.MasId.Traducir()
        } else {
            return " = "+this.Exp.Traducir()
        }*/
    }
    

    GetNombre(){
        return "Mas"
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
        
        if (this.MasId.Traducir() != "") {
            cadena = this.MasId.Graficar(cadena, padre)
        }
        return cadena

    }
}
exports.Mas = Mas;