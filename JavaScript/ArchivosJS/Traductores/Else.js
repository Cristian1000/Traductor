class Else{
    ELSE
    Codigo

    constructor(ELse, codigo){
        this.ELSE = ELse;
        this.Codigo = codigo;
    }

    Traducir(){
        return this.ELSE+"{\n"+this.Codigo.Traducir()+"\n}\n"
        /*if (this.Codigo != null) {
            return this.ELSE+"{\n"+this.Codigo.Traducir()+"\n}\n"
        } else {
            return this.ELSE+"{"+"\n}\n"
        }*/
    }

    GetNombre(){
        return "ELSE"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.ELSE+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"{\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        if (this.Codigo.Traducir() != "" ){
            cadena = this.Codigo.Graficar(cadena, padre)
        }

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"}\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        return cadena
    }
}
exports.Else = Else;