import axios from "axios";
import {message} from "antd";

const Axios = axios.create({
  baseURL: "http://localhost:3000/"
});

Axios.interceptors.request.use(
  async config => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (session) config.headers.common["Authorization"] = `Bearer ${session?.token}`;

    return config;
  },
  error => Promise.reject(error)
);

Axios.interceptors.response.use(
  async config => config,
  async error => {
      message.error(error?.response?.data?.message)
    if (error.response.status === 401) {
      localStorage.removeItem("session");

      window.location.href = "/login";

      return;

    }

    if (error.response.status === 403) return Promise.reject(new Error("unauthorized action"));

    return Promise.reject(
      new Error("something went wrong")
    );
  }
);


export default Axios;
