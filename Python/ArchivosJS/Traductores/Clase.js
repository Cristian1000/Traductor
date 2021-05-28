class Clase{
    ID = ""
    BLOQUE

    constructor(id, bloque){
        this.ID = id;
        this.BLOQUE = bloque;
    }

    Traducir(){
            return "class "+this.ID+"(object):\n"+this.BLOQUE.Traducir()+"\n" 
        /*if(this.BLOQUE != null ) {
            return this.Tipo+" "+this.ID+" { \n"+this.BLOQUE.Traducir()+"\n}" 
        } else{
            return this.Tipo+" "+this.ID+" { "+"\n}" 
        }*/
    }

    Graficar(cadena, padre){
        let hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" ->"+hijo+";\n"
        cadena.nodo++
        padre = hijo

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"public\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"Tipo\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.ID+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"{\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        if (this.BLOQUE.Traducir() != "") {
            cadena = this.BLOQUE.Graficar(cadena, padre)
        }

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"}\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        
        return cadena;
    }


    GetNombre(){
        return "Clase"
    }

}
exports.Clase = Clase;