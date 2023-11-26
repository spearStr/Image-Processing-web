import axios from 'axios';

const instance = axios.create({
    baseURL:
        'https://planassistant.site',
});

export default instance;