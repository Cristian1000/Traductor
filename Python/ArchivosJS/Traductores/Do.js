class Do{
    Tabulador=""
    Codigo
    Not
    Valor
    Exp
    
    constructor(tabulador, codigo, not, valor, exp){
        this.Tabulador = tabulador;
        this.Codigo = codigo;
        this.Not = not;
        this.Valor = valor;
        this.Exp = exp;
    }

    Traducir(){
        return this.Tabulador+"while true:\n"+this.Codigo.Traducir()+"\n"+this.Tabulador+"\tif "+this.Not+this.Valor+this.Exp.Traducir()+":\n"+this.Tabulador+"\t\tbreak"
        /*if (this.Codigo != null) {
            return "do{\n"+this.Codigo.Traducir()+"\n}while("+this.Exp.Traducir()+");\n";
        } else {
            return "do{"+"\n}while("+this.Exp.Traducir()+");\n";
        }*/
    }

    GetNombre(){
        return "Do While"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"do\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"{\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        if (this.Codigo.Traducir() != "") {
            cadena = this.Codigo.Graficar(cadena, padre)
        }

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"}\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"while\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\"(\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        if (this.Not != "") {
            hijo = "nodo"+cadena.nodo.toString()
            cadena.dot += "\t"+hijo+"[label=\""+this.Not+"\"];\n"
            cadena.dot += "\t"+padre+" -> "+hijo+";\n"
            cadena.nodo++
        }

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.Valor+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        
        if (this.Exp.Traducir() != "") {
            cadena = this.Exp.Graficar(cadena, padre)
        }

        hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\")\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        return cadena
    }

}
exports.Do = Do;