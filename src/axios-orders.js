import axios from 'axios'

// This is used to create an instance
const instance = axios.create({
    baseURL : 'https://react-my-burger-78b92.firebaseio.com/'
})

export default instance;