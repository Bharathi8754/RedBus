import axios from "axios";

const axiosInstance = axios.create({
    baseURL : "https://redbus-hosting.onrender.com/api/redbus",
    headers :  {
        'Content-Type': 'application/json',
    }
})

export default axiosInstance