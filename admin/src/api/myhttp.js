import axios from 'axios';
import { message, Modal  } from 'antd';
import * as config from '../config';
import qs from 'qs';

const confirm = Modal.confirm;
const http = axios.create({
    baseURL: config.API_ROOT
});



// export const getAuthorization = () => {
//   let str = ''
//   if (window.localStorage.getItem('TOKEN')) {
//     str = `Naice ${JSON.parse(window.localStorage.getItem('TOKEN') || '').token}`
//   }
//   return str
// }

const methodArr = ['post', 'put', 'delete', 'patch'];

// 拦截器
http.interceptors.request.use(config => {
  console.log(config)
    if (methodArr.includes(config.method)) {
      config.data = qs.stringify(config.data)
    }
    // config.headers.Authorization = getAuthorization()
    return config
  }, (error) => {
    return Promise.reject(error)
  })

http.interceptors.response.use(response => {
    let data = {}
    if (response.data.code === 0) {
      message.error(response.data.message);
    } else {
      data = response.data
    }
    return data
  }, (error) => {
    // if (!loginIn()) {
    //   confirm({
    //     title: '提示!',
    //     content: '用户信息已过期，请点击确定后重新登录。',
    //     okText: '确定',
    //     cancelText: '取消',
    //     onOk() {
    //       window.location.href="/#/login"
    //     },
    //     onCancel() {
    //       console.log('Cancel');
    //     },
    //   });
    // }
    return Promise.reject(error)
  })


export default http;