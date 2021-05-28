class Error{
    tipoError = ""
    fila = 0
    columna = 0
    descripcion = ""
    constructor( tipoError, fila, columna, descripcion){
        this.tipoError = tipoError
        this.fila = fila
        this.columna = columna
        this.descripcion = descripcion
    }

    Numero(){
        return this.num
    }
    Tipo(){
        return this.tipoError
    }
    Fila(){
        return this.fila
    }
    Columna(){
        return this.columna
    }
    Descripcion(){
        this.descripcion
    }
}
exports.Error = Error;