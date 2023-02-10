/**
 * @Author: 'LanYue'
 * @Time: 2021/11/03/16:28
 */
 import axios from "axios";
//  import resetMessage from "@/utils/resetMessage";
 import { Notification } from 'element-ui';
 import baseUrl from "./baseUrl"
 import { getToken } from "@/utils/auth";
 
 // const CancelToken = axios.CancelToken;
 // const source = CancelToken.source();
 
 axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
 axios.defaults.headers["Cache-Control"] = "no-cache";
 axios.defaults.baseURL = baseUrl;
 axios.defaults.timeout = 300000;
 // axios.defaults.withCredentials = true;
 
 let isShowLogoutMessage = true;
 let notificationState = [];
 /**
  * axios 请求拦截器
  */
 axios.interceptors.request.use(
     config => {
         if (getToken()) {
             config.headers["Authorization"] = getToken();
             // config.params = Object.assign({}, config.params, { cancelToken: source.token })
             notificationState = []
         }
         return config;
     },
     err => {
        //  resetMessage.error({
        //      message: "加载超时"
        //  });
         return Promise.reject(err);
     }
 );
 
 /**
  * axios 响应拦截器
  */
 axios.interceptors.response.use(
     async res => {
         if (res.data.code) {
             if (res.data.code !== "0") {
                 if (res.data.code === "500") {
                     //resetMessage.error(res.data.message || "系统错误，请稍后重试！");
                     let msg = Notification.error({
                         title: '警告',
                         message: res.data.message || "系统错误，请稍后重试！",
                         duration: 1500
                     })
                     notificationState.push(msg);
                     if(notificationState.length > 3){
                         msg.close();
                         notificationState = []
                     }
                     return Promise.reject();
                 } else if (res.data.code === "401") {
                     if (isShowLogoutMessage) {
                         isShowLogoutMessage = false
                         Notification.error({
                             title: '警告',
                             message: "未登录或登录失效,请重新登录！",
                             duration: 1500
                         })
                         //resetMessage.error("未登录或登录失效,请重新登录！");
                     }
                     return Promise.reject();
                 } else {
                     let msg =  Notification.error({
                         title: '警告',
                         message: res.data.message || "未知错误，请稍后重试！",
                         duration: 1500
                     })
                     notificationState.push(msg);
                     if(notificationState.length > 1){
                         msg.close();
                         // source.cancel('close the request!');
                         notificationState = []
                     }
                     return Promise.reject();
                 }
             }
         }
         return Promise.resolve(res.data.data || res.data);
     },
     async err => {
         let msg = ""
         if (err.message && err.message.search("timeout") > -1) {
             msg = "服务器响应超时，刷新网站已尝试重新连接"
         } else if (err.message && err.message.search("Network Error") > -1) {
             msg = "网络连接失败或中断，刷新网站已尝试重新连接"
         } else {
             msg = err.message
         }
         await Notification.error({
             title: '警告',
             message: msg,
             duration: 1500
         })
         return Promise.reject(err);
     }
 );
 
 export default axios;
 