const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

/* INICIO DAS CONFIGURAÇÕES DO EJS:  */
app.use(express.static('public'));
app.set('view engine', 'ejs');
/* FIM DAS CONFIGURAÇÕES DO EJS:  */

/* INICIO DAS ROTAS DE ACESSO AS PÁGINAS EJS*/
app.get('/', (req, res)=>{
    res.render('index');
});
/* FIM DAS ROTAS DE ACESSO AS PÁGINAS EJS*/

/* INICIO DAS ROTAS DE CATEGORIA */

/*CADASTRO*/
app.get('/categoria', (req, res)=>{
    res.render('categoria/index');
});

/*LISTAGEM*/
app.get('/listagemCliente', (req, res)=>{
   
    /* CONFIGURAÇÃO DA REQUISIÇÃO BACK END VIA AXIOS*/

    /* ROTA DO BACK END */
    const urlListarClientes= 'http://localhost:3000/listarCliente';

    /*
     CHAMADA DO AXIOS PARA A ROTA DO BACK END 
     PARAMETROS DO VERBO:
     1 - ROTA
     2 - .then DE TRATAMENTO DA RESPOSTA
     */
    axios.get(urlListarClientes)
    .then((response)=>{

        console.log(response.data);
        let clientes = response.data;
        res.render('categoria/listagemCliente', {clientes});

    });
});

//AQUI É PARA EDITAR O CLIENTE

app.get('/editarCliente/:cod_cliente', (req, res)=>{

    let {cod_cliente} = req.params
    
    urlListarClientePk = `http://localhost:3000/listarClientePK/${cod_cliente}`

    axios.get(urlListarClientePk)
    .then((response)=>{
        // console.log(response.data);
        let clientes = response.data;
        res.render('categoria/editarCliente.ejs', {clientes});
    })
    
})

app.post('/editarCliente', (req, res)=>{

    let urlEditar = 'http://localhost:3000/alterarCliente'

    axios.put(urlEditar, req.body)
    .then((response)=>{
        res.redirect('/listagemCliente')
    })
})

app.get('/excluirCliente/:cod_cliente', (req, res)=>{
    console.log(req.params);
 
     let {cod_cliente} = req.params;
 
     const urlDeletarCliente= `http://localhost:3000/deletarCliente/${cod_cliente}`;
 
     axios.delete(urlDeletarCliente)
     .then((response)=>{
         res.redirect('/listagemCliente');
        });
    });

/* FIM DAS ROTAS DE CATEGORIA */

app.listen(3001, ()=>{
    console.log("SERVIDOR FRONTEND RODANDO EM - http://localhost:3001");
});