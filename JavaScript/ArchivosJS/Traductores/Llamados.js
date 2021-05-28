class Llamados{

    Id
    Dentro

    constructor(id, dentre){
        this.Id = id;
        this.Dentro = dentre;
    }

    Traducir(){
        return this.Id+"("+this.Dentro.Traducir()+")"
        /*if (this.Dentro != null) {
            return this.Id+"("+this.Dentro.Traducir()+");\n"
        } else {
            return this.Id+"();\n"
        }*/
    }

    GetNombre(){
        return "Llamados"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.Id+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"(\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        
        if (this.Dentro.Traducir() != "") {
            cadena = this.Dentro.Graficar(cadena, padre)
        }

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\")\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        return cadena

    }
}
exports.Llamados = Llamados;