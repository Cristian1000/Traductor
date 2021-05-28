%{
      const { Asignacion } = require("../ArchivosJS/Traductores/Asignacion");
      const { Blanco } = require("../ArchivosJS/Traductores/Blanco");
      const { Bloque } = require("../ArchivosJS/Traductores/Bloque");
      const { Clase } = require("../ArchivosJS/Traductores/Clase");
      const { Codigo } = require("../ArchivosJS/Traductores/Codigo");
      const { Constructor } = require("../ArchivosJS/Traductores/Constructor");
      const { DentroP } = require("../ArchivosJS/Traductores/DentroP");
      const { Do } = require("../ArchivosJS/Traductores/Do");
      const { Else } = require("../ArchivosJS/Traductores/Else");
      const { ElseIf } = require("../ArchivosJS/Traductores/ElseIf");
      const { Exprecion } = require("../ArchivosJS/Traductores/Exprecion");
      const { For } = require("../ArchivosJS/Traductores/For");
      const { Funcion } = require("../ArchivosJS/Traductores/Funcion");
      const { Identificador } = require("../ArchivosJS/Traductores/Identificador");
      const { If } = require("../ArchivosJS/Traductores/If");
      const { Imprimir } = require("../ArchivosJS/Traductores/Imprimir");
      const { Llamado } = require("../ArchivosJS/Traductores/Llamado");
      const { Llamados } = require("../ArchivosJS/Traductores/Llamados");
      const { Mas } = require("../ArchivosJS/Traductores/Mas");
      const { MasId } = require("../ArchivosJS/Traductores/MasId");
      const { Metodo } = require("../ArchivosJS/Traductores/Metodo");
      const { MP } = require("../ArchivosJS/Traductores/MP");
      const { MParametro } = require("../ArchivosJS/Traductores/MParametro");
      const { Parametro } = require("../ArchivosJS/Traductores/Parametro");
      const { Parentesis } = require("../ArchivosJS/Traductores/Parentesis");
      const { Retorno } = require("../ArchivosJS/Traductores/Retorno");
      const { Variable } = require("../ArchivosJS/Traductores/Variable");
      const { While } = require("../ArchivosJS/Traductores/While");
      const { Graficador } = require("../ArchivosJS/Graficador");
      const { Token } = require("../ArchivosJS/Traductores/Token");
      const { Errorer } = require("./Errorer")

      var ER = new Array();
      var traductor = new Graficador()
      var ListaTo = new Array()
      var numError = 1;

      function Agregar(tipo, fila, columna, error){
            ER.push("No. "+numError.toString()+" "+"Tipo: "+tipo+" "+"Fila: "+ fila+" "+"Columna: "+ columna+" "+"Error: "+error);
            numError++;
      }
      var a = 1;
      function AgregarToken(fila, columna, des, to){
            ListaTo.push("No:"+a.toString()+" "+"Fila: "+fila+" "+"Columna: "+columna+" "+"Descripcion: "+des+" "+" "+"Token: "+to);
            a++;
      }

      function Tokens(){
            return ListaTo;
      }

      function Errores(){
            return errores
      }

%}


/* lexical grammar */


%lex
%%

\s+                   /* skip whitespace */
"//".*				{}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]    {}

