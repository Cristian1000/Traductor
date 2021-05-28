class Token{
    num = 0
    fila = 0
    columna = 0
    tipo = ""
    descripcion = ""

    constructor (num, fila, columna, tipo, descripcion){
        this.num = num
        this.fila = fila
        this.columna = columna
        this.tipo = tipo
        this.descripcion = descripcion
    }
    Numero(){
        return this.num
    }
    Fila(){
        return this.fila
    }
    Columna(){
        return this.columna
    }
    Tipo(){
        return this.tipo
    }
    Descripcion(){
        return this.descripcion
    }
}
exports.Token = Token;