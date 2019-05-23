import axios from 'axios';
import { message } from 'antd';
import * as config from '../config';
import qs from 'qs';

// const confirm = Modal.confirm;
const http = axios.create({
    baseURL: config.API_ROOT
});



export const getAuthorization = () => {
  let str = ''
  if (window.sessionStorage.getItem('TOKEN')) {
    str = window.sessionStorage.getItem('TOKEN');
  }
  return str
}

const methodArr = ['post', 'put', 'delete', 'patch'];

// 拦截器
http.interceptors.request.use(config => {
    if (methodArr.includes(config.method)) {
      config.data = qs.stringify(config.data)
    }
    config.headers.Authorization = getAuthorization();
    return config
  }, (error) => {
    return Promise.reject(error)
  })

http.interceptors.response.use(response => {
    let data = {}
    if (response.data.code === 900) {
      window.location.href="/#/"
    }
    if (response.data.code !== 200) {
      message.error(response.data.msg);
    } else {
      data = response.data
    }
    return data
  }, (error) => {
    message.error("请求错误！");
    return Promise.reject(error)
  })


export default http;