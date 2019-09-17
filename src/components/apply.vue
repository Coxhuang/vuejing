<template>
  <div>
    <div class="center">
      <img src="../assets/images/logo.png" style="width600px;height:160px;">
      <p style="color:#fff;fontSize:30px;margin:0px;">申请合营模式</p>
      <div class="btns">
        <button class="add" @click="applyBox = true">申请加入</button>
        <div class="Application">
          <el-dialog title="填写合作申请表" :visible.sync="applyBox" width="40%" center>
            <p class="username"><span class="adduser">用户名</span><input type="text" disabled="disabled" v-model="username"></p>
            <p class="Skype"><span class="adduser">手机号</span><input type="text" v-model="phoneNumber" @change="checkmobile"></p>
            <p class="qq"><span class="adduser">QQ</span><input type="text" v-model="qq" @change="checkqq"></p>
            <p class="extension"><span class="adduser">推广简介</span>
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea" @change="checktxt">
              </el-input>
            </p>
            <p class="pBtn">
              <button class="subapply" @click="submit">提交申请</button>
            </p>
          </el-dialog>
        </div>
        <p class="agencyRules"><button class="rule" @click="ruleBox = true">代理佣金规则</button>
          <el-dialog title="代理佣金规则" :visible.sync="ruleBox" width="1024px" center>
            <h4>悟空电竞致力于为合作伙伴提供一个简单、市面上最好且最有竞争力的佣金计划。我们鼓励拥有优质推广资源或自己网站的个人/公司加入我们，悟空电竞将为您带来高额的佣金。</h4>
            <span class="advantage">加入悟空电竞的优势</span>
            <ul>
              <li><span>●</span><strong>全球最牛电竞外围平台，电竞竞猜行业引领者，在业界拥有极佳的品牌知名度，助您推广更简单。</strong></li>
              <li><span>●</span><strong>自营电竞盘，一手数据。2017年度日均开盘数达50场以上，业界第一。</strong></li>
              <li><span>●</span><strong>提供覆盖全球的体育产品，每天6000+的体育赛事，亚洲第一。</strong></li>
              <li><span>●</span><strong>提供如临现场的真人视讯游戏，百位来自台湾美女主播日夜陪玩。</strong></li>
              <li><span>●</span><strong>提供亚洲最强的电子游戏，全终端支持，随时随地一手玩控。</strong></li>
              <li><span>●</span><strong>提供最高的日返水彩票游戏，简单趣味畅赢大奖。</strong></li>
              <li><span>●</span><strong>强大的代理后台，自助化操作，佣金数据透明。</strong></li>
              <li><span>●</span><strong>安全快速的支付系统，用户充值秒到，提款只需1~15分钟即可到账。</strong></li>
            </ul>
            <p class="Commission"><strong>佣金</strong></p>
            <P class="plan"><strong>悟空电竞目前具有行业用户最喜爱的游戏业务，分为a,b两类佣金计划：</strong></P>
            <p class="planA"><strong>a)电竞赛事和体育赛事佣金分成计划</strong></p>
            <table style="width:100%;color:#fff" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
              <tbody>
                <tr>
                  <td style="text-align:center;">
                    <strong>净利润</strong>
                  </td>
                  <td style="text-align:center;">
                    <strong>活跃玩家人数</strong>
                  </td>
                  <td style="text-align:center;">
                    <strong>所得佣金</strong>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <strong>150,000以下</strong>
                  </td>
                  <td style="text-align:center;">
                    <strong>≥5人</strong>
                  </td>
                  <td style="text-align:center;">
                    <strong>30%</strong>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <strong>150,000~300,000</strong>
                  </td>
                  <td style="text-align:center;">
                    <span><strong>≥10人</strong></span><br>
                  </td>
                  <td style="text-align:center;">
                    <strong>35%</strong>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <span><strong>300,001~500,000</strong></span><br>
                  </td>
                  <td style="text-align:center;">
                    <span><strong>≥15人</strong></span><br>
                  </td>
                  <td style="text-align:center;">
                    <strong>40%</strong>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <span><strong>500,001~800,000</strong></span><br>
                  </td>
                  <td style="text-align:center;">
                    <span><strong>≥25人</strong></span><br>
                  </td>
                  <td style="text-align:center;">
                    <strong>45%</strong>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <strong>800,001以上</strong>
                  </td>
                  <td style="text-align:center;">
                    <span><strong>≥30人</strong></span><br>
                  </td>
                  <td style="text-align:center;">
                    <strong>50%</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="ruleMess"><strong>规则与释义</strong></p>
            <P><strong>1.每月必须最少有5个活跃会员（活跃会员指当月累计投注额最少1000元，不限产品，充值累计不低于500元）您的分成条件才能成立。</strong></P>
            <p><strong>2.满足盈亏但不满足活跃玩家数，佣金自动以次级为准。例如盈亏800,001元活跃玩家10人（未满足大于等于30人条件）则佣金比例为45%</strong></p>
            <p><strong>3.悟空电竞代理佣金的计算方式基于游戏净盈利。</strong></p>
            <p class="planB"><strong>b)娱乐场（真人视讯、电子游戏和彩票游戏）佣金分成计划</strong></p>
            <table style="width:100%;color:#fff" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
              <tbody>
                <tr>
                  <td style="text-align:center;">
                    <strong>净利润</strong>
                  </td>
                  <td style="text-align:center;">
                    <strong>活跃玩家人数</strong>
                  </td>
                  <td style="text-align:center;">
                    <strong>所得佣金</strong>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <strong>150,000以下</strong>
                  </td>
                  <td style="text-align:center;">
                    <span><strong>≥5人</strong></span><span></span><br>
                  </td>
                  <td style="text-align:center;">
                    <strong>30%</strong>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <strong>150,001~300,000</strong>
                  </td>
                  <td style="text-align:center;">
                    <span><strong>≥5人</strong></span><span></span><br>
                  </td>
                  <td style="text-align:center;">
                    <strong>35%</strong>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <strong>300,001~600,000</strong>
                  </td>
                  <td style="text-align:center;">
                    <span><strong>≥10人</strong></span><span></span><br>
                  </td>
                  <td style="text-align:center;">
                    <strong>40%</strong>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <strong>600,001~1,000,000</strong>
                  </td>
                  <td style="text-align:center;">
                    <span><strong>≥20人</strong></span><span></span><br>
                  </td>
                  <td style="text-align:center;">
                    <strong>45%</strong>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <strong>1,000,001以上</strong>
                  </td>
                  <td style="text-align:center;">
                    <span><strong>≥30人</strong></span><span></span><br>
                  </td>
                  <td style="text-align:center;">
                    <strong>50%</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="ruleMess"><strong>规则与释义</strong></p>
            <P><strong>1.每月必须最少有5个活跃会员（活跃会员指当月累计投注额最少1000元，不限产品，充值累计不低于500元）您的分成条件才能成立。</strong></P>
            <p><strong>2.满足盈亏但不满足活跃玩家数，佣金自动以次级为准。例如盈亏800,001元活跃玩家10人（未满足大于等于30人条件）则佣金比例为45%</strong></p>
            <p><strong>3.悟空电竞代理佣金的计算方式基于游戏净盈利。</strong></p>
            <p style="marginTop:30px"><strong>*以上产品佣金，不互相抵扣，独立累计并派发。例如</strong></p>
            <table style="width:100%;color:#fff" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
              <tbody>
                <tr>
                  <td style="text-align:center;">
                    <strong>电竞与体育佣金</strong>
                  </td>
                  <td style="text-align:center;">
                    <strong>娱乐场</strong>
                  </td>
                  <td style="text-align:center;">
                    <strong>实际派发佣金</strong>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <strong>-1000.00</strong>
                  </td>
                  <td style="text-align:center;">
                    <strong>1000.00</strong>
                  </td>
                  <td style="text-align:center;">
                    <strong>1000.00</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              <strong>1.合营伙伴在结算佣金时，仅需支付五项费用总和的30%，此费用将从合营伙伴每月的佣金中扣除，其中包括：</strong>
            </p>
            <p>
              <strong>A.支付渠道手续费</strong>
            </p>
            <p>
              <strong>规则与条款</strong>
            </p>
            <p>
              <strong>&nbsp; &nbsp;合营伙伴推荐的会员，在使用第三方充值渠道所产生的费用。</strong>
            </p>
            <p>
              <strong>B.优惠红利</strong>
            </p>
            <p>
              <strong>&nbsp; 合营伙伴给予会员的现金红利或是折扣。</strong>
            </p>
            <p>
              <strong>C.平台费用</strong>
            </p>
            <p>
              <strong>&nbsp; 悟空电竞所用游戏产品（例如AG真人游戏、BTi体育、PT电子游戏、VR彩票等）每月扣除的平台费用。</strong>
            </p>
            <p>
              <strong>D.用户返水</strong>
            </p>
            <p>
              <strong>&nbsp; 部分产品每周期以投注额的制定比例向您的下级用户派发返利（称之为返水）</strong>
            </p>
            <p>
              <strong>E.其他支出</strong>
            </p>
            <p>
              <strong>&nbsp; 公司为合影伙伴给予会员的支付费用，错误款项追讨，费用的花销会给予特别说明。</strong>
            </p>
            <p>
              <strong>2.每位代理每月至少满足拥有5位活跃玩家才可获得30%或更多的佣金。如果代理达到了净利润和活跃玩家人数的最高要求，将得到50%的佣金。</strong>
            </p>
            <p>
              <strong>3.分红周期为每个自然月，假若本月佣金出现负数，将会带到下一个月急需累计，直至获得正数。</strong>
            </p>
            <p>
              <strong>4.悟空电竞代理不可注册超过一个代理账户，如发现有恶意欺诈行为或被证实有多个账户将被立即终止代理关系。</strong>
            </p>
            <p>
              <strong>5.任何代理如被发现在代理名下注册玩家账号，则视作恶劣的违规行为，代理关系会被终止并且关闭账户。这种行为，悟空电竞有权在任何时候收回并没收已支付佣金的全部金额并享有最终解释权。</strong>
            </p>
            <p style="marginTop:30px;">
              <strong>6.如果您所邀请的玩家是我公司禁止的玩家，悟空电竞有权冻结玩家账户，没收产生的盈利，但保留他所产生的代理佣金。</strong>
            </p>
            <p>
              <strong>7.如发现任何玩家有恶意欺诈和多账户等违规行为，悟空电竞市场代理部将从其他利润中扣除相应金额以作惩罚并有权关闭玩家账户。</strong>
            </p>
            <p>
              <strong>8.如发现代理有任何不正当意图或滥用代理制度将会立即永久终止与悟空电竞的代理合作关系。</strong>
            </p>
            <p>
              <strong>9.每月底，市场代理部门查看系统生成的详细报告，若代理后台系统所生成数据与悟空电竞代理部门所提供数据不一致时，以悟空电竞代理部门所提供的数据为准。</strong>
            </p>
            <p style="marginTop:20px;">
              <strong>10.本公司有权在任何时候修改包括本协议在内的任何条款，谨慎起见，我们会将所更改及更新正在网站进行通知。</strong>
            </p>
            <p>
              <br>
            </p>
            <h2 style="text-align:center;margin:0px;">
              <strong><span style="color:#E53333;">常见问题解答</span></strong>
            </h2>
            <p>
              <strong><br>
              </strong>
            </p>
            <p>
              <strong>1.何时派发佣金？</strong>
            </p>
            <p>
              <strong>佣金结算周期为每个自然月，派发时间为每月5日下午18点前。</strong>
            </p>
            <p>
              <strong>2.如何将佣金提现？</strong>
            </p>
            <p>
              <strong>将佣金提现，可在佣金派发后，通过网站提现功能发起提现申请，我司专业的服务团队，将在1~15分钟内完成到账。</strong>
            </p>
            <p>
              <strong>3.如何查看佣金明细？</strong>
            </p>
            <p>
              <strong>通过合营后台，可实时查阅详细的数据，包含佣金来源，和每项费用的产生。</strong>
            </p>
            <p>
              <strong>4.佣金的计算方式？</strong>
            </p>
            <p>
              <strong>佣金额=（AG真人视讯盈亏额-AG平台费）X分红比例-手续费X30%-返水X30%</strong>
            </p>
            <p>
              <strong>平台费说明：</strong>
            </p>
            <p>
              <strong>体育平台费：18%</strong>
            </p>
            <p>
              <strong>娱乐场平台费用：15%</strong>
            </p>
            <p>
              <strong>5.代理如何操作？</strong>
            </p>
            <p>
              <strong>①注册代理账户：</strong>
            </p>
            <p>
              <strong>首先您需要拥有一个悟空电竞网站会员账号，可通过网站自助注册。</strong>
            </p>
            <p>
              <strong>完成后请在网站中找到“合营代理”，点击“申请加入合营代理”按钮，填写相关申请信息并提交。我司代理专员将会在24小时内完成审核，审核通过的账号，代理功能将自动激活。在此期间，您可通过网站客户或其他渠道与我司代理专员取得联系。</strong>
            </p>
            <p style="marginTop:30px;">
              <strong>②登陆后开始运营：</strong>
            </p>
            <p>
              <strong>登陆网站，通过代理后台提供的代理链接，以及每月最新的广告图片，设置到自己运营的网站或者广告形式刊登，通过您专属链接注册的玩家将成为您的下级用户。</strong>
            </p>
            <p style="marginTop:30px;">
              <strong>③自助开设下级用户功能</strong>
            </p>
            <p>
              <strong>代理可为玩家快捷开设账户，此通道免手机验证，可以帮助您的推广更加高效。但注意，若利用此功能恶意注册无效玩家账户，平台将会取消代理的此项功能。</strong>
            </p>
            <p>
              <br>
            </p>
            <p>
              <br>
            </p>
          </el-dialog>
          <button class="xxx"></button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        applyBox: false,
        textarea: '',
        ruleBox: false,
        username:window.localStorage.getItem('username'),
        phoneNumber:'',
        qq:'',
        textarea:''
      }
    },
    methods:{
        // 提交申请
        submit(){
            this.$api.apitest.appliAgent(
                this.username,
               this.qq,
                this.phoneNumber,
                this.textarea
          ).then(response=>{
                // console.log(response)
                this.$message.success("申请已提交")
                this.username = ""
                this.qq = ""
                this.phoneNumber = ""
                this.textarea = ""
                this.applyBox = false
            }).catch(error=>{
                 if (error.response.data.msg) {
                            this.$message.error(error.response.data.msg)
                    } else {
                            this.$message.error(JSON.stringify(error.response.data))
                    }
            })
        },
        // 验证手机号
        checkmobile(){
             var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                if (this.phoneNumber == "") {
                    this.$message.warning("请输入手机号");
                } else if (!phoneReg.test(this.phoneNumber)) {
                    this.$message.warning("请输入有效手机号")

                }
        },
        //验证qq号
        checkqq() {
                var regQQ = /^\d{6,11}$/;
                if (this.qq == '') {
                    this.$message.warning("请输入QQ")
                } else if (!regQQ.test(this.qq)) {
                    this.$message.warning("请输入有效QQ")
                }
            },
        // 验证简介
        checktxt(){
            if(this.textarea == ""){
                this.$message.warning("请输入推广简介")
            }
        }
    }
  }

