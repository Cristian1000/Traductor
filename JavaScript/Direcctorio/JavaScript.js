const {Router} = require('express');
const { Codigo } = require('../ArchivosJS/Traductores/Codigo');
const  Gramatica  = require("../Jison/Gramatica");

const router = Router()

router.post('/Analizar', (req, res) => {
    console.log();

    var a = Gramatica.parse(req.body.Texto)
    if(a.RetornoError().length < 1){
        res.json({Java:a.Traducir(), Arblo:a.Grafica(), Lexema:a.Retorno(), Errores:""});
    }else{
        res.json({Java:"", Arblo:"",Lexema:a.Retorno(), Errores:a.RetornoError()});
    }
})

module.exports = router;