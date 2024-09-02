import axios from "axios";
import nProgress from "nprogress";
import { store } from "../redux/store";

const instance = axios.create({
  baseURL: "http://localhost:8081/api/v1",
});
nProgress.configure({
  easing: "ease",
  speed: 200,
  showSpinner: false,
  trickleSpeed: 20,
});
instance.interceptors.request.use(
  function (config) {
    const access_token = store.getState().user.account.access_token;
    config.headers["Authorization"] = "Bearer " + access_token;
    nProgress.start();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    nProgress.done();
    console.log("interceptor>>", response);
    return response && response.data ? response.data : response;
  },
  function (error) {
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);
export default instance;
