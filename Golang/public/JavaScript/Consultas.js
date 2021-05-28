function Analizar(){
    let jtxtJSharp = ace.edit("Editor");
    var entrada = jtxtJSharp.getSession().getValue();

    //alert(entrada);

    //-----------Consulta al servidor de Traduccion a JavaScript

    var url = 'http://localhost:9001/Analizar';
    var dato = {Texto:entrada}
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(dato), // data can be `string` or {object}!
      //body: {"Texto": "\""+entrada+"\""},
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    //.catch(error => console.error('Error:', error))
    //.then(response => console.log('Success:', response));
    .catch(function(error) {
        alert(error);
    })
    .then(response => JavaScript(response));

    //-----------Consulta al servidor de Traduccion a Python

    url = 'http://localhost:9002/Analizar';
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(dato), // data can be `string` or {object}!
      //body: {"Texto": "\""+entrada+"\""},
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    //.catch(error => console.error('Error:', error))
    //.then(response => console.log('Success:', response));
    .catch(function(error) {
        alert(error);
    })
    .then(response => Python(response));
    
}

function JavaScript(response){
    var to = '\n';
    let jtxtJSharp = ace.edit("javascript");
    for (let i = 0; i < response.Lexema.length; i++) {
        to += response.Lexema[i]+'\n';
        
    }
    to += "\n"+response.Errores
    jtxtJSharp.getSession().setValue(to);
    //document.getElementById("txtin").value = '';
}

function Python(response){
  var to = "";
  let jtxtJSharp = ace.edit("Python");
  
  to = response.Token + "\n"+ response.Errores

  jtxtJSharp.getSession().setValue(to);
  //document.getElementById("txtin").value = '';
}

function DescargarJava(){
    var url = 'http://localhost:9001/Descarga';
    window.open(url)
}

function AST_Java(){
    var url = 'http://localhost:9001/AST';
    window.open(url)
}

function DescargarPython(){
  var url = 'http://localhost:9002/Descarga';
    window.open(url)
}

function AST_Python(){
  var url = 'http://localhost:9002/AST';
  window.open(url)
}

function Descargar(){
  DescargarJava()
  DescargarPython()
}

var openFile = function(event) { 
  var input = event.target; 
  var reader = new FileReader(); 
  reader.onload = function(){ 
    var text = reader.result; 
    var texto= ace.edit("Editor"); 
    texto.getSession().setValue(reader.result); }; 
    reader.readAsText(input.files[0]); };