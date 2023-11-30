import axios from 'axios';

const instance = axios.create({
    baseURL:
        // 'https://45cf-219-255-207-61.ngrok-free.app',
        'http://localhost:5000',
});

export default instance;