<template>
    <div>
        <p class="title">&nbsp&nbsp&nbsp&nbsp用户中心/账户安全</p>
        <div class="account">
            <p><span class="data">账户安全&nbsp&nbsp&nbsp&nbsp</span><span class="tips">| 建议您启动全部安全设置，以保障账号及资金安全。</span></p>
            <div class="updataInform">
                <ul class="information">
                    <li style="background-color:#eeeeee" ></li>
                    <li >
                        <div class="left">
                            <span class="el-icon-view" style="background-color:#14b1bb;"></span>
                            <div>
                                <p class="loginPass">登录密码</p>
                                <p class="security">强度高的密码更安全，建议您使用字母、数字、混合大小写、特殊符号等进行组合</p>
                            </div>
                        </div>
                        <el-dialog
                        title="修改登录密码"
                        :visible.sync="loginpass"
                        width="31%"
                        center>
                        <p style="height:40px;lineHeight:40px;margin:0px 0px 10px 0px;padding:0px;backgroundColor:rgb(255,234,178);color:rgb(255,178,123);border-radius:8px"><span class="el-icon-warning"></span>温馨提示: 密码长度在6～16位之间，定期修改登录密码保障您的帐户安全</p>
                         <el-form :model="ruleForm1" status-icon :rules="rules" ref="ruleForm1" label-width="80px" class="demo-ruleForm">
                            <el-form-item label="密码" prop="firstPass">
                              <el-input type="password" v-model="ruleForm1.firstPass" autocomplete="off" placeholder="密码长度最少六位"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="secondPass">
                              <el-input type="password" v-model="ruleForm1.secondPass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                              <el-button type="primary" @click="submitPass" style="marginLeft:40px;">提交</el-button>
                              <el-button type="info" @click="resetForm1('ruleForm1')">重置</el-button>
                            </el-form-item>
                          </el-form>
                        </el-dialog>
                        <el-button type="text" @click="loginpass = true" style="width:67px;height:37px;">修改</el-button>
                    </li>
                    <li>
                        <div class="left">
                            <span class="el-icon-menu" style="background-color:#d7d7d7;"></span>     
                            <div>
                                <p class="moneyPass">资金密码</p>
                                <p class="drawing">非常重要！用于提款或转账时验证身份</p>
                            </div>
                        </div>  
                        <el-dialog
                        title="修改资金密码"
                        :visible.sync="payPass"
                        width="31%"
                        center>
                        <p style="height:40px;lineHeight:40px;margin:0px 0px 10px 0px;padding:0px;backgroundColor:rgb(255,234,178);color:rgb(255,178,123);border-radius:8px"><span class="el-icon-warning"></span>温馨提示: 第一次修改不用输入旧密码 , 资金密码为6位数字</p>
                        <!-- <p style="marginLeft:40px;"><span style="display:inline-block;width:100px;">旧密码 :</span><input type="password" v-model="oldPass" style="height:30px"></p>
                        <p style="marginLeft:40px;"><span style="display:inline-block;width:100px;">新密码 :</span><input type="password" v-model="payPass1" style="height:30px"></p>
                        <p style="marginLeft:40px;"><span style="display:inline-block;width:100px;">再次输入 :</span><input type="password" v-model="payPass2" style="height:30px"></p>
                        <span slot="footer" class="dialog-footer" style="padding:0px;">
                            <el-button @click="payPass = false" style="backgroundColor:rgb(162,165,169);color:#fff">取 消</el-button>
                            <el-button type="success" @click="submitPay" style="backgroundColor:rgb(64,158,255);color:#fff">确 定</el-button>
                            
                        </span> -->
                        <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
                            <el-form-item label="旧密码" prop="oldPass">
                                        <el-input type="password" v-model="ruleForm2.oldPass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码" prop="newPass">
                              <el-input type="password" v-model="ruleForm2.newPass" autocomplete="off" placeholder="密码长度六位"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="surePass">
                              <el-input type="password" v-model="ruleForm2.surePass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                              <el-button type="primary" @click="submitPay"  style="marginLeft:40px;">提交</el-button>
                              <el-button type="info" @click="resetForm2('ruleForm2')">重置</el-button>
                            </el-form-item>
                          </el-form>
                        </el-dialog>
                        <el-button type="text" @click="payPass = true" style="width:67px;height:37px;">修改</el-button>
                    </li>
                    <li >
                        <div class="left">
                            <span class="el-icon-tickets" style="background-color:#d7d7d7;"></span>
                            <div>
                                <p class="passQues">密保问题</p>
                                <p class="verification">用于找回密码，修改账户资料时验证身份</p>
                            </div>
                        </div>
                         <el-dialog
                        title="修改密保问题"
                        :visible.sync="securityQues"
                        width="31%"
                        center>
                        <p style="height:40px;lineHeight:40px;margin:0px 0px 10px 0px;padding:0px;backgroundColor:rgb(255,234,178);color:rgb(255,178,123);border-radius:8px"><span class="el-icon-warning"></span>温馨提示: 设定您的密保问题，用于找回密码，修改账户资料时验证身份</p>
                        <!-- <p style="marginLeft:40px;"><span style="display:inline-block;width:100px;">密保问题 :</span><select style="height:30px;width:150px;" v-model="question"><option style="height:30px" v-for="item in questionList">{{item.SafeQuestionName}}</option></select></p>
                        <p style="marginLeft:40px;"><span style="display:inline-block;width:100px;">答案 :</span><input type="text" style="height:25px" v-model="answer"></p>
                        <span slot="footer" class="dialog-footer" style="padding:0px;">
                            <el-button @click="securityQues = false" style="backgroundColor:rgb(162,165,169);color:#fff">取 消</el-button>
                            <el-button type="success" @click="submitQues" style="backgroundColor:rgb(64,158,255);color:#fff">确 定</el-button>
                        </span> -->
                        <el-form :model="ruleForm3" status-icon :rules="rules" ref="ruleForm3" label-width="80px" class="demo-ruleForm">
                                <el-form-item label="安全问题" prop="question">
                                        <el-select v-model="ruleForm3.question" placeholder="请选择安全问题">
                                          <el-option v-for="(item,index) in questionList" :key="index" :value="item.SafeQuestionName"></el-option>
                                        </el-select>
                                </el-form-item>
                                <el-form-item label="答案" prop="answer">
                                        <el-input v-model="ruleForm3.answer"></el-input>
                                </el-form-item>
                                <el-form-item>
                                  <el-button type="primary" @click="submitQues"  style="marginLeft:40px;">提交</el-button>
                                  <el-button type="info" @click="resetForm3('ruleForm3')">重置</el-button>
                                </el-form-item>
                              </el-form>
                        </el-dialog>
                        <el-button type="text" @click="quesShow" style="width:67px;height:37px;">修改</el-button>
                    </li>
                    <li >
                        <div class="left">
                            <span class="el-icon-message" style="background-color:#d7d7d7;"></span>
                            <div>
                                <p class="bindingEmail">绑定邮箱</p>
                                <p class="service">绑定邮箱可增加账号安全级别，在确保邮箱正常的情况下可提供安全验证服务</p>
                            </div>
                        </div>
                        <el-dialog
                        title="绑定邮箱"
                        :visible.sync="bindingEmail"
                        width="31%"
                        center>
                        <p style="height:40px;lineHeight:40px;margin:0px 0px 10px 0px;padding:0px;backgroundColor:rgb(255,234,178);color:rgb(255,178,123);border-radius:8px"><span class="el-icon-warning"></span>温馨提示: 绑定邮箱可增加账号安全级别，可提供安全验证服务</p>
                        <el-form :model="ruleForm4" status-icon :rules="rules" ref="ruleForm4" label-width="80px" class="demo-ruleForm">
                                <el-form-item
                                    prop="email"
                                    label="邮箱"
                                    :rules="[
                                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                                    ]"
                                >
                                    <el-input v-model="ruleForm4.email"></el-input>
                                </el-form-item>
                                <el-form-item>
                                  <el-button type="primary" @click="submitEmail"  style="marginLeft:40px;">提交</el-button>
                                  <el-button type="info" @click="resetForm4('ruleForm4')">重置</el-button>
                                </el-form-item>
                        </el-form>
                        <!-- <p style="marginLeft:40px;"><span style="display:inline-block;width:100px;">电子邮箱 :</span><input type="eamil" style="height:25px"  v-model="email"></p>
                        <span slot="footer" class="dialog-footer" style="padding:0px;">
                            <el-button @click="bindingEmail = false" style="backgroundColor:rgb(162,165,169);color:#fff">取 消</el-button>
                            <el-button type="success" @click="submitEmail" style="backgroundColor:rgb(64,158,255);color:#fff">确 定</el-button>
                        </span> -->
                        </el-dialog>
                        <el-button type="text" @click="bindingEmail = true" style="width:67px;height:37px;">修改</el-button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm1.secondPass !== '') {
                        this.$refs.ruleForm1.validateField('secondPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm1.firstPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validatePass3 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.surePass !== '') {
                        this.$refs.ruleForm2.validateField('surePass');
                    }
                    callback();
                }
            };
            var validatePass4 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm1: {
                    firstPass: '',
                    secondPass: '',
                    surePass: '',
                },
                ruleForm2:{
                    oldPass: '',
                    newPass: '',
                },
                ruleForm3:{
                    question: '',
                    answer: '',
                },
                ruleForm4:{
                    email: '',
                },
                rules: {
                    firstPass: [{
                        required: true,
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    secondPass: [{
                        required: true,
                        validator: validatePass2,
                        trigger: 'blur'
                    }],
                     oldPass: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }],
                    newPass: [{
                        required: true,
                        validator: validatePass3,
                        trigger: 'blur'
                    }],
                    surePass: [{
                        required: true,
                        validator: validatePass4,
                        trigger: 'blur'
                    }],
                     question: [{
                        required: true,
                        message: "请选择安全问题",
                        trigger: 'change'
                    }],
                    answer: [{
                        required: true,
                        message: "请输入答案",
                        trigger: 'blur'
                    }],
                },
                loginpass: false,
                payPass: false,
                securityQues: false,
                bindingPhone: false,
                bindingEmail: false,
                username: window.localStorage.getItem('username'),
                questionList: []
            };
        },
        created() {

        },
        methods: {
            // 修改玩家密码
            submitPass() {
                this.loginpass = false
                this.$api.apitest.submitPass(this.username, this.ruleForm1.firstPass, this.ruleForm1.secondPass).then(response => {

                    this.$message.success("修改成功")
                }).catch(error => {
                    // console.log(error.response.msg)
                    if (error.response.data.msg) {
                        this.$message.error(error.response.data.msg)
                    } else {

                    }

                })
            },
            //修改资金密码
            submitPay() {
                this.payPass = false
                this.$api.apitest.submitPay(this.username,
                    this.ruleForm2.oldPass,
                    this.ruleForm2.newPass,
                    this.ruleForm2.surePass
                ).then(response => {
                    this.$message.success("修改成功")
                }).catch(error => {
                    console.log(error.response)
                    if (error.response.data.msg) {
                        this.$message.error(error.response.data.msg)
                    } else {

                    }
                })
            },
            // (获取密保问题)
            quesShow() {
                this.securityQues = true
                this.$api.apitest.getPassQues().then(response => {
                    console.log(response)
                    this.questionList = response.data.results
                }).catch(error => {

                })
            },
            // 修改密保问题
            submitQues() {
                this.securityQues = false
                this.$api.apitest.submitQues(this.username,
                    this.ruleForm3.question,
                    this.ruleForm3.answer
                ).then(response => {
                    this.$message.success("修改成功")
                }).catch(error => {
                    if (error.response.data.msg) {
                        this.$message.error(error.response.data.msg)
                    } else {

                    }
                })

            },
            // 修改邮箱
            submitEmail() {
                this.bindingEmail = false
                this.$api.apitest.submitEmail(this.username, this.ruleForm4.email).then(response => {
                    this.$message.success("修改成功")
                }).catch(error => {
                    if (error.response.data.msg) {
                        this.$message.error(error.response.data.msg)
                    } else {

                    }
                })
            },
            resetForm1(formName) {
                this.$refs[formName].resetFields();
            },
            resetForm2(formName) {
                this.$refs[formName].resetFields();
            },
            resetForm3(formName) {
                this.$refs[formName].resetFields();
            },
            resetForm4(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }
</script>
<style lang="scss" scoped>
    .title {
        display: inline-block;
        width: 100%;
        height: 30px;
        line-height: 30px;
        color: #666;
        font-weight: bold;
        border-bottom: 1px solid #eeeeee;
        font-size: 12px;
    }
    
    .account {
        // height: 50px;
        // line-height: 50px;
        border: 1px solid #eeeeee;
        margin: 0px 12px 12px 12px;
        p {
            padding-left: 15px;
            .data {
                font-size: 14px;
                color: #666666;
            }
            .tips {
                font-size: 14px;
                color: #7f7f7f;
            }
        }
        .updataInform {
            padding: 11px 15px 25px 17px;
            /* margin-top: -3px; */
            width: 96.8%;
            /* height: 723px; */
            border: 1px solid #eeeeee;
            .information {
                padding: 0px;
                margin: 0px;
                list-style: none;
                li {
                    width: 100%;
                    height: 100px;
                    border: 1px solid #eeeeee;
                    margin-bottom: 15px;
                    border-radius: 15px;
                    display: flex;
                    justify-content: space-between;
                    .left {
                        display: flex;
                        span {
                            display: inline-block;
                            width: 65px;
                            height: 65px;
                            line-height: 65px;
                            text-align: center;
                            color: #fff;
                            font-size: 35px;
                            margin-left: 30px;
                            margin-top: 18px;
                            border-radius: 8px;
                        }
                        .loginPass {
                            font-weight: 400;
                            font-size: 15px;
                            height: 50px;
                            line-height: 50px;
                            margin: 0px;
                        }
                        .security {
                            font-size: 13px;
                            color: gray;
                            height: 50px;
                            line-height: 50px;
                            margin: 0px;
                        }
                        .moneyPass {
                            font-weight: 400;
                            font-size: 15px;
                            height: 50px;
                            line-height: 50px;
                            margin: 0px;
                        }
                        .drawing {
                            font-size: 13px;
                            color: gray;
                            height: 50px;
                            line-height: 50px;
                            margin: 0px;
                        }
                        .passQues {
                            font-weight: 400;
                            font-size: 15px;
                            height: 50px;
                            line-height: 50px;
                            margin: 0px;
                        }
                        .verification {
                            font-size: 13px;
                            color: gray;
                            height: 50px;
                            line-height: 50px;
                            margin: 0px;
                        }
                        .bindingEmail {
                            font-weight: 400;
                            font-size: 15px;
                            height: 50px;
                            line-height: 50px;
                            margin: 0px;
                        }
                        .service {
                            font-size: 13px;
                            color: gray;
                            height: 50px;
                            line-height: 50px;
                            margin: 0px;
                        }
                    }
                    .el-dialog__header{
                        background-color: rgb(33,41,60);
                        .el-dialog__title{
                            color:#fff;
                        }
                        .el-icon-close{
                            color:#fff;
                        }
                    }
                    .el-dialog__body {
                        height:300px;
                        .el-form {
                            width: 400px;
                            margin:0 auto;
                            margin-top:50px;
                            .el-form-item {
                                .el-form-item__content {
                                    .el-select {
                                        width: 320px;
                                    }
                                }
                            }
                        }
                    }
                    button {
                        margin-top: 30px;
                        margin-right: 15px;
                        background-color: #ffffff;
                        border: 1px solid #C9C9C9;
                        color: #555;
                        border-radius: 2px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>