/**
 * User: name, email, password
 */

interface createUserData {
    name? : string,
    email: string,
    password: string,
    //techs: Array<string> //vetor de strings
    //techs: string[], //vetor de strings
    //techs: string[] | techObject, //ou é um vetor de strings ou e um objeto somente tech obj
    techs: Array< string | techObject >
}
interface techObject{
    title: string,
    experience: number
}


export default function createUser({name = '', email, password, techs}: createUserData) {

    const user = {
        name,
        email,
        password,
        techs
    }

    return user;

}