[0-9]+("."[0-9]+)?\b  {AgregarToken(yylloc.first_line, yylloc.first_column, "Numero",yytext); return 'Numero'}  
"++"                  {AgregarToken(yylloc.first_line, yylloc.first_column, "Incremento",yytext); return 'Incremento'}
"+"                   {AgregarToken(yylloc.first_line, yylloc.first_column, "MAs",yytext); return 'MAS'}
"--"                  {AgregarToken(yylloc.first_line, yylloc.first_column, "Decremento",yytext); return 'Decremento'}
"-"                   {AgregarToken(yylloc.first_line, yylloc.first_column, "Menos",yytext); return 'MENOS'}
"*"                   {AgregarToken(yylloc.first_line, yylloc.first_column, "Por",yytext); return 'POR'}
"/"                   {AgregarToken(yylloc.first_line, yylloc.first_column, "Divicion",yytext); return 'DIV'}
"^"                   {AgregarToken(yylloc.first_line, yylloc.first_column, "Xor",yytext); return 'XOR'}
"("                   {AgregarToken(yylloc.first_line, yylloc.first_column, "Parentesis que abre",yytext); return 'PA'}
")"                   {AgregarToken(yylloc.first_line, yylloc.first_column, "Parentesis que cierra",yytext); return 'PC'}
"{"                   {AgregarToken(yylloc.first_line, yylloc.first_column, "Llave que abre",yytext); return 'LLA'}
"}"                   {AgregarToken(yylloc.first_line, yylloc.first_column, "Llave que cierra",yytext); return 'LLC'}
"["                   {AgregarToken(yylloc.first_line, yylloc.first_column, "Corchete que abre",yytext); return 'CA'}
"]"                   {AgregarToken(yylloc.first_line, yylloc.first_column, "Corchete que cierra",yytext); return 'CC'}
"=="                  {AgregarToken(yylloc.first_line, yylloc.first_column, "Igual igual",yytext); return 'IgualI'}
"!="                  {AgregarToken(yylloc.first_line, yylloc.first_column, "Diferente igual",yytext); return 'DiferenteI'}
"="                   {AgregarToken(yylloc.first_line, yylloc.first_column, "Igual",yytext); return 'IGUAL'}
"||"                  {AgregarToken(yylloc.first_line, yylloc.first_column, "Or",yytext); return 'Or'}
"&&"                  {AgregarToken(yylloc.first_line, yylloc.first_column, "And",yytext); return 'And'}
"!"                   {AgregarToken(yylloc.first_line, yylloc.first_column, "Not",yytext); return 'Not'}
">="                  {AgregarToken(yylloc.first_line, yylloc.first_column, "Mayor o igual",yytext); return 'MayorI'}
"<="                  {AgregarToken(yylloc.first_line, yylloc.first_column, "Menor o igual",yytext); return 'MenorI'}
"<"                   {AgregarToken(yylloc.first_line, yylloc.first_column, "Mayor que",yytext); return 'MenorQ'}
">"                   {AgregarToken(yylloc.first_line, yylloc.first_column, "Menor que",yytext); return 'MayorQ'}
"\\"                  {AgregarToken(yylloc.first_line, yylloc.first_column, "Diagonal Invertida",yytext); return 'DIGINVER'}
","                   {AgregarToken(yylloc.first_line, yylloc.first_column, "Coma",yytext); return 'Coma'}
"."                   {AgregarToken(yylloc.first_line, yylloc.first_column, "Punto",yytext); return 'Punto'}
";"                   {AgregarToken(yylloc.first_line, yylloc.first_column, "Punto y Coma",yytext); return 'PYC'}
"public"              {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada public",yytext); return 'Public'}
"class"               {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada class",yytext); return 'Class'}
"interface"           {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada interface",yytext); return 'Interface'}
"void"                {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada void",yytext); return 'Void'}
"int"                 {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada int",yytext); return 'Int'}
"double"              {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada double",yytext); return 'Double'}
"char"                {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada char",yytext); return 'Char'}
"String"              {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada String",yytext); return 'STring'}
"for"                 {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada for",yytext); return 'For'}
"if"                  {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada if",yytext); return 'If'}
"boolean"             {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada boolean",yytext); return 'Boolean'}
"while"               {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada while",yytext); return 'While'}
"System"              {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada System",yytext); return 'SYstem_'}
"out"                 {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada out",yytext); return 'Out'}
"print"               {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada print",yytext); return 'Print'}
"println"             {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada prinln",yytext); return 'Println'}
"flase"               {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada false",yytext); return 'False'}
"true"                {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada true",yytext); return 'True'}
"do"                  {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada do",yytext); return 'Do'}
"else"                {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada else",yytext); return 'Else'}
"break"               {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada break",yytext); return 'Break'}
"countinue"           {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada continue",yytext); return 'Continue'}
"return"              {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada break",yytext); return 'Return'}
"static"              {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada static",yytext); return 'Static'}
"main"                {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada main",yytext); return 'Main'}
"arg"                 {AgregarToken(yylloc.first_line, yylloc.first_column, "Reservada arg",yytext); return 'ARG'}
[a-zA-Z_$][a-zA-Z_$]*   {AgregarToken(yylloc.first_line, yylloc.first_column, "Identificador",yytext); return 'ID'}
[\'][\\]?[a-zA-Z0-9]?[\'] {AgregarToken(yylloc.first_line, yylloc.first_column, "Caracter",yytext); return 'Caracter'}
\"[^\"]*\"				{AgregarToken(yylloc.first_line, yylloc.first_column, "Cadena de texto",yytext);  yytext = yytext.substr(1,yyleng-2); return 'Cadena'; /*//"*/ }
[\r\t]      {}
\n          {}

<<EOF>>               return 'EOF'
.                     { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                        Agregar("Lexico", yylloc.first_line, yylloc.first_column, yytext);
                      }

/lex

%left 'Else'

%left 'Decremento' 'Incremento'
%left 'XOR'
%left 'Or'
%left 'And'
%left 'IgualI' 'DiferenteI'
%left 'igualQR'
%left 'MayorQ' 'MayorI' 'MenorQ' 'MenorI'

%left 'MAS' 'MENOS'
%left 'POR' 'DIV'

%left uMenos
%right 'Not'

%start Clas

%% /* Gramatica del Lenguaje */



Clas: Clases EOF
      {     traductor.Lista($1);
            traductor.Tokens(ListaTo);
            traductor.Errores(ER);
            ListaTo = [];
            ER = [];
            a = 1;
            numError = 1;
            return traductor;};

Clases: Clases Inicio{ $1.push($2);
                        $$ = $1;}
      | Inicio {$$ = [$1];};

Inicio: Public Tipo ID LLA Bloque LLC {$$ = new Clase($2, $3, $5, this._$.first_line, this._$.first_column);}
      | Public Tipo ID LLA LLC {$$ = new Clase($2, $3, new Blanco(), this._$.first_line, this._$.first_column);}
      ;

Tipo: Class {$$ = $1}
    | Interface {$$ = $1};

Bloque: Metodo Bloque {$$ = new Bloque($1, $2);}
      | Variable Bloque {$$ = new Bloque($1, $2);}
      | Funcion Bloque {$$ = new Bloque($1, $2);}
      | Metodo  {$$ = new Bloque($1, new Blanco());}
      | Variable  {$$ = new Bloque($1, new Blanco());}
      | Funcion  {$$ = new Bloque($1, new Blanco());}
      | ERROR Bloque
      | ERROR 
      ;
      

Variable : TipoDato Identificador PYC {$$ = new Variable($1, $2, this._$.first_line, this._$.first_column);}
         | TipoDato Identificador ERROR RECUPERACION
         | TipoDato ERROR RECUPERACION
         ;

Identificador: ID Mas {$$ = new Identificador($1, $2, this._$.first_line, this._$.first_column);}
             | ID {$$ = new Identificador($1, new Blanco(), this._$.first_line, this._$.first_column);}
             ;

Mas : MasId {$$ = $1;}
    | IGUAL Exp MasId {$$ = new Mas($2, $3, this._$.first_line, this._$.first_column);}
    | IGUAL Exp {$$ = new Mas($2, new Blanco(), this._$.first_line, this._$.first_column);}
    ;

MasId: Coma Identificador {$$ = new MasId($1, $2, this._$.first_line, this._$.first_column);} 
;

TipoDato: Int {$$ = $1;}
        | Boolean {$$ = $1;}
        | Double {$$ = $1;}
        | STring {$$ = $1;}
        | Char {$$ = $1;}
        | ERROR
        ;

Valor : Numero {$$ = $1;}
      | ID {$$ = $1;}
      | Cadena {$$ = $1;}
      | True {$$ = $1;}
      | False {$$ = $1;}
      | Caracter {$$ = $1;}
      | ERROR
      ;

Parentesis: PA DentroP PC {$$ = new Parentesis($2, this._$.first_line, this._$.first_column);}
          | PA PC {$$ = new Parentesis(new Blanco(), this._$.first_line, this._$.first_column);}
          ;

DentroP : Exp MP {$$ = new DentroP($1, $2, this._$.first_line, this._$.first_column);}
        | Exp {$$ = new DentroP($1, new Blanco(), this._$.first_line, this._$.first_column);}
        ;

MP: Coma Exp MP {$$ = new MP($2, $3, this._$.first_line, this._$.first_column);}
  | Coma Exp {$$ = new MP($2, new Blanco(), this._$.first_line, this._$.first_column);}
  ;

Exp : Exp Or Exp {$$ = new Exprecion($1, $2, $3, this._$.first_line, this._$.first_column);}
    | Exp XOR Exp {$$ = new Exprecion($1, $2, $3, this._$.first_line, this._$.first_column);}
    | Not Exp {$$ = new Exprecion(new Blanco(), $2, $3, this._$.first_line, this._$.first_column);}
    | Exp And Exp {$$ = new Exprecion($1, $2, $3, this._$.first_line, this._$.first_column);}
    | Exp MayorQ  Exp {$$ = new Exprecion($1, $2, $3, this._$.first_line, this._$.first_column);}
    | Exp MenorQ Exp {$$ = new Exprecion($1, $2, $3, this._$.first_line, this._$.first_column);}
    | Exp MAS Exp {$$ = new Exprecion($1, $2, $3, this._$.first_line, this._$.first_column);}
    | Exp MENOS Exp {$$ = new Exprecion($1, $2, $3, this._$.first_line, this._$.first_column);}
    | Exp POR Exp {$$ = new Exprecion($1, $2, $3, this._$.first_line, this._$.first_column);}
    | Exp DIV  Exp {$$ = new Exprecion($1, $2, $3, this._$.first_line, this._$.first_column);}
    | ID Incremento {$$ = new Exprecion(new Token($1), $2, new Blanco(), this._$.first_line, this._$.first_column);}
    | ID Decremento {$$ = new Exprecion(new Token($1), $2, new Blanco(), this._$.first_line, this._$.first_column);}
    | PA Exp PC {$$ = new Exprecion(new Token("("), $2, new Token(")"), this._$.first_line, this._$.first_column);}
    | Exp MayorI Exp {$$ = new Exprecion($1, $2, $3, this._$.first_line, this._$.first_column);}
    | Exp MenorI Exp {$$ = new Exprecion($1, $2, $3, this._$.first_line, this._$.first_column);}
    | Exp IgualI Exp {$$ = new Exprecion($1, $2, $3, this._$.first_line, this._$.first_column);}
    | Exp DiferenteI Exp {$$ = new Exprecion($1, $2, $3, this._$.first_line, this._$.first_column);}
    | MENOS Exp %prec uMenos {$$ = new Exprecion(new Blanco(), $1, $2, this._$.first_line, this._$.first_column);}
    | Valor {$$ = new Token($1);}
    | Llamados {{$$ = $1;}}
    ;

Inprimir : SYstem_ Punto Out Punto PRINT PA Exp PC PYC {$$ = new Imprimir($5, $7);}
         | SYstem_ Punto Out Punto PRINT PA PC PYC {$$ = new Imprimir($5, new Blanco());}
         | SYstem_ ERROR RECUPERACION
         ;

PRINT : Print {$$ = $1;}
      | Println {$$ = $1}
      | ERROR ;

Metodo: Public Retorno {$$ = $2;}
      | Public ID PA Parametro PC LLA Codigo LLC {$$ = new Constructor($2, $4, $7, this._$.first_line, this._$.first_column);}
      | Public ID PA PC LLA Codigo LLC {$$ = new Constructor($2, new Blanco(), $6, this._$.first_line, this._$.first_column);}
      | Public ID PA Parametro PC LLA LLC {$$ = new Constructor($2, $4, new Blanco(), this._$.first_line, this._$.first_column)} 
      | Public ID PA  PC LLA LLC {$$ = new Constructor($2, new Blanco(), new Blanco(), this._$.first_line, this._$.first_column);}
      | Public ERROR RECUPERACION
      ;

Funcion: Public Void ID PA  PC PYC {$$ = new Funcion($3, new Blanco(), this._$.first_line, this._$.first_column);}
       | Public Void ID PA Parametro PC PYC {$$ = new Funcion($3, $5, this._$.first_line, this._$.first_column);}
       | Public TipoDato ID PA   PC PYC {$$ = new Funcion($3, new Blanco(), this._$.first_line, this._$.first_column);}
       | Public TipoDato ID PA Parametro PC PYC {$$ = new Funcion($3, $5, this._$.first_line, this._$.first_column);}
       | Public ERROR RECUPERACION
        ;

Retorno : Void  ID  PA Parametro PC LLA Codigo LLC {$$ = new Metodo($2, $4, $7);}
        | Void  ID  PA   PC LLA Codigo LLC {$$ = new Metodo($2, new Blanco(), $6);}
        | Void  ID  PA PArametro PC LLA LLC {$$ = new Metodo($2, $4, new Blanco());} 
        | Void  ID  PA   PC LLA   LLC {$$ = new Metodo($2, new Blanco(), new Blanco());}
        | TipoDato  ID  PA Parametro PC LLA Codigo LLC {$$ = new Metodo($2, $4, $7);}
        | TipoDato  ID  PA   PC LLA Codigo LLC {$$ = new Metodo($2, new Blanco(), $6);}
        | TipoDato  ID  PA Parametro PC LLA LLC {$$ = new Metodo($2, $4, new Blanco());}
        | TipoDato  ID  PA  PC LLA LLC {$$ = new Metodo($2, new Blanco(), new Blanco());}
        | Static Void Main PA STring CA CC ARG PC LLA Codigo LLC  {$$ = new Metodo($3, new Blanco(), $11);}
        | Static Void Main PA STring CA CC ARG PC LLA   LLC {$$ = new Metodo($3, new Blanco(), new Blanco());}
        | Void ERROR LLA Codigo LLC
        | TipoDato ERROR LLA Codigo LLC
        | Static ERROR LLA Codigo LLC
        | Void ERROR LLA LLC
        | TipoDato ERROR LLA LLC
        | Static ERROR LLA LLC
        ;

Parametro : TipoDato ID MParametro {$$ = new Parametro($2, $3);}
          | TipoDato ID {$$ = new Parametro($2, new Blanco());}
          ;

MParametro : Coma Parametro {$$ = new MParametro($2);}
;

IF : If PA Exp PC LLA Codigo LLC ELSE {$$ = new If($3, $6, $8);}
   | If PA Exp PC LLA Codigo LLC  {$$ = new If($3, $6, new Blanco());}
   | If PA Exp PC LLA LLC ELSE {$$ = new If($3, new Blanco(), $7);}
   | If PA Exp PC LLA LLC {$$ = new If($3, new Blanco(), new Blanco());}
   | If ERROR RECUPERACION LLA Codigo LLC ELSE
   | If ERROR RECUPERACION LLA  LLC ELSE
   ;

ELSE : Else IF {$$ = new ElseIf($1, $2);}
     | Else LLA Codigo LLC {$$ = new Else($1, $3);}
     | Else LLA LLC {$$ = new Else($1, new Blanco());}
     | Else ERROR RECUPERACION
     ;

FOR : For PA TipoDato ID IGUAL Exp PYC Exp PYC Exp PC LLA Codigo LLC {$$ = new For($4, $6, $8, $10, $13);}
    | For PA TipoDato ID IGUAL Exp PYC Exp PYC Exp PC LLA LLC {$$ = new For($4, $6, $8, $10, new Blanco());}
    | For ERROR LLA Codigo LLC
    | For ERROR LLA LLC
    ;

WHILE : While PA Exp PC LLA Codigo LLC {$$ = new While($3, $6);}
      | While PA Exp PC LLA LLC {$$ = new While($3, new Blanco());}
      | While ERROR LLA Codigo LLC
      | While ERROR LLA LLC
      ;

DO : Do LLA Codigo LLC While PA Exp PC {$$ = new Do($3, $7);}
   | Do LLA LLC While PA Exp PC {$$ = new Do(new Blanco(), $6);}
   | Do ERROR RECUPERACION
   ;

Asignacion : ID IGUAL Exp PYC {$$ = new Asignacion($1, $3);}
           | ID ERROR RECUPERACION
;

Llamado: ID PA DentroP PC PYC {$$ = new Llamado($1, $3);}
       | ID PA  PC PYC {$$ = new Llamado($1, new Blanco())}
       | ID ERROR RECUPERACION
       ;

Llamados: ID PA DentroP PC {$$ = new Llamados($1, $3);}
        | ID PA PC {$$ = new Llamados($1, new Blanco())}
        | ID ERROR RECUPERACION
        ;

Retornos: Break PYC {$$ = new Retorno($1, new Blanco());}
        | Continue PYC {$$ = new Retorno($1, new Blanco());}
        | Return Exp PYC {$$ = new Retorno($1, $2);}
        | Break ERROR RECUPERACION
        | Continue ERROR RECUPERACION
        | Return ERROR RECUPERACION
        ;

Codigo : IF Codigo {$$ = new Codigo($1, $2);}
       | FOR Codigo {$$ = new Codigo($1, $2);}
       | WHILE Codigo {$$ = new Codigo($1, $2);}
       | DO Codigo {$$ = new Codigo($1, $2);}
       | Inprimir Codigo {$$ = new Codigo($1, $2);}
       | Asignacion Codigo {$$ = new Codigo($1, $2);}
       | Llamado Codigo {$$ = new Codigo($1, $2);}
       | Variable Codigo {$$ = new Codigo($1, $2);}
       | Retornos Codigo {$$ = new Codigo($1, $2);}
       | INCREMENTO Codigo {$$ = new Codigo($1, $2);}
       | DECREMENTO Codigo {$$ = new Codigo($1, $2);}
       | IF {$$ = new Codigo($1, new Blanco());}
       | FOR {$$ = new Codigo($1, new Blanco());}
       | WHILE {$$ = new Codigo($1, new Blanco());}
       | DO {$$ = new Codigo($1, new Blanco());}
       | Inprimir {$$ = new Codigo($1, new Blanco());}
       | Asignacion {$$ = new Codigo($1, new Blanco());}
       | Llamado {$$ = new Codigo($1, new Blanco());}
       | Variable {$$ = new Codigo($1, new Blanco());}
       | Retornos {$$ = new Codigo($1, new Blanco());}
       | INCREMENTO {$$ = new Codigo($1, new Blanco());}
       | DECREMENTO {$$ = new Codigo($1, new Blanco());}
       | ERROR Codigo
       | ERROR
       ; 

INCREMENTO: ID Incremento PYC {$$ = new Exprecion(new Token($1), $2, new Blanco(), this._$.first_line, this._$.first_column);}
          | ID ERROR RECUPERACION
;

DECREMENTO: ID Decremento PYC {$$ = new Exprecion(new Token($1), $2, new Blanco(), this._$.first_line, this._$.first_column);}
          | ID ERROR RECUPERACION
;

RECUPERACION: PYC
            | LLC
            | PC;

ERROR: error {Agregar("Sintactico", this._$.first_line, this._$.first_column, yytext)};
