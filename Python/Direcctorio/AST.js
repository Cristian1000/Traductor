const {Router} = require('express');
const router = Router()

router.get('/AST', (req, res) => {
    res.download("./Archivos/AST.pdf", function(err){
        if (err) {
            console.log(err)
        } else {
            console.log("Se descargo");
        }
    });
})

module.exports = router;