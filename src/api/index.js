import axios from '@/utils/axios.js'
import CryptoJS from 'crypto-js'

export const encryptByDES = (message, key) => {
    const keyHex = CryptoJS.enc.Utf8.parse(key);

    const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}
/** 登录 */
export const login = (param) => {
    // const url = '/sys/user/loginencrypt?logintype=1';
    // const url = '';
    return axios.post(
        // process.env.NODE_ENV === 'development' ? 'http://49.234.228.230/elmt' + url : 'http://www.elevatorsafety.cn/elmt' + url,
        "/localhost:8080",
        param
    )
}