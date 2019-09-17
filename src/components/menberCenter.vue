<template>
    <div>
        <div class="top">
            <div class="recharge">
                <div class="recharge-t">
                    <span class="addMoney">总资产</span>
                    <span class="el-icon-refresh" style="line-height:54px; cursor: pointer;" @click="resAssets"></span>
                </div>
                <div class="recharge-b">
                    <div class="recharge-b-l">
                        <span class="money">{{this.Assets}}</span>
                        <span class="blance">总资产</span>
                    </div>
                     <c-dialog :show.sync="show"></c-dialog>
                     <button class="recharge-b-r"  @click="open">充值</button>
                </div>
            </div>
            <div class="putForward">
                <div class="putForward-t">
                    <span class="addMoney">钱包</span>
                    <span class="el-icon-refresh" style="line-height:54px; cursor: pointer;" @click="resWallet"></span>
                </div>
                <div class="putForward-b">
                    <div class="putForward-b-l">
                        <span class="money">{{this.wallet}}</span>
                        <span class="blance">可提现金额</span>
                    </div>
                     <t-dialog :show.sync="tshow"></t-dialog>
                     <button class="putForward-b-r" @click="openT">提现</button>
                </div>
            </div>
            <div class="locking">
                <div class="locking-t">
                    <span class="addMoney">余额</span>
                    <span class="el-icon-refresh" style="line-height:54px; cursor: pointer;"></span>
                </div>
                <div class="locking-b">
                    <div class="locking-b-l">
                        <span class="money">{{this.wallet}}</span>
                        <span class="blance">可用余额</span>
                    </div>
                     <button class="locking-b-r">明细</button>
                </div>
            </div>
        </div>
      
        <div class="foot">
            <div class="dateMess"><span>个人数据总览</span><div><button>今日</button><button>昨日</button><button>最近七天</button><button>最近三十天</button></div></div>
            <div class="foot-b">
                <div class="capitalMess">
                    <span class="el-icon-plus"></span>
                    <div>
                        <span style="color:#666;fontSize:14px;">充值</span>
                        <span style="color:#ffb800;fontSize:14px;margin-top:10px">0.00</span>
                    </div>
                </div>
                <div class="capitalMess">
                    <span class="el-icon-tickets"></span>
                    <div>
                        <span style="color:#666;fontSize:14px;">提现</span>
                        <span style="color:#ffb800;fontSize:14px;margin-top:10px">0.00</span>
                    </div>
                </div>
                <div class="capitalMess">
                    <span class="el-icon-news"></span>
                    <div>
                        <span style="color:#666;fontSize:14px;">投注</span>
                        <span style="color:#ffb800;fontSize:14px;margin-top:10px">0.00</span>
                    </div>
                </div>
                <div class="capitalMess">
                    <span class="el-icon-star-off"></span>
                    <div>
                        <span style="color:#666;fontSize:14px;">派奖</span>
                        <span style="color:#ffb800;fontSize:14px;margin-top:10px">0.00</span>
                    </div>
                </div>
                <div class="capitalMess">
                    <span class="el-icon-menu"></span>
                    <div>
                        <span style="color:#666;fontSize:14px;">佣金</span>
                        <span style="color:#ffb800;fontSize:14px;margin-top:10px">0.00</span>
                    </div>
                </div>
                <div class="capitalMess">
                    <span class="el-icon-sort-up"></span>
                    <div>
                        <span style="color:#666;fontSize:14px;">返水</span>
                        <span style="color:#ffb800;fontSize:14px;margin-top:10px">0.00</span>
                    </div>
                </div>
                <div class="capitalMess">
                    <span class="el-icon-service"></span>
                    <div>
                        <span style="color:#666;fontSize:14px;">活动</span>
                        <span style="color:#ffb800;fontSize:14px;margin-top:10px">0.00</span>
                    </div>
                </div>
                <div class="capitalMess">
                    <span class="el-icon-sort"></span>
                    <div>
                        <span style="color:#666;fontSize:14px;">总盈亏</span>
                        <span style="color:#ffb800;fontSize:14px;margin-top:10px">0.00</span>
                    </div>
                </div>
            </div>
        </div>
    </div>   
</template>
<script>
    import $ from 'jquery'
    import cDialog from './cdialog';
    import tDialog from './tdialog';
    export default {
        data() {
            return {
                payWay: '',
                // id: window.localStorage.getItem('id'),
                Assets: 0,
                wallet: 0,
                rechargeMoney: 0,
                cashMoney: 0,
                isShow: false,
                rechShow: true,
                payShow: false,
                listWay: [],
                dataSrc: '',
                ActualName: '',
                Bank: '',
                BankCardNum: '',
                txtPassword: '',
                show: false,
                tshow:false
            };
        },
        created() {
            // 获取钱包总资产
            this.getAssets()
                // 获取钱包余额
            this.getWallet()
        },
        methods: {
            // 显示充值框
            open() {
                this.show = true;
            },
            openT(){
                this.tshow =true
            },
            // 获取总资产
            getAssets() {
                this.$api.apitest.getAssets().then(response => {
                    // console.log(response)
                    this.Assets = response.data.results

                }).catch(error => {

                })
            },
            // 获取钱包余额
            getWallet() {
                this.$api.apitest.getWallet().then(response => {
                    // console.log(response)
                    this.wallet = response.data.results
                }).catch(error => {

                })
            },
               // 刷新总资产
            resAssets() {
                this.getAssets()
            },
            // 刷新钱包余额
            resWallet() {
                this.getWallet()
            }
         
        },
        components: {
            cDialog,
            tDialog
        }
    };
