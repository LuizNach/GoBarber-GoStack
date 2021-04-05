import express from 'express';
import appointmentsRouter from './appointments.router';

const port = 3333;
const app = express();

app.use(express.json());

app.use('/appointments', appointmentsRouter);

app.get('/', (request, response) => {
    return response.json({message: 'Hello'})
});

app.listen(port, () => console.log(`🚀️ Server started on port: ${port}!`));