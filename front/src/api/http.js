import axios from 'axios';
import qs from 'qs'

// axios.defaults.url='http://localhost:9090';
// const baseUrl = 'http://localhost:9090/servers';
// axios.defaults.url='https://websevan.club';
// const baseUrl = 'https://websevan.club/servers';

// let baseUrl = process.env.NODE_ENV === "development" ? "https://websevan.club/servers":"https://websevan.club/servers";
let baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:9090/servers":"https://websevan.club/servers";

axios.interceptors.request.use(config => {
    if(!config.headers['Content-Type']){
        config.headers = {
            'Content-Type':'application/x-www-form-urlencoded;'
        }
    }
    return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//
axios.interceptors.response.use(response => {
        if(response.data.code!==200){
            return Promise.reject('服务器错误');
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

/**
 * 封装post请求
 * @param url
 * @param data
 * @return {Promise}
 * qs.stringify(data)
 * */
export const post = function (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(baseUrl+url, qs.stringify(data)).then(res => {
            resolve(res);
        }).catch(error => {
            reject(error);
        })
    })
};

/**
 * @param url
 * @param param
 * @return {Promise}
 * **/

export const fetch = function (url, param = {}) {
    return new Promise((resolve, reject) => {
        axios.get(baseUrl+url, {params:param}).then(res => {
            resolve(res);
        }).catch(error => {
            reject(error);
        })
    });
};