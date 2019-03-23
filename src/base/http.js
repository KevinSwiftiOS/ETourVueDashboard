/*
    http 请求 GET POST DIRECT
*/

import axios from "axios";
import { Message } from "element-ui";

// import qs from "qs";
// config
const host =
  process.env.NODE_ENV === "development"
      //? "http://127.0.0.1:3101/"
     /* ?"http://10.1.17.9:3101"
    : "http://111.231.71.167:3101/";*/
     ?"https://etour-api.lab421.top"
   : "https://etour-api.lab421.top";
const baseURL = host;
const option = {
  method: "get",
  baseURL: baseURL + "/",
  timeout: "60000",
  headers: {
    // "If-Modified-Since": "Thu, 01 Jun 1970 00:00:00 GMT"
  }
};

// header
const getToken = function() {
  const token = localStorage.getItem("token");
  return "Bearer " + token;
};

// 请求检查
const checkResult = res => {
  if (res.status === 200) {
    if (res.data.code != 0) {
      Message({ type: "error", message: res.data.message });
    }
    return res.data;
  } else {
    Message({ type: "error", message: res.data.message });
    // 404 500 errors
  }
};

const checkError = error => {
  if (error.response) {
    if (error.response.status === 500) {
      Message.error("系统错误，code 500");
    }
    if (error.response.data.path === "/401") {
      Message.error("登录信息失效，请重新登录");
    }
  } else {
    if (error.message.indexOf("timeout") > -1) {
      Message.error("数据访问超时");
    }
  }
  return { code: "Error" };
};

// POST
const POST = function(url, data, params) {
  const options = {
    ...option,
    data: data,
    url: url,
    params: params,
    method: "post",
    headers: {
      ...option.headers,
      Authorization: getToken()
    }
  };
  return axios(options)
    .then(res => checkResult(res))
    .catch(err => checkError(err));
};

// GET
const GET = function(url, params) {
  const options = {
    ...option,
    url: url,
    params: params,
    headers: {
      ...option.headers,
      Authorization: getToken()
    }
  };
  return axios(options)
    .then(res => checkResult(res))
    .catch(err => checkError(err));
};

// direct req (no token )
const DIRECT = function(url, method = "get", data) {
  const options = {
    ...option,
    baseURL: baseURL + "/",
    data: data,
    url: url,
    method: method
  };
  return axios(options)
    .then(res => checkResult(res))
    .catch(err => checkError(err));
};

export { GET, POST, DIRECT };
