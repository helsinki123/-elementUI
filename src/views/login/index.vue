<template>
    <div class="login">
        <div class="login-container">
            <h1 class="login-container-title">卓越电梯物联网企业平台</h1>
            <el-form
                :model="loginForm"
                ref="loginForm"
                :rules="loginRules"
                label-position="left"
                label-width="70px"
                @submit.native.prevent
                size="midium"
            >
                <el-form-item label="用户名" prop="loginName">
                    <el-input v-model="loginForm.loginName" clearable placeholder="用户名" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="loginForm.password"
                        :type="passwordType"
                        clearable
                        placeholder="密码"
                    >
                        <i
                            class="el-icon-view el-input__icon"
                            slot="suffix"
                            @click="showPassword"
                        ></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input
                        @keyup.enter.native="handleLogin"
                        v-model="loginForm.code"
                        :maxlength="4"
                        clearable
                        placeholder="验证码"
                    >
                        <template slot="append">
                            <el-button
                                class="login-code-img"
                                @click="refreshCode"
                                v-if="code.type === 'text'"
                            >{{ code.value }}</el-button>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div align="center">
                <el-button
                    type="primary"
                    :loading="loading"
                    @click="handleLogin"
                    icon="el-icon-thumb"
                >
                    登录
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { setToken } from "@/utils/auth";
export default {
    name: "index",
    data(){
        const validateCode = (rule, value, callback) => {
            if (this.loginForm.code !== this.code.value) {
                callback(new Error("请输入正确的验证码"));
                this.refreshCode();
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                loginName: '',
                password: '',
                code: ''
            },
            code: {
                src: '',
                value: '',
                len: 4,
                type: 'text'
            },
            loginRules: {
                loginName: [
                    { required: true, message: "用户名不能为空", trigger: "blur" },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 3, message: "密码长度最少为3位", trigger: "blur" }
                ],
                code: [
                    { required: true, message: "请输入验证码", trigger: "blur" },
                    { min: 4, max: 4, message: "验证码长度为4位", trigger: "blur" },
                    { required: true, trigger: "blur", validator: validateCode }
                ]
            },
            passwordType: 'password',
            loading: false
        }
    },

    created() {
        this.refreshCode();
    },

    methods: {
        //验证码检测
        refreshCode() {
            this.code.type === "text"
                ? (this.code.value = this.randomLenNum(this.code.len))
                : (this.code.src = `${this.codeUrl}/${this.loginForm.redomStr}`);
        },

        randomLenNum(len, date){
            let random = '';
            random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len ? len : 4);
            if (date) random = random + Date.now();
            return random;
        },
        //明文密码
        showPassword() {
            this.passwordType === ""
                ? (this.passwordType = "password")
                : (this.passwordType = "");
        },
        //登陆验证
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    // this.loading = true;
                    this.$store.dispatch("Login", this.loginForm).then((res) => {
                        setToken(res.token)
                        setTimeout(async ()=> {
                            await window.location.reload();
                            // this.$router.push({ path: "/index" });
                        }, 0)
                    }).finally(()=> {
                        this.loading = false;
                    })
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .login{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-width: 1024PX;
        // background: url("~@/assets/bg.jpg") 0 / cover fixed;
        min-height: calc(100vh);
        ::v-deep &-container{
            background: rgba(255, 255, 255, 1);
            box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .2);
            max-width: 500PX;
            min-height: 200PX;
            padding: 0 30PX 30PX 30PX;
            border-radius: 10px;
            &-title{
                text-align: center;
                margin: 40px;
            }
        }
    }
</style>
