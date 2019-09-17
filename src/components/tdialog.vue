<template>
  <div>
    <el-dialog title="提现" :visible.sync="visible" @close="$emit('update:show', false)" :show="show" width="40%" center>
      <div style="display:flex">
        <div class="left">
          <p>
            <span>提现账号</span>
            <select style="height:30px;width:200px;margin-left:8px;borderRadius:5px;border:1px solid #ccc;color:#666;">
              <option><span>{{this.ActualName}}</span><span>{{this.Bank}}</span><span>&nbsp尾号{{this.BankCardNum}}</span></option>
            </select>
          </p>
          <p><span>可用余额 : </span><span>{{this.wallet}}</span></p>
          <p><span>提现金额 : </span><input type="text" @blur="getCash" v-model="cashMoney" style="height:25px;width:95px;border:1px solid #ccc;paddingLeft:5px;borderRadius:5px">&nbsp元</p>
          <p v-show="isShow"><span>手续费</span><span style="color:rgb(255,172,145);marginLeft:15px">0.00</span><span
              style="marginLeft:30px">实际到账</span><span style="color:rgb(255,172,145);marginLeft:15px">{{parseFloat(this.cashMoney)}}</span></p>
          <!-- <p class="inputs"><span style="width:70px;lineHeight:42px">资金密码 : </span><input type="password" maxlength="1"
              @keyup="moveNext(this,0);" style="marginLeft:0px;"><input type="password" maxlength="1" @keyup="moveNext(this,1);"><input
              type="password" maxlength="1" @keyup="moveNext(this,2);"><input type="password" maxlength="1" @keyup="moveNext(this,3);"><input
              type="password" maxlength="1" @keyup="moveNext(this,4);"><input type="password" maxlength="1" @keyup="moveNext(this,5);"></p> -->
          <el-button type="info" class="success" style="width:100%;" @click="submitCash">确认</el-button>
        </div>
        <div style="marginLeft:20px;borderLeft:1px solid #ccc;paddingLeft:10px">
          <p><span class="el-icon-warning" style="color:#999"></span>温馨提示</p>
          <p>
            单笔提现最低<span style="color:rgb(255,172,145)">0</span>元,最高<span style="color:rgb(255,172,145)">50000</span>元
            您本次提现免手续费
          </p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
    import $ from 'jquery'
    export default {
        data() {
            return {
                visible: this.show,
                ActualName: '',
                Bank: '',
                token:window.localStorage.getItem('token'),
                BankCardNum: '',
                txtPassword: '',
                wallet: 0,
                cashMoney: 0,
                isShow: true,
            }
        },
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            show() {
                this.visible = this.show;
            }
        },
        created() {
            if(this.token){
                this.$api.apitest.checktoken(this.token).then(response => {
                    // 获取钱包余额
                    this.$api.apitest.getWallet().then(response => {
                        this.wallet = response.data.results
                    }).catch(error => {

                    })
                    this.Cash()
                }).catch(error=>{
                    
                })
                
            }
           
        },
        methods: {
            // 验证提现金额 失去焦点
            getCash() {
                this.isShow = true
                var regPrice = /^\d*\.{0,9}\d{0,9}$/;
                if (!regPrice.test(this.cashMoney)) {
                    this.$message("请输入正确金额")
                } else {

                }
            },
            // 显示银行卡
            Cash() {
                this.$api.apitest.getbackcardetail().then(response => {
                    // console.log(response)
                    this.ActualName = response.data.results.ActualName
                    this.Bank = response.data.results.Bank
                    this.BankCardNum = response.data.results.BankCardNum.substr(15, 4)
                }).catch(error => {

                })
            },
            // 资金密码获取焦点
            moveNext(obj, index) {
                let txt = $('.inputs input').eq(index).val()
                if (txt.length == 1) {
                    $('.inputs input').eq(index + 1).focus();
                }
            },
            // 确认提现
            submitCash() {
              console.log(this.cashMoney)
                // this.txtPassword = $('.inputs input').eq(0).val() + $('.inputs input').eq(1).val() + $('.inputs input').eq(2).val() + $('.inputs input').eq(3).val() + $('.inputs input').eq(4).val() + $('.inputs input').eq(5).val()
                // console.log(this.txtPassword)
                this.$api.apitest.submitCash(this.cashMoney).then(response => {
                        console.log(response)
                        this.$message.success(response.data.msg)
                        this.centerDialogVisible2 = false
                    }).catch(error => {
                        if (error.response.data.msg) {
                            this.$message.error(error.response.data.msg)
                        } else {
                            this.$message.error(JSON.stringify(error.response.data))
                        }
                    })
                // if (this.cashMoney <= this.wallet && this.cashMoney != 0) {
                    
                // } else {
                //     this.$message.warning("余额不足")
                // }
            },
        }
    }
</script>
<style lang="scss" >
    .el-dialog {
        .el-dialog__header {
            background-color: rgb(33,41,60);
            .el-dialog__title {
                color: #fff;
            }
            .el-icon-close {
                color: #fff;
            }
        }
        .el-dialog__body {
            // background-color: #fff !important;
            .left {
                width:60%;
                p {
                    margin-bottom: 20px;
                }
                .inputs {
                    display: flex;
                    input {
                        margin-left: 6px;
                        width: 38px;
                        height: 38px;
                        border-radius: 5px;
                        border: 1px solid #ccc;
                        text-align: center;
                        font-size: 22px;
                    }
                }
                .el-button{
                    margin-top:20px;
                }
            }
        }
    }
</style>