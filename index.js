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

//EDITAR

app.get('/editarCategoria/:cod_categoria', (req, res)=>{

    let {cod_categoria} = req.params
    
    urlListarCategoriaPk = `http://localhost:3000/listarCategoriaPk/${cod_categoria}`

    axios.get(urlListarCategoriaPk)
    .then((response)=>{
        // console.log(response.data);
        let categoria = response.data;
        res.render('categoria/editarCategoria.ejs', {categoria});
    })
    
})

app.post('/editarCategoria', (req, res)=>{

    let urlEditar = 'http://localhost:3000/alterarCategoria'

    axios.put(urlEditar, req.body)
    .then((response)=>{
        res.send('dado alterado')
    })
})

/* FIM DAS ROTAS DE CATEGORIA */

app.listen(3001, ()=>{
    console.log("SERVIDOR FRONTEND RODANDO EM - http://localhost:3001");
});