import Analizador from "./Analizadores/Analizador"
import {Asignacion} from "./Traductores/Asignacion"
import {Blanco} from "./Traductores/Blanco"


var leer = new Analizador(`public class Hola{
    int s, f=5, j;
    public static void main(String [] arg){
        do{
            System.out.print("hola"+8);
            suma = 5+p;
            kfk();
            return ;
            continue;
            break;
            if(d-g){
                System.out.println();
                //dljkhiudf
            }else if(8<9){
                hola();
                boleano = false;
            }
            /*lkdjhnkdsn
            sñdljñ*/
        }while(g)

    }

    a = 5;
    public int suma(int a, int b);
}`)

console.log(leer.Graficar())

//var listaDe = leer.Lista()
//console.log(listaDe[0].Descripcion())