</script>
<style lang="scss" scoped>
    .top {
        padding: 15px;
        display: flex;
        width: 100%;
        box-sizing:border-box;
        .recharge {
            width: 33.33333%;
            border: 1px solid #eeeeee;
            height: 158px;
            margin-right: 15px;
            .recharge-t {
                border-bottom: 1px solid #eeeeee;
                height: 54px;
                line-height: 54px;
                display: flex;
                justify-content: space-between;
                padding: 0 18px;
                .addMoney {
                    color: #787878;
                    font-size: 12px;
                }
            }
            .recharge-b {
                height: 104px;
                display: flex;
                justify-content: space-between;
                padding: 0px 16px;
                .recharge-b-l {
                    display:flex;
                    flex-direction:column;
                    .money {
                         display:inline-block;
                        font-size: 25px;
                        color: #666666;
                        height:52px;
                        line-height:52px;
                    }
                    .blance {
                        display:inline-block;
                        font-size: 12px;
                        color: #9a9a9a;
                        height:52px;
                        line-height:52px;
                    }
                }
                .recharge-b-r {
                    margin-top: 32px;
                    width: 65px;
                    height: 40px;
                    background-color: #ff5722;
                    border: none;
                    color: #fff;
                     cursor: pointer;
                }
            }
            .el-dialog__body {
                .rech {
                    .recLeft {
                        width: 350px;
                        .recLeft-btn {
                            .el-radio-group {
                                .el-radio-button {
                                    margin-left: 10px;
                                    margin-bottom: 10px;
                                }
                            }
                        }
                    }
                }
                .payFor {
                    .title {
                        margin: 0px;
                        color: #1e9fff;
                        height: 50px;
                        line-height: 50px;
                        border-top: 1px solid #f6f6f6;
                        border-bottom: 1px solid #f6f6f6;
                        .title-s {
                            cursor: pointer;
                        }
                    }
                    div {
                        .remind {
                            font-size: 20px;
                            color: #999;
                            text-align: center;
                        }
                        p {
                            text-align: center;
                        }
                        .ewm {
                            text-align: center;
                            img {
                                padding: 10px;
                                width: 207px;
                                height: 207px;
                                box-shadow: 0 0 5px
                            }
                        }
                    }
                }
            }
        }
        .putForward {
            width: 31.33333%;
            border: 1px solid #eeeeee;
            height: 158px;
            margin-right: 15px;
            .putForward-t {
                border-bottom: 1px solid #eeeeee;
                height: 54px;
                line-height: 54px;
                display: flex;
                justify-content: space-between;
                padding: 0 18px;
                .addMoney {
                    color: #787878;
                    font-size: 12px;
                }
            }
            .putForward-b {
                height: 104px;
                // line-height:104px;
                display: flex;
                justify-content: space-between;
                padding: 0px 16px;
                .putForward-b-l {
                    display:flex;
                    flex-direction:column;
                    .money {
                        display:inline-block;
                        font-size: 25px;
                        color: #666666;
                         height:52px;
                        line-height:52px;
                    }
                    .blance {
                        display:inline-block;
                        font-size: 12px;
                        color: #9a9a9a;
                         height:52px;
                        line-height:52px;
                    }
                }
                .putForward-b-r {
                    margin-top: 32px;
                    width: 65px;
                    height: 40px;
                    background-color: #1e9fff;
                    border: none;
                    color: #fff;
                     cursor: pointer;
                }
            }
            .left {
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
            }
        }
        .locking {
            width: 31.33333%;
            border: 1px solid #eeeeee;
            height: 158px;
            .locking-t {
                border-bottom: 1px solid #eeeeee;
                height: 54px;
                line-height: 54px;
                display: flex;
                justify-content: space-between;
                padding: 0 18px;
                .addMoney {
                    color: #787878;
                    font-size: 12px;
                }
            }
            .locking-b {
                height: 104px;
                // line-height:104px;
                display: flex;
                justify-content: space-between;
                padding: 0px 16px;
                .locking-b-l {
                     display:flex;
                    flex-direction:column;
                    .money {
                        display:inline-block;
                        font-size: 25px;
                        color: #666666;
                         height:52px;
                        line-height:52px;
                    }
                    .blance {
                        display:inline-block;
                        font-size: 12px;
                        color: #999999;
                         height:52px;
                        line-height:52px;
                    }
                }
                .locking-b-r {
                    margin-top: 32px;
                    width: 65px;
                    height: 40px;
                    background-color: #ffb800;
                    border: none;
                    color: #fff;
                     cursor: pointer;
                }
            }
        }
    }
    
    .foot {
        height: 295px;
        width: 99%;
        border: 1px solid #e6e6e6;
        margin-left: 5px;
        .dateMess {
            height: 60px;
            line-height: 60px;
            padding: 0px 30px;
            display: flex;
            justify-content: space-between;
            span {
                color: #333333;
                font-size: 14px;
            }
            button {
                margin-left: 10px;
                border: none;
                outline: none;
                background-color: #eeeeee;
                color: #949494;
            }
        }
        .foot-b {
            height: 235px;
            padding: 20px;
            display: flex;
            flex-wrap: wrap;
            .capitalMess {
                display: flex;
                justify-content: space-between;
                width: 197px;
                height: 80px;
                // line-height:80px;
                background-color: #f9f9f9;
                border: 1px solid #e6e6e6;
                padding: 25px 25px 40px 20px;
                box-sizing: border-box;
                margin-right: 43px;
                >span {
                    display: inline-block;
                    font-size: 25px;
                    color: #666666;
                }
                div {
                    display: flex;
                    flex-direction: column;
                    margin-top: -10px;
                }
            }
        }
    }
</style>