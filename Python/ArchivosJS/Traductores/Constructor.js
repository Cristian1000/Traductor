class Constructor{
    TAB
    ID = "";
    Parametro;
    Codigo;
    constructor(tab, parametro, codigo){
        this.TAB = tab
        this.ID = id;
        this.Parametro = parametro;
        this.Codigo = codigo;
    }

    Traducir(){
        return this.TAB+"__init__(self"+this.Parametro.Traducir()+") \n\t"+this.Codigo.Traducir() +"\n "
        /*if (this.Parametro != null && this.Codigo != null) {
            return "constructor("+this.Parametro.Traducir()+") \n { \n"+this.Codigo.Traducir() +"\n }"
        } else {
            if (this.Parametro == null && this.Codigo == null) {
                return "constructor(){}"
            }else if(this.Parametro == null){
                return"constructor(){\n"+this.Codigo.Traducir()+"}\n"
            }else if(this.Codigo == null){
                return "constructor("+this.Parametro.Traducir()+"){\n}\n"
            }
        }*/
    }
    GetNombre(){
        return "Constructor"
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        hijo = "nodo"+cadena.nodo
        cadena.dot += "\t"+hijo+"[label=\"public\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo
        cadena.dot += "\t"+hijo+"[label=\"ID\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo
        cadena.dot += "\t"+hijo+"[label=\"(\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        
        if (this.Parametro.Traducir() != "") {
            cadena = this.Parametro.Graficar(cadena, padre)
        }

        hijo = "nodo"+cadena.nodo
        cadena.dot += "\t"+hijo+"[label=\")\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo
        cadena.dot += "\t"+hijo+"[label=\"{\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        if (this.Codigo.Traducir() != "") {
            cadena = this.Codigo.Graficar(cadena, padre)
        }

        hijo = "nodo"+cadena.nodo
        cadena.dot += "\t"+hijo+"[label=\"}\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++

        return cadena
    }
}
exports.Constructor = Constructor;
