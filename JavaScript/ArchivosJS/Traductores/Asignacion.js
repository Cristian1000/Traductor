
class Asignacion{
    ID
    Exp

    constructor(id,  exp){
        this.ID = id;;
        this.Exp = exp;
    }

    Traducir(){
        return this.ID+" = "+this.Exp.Traducir()+";\n"
    }
    
    Graficar(cadena, padre){
        let hijo = "nodo"+cadena.nodo.toString()
        cadena.dot += "\t"+hijo+"[label=\""+this.GetNombre()+"\"];\n"
        cadena.dot += "\t"+padre +" -> "+hijo+";\n"
        padre = hijo
        cadena.nodo++

        hijo = "nodo"+cadena.nodo
        cadena.dot += "\t"+hijo+"[label=\""+this.ID+"\"];\n"
        cadena.dot += "\t"+padre +" -> "+hijo+";\n"
        cadena.nodo++

        hijo = "nodo"+cadena.nodo
        cadena.dot += "\t"+hijo+"[label=\"=\"];\n"
        cadena.dot += "\t"+padre +" -> "+hijo+";\n"
        cadena.nodo++

        if (this.Exp.Traducir() != "") {
            cadena = this.Exp.Graficar(cadena, padre)
        }

        hijo = "nodo"+cadena.nodo
        cadena.dot += "\t"+hijo+"[label=\";\"];\n"
        cadena.dot += "\t"+padre +" -> "+hijo+";\n"
        cadena.nodo++

        return cadena
    }

    GetNombre(){
        return "Asignacion"
    }
}
exports.Asignacion = Asignacion;