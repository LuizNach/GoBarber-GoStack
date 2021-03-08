const express = require('express');

const app = express();
const port = 3333;
app.use(express.json())

/**
 *  Metodos HTTP
 * 
 *  GET: Buscar insformação
 *  POST: Criar informação no Back-End
 *  PUT/PATCH: Alterar/Atualizar info no Back-End
 *  DELETE: Deletar info no Back-End
 *  
 */

/**
 * Tipos de parametros:
 * 
 * Query Params: conhecidos como parmetros get 
 *   Usados mt no method Get 
 *   => exemplos filtros e paginações 
 *   => www.site.com/projetos?page=1&title=React&owner=User 
 *   => request.query
 * Route Params: recursos para atualizar ou deletar
 *   => www.site.com/projetos/:1
 *   => request.params
 * Request body: conteúdo na hora de criar ou editar um recurso
 *   => Usa padrões de envio - ver padrões do insomnia - como Json
 *   => request.body
 */

app.get('/', (request, response) => {
    return response.json({"message":"Hello World!"});
});

app.get('/projects', (request, response) => {
    return response.json(
        {
            "Project1":"NodeJS",
            "Project2":"React",
        }
    );
});

app.post('/projects/', (request, response) => {

    const params = request.params;
    const query_params =  request.query_params;

    console.log(params, query_params);

    return response.json(
        {
            "Project1":"NodeJS",
            "Project2":"React",
        }
    );
});

app.put('/projects/:id', (request, response) => {

    const params = request.params;
    const query_params =  request.query_params;

    console.log(params, query_params);

    return response.json(
        {
            "Project1":"NodeJS",
            "Project2":"React",
        }
    );
});

app.delete('/projects/:id', (request, response) => {

    const params = request.params;
    const query_params =  request.query_params;

    console.log(params, query_params);

    return response.json(
        {
            "Project1":"NodeJS",
            "Project2":"React",
        }
    );
});

app.listen(port, () => {
    console.log(`🚀️ Back-End server started at port: ${port}`);
});