import axios from 'axios';

const instance = axios.create({
  baseURL : 'https://react-my-burger-9e0dd.firebaseio.com/'
});

export default instance;