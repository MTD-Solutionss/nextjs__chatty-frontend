import axios, { AxiosInstance } from 'axios';
import queryString from 'query-string';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_ENDPOINT}/api/v1`;

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
