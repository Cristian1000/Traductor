class Codigo{
    Instruccion
    Nuevo


    constructor(ins, nuevo){
        this.Instruccion = ins;
        this.Nuevo = nuevo;
    }

    Traducir(){
        return this.Instruccion.Traducir()+""+this.Nuevo.Traducir()
        /*if (this.Nuevo != null) {
            return this.Instruccion.Traducir()+"\n"+this.Nuevo.Traducir()+"\n"
        } else {
            return this.Instruccion.Traducir()+"\n"
        }*/
    }
    Graficar(cadena, padre){
        var hijo = "nodo"+cadena.nodo
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre+" -> "+hijo+";\n"
        cadena.nodo++
        padre = hijo

        if (this.Instruccion.Traducir() != "") {
            cadena = this.Instruccion.Graficar(cadena, padre)
        }
        
        if (this.Nuevo.Traducir() != "") {
            cadena = this.Nuevo.Graficar(cadena, padre)
        }

        return cadena
    }

    GetNombre(){
        return "Codigo"
    }
}
exports.Codigo = Codigo;