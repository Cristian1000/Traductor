class Parentesis{
    DentoPa 

    constructor(dentoPa){
        this.DentoPa = dentoPa;
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