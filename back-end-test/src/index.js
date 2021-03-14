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

/**
 * Middleware:
 * Um interceptador de requisições;
 * Pode interromper totalmente uma requisição;
 * Pode alterar dados de uma requisição;
 * 
 * Formato: function myfunction( request, response, next)
 * 
 * Usamos quando queremos que seja disparado automaticamente antes ou depois de uma requisicao, rota etc
 * 
 */

const { v4: uuidv4, validate: isUuid } = require('uuid');
const projects = [];

function logRequests( request, response, next) {
    const { method, url} = request;

    const logLabel = `[${method.toUpperCase()} ${url}]`;

    console.time(logLabel);

    next();//Proximo middleware

    console.timeEnd(logLabel);
}

function validateProjectId( request, response, next){
    const { id } = request.params;

    if( !isUuid(id) ){
        return response.status(400).json({ message: "Invalid project ID"});
    }

    return next();
}

app.use(logRequests); //Usar em todas as requisições
//app.use('/projects/:id', logRequests, validateProjectId); //Adiciona a sequencia de middlewares na rota passada

app.get('/', (request, response) => {
    return response.json({"message":"Hello World!"});
});

app.get('/projects', (request, response) => {

    let { owner, title } = request.query;

    let results = projects;

    if ( owner ) {
        results = results.filter( result => result.owner.includes(owner));
    }

    if ( title ) {
        results = results.filter( result => result.title.includes(title));
    }

    return response.json( results );
});

app.post('/projects/', (request, response) => {

    const { title, owner } = request.body;

    let project = { id: uuidv4(), title, owner};
    projects.push( project );

    return response.json( project );
});

app.put('/projects/:id', validateProjectId, (request, response) => {

    const { id } = request.params;
    const { title, owner } = request.body;

    let projectIndex = projects.findIndex((project) => project.id === id);

    if ( projectIndex < 0 ) {
        return response.status(400).json({ error: "Project not found."});
    }

    let project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project;

    return response.json( project );
});

app.delete('/projects/:id', validateProjectId, (request, response) => {

    const { id } = request.params;

    let projectIndex = projects.findIndex((project) => project.id === id);

    if ( projectIndex < 0 ) {
        return response.status(400).json({ error: "Project not found."});
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(port, () => {
    console.log(`🚀️ Back-End server started at port: ${port}`);
});