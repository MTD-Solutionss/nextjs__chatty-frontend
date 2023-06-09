import axios, { AxiosInstance } from 'axios';
import queryString from 'query-string';

const APP_ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
let BASE_ENDPOINT = '';
if (APP_ENVIRONMENT === 'local') {
  BASE_ENDPOINT = 'http://localhost:5000';
} else if (APP_ENVIRONMENT === 'development') {
  BASE_ENDPOINT = 'development';
} else if (APP_ENVIRONMENT === 'staging') {
  BASE_ENDPOINT = 'staging';
} else {
  BASE_ENDPOINT = 'production';
}
const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: true,
  paramsSerializer: {
    serialize: (params: any) => queryString.stringify(params)
  }
});

export const setHttpClientHeaders = (key: string, value: any) => {
  axiosClient.defaults.headers.common[key] = value;
};

export default axiosClient;