</script>
<style lang="scss">
  html,
  body {
    width: 100%;
    height: 100%;
    background-color: #000;
    margin: 0px;

    #app {
      width: 100%;
      height: 100%;
      position: relative;

      .center {
        width: 600px;
        height: 400px;
        margin: -200px auto auto -300px;
        position: absolute;
        left: 50%;
        top: 50%;
        text-align: center;

        img {
          width:600px;
          height: 160px;
        }

        h3 {
          color: #fff;
          font-size: 32px;
          margin: 0px;
        }

        .btns {
          .add {
            width: 560px;
            height: 45px;
            background-color: #1e9fff;
            color: #fff;
            border-radius: 10px;
            font-size: 16px;
            outline: none;
            border: none;
            margin: 38px 0px 47px 0px;
          }

          .Application {
            .el-dialog {
              .el-dialog__header {
                background-color: #20222a;

                .el-dialog__title {
                  color: #fff;
                  font-size: 15px;
                }
              }

              .el-dialog__body {
                background-color: #2f4056;

                p {
                  height: 40px;
                  line-height: 40px;
                  margin-bottom: 10px;
                    .adduser {
                        display:inline-block;
                        width: 70px;
                        height: 40px;
                        line-height: 40px;
                        color: #fff
                    }
                }

                

                input {
                  height: 35px;
                  background-color: #2f4056;
                  border-radius: 2px;
                  border: 1px solid #ccc;
                  outline: none;
                  padding-left: 10px;
                  color: #fff
                }

                .username {}

                .Skype {}

                .qq {}

                .extension {
                  height: 54px;
                  line-height: 54px;
                  display:flex;
                  span {
                    margin-right: 7px;
                  }

                  textarea {
                    background-color: #2f4056;
                    color: #fff
                  }
                }

                .pBtn {
                  .subapply {
                    width: 100%;
                    height: 40px;
                    background-color: #1e9fff;
                    color: #fff;
                    border-radius: 3px;
                    text-align: center;
                    outline: none;
                    border: none;
                  }
                }

              }
            }
          }


          .agencyRules {
            width: 560px;
            height: 45px;
            margin: 0px;
            display: flex;
            margin-left: 26px;

            .rule {
              width: 265px;
              height: 45px;
              background-color: #2f4056;
              color: #fff;
              border-radius: 10px;
              font-size: 16px;
              outline: none;
              border: none;
              margin-right: 20px;
            }

            .el-dialog {
              .el-dialog__header {
                background-color: #20222a;

                .el-dialog__title {
                  color: #fff;
                  font-size: 15px;
                }
              }

              .el-dialog__body {
                background-color: #2f4056;
                height: 700px;
                overflow-y: scroll;

                h4 {
                  font-size: 14px;
                  color: #fff;
                  margin: 0px;
                }

                .advantage {
                  display: inline-block;
                  width: 100%;
                  text-align: center;
                  font-size: 20px;
                  color: #e53333
                }

                ul {

                  list-style: none;
                  margin: 0px;
                  padding-left: 0px;

                  li {
                    height: 30px;
                    line-height: 30px;
                    color: #fff;

                    span {
                      color: #e56600 !important;
                    }
                  }
                }

                p {
                  margin: 0px;
                  height: 30px;
                  line-height: 30px;
                  color: #fff;

                  span {
                    color: #fff;
                    height: 20px;
                    line-height: 20px;
                    // margin-left:-30px;
                  }
                }

                .plan {}

                .planA {
                  color: #d63436;
                  margin-top: 30px;
                }

                .ruleMess {
                  margin-top: 30px;
                }

                .planB {
                  color: #d63436;
                  margin-top: 30px;
                }
              }

            }

            .xxx {
              width: 265px;
              height: 45px;
              background-color: #2f4056;
              color: #fff;
              border-radius: 10px;
              font-size: 16px;
              outline: none;
              border: none;
            }
          }
        }
      }
    }
  }

</style>
