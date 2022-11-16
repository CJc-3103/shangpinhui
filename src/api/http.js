import axios from 'axios';
import store from '@/store';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  nProgress.start();
  config.headers.userTempId = store.state.uuidToken;
  if (store.state.token) {
    config.headers.userTempId = store.state.token;
  }
  return config;
});

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    nProgress.done();
    // 响应返回的数据
    return response.data;
  },
  (err) => {
    // 相应错误信息
    return Promise.reject(err);
  }
);

// 二次封装请求方法，将状态码处理等过程进行封装
const http = {};
http.get = (url, options) => {
  return new Promise((res, rej) => {
    instance
      .get(url, options)
      .then((response) => {
        if (response.code === 200) {
          res(response.data);
        } else {
          rej(response.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
};

http.post = (url, data, options) => {
  return new Promise((res, rej) => {
    instance
      .post(url, data, options)
      .then((response) => {
        if (response.code === 200) {
          res(response.data);
        } else {
          rej(response.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
};

http.delete = (url, data, options) => {
  return new Promise((res, rej) => {
    instance
      .delete(url, data, options)
      .then((response) => {
        if (response.code === 200) {
          res(response.data);
        } else {
          rej(response.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
};

export default http;
