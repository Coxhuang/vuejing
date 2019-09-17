<template>
    <div>
        <p class="title">&nbsp&nbsp&nbsp&nbsp用户中心/银行卡管理/添加银行卡</p>
        <div class="settingCard">
            <p class="setTitle">银行卡管理</p>
            <div class="addCard">
                <div class="Ttitle">
                    <p>温馨提示</p>
                    <p>每个平台账号最多绑定5张，新绑定的银行卡需要0个小时才能正常取款</p>
                    <p>所有绑定银行账户名必须相同</p>
                </div>
                <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                    <el-form-item label="银行卡号" prop="bankNum">
                        <el-input v-model="form.bankNum"></el-input>
                    </el-form-item>
                    <el-form-item label="开户行" prop="bankName">
                        <el-select v-model="form.bankName" placeholder="请选择银行">
                            <el-option label="工商银行" value="工商银行"></el-option>
                            <el-option label="农业银行" value="农业银行"></el-option>
                            <el-option label="建设银行" value="建设银行"></el-option>
                            <el-option label="中国银行" value="中国银行"></el-option>
                            <el-option label="招商银行" value="招商银行"></el-option>
                            <el-option label="中国邮政" value="中国邮政"></el-option>
                            <el-option label="工商银行" value="工商银行"></el-option>
                            <el-option label="交通银行" value="交通银行"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">立即添加</el-button>
                        <el-button @click="back">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            const checkNum = /^([1-9]{1})(\d{14}|\d{18})$/
            const validateNum = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('请输入银行卡号'));
                } else if (!checkNum.test(value)) {
                    callback(new Error('请输入正确银行卡号'));
                }
            };
            return{
               form:{
                    bankNum:'',
                    bankName:'',
               },
               username:window.localStorage.getItem('username'),
               rules: {
                bankNum: [{
                         validator: validateNum,
                         trigger: 'blur'
                }],
                bankName: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
              }
            }
        },
        created() {
            // this.axios.get('/api/Operation/listPayCode').then(response=>{
            //     console.log(response)
                
            // }).catch(error=>{

            // })
        },
        methods:{
            // 添加银行卡
            submit(){
                this.$api.apitest.addBankCard(this.username,this.form.bankNum,this.form.bankName).then(response=>{
                    this.$message.success("绑定成功")
                    this.$router.push({
                        path:'/userCenter/bankCard'
                    })
                    this.bankNum = ''
                    this.bankName = ''
                }).catch(error=>{
                    if (error.response.data.msg) {
                            this.$message.error(error.response.data.msg)
                    } else {
                            this.$message.error(JSON.stringify(error.response.data))
                    }
                    // this.$message("添加失败")
                   this.$router.push({
                        path:'/userCenter/userData'
                    })
                })
            },
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>
<style lang="scss" scoped>
     .title{
        display:inline-block;
        width:100%;
        height:30px;
        line-height:30px;
        color:#666;
        border-bottom:1px solid #e6e6e6;
        font-size:12px;
        font-weight:bold;
    }
    .settingCard{
        height:380px;
        width:98%;
        border:1px solid #e6e6e6;
        margin-top:10px;
        margin-left:10px;
        .setTitle{
            height:60px;
            line-height:60px;
            margin:0px;
            border-bottom:1px solid #e6e6e6;
            color:#333333;
            font-size:14px;
            padding-left:17px;
        }
        .addCard{
            .Ttitle{
                width:98%;
                height:97px;
                margin:10px;
                border:1px solid #e6e6e6;
                border-left:5px solid #e6e6e6;
                p{
                    margin:10px 0px 0px 10px ;
                    font-size:12px;
                    color:#666666;
                }
            }
            .el-form{
               width:500px;
               margin:0 auto;
            }
        }
    }
</style>