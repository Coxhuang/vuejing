<template>
    <div class="dialog-container">
        <el-dialog
                title="充值"
                :visible.sync="visible"
                 @close="$emit('update:show', false)"
                  :show="show"
                width="40%"
                center>
                <div class="rech" style="display:flex" v-show="rechShow">
                    <div class="recLeft" style="textAlign:center;borderRight:1px solid #ccc">
                        <p>
                         <el-select v-model="payWay" placeholder="请选择" style="width:300px">
                            <el-option
                            v-for="item in listWay"
                            :key="item "
                            :label="item"
                            :value="item">
                            </el-option>
                         </el-select>
                        </p>
                        <p>
                        <el-input
                        placeholder="请选择金额"
                        v-model="rechargeMoney"
                        style="width:300px"
                        :disabled="true">
                        </el-input>
                        </p>
                        <div class="recLeft-btn" style="display:flex;flex-wrap:wrap;">
                            <el-radio-group v-model="rechargeMoney">
                                <el-radio-button label="100" style="borderLeft:none;"></el-radio-button>
                                <el-radio-button label="500"></el-radio-button>
                                <el-radio-button label="2000"></el-radio-button>
                                <el-radio-button label="5000"></el-radio-button>
                                <el-radio-button label="20000"></el-radio-button>
                                <el-radio-button label="50000"></el-radio-button>
                            </el-radio-group>
                        </div>
                        <el-button type="info" class="success" style="width:98%;" @click="submitReC">确认</el-button>
                    </div>
                    <div style="marginLeft:20px">
                        <p><span class="el-icon-warning" style="color:#999">温馨提示</span></p>
                        <p style="fontSize:12px;borderBottom:1px solid #ccc;paddingBottom:20px;color:#666">
                            单次充值金额最低 <span style="color:rgb(255,172,145)">100</span> 元，最高 <span style="color:rgb(255,172,145)">50000</span> 元
                         </p>
                         <p><span class="el-icon-star-on" style="color:#999">优惠活动</span></p>
                         <p style="color:#666;fontSize:12px">暂无优惠活动</p>
                    </div>
                </div>
                <!-- <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="centerDialogVisible1 = false">确 定</el-button>
                </span> -->
                <div class="payFor" v-show="payShow">
                    <P class="title"><span class="title-s" @click="btnTitle"><<重新选择支付方式</span></P>
                    <div>
                        <p class="remind">您的充值申请已提交，请在<span style="color:#ff5925">30分钟</span>内完成支付！</p>
                        <p class="paytitle"><span>充值方式：{{this.payWay}}扫码 </span>&nbsp&nbsp<span>充值金额 : {{this.rechargeMoney}}</span></p>
                        <div class="ewm">
                            <img :src="this.dataSrc">
                            <p class="smpay">请扫码支付</p>
                            <p class="payti">当您完成支付请耐心等待几分钟，进入资金管理>帐变明细可查看到账情况</p>
                        </div>
                    </div>
                </div>
                </el-dialog>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                payWay: '',
                visible:this.show,
                rechShow:true,
                payWay:'',
                token:window.localStorage.getItem('token'),
                rechargeMoney:'',
                rechargeMoney:'',
                payShow:false,
                listWay:[],
                dataSrc:''
            }
        },
        props:{
            show:{
                type: Boolean,
                default: false
            }
        },
        watch:{
            show () {
                this.visible = this.show;
            }
        },
        created() {
            if(this.token){
                this.$api.apitest.checktoken(this.token).then(response => {
                  this.getListway()
                }).catch(error=>{
                    
                })
            }
        },
        methods:{
            // 获取充值方式
            getListway() {
                this.$api.apitest.getListway().then(response => {
                    console.log(response)
                    this.listWay = response.data.codes
                }).catch(error => {

                })
            },
            // 充值
            submitReC() {
                if(this.payWay=="支付宝"){
                    this.payWay = 'ALIPAY'
                    this.$api.apitest.PayFor(this.payWay,this.rechargeMoney).then(response => {
                        console.log(response)
                        this.dataSrc = response.data.qrcode
                        this.rechShow = false
                        this.payShow = true
                        this.payWay = "支付宝"
                    }).catch(error => {

                    })
                }else if(this.payWay=="支付宝WAP"){
                    this.payWay = 'ALIPAYWAP'
                    this.$router.push({
                        path:'/payWay',
                        query:{
                            paycode:this.payWay,
                            paynum:this.rechargeMoney
                        }
                    })
                }else if(this.payWay=="微信"){
                    this.payWay = 'WEIXIN'
                     this.$api.apitest.PayFor(this.payWay,this.rechargeMoney).then(response => {
                        // console.log(response)    
                        this.dataSrc = response.data.qrcode
                        this.rechShow = false
                        this.payShow = true
                        this.payWay = "微信"
                    }).catch(error => {

                    })
                }else if(this.payWay=="微信WAP"){
                    this.payWay = 'WEIXINWAP'
                    this.$router.push({
                        path:'/payWay',
                        query:{
                            paycode:this.payWay,
                            paynum:this.rechargeMoney
                        }
                    })
                }
            },
            // 重新选取支付方式
            btnTitle(){
                 this.payShow = false
                 this.rechShow = true
            },
        }
    }
</script>
<style lang="scss" >
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
    //    background-color: #fff !important;
                .rech {
                    .recLeft {
                        width: 350px;
                        p{
                            margin-bottom:15px
                        }
                        .recLeft-btn {
                            .el-radio-group {
                                .el-radio-button {
                                    margin-left: 10px;
                                    margin-bottom: 10px;
                                    border-left:1px solid #dcdfe6;
                                   
                                }
                              
                            }
                        }
                        
                    }
                }
                .payFor{
                    .title{
                        margin:0px;
                        color:#1e9fff;
                        height:50px;
                        line-height:50px;
                        border-top:1px solid #f6f6f6;
                        border-bottom:1px solid #f6f6f6;
                        .title-s{
                            cursor:pointer;
                        }
                    }
                    div{
                        .remind{
                            font-size:20px;
                            color:#999;
                            text-align:center;
                            margin-bottom:10px;
                        }
                        .paytitle{
                            text-align:center;
                             margin-bottom:10px;
                        }
                        .ewm{
                             text-align:center;
                            img{
                                padding:10px;
                                width:207px;
                                height:207px;
                                box-shadow:0 0 5px
                            }
                            .smpay{
                                margin-top:5px;
                                color:#ff5925
                            }
                            .payti{
                                margin-top:8px;
                                color:#ff5925
                            }
                        }
                    }
                }
                
            }
</style>