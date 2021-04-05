import express from 'express';

const app = express();
const port = 3333;
app.use(express.json())


app.get('/', (request, response) => {
    return response.json({message: 'Hello'})
});

app.post('/', (request, response) => {

    const { email, name } = request.body;
    
    const user = {
        name,
        email
    }

    return response.json(user);
});



app.listen(port, () => console.log(`🚀️ Server started on port: ${port}!`));