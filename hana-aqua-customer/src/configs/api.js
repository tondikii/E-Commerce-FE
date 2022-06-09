import axios from "axios"

const instance = axios.create({
  // baseURL: "http://localhost:3000/api/" //LOCAL
  baseURL: "https://hana-aqua.herokuapp.com/api/"
});

export default instance