class Parentesis{
    DentoPa 
    Fila = 0;
    Columna = 0;
    Des = ""

    constructor(dentoPa, fila, columan){
        this.DentoPa = dentoPa;
        this.Fila = fila;
        this.Columna = columan;
    }

    Traducir(){
        return "("+this.DentoPa.Traducir()+")" 
        /*if (this.DentoPa != null) {
            return "("+this.DentoPa.Traducir()+")" 
        } else {
            return "()"
        }*/
    }
    GetNombre(){
        return "Parentesis"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        if (this.DentoPa.Traducir() != "") {
            cadena = this.DentoPa.Graficar(cadena, padre)
        }
        return cadena
    }
}
exports.Parentesis = Parentesis;