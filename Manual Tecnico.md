# Universidad De San Carlos de Guatemala
# Facultad de Ingeniería

# Escuela de Ciencias y Sistemas

# Organización de Lenguajes y Compiladores 1

## Manual Tecnico

**Nombre: Cristian Daniel Raguay Vicente**

**Carne: 201603103**

**Sección: “B”**

[Enunciado del Proyecto](https://drive.google.com/file/d/1e12iuZRN5J3zKrds6UdW1nlwj5JI8WmV/view?usp=sharing)

[Github](https://github.com/Cristian1000/OLC1_Proyecto2_201603103)

[Dokerhub](https://hub.docker.com/u/cristian1000)

## Descripcion

El siguiente proyecto consiste en realizar un analizador léxico y sintáctico de java y a su ves este traducirlo a código de JavaScript y Python.


## Información técnica

Editor de Código usado: Visual Studio Code

Lenguajes utilizados para el Desarrollo del proyecto

Java Scrip 6.14.6

Golan version 1.15.2 windows/amd64

Framework

Nodejs 12.18.4

### Expreciones Regulares
~~~
Expresiones regulares usadas para la creación de ADF usado para el análisis Léxico.

Conjuntos

L = {a,b,c..,z, A, B, C,...,Z}
D = {0,1,2,3,4,5,6,7,8,9}
S = {"(", ")", "{", "}", "=", "+", "-", "*", "<", ">", "&", "|", "[", "]", ".", ";", ",", "^", "!", "\"}

Comentario_U = // (L|D|S|\t|’ ‘)*

Comentario_M = /* (L|D|S|\t|’ ‘|\n)* */

Reservada = L+

símbolo = S(S)?

ID = L(L|D|$|_)*

Cadena = “ (L|D|S|\t|’ ‘)* “

Carácter = ‘ (L|D|S|\L|\S)* ‘

Número = D+(punto D+)?

~~~
Tabla de Siguientes
|  |Siguiente  |
|--|--|
| 1-/ | 2  |
|2-/| 3, 4, 5, 6, 7, 8 |
|3-L| 3, 4, 5, 6, 7, 8 |
|4-D| 3, 4, 5, 6, 7, 8 |
|5-S| 3, 4, 5, 6, 7, 8 |
|6-\t| 3, 4, 5, 6, 7, 8 |
|7-' '| 3, 4, 5, 6, 7, 8 |
| 8-# | |
| 9-/ | 10| 
|10-*| 11,12,13,14,15,16,17|
|11-L | 11,12,13,14,15,16,17|
|12-D| 11,12,13,14,15,16,17
|13-S| 11,12,13,14,15,16,17
|14-\t|11,12,13,14,15,16,17
|15-' '| 11,12,13,14,15,16,17
|16-\n | 11,12,13,14,15,16,17
|17-*| 18
18-/| 19
|19-#|
|20-L|20, 21
|21-#|
|22-S|23, 24
|23-S|24
|24-#|
|25-L|25, 26, 27, 28, 29, 30
|26-L|25, 26, 27, 28, 29, 30
|27-D|25, 26, 27, 28, 29, 30
|28-$|25, 26, 27, 28, 29, 30
|29-_|25, 26, 27, 28, 29, 30
|30-#|
|31-"|32, 33, 34, 35, 36, 37
|32-L|32, 33, 34, 35, 36, 37
|33-D|32, 33, 34, 35, 36, 37
|34-S|32, 33, 34, 35, 36, 37
|35-' '|32, 33, 34, 35, 36, 37
|36-\t|32, 33, 34, 35, 36, 37
|37-"|38
|38-#|
|39-'|40, 41, 42, 43, 45, 47
|40-L|47
|41-D|47
|42-S|47
|43-\\|44
|44-L|47
|45-\\|46
|46-S|47
|47-'|48
|48-#|
|49-D|49, 50, 52
|50-.|51
|51-D|51, 52
|52-#|

## Diagrama de Arbol

![Comentario Unilinea](/Imagen/ComentarioU.png "This is a sample image.")

![Comentario MultiLinea](/Imagen/ComentarioM.png)

![Palaras Reservadas](/Imagen/ReservadaJS.png)

![Simbolos](/Imagen/SimboloJS.png)

![Identificador](/Imagen/IdentificadoJS.png)

![Cadena](/Imagen/CadenaJS.png)

![Caracter](/Imagen/CaracterJS.png)

![Numero](/Imagen/NumeroJS.png)


![Arbol General](/Imagen/ArbolGeneralJS.png)

![Tabla de Transición](/Imagen/TabladeTransición.png)

![Automata](/Imagen/AutomataJS.png)

## Gramatica Libre de Contexto

~~~

Inicio -> public Tipo ID{Bloque} Inicio 
       | Ɛ

Tipo -> class 
	  | interface

Bloque -> Método Bloque 
         |Variable Bloque 
         |Ɛ

Variable -> TipoDato Identificador;

Identificador -> id Mas

Mas -> ‘,’ Identificador 
      |= valor Exp MasID 
      | Ɛ

MasID -> ,identificador 
        | Ɛ

TipoDato -> int 
          | boolean 
          | double 
          | String 
          | char

Valor -> numero
       | id
       | cadena
       | true
       | false
       | carácter

Paréntesis -> (DentroP)

DentroP -> Valor Exp MP 
         | Ɛ

MP -> Coma Valor Exp MP
    | Ɛ

Exp -> && Not valor
     | || Not valor Exp
     | ^ Not Valor Exp
     | = igual Not Valor Exp
     | > igual Not Valor Exp
     | < igual Not Valor Exp
     | ! igual Not Valor Exp
     | + mas
     | -Menos 
     | * Not Valor Exp
     | / Not Valor Exp
     | Paréntesis Exp
     | Ɛ

Igual -> = 
        |Ɛ

mas  -> +
      | Valor Exp

Menos  -> -
        | Valor Exp

Imprimir -> System.out.PRINT(Valor Exp);

PRINT  -> println 
        | print

Valores -> Valor Exp 
       | Ɛ

función -> public Tip id (parametro);

Tip -> void
     | TipoDato

Método -> public Retorno

Retorno -> void id (Parámetro){Código}
         | TipoDato id (Parámetro){Código} 
         | Id (Parametro){Codigo} 
         | static void main(String [] arg){codigo} 
         
Parámetro -> TipoDato id MParametro
           | Ɛ

Mparametro -> ,Parámetro 
             | Ɛ

IF -> if(not Valor EXP){Código} Else

Else -> else Cont 
      | Ɛ

Cont -> if(Not Valor Exp){Código} Else 
      | {Codigo} 
      
Not -> !
     | Ɛ

FOR -> for(TipoDato id = valor; Valor Exp; Valor Exp){código}

WHILE ->while(Not Valor Exp){Código}

DO -> do{Código}while(Not Valor Exp)

Asignación -> id = Valor Exp;

Llamado -> Id (Valor Exp);

Retornos -> break;
          | continue; 
          | return Valor Exp ;

Código -> IF Código
        | FOR Código
        | WHILE Código 
        | DO Código 
        | Imprimir Código 
        | Asignación Código 
        | Variable Código 
        | Llamado Código 
        | Retorno Código 
        | Función Codigo 
        | Ɛ
~~~
## No. para Tokens usados en el Analizador Sintactico
~~~
1-"+"
2-"-"
3-"/"
4-"*"
5-&
6-|
7-!
8-^
9-=
10-<
11->
12-{
13-}
14-(
15-)
16-[
17-]
18-\
19-,
20-;
21-.
22-"
23-public
24-class
25-interface
26-void
27-int
28-double
29-char
30-String
31-for
32-if
33-boolean
34-while
35-System
36-out
37-print
38-println
39-false
40-true
41-do
42-else
43-break
44-continue
45-return
46-static
47-main
48-numero
49-id
50-cadena
51-carácter
52-arg
~~~

## Para la creacion de las imagenes de Doker se usaron los comandos
~~~
Esta es para el traductor a javascript
docker build -t node-js .
Esta es para el traductor a Python
docker build -t node-py .
Esta es para la pagina web que consume las apis
docker build -t go-web .

~~~