class Llamado{
    TAB
    Id
    Dentro

    constructor(tab, id, dentre){
        this.TAB = tab
        this.Id = id;
        this.Dentro = dentre;
    }

    Traducir(){
        return this.TAB+"self."+this.Id+"("+this.Dentro.Traducir()+")\n"
        /*if (this.Dentro != null) {
            return this.Id+"("+this.Dentro.Traducir()+");\n"
        } else {
            return this.Id+"();\n"
        }*/
    }

    GetNombre(){
        return "Llamado"
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

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\";\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        return cadena

    }
}
exports.Llamado = Llamado;