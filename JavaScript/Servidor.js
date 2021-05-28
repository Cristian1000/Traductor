const express = require('express');
const morgan = require('morgan');
const cors = require('cors')


const app = express();

app.set('port', process.env.PORT || 8001)
app.set('json spaces',2);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(cors());
app.use(morgan("dev"))
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(require('./Direcctorio/JavaScript'));
app.use(require('./Direcctorio/Descarga'));
app.use(require('./Direcctorio/AST'));

app.get('')


app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
})