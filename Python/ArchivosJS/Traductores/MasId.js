class MasId{
    Iden

    constructor(iden){
        this.Iden = iden;
    }

    Traducir(){
            return ", "+ this.Iden.Traducir()
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
        cadena.dot += "\t"+hijo+"[label=\"Coma\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        
        if (this.Iden.Traducir() != "") {
            cadena = this.Iden.Graficar(cadena, padre)
        }
        return cadena


    }
}
exports.MasId = MasId;