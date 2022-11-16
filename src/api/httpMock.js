import axios from 'axios';
import store from '@/store';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

const instance = axios.create({
    baseURL: '/mock/api',
    timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use((config) => {
    nProgress.start();
    config.headers.Authorization = store.state.token;
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
const httpMock = {};
httpMock.get = (url, options) => {
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

httpMock.post = (url, data, options) => {
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

export default httpMock;
