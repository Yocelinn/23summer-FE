import axios from 'axios'

export const API_URL = 'http://81.70.184.77:8000/'

async function request(option) {
  option.headers = {
    'Content-Type': 'application/json',
  };
  if (option.data && option.data.form_data) {
    option.headers = {
      'Content-Type': 'multipart/form-data',
    };
  }
  option.baseURL = API_URL;
  option.withCredentials = true;
  option.xsrfCookieName = 'csrftoken';
  option.xsrfHeaderName = 'X-CSRFToken';
  return await axios(option).catch((error) => {
    return error.response;
  });
}

export async function get(url, params) {
  return await request({
    url,
    method: 'get',
    params,
  });
}

export async function post(url, data) {
  return await request({
    url,
    method: 'post',
    data,
  });
}

export async function put(url, data) {
  return await request({
    url,
    method: 'put',
    data,
  });
}

export async function patch(url, data) {
  return await request({
    url,
    method: 'patch',
    data,
  });
}

export async function del(url, data) {
  return await request({
    url,
    method: 'delete',
    data,
  });
}

export function isError(response) {
  return response.status < 200 || response.status >= 300;
}

export function toString(json) {
  for (let key in json) {
    json[key] = json[key].toString();
  }
  return json;
}