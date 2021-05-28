class Errorer{
    TipoError = ""
    Fila = 0
    Columna = 0
    Descripcion = ""
    constructor( tipoError, fila, columna, descripcion){
        this.TipoError = tipoError
        this.Tila = fila
        this.Tolumna = columna
        this.Descripcion = descripcion;
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
exports.Errorer = Errorer;