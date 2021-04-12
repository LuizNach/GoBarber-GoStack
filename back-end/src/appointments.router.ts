import { Router } from 'express';
import { v4 as uuidv4, validate as isUuid } from 'uuid';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from './models/Appointment';
import AppointmentsRepository from './repositories/AppointmentsRepository';
import CreateAppointmentService from './service/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

//SoC: Separation of Conserns
//DTO - Data transfer object
//Dry: Don't repeat yourself

appointmentsRouter.get('/', (request, response) => {

    let appointments = appointmentsRepository.all();

    return response.json({ appointments });
})

appointmentsRouter.post('/', (request, response) => {

    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointmentService = new CreateAppointmentService(appointmentsRepository);

        const appointment = createAppointmentService.execute({ provider, date: parsedDate})

        return response.json(appointment);
    } catch (error) {
        return response.status(400).json({error: error.message});
    }
});

export default appointmentsRouter;

