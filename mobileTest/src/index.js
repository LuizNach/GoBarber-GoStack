import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, SafeAreaView } from 'react-native';

import api from './services/api';

/** 
 * Elementos da biblioteca do react-native:
 *  - nao possuem valor semantico, ou seja não possuem significado como as tags de html.
 *  - nao possuem estilizacao propria, tudo precisa ser feito via css.
 *  - todos os componentes possuem por padrão display-flex
 *  - Não ha heranca de estilos, ou seja, nao adianta querer pasarmos carateristicas, 
 * como por exemplo tamanho de fonte, para uma tag que nao serao passadas adiante para tags children.
 * 
 * View: simboliza qualquer container do html: div, footer, main, aside, section;
 * Text: simboliza qualquer texto: p, span, strong, h1, h2, h3;
 * 
 */

export default function App() {

    let [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then( response => {
            console.log(response.data);
            setProjects(response.data);
        });
    }, []);

    return <>
    <StatusBar barStyle='light-content' backgroundColor='#7159c1'></StatusBar>
    {/* <View style={styles.containerCentralized}>
        <Text style={styles.title}>
            Hello GoStack!
        </Text>
        { 
        projects.map( project => {
            return (
            <Text 
            key={project.id} 
            style={styles.project}>
                {project.title}
            </Text>
            )
        })  
        }
    </View> */}
    <SafeAreaView style={styles.container}>
    <FlatList
        style={styles.container}
        data={projects}
        keyExtractor={(project) => {return project.id}}
        renderItem={({item : project}) => {
            return <Text style={styles.project}> {project.title} </Text>
        }}
    />
    </SafeAreaView>
    </>;
}

const styles = StyleSheet.create({
    containerCentralized: {
        flex: 1,
        backgroundColor: '#7159c1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    title: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold'
    },
    project:{
        color: '#FFF',
        fontSize: 26
    },
});