import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'https://burger-application-51a80.firebaseio.com/'
})

export default instance;