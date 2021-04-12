import Appointment from '../models/Appointment';
import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';


/**
 * [ X ] recebimento das informacoes
 * [ X ] trativas  de erros e excessoes
 * [ X ] acesso de repository
 */

interface RequestDTO {
    provider: string,
    date: Date,
}

/**
 * Dependency Inversion: Sempre q o service tiver um dependencia externa, 
 * ao inves de instanciarmos essa dependencia externa vamos passar ela coo parametro. 
 * Exemplo: Repository.
 */

class CreateAppointmentService {

    private appointmentsRepository: AppointmentsRepository

    constructor( appointmentsRepository: AppointmentsRepository ) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute( { provider, date }: RequestDTO): Appointment {

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate); 

        if(findAppointmentInSameDate){
            throw Error("This appointment is already booked");
            //return response.status(400).json({message: 'This appointment is already booked'});
        }

        const appointment = this.appointmentsRepository.create({
            provider, 
            date: appointmentDate
        });

        return appointment;
    }
}

export default CreateAppointmentService;