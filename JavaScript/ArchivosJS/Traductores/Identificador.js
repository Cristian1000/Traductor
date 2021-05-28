class Identificador{
    ID = "";
    Mas;
    Fila = 0;
    Columna = 0;

    constructor(id, mas, fila, columna){
        this.ID = id;
        this.Mas = mas;
        this.Fila = fila;
        this.Columna = columna;
    }


    Traducir(){
        return this.ID+this.Mas.Traducir()
        /*if (this.Mas != null) {
            return this.ID+" "+this.Mas.Traducir()
        } else {
            return this.ID
        }*/
    }

    GetNombre(){
        return "Identificador"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.ID+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        
        if (this.Mas.Traducir() != "") {
            cadena = this.Mas.Graficar(cadena, padre)
        }
        return cadena
    }
}
exports.Identificador = Identificador;