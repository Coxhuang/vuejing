<template>
  <el-container class="boxaaaaa">
    <el-header>
     
      <el-menu :default-active="activeIndex"  class="el-menu-demo xxxxx" mode="horizontal" background-color="#262626"
        text-color="#ffd04b" active-text-color="#ffd04b">
         <div style="height:60px;width:200px;position:absolute;top:0px;left:0px;z-index:999">
            <img src='@/assets/images/logo.png' alt="" style="width:200px;height:60px">
         </div>
        <el-menu-item index="1" >
          <router-link to="/home/match" style="text-decoration:none">电竞竞猜</router-link>
        </el-menu-item>
      </el-menu>
      <div class="btnss" style="height:60px;line-height: 60px;" v-show="$store.state.btnsShow">
            <router-link to="/home/register" style="text-decoration:none;color:#fff">
              <el-button style="background-color:#ff7200;border-color: #ff7200" type="primary">注册</el-button>
            </router-link>
            <router-link to="/home/login" style="text-decoration:none;color:#fff">
              <el-button style="background-color:#929292;border-color: #929292" type="success">登录</el-button>
            </router-link>
      </div>
      <div class="user" @mouseenter="enter" @mouseleave="leave" v-show="$store.state.userShow">
            <div class="userTop">
              <div class="avatar">
                <img src="../assets/images/face.png">
              </div>
              <div class="userMess">
                <p><span class="welcome">欢迎您,</span><span class="Uname">{{this.$store.state.username}}</span></p>
                <p class="balance">
                  <span class="wallet">余额 :&nbsp{{this.$store.state.wallet}}</span>
                  <span class="el-icon-refresh" @click="getWallet"></span>
                </p>
              </div>
            </div>
            <span class="el-icon-arrow-down" style="color:white;position:absolute;bottom:-11px;left:90px"></span>
            <div class="userBottom" style="display:none">
              <ul>
                <li class="userForm"><button class="userCenter">
                    <router-link to="/userCenter/MenberCenter" style="textDecoration:none;color:white">用户中心</router-link>
                  </button><button class="addAgent">
                    <router-link to="/apply" style="textDecoration:none;color:white">申请代理</router-link>
                  </button></li>
                <li class="operation">
                  <span class="el-icon-mobile-phone" @click="open">充值</span>
                  <span class="el-icon-printer" @click="openT">提现</span>
                  <span class="el-icon-caret-right" @click="loginOut">退出</span>
                </li>
              </ul>
            </div>
      </div>
    </el-header>
    <c-dialog :show.sync="show"></c-dialog>
    <t-dialog :show.sync="tshow"></t-dialog>
    <div class="ggBar">
            <div class="ggzx">
                    <span class="el-icon-bell" @click="btngg">公告中心</span>
                    <div class="content">
                        <ul>
                            <li v-for="item in scorllTitleList" @click="btnOne(item)" >[{{item.CreateDate}}]{{item.content}}</li>
                        </ul>
                    </div>
                    
            </div>
    </div>
    <el-dialog
            class="contentList"
            title="公告列表"
            :visible.sync="outerVisible "
            width="800px"
            center>
             <el-dialog
            width="700px"
            title="系统公告"
            :visible.sync="innerVisible"
            center
            append-to-body>
            <h3 class="titleDetail">{{this.title}}</h3>
            <div class="contentDetail">{{this.content}}</div>
            <p class="CreateDate">{{this.CreateDate}}</p>
            </el-dialog>
            <p class="gglist"><span class="ggtitle">标题</span><span class="ggdate">日期</span></p>
            <ul class="contentlist">
                <li v-for="(item,index) in Notices" class="listone" :class="`${index+1}`%2==0?classA:classB" @click="btnDetails(item)"><span class="onect">{{item.content}}</span><span class="onedate">{{item.CreateDate}}</span></li>
            </ul>
             <el-pagination
                background
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="count">
            </el-pagination>
    </el-dialog>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>
        <ul class="foot-t-u">
          <li class="gameIcon">
            <a href=""><img src="../assets/images/dota2.png" class="dota2"></a>
            <a href=""><img src="../assets/images/leag.png" class="leag"></a>
            <a href=""><img src="../assets/images/csgo.png" class="csgo"></a>
            <a href=""><img src="../assets/images/star.png" class="star"></a>
            <a href=""><img src="../assets/images/batt.png" class="batt"></a>
            <a href=""><img src="../assets/images/wzry.png" class="wzry"></a>
          </li>
          <li class="payWay">
            <img src="../assets/images/zgyl.png" class="zgyl">
            <img src="../assets/images/zxzf.png" class="zxzf">
            <img src="../assets/images/zfb.png" class="zfb">
            <img src="../assets/images/wechat.png" class="wechat">
          </li>
          <li class="serInformation">
            <a href="">关于我们</a><span>|</span>
            <a href="">理性博彩</a><span>|</span>
            <a href="">隐私政策</a><span>|</span>
            <a href="">服务条款</a><span>|</span>
            <a href="">联系我们</a><span>|</span>
            <a href="">加盟合作</a><span>|</span>
            <a href="">新手引导</a>
          </li>
        </ul>
      <div class="foot-b">
        <p>COPYRIGHT © 2015-2018 ESPORT CORPOATION,All Right Reserved</p>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
    import $ from 'jquery'
    import cDialog from './cdialog';
    import tDialog from './tdialog';
    export default {
        data() {
            return {
                activeIndex: '1',
                username: window.localStorage.getItem('username'),
                token: window.localStorage.getItem('token'),
                wallet: '',
                show: false,
                tshow: false,
                scorllTitleList:'',
                Notices:[],
                id:'',
                interval: null,
                outerVisible:false,
                innerVisible:false,
                classA:'classA',
                classB:'classB',
                count:0,
                title:'',
                content:'',
                CreateDate:'',
                animate: false,
            };
        },
        created(){
            // 拿到第一条公告
            this.getOneannouncement()
            this.Verificationtoken()

        },
        methods: {
            // 拿到第一条公告
            getOneannouncement(){
                this.$api.apitest.getannouncementlist().then(response=>{
                console.log(response)
                 this.Notices = response.data.results
                 this.count = response.data.count
                 this.scorllTitleList = response.data.results.slice(0, 3)
                    // var speed = 50; // 速度 -- px每秒
                    // var $marquee = document.querySelector('.ggzx');
                    // var $marqueeContent = $marquee.querySelector('.content');
                    // 内容复制3份好有连续性
                    // $marqueeContent.innerHTML = $marqueeContent.innerHTML + $marqueeContent.innerHTML + $marqueeContent.innerHTML
                    // var contentWidth = $marqueeContent.getBoundingClientRect().width;
                    // if (contentWidth <= 0) { // 没有内容搞什么动画
                    //     return;
                    // }
                    // // 内容复制了3份，宽度也要除以3
                    // contentWidth = contentWidth / 3

                    // // 计算一次动画应该要花费多少时间
                    // var onceTime = contentWidth / speed * 1000; //ms

                    // $marqueeContent.style.animationDuration = onceTime + "ms"
                   
                }).catch(error=>{

                })
            },
            // 验证token
            Verificationtoken(){
                  if(this.token){
                // 验证token 是否隐藏登录和注册
                this.$api.apitest.checktoken(this.token).then(response => {
                        this.$store.state.btnsShow = false
                        this.$store.state.userShow = true
                        this.$api.apitest.getPlayerMessage(this.username).then(response => {
                            // console.log(response)
                        this.$store.state.username =  response.data.results.username
                        this.$store.state.wallet =  response.data.results.Wallet
                        }).catch(error => {

                        })
                }).catch(error => {
                     console.log(error.response)
                        if(error.response.status == 400){
                            this.$message.error("账号已过期,请重新登录")
                        }
                })
                }
            },
            //显示充值框 
            open() {
                this.show = true;
            },
            // 显示提现框
            openT() {
                this.tshow = true
            },
            enter() {
                $('.userBottom').css('display', 'block')
            },
            leave() {
                $('.userBottom').css('display', 'none')
            },
            //退出登录
            loginOut() {
                // console.log(222)
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                this.$store.state.btnsShow = true
                this.$store.state.userShow = false
            },
            //刷新用户钱包余额
            getWallet() {
                this.$api.apitest.getWallet().then(response => {
                    // console.log(response)
                    this.wallet = response.data.results
                }).catch(error => {

                })
            },
            // 公告列表
            btngg(){
                this.outerVisible = true
            },
            // 显示中公告的详情
            btnOne(item){
                this.$api.apitest.getannouncementDetail(item.id).then(response=>{
                    console.log(response)
                    this.title = response.data.results.title
                    this.content = response.data.results.content
                    this.CreateDate = response.data.results.CreateDate
                    this.outerVisible = true
                    this.innerVisible = true
                    // this.outerVisible = false
                }).catch(error=>{

                })
            },
            handleCurrentChange(val){
                console.log(val)
                this.$api.apitest.getannouncementlistpage(val).then(response=>{
                    console.log(response)
                     this.Notices = response.data.results
                }).catch(error=>{

                })
            },
            // 公告详情
            btnDetails(item){
                this.innerVisible = true
                this.$api.apitest.getannouncementDetail(item.id).then(response=>{
                    console.log(response)
                    this.title = response.data.results.title
                    this.content = response.data.results.content
                    this.CreateDate = response.data.results.CreateDate
                }).catch(error=>{

                })
            }
        },
        components: {
            cDialog,
            tDialog
        }
    }
