<template>
    <div>
        <p class="title">&nbsp&nbsp&nbsp&nbsp用户中心/银行卡管理</p>
        <div class="settingCard">
            <h3 class="setTitle">银行卡管理</h3>
            <div class="addCard">
                <div class="Ttitle">
                    <p>温馨提示</p>
                    <p>每个平台账号最多绑定<span style="color:#ff8761">5</span>张，新绑定的银行卡需要<span style="color:#ff8761">0</span>个小时才能正常取款</p>
                    <p>所有绑定银行账户名<span style="color:#ff8761">必须相同</span></p>
                </div>
                <div class="cards" v-show="bankShow">
                    <img src="../assets/images/timg.jpg">
                    <p class="bankMess"><span>{{this.ActualName}}</span><span>{{this.Bank}}</span><span>&nbsp尾号{{this.BankCardNum}}</span></p>
                </div>
                <div class="card">
                    <router-link to="/userCenter/addCard" style="text-decoration:none;">
                        <span class="el-icon-circle-plus" ></span>
                        <p>添加银行卡</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                ActualName:'',
                Bank:'',
                BankCardNum:'',
                bankShow:false
            }
        },
        created() {
             this.$api.apitest.getbackcardetail().then(response=>{
                //  console.log(response)
                    this.ActualName= response.data.results.ActualName
                    this.Bank= response.data.results.Bank
                    this.BankCardNum= response.data.results.BankCardNum.substr(15,4)
                    if(this.BankCardNum != null){
                        this.bankShow = true
                    }
                }).catch(error=>{
                    
                })
        },
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
        height:310px;
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
            display:flex;
            flex-wrap:wrap;
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
            .cards{
                width:210px;
                height:125px;
                text-align:center;
                background-color:#f8f8f8;
                border:1px dashed #e6e6e6;
                margin-left:25px;
                box-sizing:border-box;
                box-shadow:0px 0px 5px;
                padding-top:40px;
                img{
                    width:49px;
                    height:32px;
                }
                .bankMess{
                    color:#5fb878;
                    font-size:12px;
                }
            }
            .card{
                width:210px;
                height:125px;
                text-align:center;
                background-color:#f8f8f8;
                border:1px dashed #e6e6e6;
                margin-left:25px;
                padding-top:40px;
                box-sizing:border-box;
                box-shadow:0px 0px 5px;
                p{
                    font-size:13px;
                    color:#8f8f8f;
                }
                span{
                     color:#8f8f8f;
                }
            }
        }
    }
</style>