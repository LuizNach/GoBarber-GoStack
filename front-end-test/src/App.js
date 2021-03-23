import React, {useState} from 'react';
import { render } from 'react-dom';

import Header from './Header';

function App(){
    // JSX: colcoar  o html dentro do javascript (Javascript XML)
    // Conceito de Component, Propriedade, Estado
    // Conceito de Fragment <> </>

    // cada funcao de componente sempre pode acessar as propridades e o children do elemento que o chama.
    // ex.: function Header(props){ 
    //      const { title, children } = props;
    //  }

    /** Conceitos principais:
     * Component
     * Propriedade
     * Estado
    */

    /**
     * useState
     * retorna um array com 2 posicoes
     * 1.A variavel com que vai guardar algo
     * 2.A funcao que muda a avariavel e alerta o react que temos algo para mudar
     * Por causa disso ao invez de declarar uma variavel e pegar o useState[0] para a variavel, usamos desconstrucao
     */

    let [projects, setProjects] = useState(["React Native", "NodeJs"]);

    function handleAddProject(){
        setProjects([...projects, `Novo projeto ${Date.now()}`]);
        console.log(projects)
    }

    return (
        <>
            <Header title="Projects">
                <ul>
                    <li> Homepage </li>
                    <li> GoStack </li>
                </ul>
            </Header>

            <ul>
                { projects.map( (project) => { return <li key={project}>{project}</li> } )}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
        </>
    );
}


export default App;