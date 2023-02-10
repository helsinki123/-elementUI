import Cookies from "js-cookie"

const TokenKey = "Authorization"

export function getToken(){
    return Cookies.get(TokenKey)
}

export function setToken(token){
    return Cookies.set(TokenKey,token)
}

//清除cookie其实只需要将cookie的过期时间设置为过期就可以
//new Date(0)->Thu, 01 Jan 1970 00:00:00 GMT
// export function clearAllCookie() {
//     let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
//     if(keys) {
//         for(let i = keys.length; i--;)
//             document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
//     }
// }
