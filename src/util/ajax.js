import axios from "axios";
import cookies from "js-cookie";
import {
  baseUrl
} from "../config/config";

const baseAjax = (() => {
  axios.defaults.headers = {
    "Content-Type": "application/json;charset=UTF-8" //"application/x-www-form-urlencoded" //'application/json'
  };
  // 带cookie请求

  axios.defaults.withCredentials = false;
  const token = ""; //cookies.get("token") || "";

  if (token === "") {
    console.warn("===没有token===");
  }

  return options => {

    if (options.sendHeader) {
      axios.defaults.withCredentials = true;
    }

    const methods = (options.methods || "get").toUpperCase();
    const urlKey = options.urlKey || "";
    const otherUrl = options.otherUrl ? options.otherUrl : "";
    const customUrl = options.customUrl;
    const requestUrl = urlKey + otherUrl + token;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const returnOptions = {
      method: methods,
      cancelToken: source.token
    };
    let url;
    //console.log(customUrl, requestUrl, '----customUrl')
    //其他的ip请求和第三方的接口请求
    if (customUrl === "rootXGPath" || typeof customUrl === "undefined") {
      url =
        (customUrl === undefined ? baseUrl.rootPath : baseUrl.rootXGPath) +
        requestUrl;
    } else {
      url = customUrl;
    }
    if (urlKey === "" || urlKey === undefined) {
      console.warn("your url is error");
      return false;
    }

    if (options.data) {
      options.data.token = cookies.get("token");
      if (methods === "GET" || options.data2string) {
        if (typeof options.data === "string") {
          url =
            options.data.indexOf("?") === 0 ?
            `${url}${options.data}` :
            `${url}/${options.data}`;
          options.data = "";
        } else {
          let dataStr = Object.entries(options.data)
            .map(it => it.join("="))
            .join("&");

          url += `?${dataStr}`;
        }
      } else if (options.file) {
        returnOptions["data"] = options.data;
      } else {
        returnOptions["data"] = JSON.stringify(options.data || {});
      }
    }
    returnOptions["url"] = url;
    //设置header
    if (options.headers) {
      returnOptions.headers = options.headers;
    }
    //进度条
    if (options.progress) {
      returnOptions.onUploadProgress = eve => {
        if (eve.lengthComputable && options.isUpLoad) {
          var percentComplete = Math.round((eve.loaded * 100) / eve.total);
          options.progress(percentComplete);
        } else {
          options.progress(eve);
        }
      };
    }

    const promise = axios(returnOptions).catch(error => {
      console.error(error, "----ajax");
    });
    if (options.success) {
      promise.then(response => {
        response && options.success(response.data);
      }, options.error || (() => {}));
    }
    if (options.cancel) {
      return source;
    }
    return promise.then(response => {
      if (!response) {
        response = {
          data: {}
        };
      }
      return response && response.data;
    });
  };
})();

export const ajax = options => {
  return baseAjax(options);
};