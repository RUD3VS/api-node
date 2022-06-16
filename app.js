const express = require('express');
const app = express();
const morgan = require('morgan');
// const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos')
const rotaPedidos = require('./routes/pedidos')

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false })); //apenas dados simples
app.use(express.json()); //só vamos aceitar formato json no body

// app.use(bodyParser.urlencoded({ extended:false })) //apenas dados simples
// app.use(bodyParser.json()); //só vamos aceitar formato json no body

app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header(
        'Acess-Control-Allow-Header', 
        'Origin, X-Requerested-With, Content-Type , Accept, Authorization'
        );
        if(req.method === 'OPTIONS'){
            res.header('Acess-Control-Allow-Methods', 'PUT, POST , PATH , DELETE , GET');
        }

        next();
})


app.use('/produtos' , rotaProdutos);
app.use('/pedidos' , rotaPedidos);

// quando não encontra rota entrar aqui - tratamento de erros
app.use((req, res, next) => {
    const erro = new Error('não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;