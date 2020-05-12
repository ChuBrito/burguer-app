import axios from 'axios'

const instance = axios.create({
    baseURL:'https://burguer-app-676c8.firebaseio.com/'
})

export default instance;