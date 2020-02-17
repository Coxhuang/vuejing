<template>
    <div class="login">
        <!-- <video src="../assets/video/video.mp4" autoplay="autoplay" style="width:100%; position:absolute; left:0px; top:0px;"></video> -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="ruleForm.password"  placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="captcha" >
                        <el-input type="text" v-model="ruleForm.captcha" class="captcha"  placeholder="请输入验证码"></el-input>

                        <p style="height:40px;lineHeight:40px;marginTop:10px;display:flex"><img src="" class="capchaImg" @click="captchaImg"><span style="color:rgb(81,156,234);text-decoration:underline;margin-left:20px;cursor:pointer" @click="captchaImg">看不清?</span><router-link to="/home/register"><span style="margin-left:20px;color:rgb(81,156,234);text-decoration:underline;cursor:pointer">去注册页</span></router-link></p>
                </el-form-item>
                <el-form-item style="textAlign:center">
                  <el-button type="primary" style="width:100%" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import Cookies from 'js-cookie'
    import $ from 'jquery'
    export default {
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    captcha: '',
                },
                rules: {
                    username: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }, {
                        min: 5,
                        message: '长度在最少5个字符',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }, {
                        min: 6,
                        message: '长度在最少6个字符',
                        trigger: 'blur'
                    }],
                    captcha: [{
                        required: true,
                        message: '请填写验证码',
                        trigger: 'blur'
                    }],
                },
            }
        },
        created() {
            this.getCaptcha()
        },
        mounted() {

        },
        methods: {
            // 登录
            submitForm() {
                // console.log(this.username)
                this.$api.apitest.playerLogin(this.ruleForm.username, this.ruleForm.password, this.ruleForm.captcha).then(response => {
                    console.log(response)
                    this.$message.success("登录成功")
                    Cookies.remove("imgScr")
                    localStorage.setItem('token', response.data.results.token)
                    localStorage.setItem('username', response.data.id)
                    this.$store.state.username =  response.data.id
                    this.$store.state.wallet =  response.data.Wallet
                    this.$store.state.btnsShow = false
                    this.$store.state.userShow = true
                    this.$router.push('/home/match')
                    //
                }).catch(error => {
                    console.log(error.response)
                    if (error.response.data.msg) {
                        this.$message.error(error.response.data.msg)
                    } else {
                        this.$message.error(JSON.stringify(error.response.data))
                    }
                    this.getCaptcha()

                })
            },
            // 获取验证码
            getCaptcha() {
                this.$api.apitest.createcode().then(response => {
                    console.log(response)
                    Cookies.set("imgScr", response.data["results"]["base64_code_str"])
                    Cookies.set("times", response.data["results"]["times"])
                        // ,{expires: 1, domain: 'jishuquan.net'}
                    $(".capchaImg").attr("src", "data:image/png;base64," + Cookies.get('imgScr'))
                }).catch(error => {

                })
            },
            // 刷新验证码
            captchaImg() {
                this.getCaptcha()
            }
        }
    }
</script>
<style lang="scss" scoped>
    .el-form {
        margin: 0 auto;
        width: 500px;
        .el-form-item__label {
            /* color: red !important; */
        }
        .capchaImg {
            width: 150px;
            height: 40px;
            cursor: pointer;
            // margin-top: 10px;
            // z-index: 10
        }
    }

    // .login {
    //     width: 100%;
    //     // height: 100%;
    //     margin-top: 150px;
    //     margin-left: -70px;
    //     text-align: center;
    //     .userLogin {
    //         display: inline-block;
    //         margin-left: 130px;
    //         width: 400px;
    //         height: 38px;
    //         line-height: 38px;
    //         background-color: #ea5515;
    //         color: white;
    //     }
    //     ul {
    //         list-style: none;
    //         // height: 60px;
    //         // line-height: 60px;
    //         position: relative;
    //         li {
    //             margin-bottom: 20px;
    //             .capcha {
    //                 position: relative;
    //                 .capchaImg {
    //                     width: 80px;
    //                     height: 38px;
    //                     position: absolute;
    //                     right: 305px;
    //                     top: 13px;
    //                     z-index: 10
    //                 }
    //             }
    //             input {
    //                 width: 400px;
    //                 height: 38px;
    //                 border: none;
    //                 background-color: #464646;
    //                 color: #bbbbbb;
    //             }
    //             span {
    //                 margin-right: 20px;
    //                 display: inline-block;
    //                 width: 90px;
    //                 font-size: 14px;
    //                 color: #464646;
    //             }
    //             .confirm {
    //                 background-color: #3490f0;
    //                 border-color: #3490f0;
    //                 /* border: none; */
    //                 border-radius: 5px;
    //                 color: aliceblue;
    //                 font-size: 14px;
    //                 margin-left: 90px
    //             }
    //         }
    //     }
    // }
</style>
