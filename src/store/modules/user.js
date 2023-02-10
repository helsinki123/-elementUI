import { login, encryptByDES } from '@/api/index'
const user = {
    state: {
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {}
    },

    mutations: {
        set_user_info(state, data) {
            sessionStorage.setItem('userInfo', JSON.stringify(data));
            state.userInfo = data;
        }
    },

    actions: {
        Login(userInfo) {
            const key = 'zhuoyue1401'
            if (!String.prototype.trim) {
                String.prototype.trim = function() {
                    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
                };
            }
            return new Promise((resolve, reject) => {
                login(
                    {
                        loginName: encryptByDES(userInfo.loginName, key),
                        password: encryptByDES(userInfo.password, key),
                    }
                ).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};

export default user;
