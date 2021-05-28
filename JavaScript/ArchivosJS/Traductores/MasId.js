class MasId{
    Coma = ""
    Iden
    Fila = 0
    Columna = 0
    Des = ""

    constructor(coma, iden, fila, columna){
        this.Coma = coma;
        this.Iden = iden;
        this.Fila = fila;
        this.Columna = columna
    }

    Traducir(){
            return this.Coma + " "+ this.Iden.Traducir()
    }

    GetNombre(){
        return "Mas Id"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.Coma+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        
        if (this.Iden.Traducir() != "") {
            cadena = this.Iden.Graficar(cadena, padre)
        }
        return cadena


    }
}
exports.MasId = MasId;