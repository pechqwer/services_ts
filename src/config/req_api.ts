'use strict';

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';


const client = axios.create({
  timeout: 30000,
})
axiosRetry(client, {
  retries: 3,
  shouldResetTimeout: true,
  retryCondition: (_error) => true,
  retryDelay: (retryCount) => {
    return retryCount * (Number(100) || 0); // milisecond
  }
});

function successHandler(result: AxiosResponse<any, any>) {
  return {
    success: true,
    res: (result.data ? result.data : null),
    headers: result.headers,
    status: result.status,
  };
}

function errorHandler(e: { response: { status: any; body: any; data: any; headers: any; }; message: any; }) {
  if (e.response) {
    return {
      success: false,
      status: e.response.status,
      res: e.response.body ? e.response.body : (e.response.data ? e.response.data : null),
      err: e.message,
      headers: e.response.headers ? e.response.headers : null,
    };
  } else {
    return {
      success: false,
      status: 999,
      res: null,
      err: e.message,
      headers: null,
    };
  }
}

const req_api = {
  get: async (url: string, option?: AxiosRequestConfig<any> | undefined) => {
    // console.info('## config.reqApi.get')
    return new Promise(async (resolve, rejects) => {
      let timeStart: any = new Date();
      let result: AxiosResponse<any, any>
      try {
        if (!url) return false;
        result = await client.get(url, option);
        let timeEnd: Number = new Date() as any - timeStart;
        console.info(`GET Request url: ${url} - time: ${timeEnd} ms`);
        return resolve(successHandler(result))
      } catch (e) {
        if ([400,401,403].includes(e.status)) {
          console.error('### Error config.reqApi.get:', e.message, e.status);
          return resolve(errorHandler(e))
        }
        console.error('### Error config.reqApi.get:', e);
        return resolve(errorHandler(e))
      }
    })


  },
  post: async (url: string, body: any, option?: AxiosRequestConfig<any> | undefined) => {
    // console.info('## config.reqApi.post');
    let timeStart: any = new Date();
    let result: AxiosResponse<any, any>
    try {
      result = await client.post(url, body, option);
      let timeEnd: Number = new Date() as any - timeStart;
      console.info(`POST Request url: ${url} - time: ${timeEnd} ms`);
      return successHandler(result);
    } catch (e) {
      if ([400,401,403].includes(e.status)) {
        console.error('### Error config.reqApi.post:', e.message, e.status);
        return errorHandler(e)
      }
      console.error('### Error config.reqApi.post:', e);
      return errorHandler(e)
    }
  },
  put: async (url: string, body: any, option?: AxiosRequestConfig<any> | undefined) => {
    // console.info('## config.reqApi.put')
    let timeStart: any = new Date();
    let result: AxiosResponse<any, any>
    try {
      result = await client.put(url, body, option);
      let timeEnd: Number = new Date() as any - timeStart;
      console.info(`PUT Request url: ${url} - time: ${timeEnd} ms`);
      return successHandler(result);
    } catch (e) {
      if ([400,401,403].includes(e.status)) {
        console.error('### Error config.reqApi.post:', e.message, e.status);
        return errorHandler(e)
      }
      console.error('### Error config.reqApi.put:', e);
      return errorHandler(e)
    }
  },
  delete: async (url: string, option: AxiosRequestConfig<any> | undefined) => {
    console.info('## config.reqApi.delete')
    let timeStart: any = new Date();
    let result: AxiosResponse<any, any>
    try {
      result = await client.delete(url, option);
      let timeEnd: Number = new Date() as any - timeStart;
      console.info(`DELETE Request url: ${url} - time: ${timeEnd} ms`);
      return successHandler(result);
    } catch (e) {
      if ([400,401,403].includes(e.status)) {
        console.error('### Error config.reqApi.post:', e.message, e.status);
        return errorHandler(e)
      }
      console.error('### Error config.reqApi.delete:', e);
      return errorHandler(e);
    }
  },
};


export default req_api
