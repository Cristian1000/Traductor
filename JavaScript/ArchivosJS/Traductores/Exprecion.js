class Exprecion{
    
    Exp1
    OP
    Exp2
    Fila
    Columna


    constructor(exp1, op, exp2, fila, columna){
        this.Exp1 = exp1;
        this.OP = op;
        this.Exp2 = exp2;
        this.Fila = fila;
        this.Columna = columna;
    }

    Traducir(){
        return this.Exp1.Traducir()+this.OP+this.Exp2.Traducir();
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

        if (this.Exp1.Traducir() != "") {
            cadena = this.Exp1.Graficar(cadena, padre)
        }
        
        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.OP+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        if (this.Exp2.Traducir() != "") {
            cadena = this.Exp2.Graficar(cadena, padre)
        }

        return cadena
    }
}
exports.Exprecion = Exprecion;