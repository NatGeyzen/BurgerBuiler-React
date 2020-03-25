import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-e9525.firebaseio.com/'
});

export default instance;