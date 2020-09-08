import request from '../utils/request';
import Qs from 'qs';
export const fetchData = (Url,query) => {
    return request({
        url: Url,
        method: 'get',
        params: query
    });
};
export const fetchData_post = (Url,query) => {
    return request({
        url: Url,
        method: 'post',
        params: query
    });
};
export const fetchData_post_body = (Url,query) => {
    return request({
        url: Url,
        method: 'post-json',
        data: query
    });
};
export const fetchData_get = (Url,query) => {
    return request({
        url: Url,
        method: 'get',
        params: query
    });
};

export const fetchData_get_cross = (Url,query) => {
    return request({
        url: Url,
        method: 'get_cross',
        params: query
    });
};

export default {
    fetchData,
    fetchData_post,
    fetchData_post_body,
    fetchData_get,
    fetchData_get_cross
};
