
import { Clase } from "./ArchivosJS/Traductores/Clase";
import Gramatica from "./Jison/Gramatica"

var codigo = `
    public class hola{
        int e, o=9||r(g, j--,+5/d)-6;
        public int suma(int a, int f){
            return a+b;
            for(int a = ; a<kf;a++){

            }
        }
    }
`

console.log("inicia prueba")
var bla = Gramatica.parse(codigo)
if (bla.RetornoError().length < 1) {
    bla.Grafica()
    console.log(bla.Traducir())
}else{
    console.log(bla.Retorno());
    console.log(bla.RetornoError());
}

/*
var a = new Clase("class", "hola", null,2 ,4)

console.log(a.Traducir());*/