import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.2.2:3333'
});

export default api;

/**
 * iOS com Emulador: localhost
 * iOS com fisico: ip da maquina na rede
 * Android com Emulador: adb reverse tcp:3000 tcp:3000
 * Android com Emulador: 10.0.2.2 (Emulador do Android Studio)
 * Android com Emulador: 10.0.3.2 (Emulador do Genimotion)
 * Android com fisico: ip da maquina
 */