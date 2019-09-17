<template>
<div class="register">
    <!-- <video src="../assets/video/video.mp4" autoplay="autoplay" style="width:100%; position:absolute; left:0px; top:0px;"></video> -->
    <!-- <p><span class="userRegister">注册用户</span></p> -->
     <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="分代理邀请码" prop="Proxy_id" v-show="isid">
                        <el-input type="text" v-model="ruleForm.Proxy_id" placeholder="如有邀请码请输入"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username" v-show="isusername">
                        <el-input type="text" v-model="ruleForm.username" placeholder="请输入6到16位字符的用户名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" v-show="isemail">
                        <el-input type="email" v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-show="ispassword">
                  <el-input type="password" v-model="ruleForm.password"  placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="安全问题" prop="SafeQuestion" v-show="isSafeQuestion">
                        <el-select v-model="ruleForm.SafeQuestion" placeholder="请选择安全问题">
                          <el-option v-for="(item,index) in list"  :key="index" :value="item.SafeQuestionName">{{item.SafeQuestionName}}</el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="安全问题答案" prop="SafeReply" v-show="isSafeReply">
                        <el-input type="text" v-model="ruleForm.SafeReply"  placeholder="请输入安全问题答案"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="ActualName" v-show="isActualName">
                        <el-input type="text" v-model="ruleForm.ActualName"  placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender" v-show="isgender">
                        <el-radio-group v-model="ruleForm.gender">
                                <el-radio label="male">男</el-radio>
                                <el-radio label="female">女</el-radio>
                        </el-radio-group>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile" v-show="ismobile">
                        <el-input type="text" v-model="ruleForm.mobile"  placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="QQ号" prop="QQ" v-show="isQQ">
                        <el-input type="text" v-model="ruleForm.QQ"  placeholder="请输入QQ号码"></el-input>
                </el-form-item>
                <el-form-item label="微信" prop="WeChat" v-show="isWeChat">
                        <el-input type="text" v-model="ruleForm.WeChat"  placeholder="请输入微信"></el-input>
                </el-form-item>
                <el-form-item label="生日" prop="birth" v-show="isbirth">
                        <el-input type="date" v-model="ruleForm.birth" ></el-input>
                </el-form-item>
                <el-form-item label="主语言" prop="Language" v-show="isLanguage">
                        <el-radio-group v-model="ruleForm.Language">
                                <el-radio label="1">中文</el-radio>
                                <el-radio label="0">英文</el-radio>
                        </el-radio-group>
                </el-form-item>
                <el-form-item label="验证码" prop="captcha" v-show="iscaptcha">
                        <el-input type="text" v-model="ruleForm.captcha" class="captcha"  placeholder="请输入验证码"></el-input>
                        <p style="height:40px;lineHeight:40px;marginTop:10px;display:flex"><img src="" class="capchaImg" @click="captchaImg"><span style="color:rgb(81,156,234);text-decoration:underline;margin-left:20px;cursor:pointer" @click="captchaImg">看不清?</span><router-link to="/home/login"><span style="margin-left:20px;color:rgb(81,156,234);text-decoration:underline;cursor:pointer">去登录页</span></router-link></p>
                </el-form-item>
                <el-form-item style="textAlign:center">
                  <el-button type="primary" style="width:100%" @click="submitForm">注册会员</el-button>
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
                    Proxy_id: '',
                    gender: '',
                    Language: '',
                    username: '',
                    email: '',
                    password: '',
                    SafeQuestion: '',
                    ActualName: '',
                    SafeReply: '',
                    WeChat: '',
                    QQ: '',
                    mobile: '',
                    birth: '',
                    captcha: '',
                },
                rules: {
                    Proxy_id: [{
                        // required: true,
                        message: "请输入分代理邀请码",
                        trigger: 'blur'
                    }],
                    username: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }, {
                        min: 6,
                        message: '长度在最少6个字符',
                        trigger: 'blur'
                    }],
                    email: [{
                        required: true,
                        // validator: checkemail,
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }, {
                        min: 6,
                        message: '长度最少6个字符',
                        trigger: 'blur'
                    }],
                    SafeQuestion: [{
                        required: true,
                        message: '请选择安全问题',
                        trigger: 'change'
                    }],
                    ActualName: [{
                        required: true,
                        message: '请输入真实姓名',
                        trigger: 'blur'
                    }],
                    gender: [{
                        required: true,
                        message: '请输选择性别',
                        trigger: 'change'
                    }],
                    mobile: [{
                        // validator: checkmobile,
                        trigger: 'blur'
                    }],
                    QQ: [{
                        // validator: checkQQ,
                        trigger: 'blur'
                    }],
                    WeChat: [{
                        // validator: checkWeChat,
                        trigger: 'blur'
                    }],
                    birth: [{
                        required: true,
                        message: '请选择日期',
                        trigger: 'change'
                    }],
                    Language: [{
                        required: true,
                        message: '请选择语言',
                        trigger: 'change'
                    }],
                    captcha: [{
                        required: true,
                        message: '请填写验证码',
                        trigger: 'blur'
                    }],
                },
                list: '',
                isgender: false,
                isLanguage: false,
                isid: false,
                isActuaname: false,
                isusername: false,
                isemail: false,
                ispassword: false,
                isActualName: false,
                isSafeQuestion: false,
                isSafeReply: false,
                isWeChat: false,
                isQQ: false,
                ismobile: false,
                iscaptcha: false,
                isbirth: false,
                // imtid: false,
                // imtname: false,
                // imtpass: false,
                // imtActname: false,
                // imtemail: false,
                // imtgender: false,
                // imtques: false,
                // imtrep: false,
                // imtbirth: false,
                // imtwechat: false,
                // imtqq: false,
                // imtmobile: false,
                // imtcapt: false,
                // imtlan: false,
                obj: {},
                minHeight: 0
            };
        },
        mounted() {
            
        },
        created() {
            let registUrl = window.location.href
                // console.log(registUrl)
            this.ruleForm.Proxy_id = registUrl.split("=")[1]
            // console.log(this.ruleForm.Proxy_id)
                // 注册项列表
            this.$api.apitest.getregisterlist().then(response => {
                    console.log(response)
                    this.obj = response.data.results
                    this.ispassword = response.data.results.password
                    this.isid = response.data.results.Proxy_id
                    this.isusername = response.data.results.username
                    this.isActuaname = response.data.results.ActualName
                    this.isgender = response.data.results.gender
                    this.isemail = response.data.results.email
                    this.isSafeQuestion = response.data.results.SafeQuestion
                    this.isSafeReply = response.data.results.SafeReply
                    this.isWeChat = response.data.results.WeChat
                    this.isQQ = response.data.results.QQ
                    this.ismobile = response.data.results.mobile
                    this.isLanguage = response.data.results.Language
                    this.isbirth = response.data.results.birth
                    this.iscaptcha = response.data.results.captcha
                }).catch(error => {

                })
                // 注册项必选项
                // this.$api.apitest.getmustregisterlist().then(response => {
                //         // console.log(response)
                //         this.imtid = response.data.results.Proxy_id
                //         this.imtname = response.data.results.username
                //         this.imtpass = response.data.results.password
                //         this.imtActname = response.data.results.ActualName
                //         this.imtgender = response.data.results.isgender
                //         this.imtemail = response.data.results.email
                //         this.imtques = response.data.results.SafeQuestion
                //         this.imtrep = response.data.results.SafeReply
                //         this.imtwechat = response.data.results.WeChat
                //         this.imtqq = response.data.results.QQ
                //         this.imtlan = response.data.results.Language
                //         this.imtbirth = response.data.results.birth
                //         this.imtmobile = response.data.results.mobile
                //         this.imtcapt = response.data.results.captcha
                //     }).catch(error => {

            //     })
            // 安全问题
            this.$api.apitest.getPassQues().then(response => {
                // console.log(response)
                this.list = response.data
            }).catch(error => {

            })
            this.captchaImg()
        },
        methods: {
            // 获取验证码
            captchaImg() {
                this.$api.apitest.createcode('/Api/User/createcaptcha/').then(response => {
                    // console.log(response) 
                    Cookies.set("imgScr", response.data["results"]["base64_code_str"])
                    Cookies.set("times", response.data["results"]["times"])
                    // ,{expires: 1, domain: 'jishuquan.net'}
                    $(".capchaImg").attr("src", "data:image/png;base64," + Cookies.get('imgScr'))
                }).catch(error => {

                })
            },
            submitForm() {
                let getfromdata = {}
                let tobj = {}
                for (const key in this.obj) {
                    if (this.obj[key] == true) {
                        if (this.ruleForm[key] || this.ruleForm[key] == "") {
                            getfromdata[key] = this.ruleForm[key]
                        }
                    }
                }
                this.$api.apitest.addPlayer(getfromdata).then(response => {
                    console.log(response)
                    this.$message.success("注册成功")
                    localStorage.setItem('token', response.data.results.token)
                    localStorage.setItem('username', response.data.id)
                    Cookies.remove("imgScr")
                    this.$router.go(0)
                    this.$router.push('/home/match')
                }).catch(error => {
                    console.log(error.response)
                    if (error.response.data.msg) {
                        this.$message.error(error.response.data.msg)
                    } else {
                        this.$message.error(JSON.stringify(error.response.data))
                    }
                    this.captchaImg()
                })
            },

        }
    };
