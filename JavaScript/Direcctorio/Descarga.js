const {Router} = require('express');
const router = Router()

router.get('/Descarga', (req, res) => {
    res.download("./Archivos/Archivo.js", function(err){
        if (err) {
            console.log(err)
        } else {
            console.log("Se descargo");
        }
    });
})

module.exports = router;