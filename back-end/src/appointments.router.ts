import { Router } from 'express';
import { v4 as uuidv4, validate as isUuid } from 'uuid';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from './models/Appointment';
import AppointmentsRepository from './repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

//SoC: Separation of Conserns

appointmentsRouter.get('/', (request, response) => {

    let appointments = appointmentsRepository.all();

    return response.json({ appointments});
})

appointmentsRouter.post('/', (request, response) => {

    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);

    if(findAppointmentInSameDate){
        return response.status(400).json({message: 'This appointment is already booked'});
    }

    const appointment = appointmentsRepository.create(provider, parsedDate);

    return response.json(appointment);
});

export default appointmentsRouter;