</script>
<style lang="scss" scoped>
    .register {
        /* text-align: center */
    }
    /* p {
        text-align: center
    } */
    
    .userRegister {
        height: 38px;
        line-height: 38px;
        display: inline-block;
        width: 400px;
        margin: 0 auto;
        /* margin-left: 130px; */
        background-color: #ea5515;
        color: white;
    }
    
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
            // z-index: 
        }
    }
    /* .userMess {
        width: 100%;
        // height: 100%;
        margin-top: 100px;
        text-align: center;
        .register {
            width: 700px;
            height: 100%;
            border: 2px solid #464646;
            margin-left: 150px;
            ul {
                li {
                    list-style: none;
                    height: 60px;
                    line-height: 60px;
                    position: relative;
                    .userRegister {
                        height: 38px;
                        line-height: 38px;
                        width: 400px;
                        margin-left: 130px;
                        background-color: #ea5515;
                        color: white;
                    }
                    .imt {
                        width: 10px;
                        height: 60px;
                        display: inline-block;
                        position: absolute;
                        font-size: 16px;
                        margin-left: 10px;
                        color: red;
                    }
                    input {
                        width: 400px;
                        height: 38px;
                        border: none;
                        background-color: #464646;
                        color: #bbbbbb;
                    }
                    button {
                        width: 80px;
                        height: 40px;
                        line-height: 40px;
                    }
                    span {
                        margin-right: 20px;
                        display: inline-block;
                        width: 90px;
                        font-size: 14px;
                        color: #464646;
                    }
                    .confirm {
                        background-color: #3490f0;
                        border-color: #3490f0;
                        /* border: none; */
    /*     
    border-radius: 5px;
    color: aliceblue;
    font-size: 14px;
    margin-left: 90px */
    /* } */
    /* .cancel {
    margin-left: 30px;
    background-color: hsl(4, 86%, 57%);
    border-color: hsl(4, 86%, 57%);
    /* border: none; */
    /* border-radius: 5px;
    color: aliceblue;
    font-size: 14px; */
    /* } */
    /* .ivu-select-selection {
    height: 40px;
    .ivu-select-placeholder {
        height: 40px;
    }
}
.ivu-select-item {
    height: 40px;
    line-height: 40px
}
.Language {
    display: inline-block;
    width: 300px;
    height: 60px;
}
.gender {
    display: inline-block;
    width: 300px;
    height: 60px;
}

}
.captcha {
    position: relative;
    .capchaImg {
        width: 80px;
        height: 38px;
        position: absolute;
        right: 75px;
        top: 13px;
        z-index: 10
    }
}

}

}

} */
</style>