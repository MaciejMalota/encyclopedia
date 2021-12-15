import axios from 'axios'
// import { authHeader } from "./_helpers/auth-header";

axios.defaults.baseURL = 'http://localhost:5000/';
// axios.defaults.headers = authHeader();


export default axios;