</script>

<style lang="scss">
    * {
        margin: 0px;
        padding: 0px;
    }
    html,
    body,
    #app {
        width: 100%;
        height: 100%;
        background-color: #141821;
        .boxaaaaa {
            background-color: #141821;
            position: relative;
            display: flex;
            flex-direction: column;
            // height: 100%;
            padding-bottom: 200px;
            box-sizing: border-box;
            padding-top: 90px;
           
            .el-header {
                /* text-align:center; */
                background-color: #262626;
                // position: relative;
                z-index: 999;
                width: 100%;
                /* flex: 1 0 auto; */
                position: fixed;
                top: 0px;
                left: 0px;
                //  box-shadow: 0px 0px 10px 0px;
                .el-menu-demo {
                    box-sizing:border-box;
                    padding-left:230px;
                    width: 1260px;
                    margin: 0 auto;
                    border-bottom: #262626;
                    background-color: #262626
                }
                .btnss {
                    width: 150px;
                    position: absolute;
                    right: 230px;
                    top: 0px;
                }
                .user {
                    width: 195px;
                    height: 60px;
                    border-radius: 20px;
                    line-height: 60px;
                    background-color: #393938;
                    z-index: 999;
                    border-color: black;
                    position: absolute;
                    right: 17px;
                    top: 0px;
                    display: flex;
                    flex-direction: column;
                    .userTop {
                        display: flex;
                        .avatar {
                            border-right: 1px solid gray;
                            width: 60px;
                            height:60px;
                            img {
                                margin: 10px 10px;
                                width: 40px;
                                height: 40px;
                                border-radius: 50%
                            }
                        }
                        .userMess {
                            display: flex;
                            flex-direction: column;
                            flex: 1;
                            padding: 0px 2px;
                            p {
                                color: white;
                                height: 30px;
                                line-height: 30px;
                                margin: 0px;
                                font-size: 13px;
                                padding: 0px 5px;
                                position: relative;
                                .welcome {
                                    position: absolute;
                                }
                                .Uname {
                                    display: inline-block;
                                    width: 70px;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    position: absolute;
                                    left: 50px
                                }
                            }
                            .balance {
                                border-top: 1px solid gray;
                                position: relative;
                                .wallet {
                                    display: inline-block;
                                    width: 100px;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }
                                .el-icon-refresh {
                                    position: absolute;
                                    right: 10px;
                                    top: 10px;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                    .userBottom {
                        width: 100%;
                        border-radius: 5px;
                        position: absolute;
                        top: 60px;
                        background-color: #303133;
                        ul {
                            padding: 10px 0px 8px 0px;
                            width: 195px;
                            list-style: none;
                            margin: 0px;
                            .operation {
                                margin-top: 10px;
                                background-color: #393d49;
                                display: flex;
                                padding-top: 8px;
                                box-sizing: border-box;
                                span {
                                    display: inline-block;
                                    color: white;
                                    text-align: center;
                                    font-size: 15px;
                                    width: 33.3%;
                                    padding-bottom:5px;
                                    cursor: pointer;
                                }
                            }
                            .userForm {
                                width: 100%;
                                height: 30px;
                                line-height: 30px;
                                text-align: center;
                                .userCenter {
                                    color: white;
                                    background-color: #393d49;
                                    border: none;
                                    height: 30px;
                                }
                                .addAgent {
                                    color: white;
                                    background-color: #ff5722;
                                    border: none;
                                    height: 30px;
                                    margin-left: 10px;
                                }
                            }
                        }
                    }
                }
            }
            .ggBar {
                width: 100%;
                height: 30px;
                // line-height: 30px;
                box-sizing:border-box;
                background-color: black;
                z-index: 4;
                position: fixed;
                top: 60px;
                padding:4px 0px 5px 0px;
                
                .ggzx {
                    display:flex;
                    margin:0 auto;
                    width:1160px;
                    color: white;
                    font-size: 14px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: clip;
                    // z-index: 998;
                    position:relative;
                     .el-icon-bell {
                        display:inline-block;
                        width:160px;
                        height:19px;
                        line-height:19px;
                        text-align:center;
                        cursor: pointer;
                        background-color:#000;
                     }
                        @keyframes run{
                            0%{
                                transform:translateX(0)
                            }
                            100%{
                                transform:translateX(-33.3%)
                            }
                        }
                     .content{
                                width:1000px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: clip;
                            ul{
                                list-style:none;
                                display:flex;
                                position:relative;
                                padding-right: 0px;
                                font-weight:bold;
                                animation: run 10s linear infinite;
                                white-space: nowrap;
                            li{
                                width:600px;
                                margin-right:150px;
                                cursor: pointer;
                            }
                        }
                     }
                   
                   

                }
                
            }
            .el-dialog{
                .el-dialog__header {
                    padding:10px 0px;
                    .el-dialog__title {
                        color: #fff;
                        font-size: 15px;
                    }
                    .el-dialog__headerbtn{
                        position: absolute;
                        top: 15px;
                    }
              }
              .el-dialog__body{
                  padding:8px;
                    .gglist{
                        color:#fff;
                        height:35px;
                        line-height:35px;
                        background-color: rgb(49,61,87);
                        .ggtitle{
                            display:inline-block;
                            width:80%;
                            text-align:center;
                        }
                        .ggdate{
                            display:inline-block;
                            width:20%;
                            text-align:center;
                        }
                    }
                    .contentlist{
                        list-style:none;
                        .listone{
                            height:30px;
                            line-height:30px;
                            display:flex;
                            color:#fff;
                            padding:0px 10px;
                            font-size:12px;
                            .onect{
                            display:inline-block;
                            width:80%;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            text-align:left;
                            cursor:pointer;
                            }
                            .onedate{
                                display:inline-block;
                                width:20%;
                                text-align:center;
                            }
                        }
                        .classA{
                            background-color:rgb(49,61,87)
                        }
                        .classB{
                            background-color:rgb(39,48,68)
                        }
                    }
                    .el-pagination{
                        text-align:center;
                        margin-top:10px;
                     .el-pager{
                            li.active{
                                background-color: #273044 !important
                            }
                            li:hover:not(.active){
                                color: #273044 !important
                            }
                        }
                    }
              }
            }
            .el-main {
                /* margin-top: 94px; */
                width: 1260px;
                // height: 100%;
                margin: 0 auto;
                overflow: hidden;
                /* color: #333; */
                background-color: #141821;
            }
            .el-footer {
                width: 100%;
                position: fixed;
                bottom: 0px;
                left: 0px;
                background-color: #000;
                height: 170px !important;
                text-align: center;
                border-top: 2px solid #ea5515;
                z-index: 999;
                .foot-t-u {
                    list-style: none;
                    text-align: center;
                    padding: 10px 0px;
                    .gameIcon {
                        .dota2 {
                            width: 163px;
                            height: 36px;
                            margin-right: 30px;
                        }
                        .leag {
                            width: 110px;
                            height: 36px;
                            margin-right: 30px;
                        }
                        .csgo {
                            width: 73px;
                            height: 36px;
                            margin-right: 30px;
                        }
                        .star {
                            width: 116px;
                            height: 43px;
                            margin-right: 30px;
                        }
                        .batt {
                            width: 88px;
                            height: 27px;
                            margin-right: 30px;
                        }
                        .wzry {
                            width: 60px;
                            height: 40px;
                        }
                    }
                    .payWay {
                        margin-top: 10px;
                        .zgyl {
                            width: 112px;
                            height: 26px;
                            margin-left: 30px;
                        }
                        .zxzf {
                            width: 110px;
                            height: 26px;
                            margin-left: 30px;
                        }
                        .zfb {
                            width: 84px;
                            height: 26px;
                            margin-left: 30px;
                        }
                        .wechat {
                            width: 115px;
                            height: 26px;
                            margin-left: 30px;
                        }
                    }
                    .serInformation {
                        margin-top: 10px;
                        a {
                            color: #999999;
                            font-size: 13px;
                            text-decoration: none;
                        }
                        span {
                            color: #999999;
                            display: inline-block;
                            width: 33px;
                            font-size: 13px;
                        }
                    }
                }
                .foot-b {
                    width: 100%;
                    text-align: center;
                    /* padding-left: 200px; */
                    p {
                        /* padding-top: 0px; */
                        margin: 0 auto;
                        width: 1260px;
                        border-top: 1px solid #999999;
                        color: #999999;
                        font-size: 13px;
                    }
                }
            }
        }
    }
     .el-dialog{
                .el-dialog__header {
                // background-color:rgb(33,41,60);
                // height:40px;
                padding:10px 0px;
                .el-dialog__title {
                  color: #fff;
                  font-size: 15px;
                }
                .el-dialog__headerbtn{
                   position: absolute;
                    top: 15px;
                }
              }
              .el-dialog__body{
                  padding:8px;
                //   background-color: rgb(29,35,48);
                  height:470px;
                //   color:#fff;
                 .titleDetail{
                     text-align:center;
                      padding:0px 10px;
                 }
                 .contentDetail{
                     margin-top:10px;
                     padding:0px 10px;
                 }
                 .CreateDate{
                     text-align:right;
                     margin-top:10px;
                      padding:0px 10px;
                 }
              }
            }
    body::-webkit-scrollbar {
        width: 4px;
    }
    
    body::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.2);
    }
    
    .innerbox::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: rgba(0, 0, 0, 0.1);
    }
</style>