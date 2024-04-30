import axios from "axios";

const instance = axios.create({
  baseURL: "https://hana-aqua.vercel.app",
});

export default instance;
