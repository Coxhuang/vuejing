<template>
  <el-container class="boxo">
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#262626"
        text-color="#fff" active-text-color="#ffd04b">
        <div style="height:60px;width:200px;position:absolute;top:0px;left:0px;z-index:999"><img src='@/assets/images/logo.png'
          alt="" style="width:200px;height:60px"></div>
        <el-menu-item index="1">
          <router-link to="/home/match" style="text-decoration:none">电竞竞猜</router-link>
        </el-menu-item>
      </el-menu>
      <!-- <div class="btnss" style="height:60px;line-height: 60px;" v-show="btnsShow">
              <router-link to="/home/register" style="text-decoration:none;color:#fff">
                <el-button style="background-color:#ff7200;border-color: #ff7200" type="primary">注册</el-button>
              </router-link>
              <router-link to="/home/login" style="text-decoration:none;color:#fff">
                <el-button style="background-color:#929292;border-color: #929292" type="success">登录</el-button>
              </router-link>
                </div> -->
      <div class="user" @mouseenter="enter" @mouseleave="leave" v-show="userShow">
        <div class="userTop">
          <div class="avatar">
            <img src="../assets/images/face.png">
          </div>
          <div class="userMess">
            <p><span class="welcome">欢迎您,</span><span class="Uname">{{this.username}}</span></p>
            <p class="balance">
              <span class="wallet">余额 :&nbsp{{this.wallet}}</span>
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
    <el-container class="boxt">
      <el-aside width="200px" style="background-color:#363636;color:white;text-align:center;">
        <div class="userInformation">
          <div class="userAvatar">
            <img src="../assets/images/face.png">
          </div>
          <p class="username">您好,{{this.username}}</p>
          <p class="userBtns">
            <router-link to="/userCenter/accountSecurity" style="text-decoration:none">
              <el-tooltip content="登录密码" placement="bottom">
                <el-button class="el-icon-view" style="width:22px;height:22px;lineHeight:22px;padding:0px;backgroundColor:#363636;borderRadius:50%"></el-button>
              </el-tooltip>
            </router-link>
            <router-link to="/userCenter/accountSecurity" style="text-decoration:none">
              <el-tooltip content="资金密码" placement="bottom">
                <el-button class="el-icon-menu" style="width:22px;height:22px;lineHeight:22px;padding:0px;backgroundColor:#363636;borderRadius:50%"></el-button>
              </el-tooltip>
            </router-link>
            <router-link to="/userCenter/accountSecurity" style="text-decoration:none">
              <el-tooltip content="密保问题" placement="bottom">
                <el-button class="el-icon-tickets" style="width:22px;height:22px;lineHeight:22px;padding:0px;backgroundColor:#363636;borderRadius:50%"></el-button>
              </el-tooltip>
            </router-link>
            <router-link to="/userCenter/accountSecurity" style="text-decoration:none">
              <el-tooltip content="绑定邮箱" placement="bottom">
                <el-button class="el-icon-message" style="width:22px;height:22px;lineHeight:22px;padding:0px;backgroundColor:#363636;borderRadius:50%"></el-button>
              </el-tooltip>
            </router-link>
          </p>
          <el-row class="tac">
            <el-col>
              <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#363636" text-color="#fff"
                active-background-color="#ff7800">
                <router-link to="/userCenter/MenberCenter" style="text-decoration:none">
                  <el-menu-item index="1">
                    <i class="el-icon-star-on"></i>
                    <span slot="title">会员中心</span>
                  </el-menu-item>
                </router-link>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>资金管理</span>
                  </template>
                  <router-link to="/userCenter/accountDetails" style="text-decoration:none">
                    <el-menu-item index="2-1">帐变明细</el-menu-item>
                  </router-link>
                  <router-link to="/userCenter/gameRecord" style="text-decoration:none">
                    <el-menu-item index="2-2" style="text-decoration:none">游戏记录</el-menu-item>
                  </router-link>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">个人中心</span>
                  </template>
                  <router-link to="/userCenter/userData" style="text-decoration:none">
                    <el-menu-item index="3-1">个人资料</el-menu-item>
                  </router-link>
                  <router-link to="/userCenter/bankCard" style="text-decoration:none">
                    <el-menu-item index="3-2">银行卡管理</el-menu-item>
                  </router-link>
                  <router-link to="/userCenter/accountSecurity" style="text-decoration:none">
                    <el-menu-item index="3-3">账户安全</el-menu-item>
                  </router-link>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </div>
      </el-aside>
      <el-main style="width:1060px;background-color:white;padding: 0px">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>
<script>
  import $ from 'jquery'
  import cDialog from './cdialog';
  import tDialog from './tdialog';
  export default {
    data() {
      return {
        activeIndex: '',
        // btnsShow: true,
        userShow: true,
        username: window.localStorage.getItem('username'),
        wallet: 0,
        show: false,
        tshow: false
      }
    },
    created() {
      //获取用户信息 
      console.log(1234)
      this.$api.apitest.getWallet().then(response => {
        // console.log(response)
        this.wallet = response.data.results
      }).catch(error => {

      })

    },
    methods: {
      // 显示充值框
      open() {
        this.show = true;
      },
      // 显示提现框
      openT() {
        this.tshow = true
      },
      loginOut() {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        location.reload()
      },
      enter() {
        $('.userBottom').css('display', 'block')
      },
      leave() {
        $('.userBottom').css('display', 'none')
      },
      //刷新用户钱包余额
      getWallet() {
        this.$api.apitest.getWallet().then(response => {
          this.wallet = response.data.results
        }).catch(error => {

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
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0px;

    #app {
      height: 100%;
      // overflow: hidden;
      background-color: #141821;
    }

    .boxo {
      height: 100%;

      // background-color: #141821;
      .el-header {
        position: fixed;
        top: 0px;
        left: 0px;
        background-color: #262626;
        width: 100%;
        padding: 0px;
        box-shadow: 0px 0px 10px 0px;
        z-index: 999;

        .btnss {
          width: 150px;
          position: absolute;
          right: 230px;
          top: 0px;
        }

        .el-menu-demo {
          box-sizing: border-box;
          padding-left: 230px;
          width: 1260px;
          margin: 0 auto;
          border-bottom: #262626;
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
                padding: 0px 3px;
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
              }

              li {
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

                span {
                  display: inline-block;
                  color: white;
                  font-size: 15px;
                  width: 33.3333%;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }

      .boxt {
        // height: 100%;
        padding: 0px;
        display: flex;
        width: 1260px;
        margin: 0 auto;
        margin-top: 60px;

        .el-aside {
          .userInformation {

            /* text-align: center; */
            .userAvatar {
              width: 82px;
              height: 82px;
              margin-left: 54px;
              margin-top: 20px;
              border: 5px solid #fff;
              border-radius: 50%;
            }

            .username {
              font-size: 14px;
              margin: 5px 0px;
              color: gray
            }

            .userBtns {
              margin-top: 10px;
              margin-bottom: 0px;

              span {
                margin-left: 9px;
                color: gray;
              }
            }

            .tac {
              .el-menu {
                border: none;

                .el-submenu__title {
                  padding-left: 0px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>