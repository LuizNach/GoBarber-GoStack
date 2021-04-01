import { Request, Response } from 'express';
import createUser from './services/createUser';

export function helloWorld( request: Request, response: Response) {

    const user = createUser({
        email: 'luiz@email.com',
        password: '123456',
        techs: ['Node', 'React', 'React-native', { title : 'Javascript', experience: 16}]
    })

    return response.json({message: user});
}