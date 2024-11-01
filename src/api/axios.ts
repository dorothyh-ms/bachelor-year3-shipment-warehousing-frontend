import axios from "axios";

const axiosApi = axios.create({
    baseURL: "http://localhost:8090/api/",
})

export default axiosApi;