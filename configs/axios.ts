import axios, {AxiosRequestConfig} from 'axios';

const BASE_API_URL = 'https://clinicaltables.nlm.nih.gov/api';

const baseConfig: AxiosRequestConfig = {
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application-json"
  },
}
const axiosInstance = axios.create(baseConfig);

// debug
axiosInstance.interceptors.request.use((req)=>{
  console.log(`${req.method} ${req.url} ${JSON.stringify(req.headers)}`)
  return req;
})
export default axiosInstance;