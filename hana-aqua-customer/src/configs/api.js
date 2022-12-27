import axios from "axios"

const instance = axios.create({
  baseURL: "https://hana-aqua-service-production.up.railway.app/api"
});

export default instance