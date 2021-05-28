const {Router} = require('express');
const {Analizador} = require('../ArchivosJS/Analizadores/Analizador.js');

const router = Router()

router.post('/Analizar', (req, res) => {
    //console.log(req.body.Texto);

    var a = new Analizador(req.body.Texto);
    
    if(a.ErroresLyS() == ""){
        res.json({Python:a.Python(), Arbol:a.Graficar(), Token:a.Lista(), Errores:a.ErroresLyS()});
    }else{
        res.json({Python:a.Python(), Arbol:a.Graficar(), Token:a.Lista(), Errores:a.ErroresLyS()});
    }
})

module.exports = router;