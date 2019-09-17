<template>
    <div class="whole">
        <ul class="gameList">
            <li v-for="(item,index)  in gamasList" class="gamenames" @click="checkGame(item,index)">
                <div class="imgName">
                    <span class="icon"><img :src="item.GamePic" alt=""></span>
                    <span class="gamename">{{item.GameProjName}}</span>
                </div>
                <div class="nums">
                    <span class="gamanum">{{item.matchNum}}</span>
                    <span class="el-icon-arrow-right"></span>
                </div>
            </li>
        </ul>
        <div class="matchList">
            <el-tabs v-model="activeName" @tab-click="checktab">
                <el-tab-pane label="早盘/滚盘" name="first" style="color:#fff" v-loading="pictLoading1"
                    element-loading-background="rgba(0, 0, 0, 0.5)" element-loading-text="正在加载中" >
                    <ul class="firstList">
                        <li class="matchMes" v-for="(item,index) in gameMessage">
                            <div style="display:flex;height: 60px;line-height: 60px;border-bottom: 1px solid #000;box-sizing: border-box">
                                <div class="left">
                                    <div class="box1">
                                        <div class="left-l">
                                            <img :src="item.GamePic" alt="">
                                        </div>
                                        <div class="left-r">
                                            <p class="time">{{item.BeginTime | dateFmt('YYYY-MM-DD HH:mm')}}</p>
                                            <p>{{item.MatchStage}}</p>
                                            <p><span v-html='item.TeamAName'>{{item.TeamAName}}</span> VS <span v-html='item.TeamBName'>{{item.TeamBName}}</span></p>
                                        </div>
                                    </div>
                                    <div class="box2">
                                        <span v-html='item.TeamAName'>{{item.TeamAName}}</span>
                                        <div class="TeamAIcon"> <img :src="item.TeamAIcon" alt=""></div>
                                        <el-tooltip class="item" effect="dark"  :content="'比赛获胜:'+item.TeamAName"
                                            placement="top">
                                            <el-button class="Aratio" @click="Aratio(item,index)" :class="`${item.is_bet}`==1?classA:classB" :disabled="`${item.is_bet}`==1?false:true">{{item.TeamAOdds}}</el-button>
                                        </el-tooltip>
                                    </div>
                                </div>
                                <span class="vs">vs</span>
                                <div class="right">
                                    <div class="box3">
                                        <div class="right-l">
                                            <el-tooltip class="item" effect="dark"  :content="'比赛获胜:'+item.TeamBName"
                                                placement="top">
                                                <el-button class="Bratio" @click="Bratio(item,index)" :class="`${item.is_bet}`==1?classA:classB" :disabled="`${item.is_bet}`==1?false:true">{{item.TeamBOdds}}</el-button>
                                            </el-tooltip>
                                            <div class="TeamBIcon"><img :src="item.TeamBIcon" alt=""></div>
                                            <span class="teams" v-html='item.TeamBName'>{{item.TeamBName}}</span>
                                        </div>
                                        <div class="right-r">
                                            <button @click="getGamesplay(item,index)">+{{item.betcount}}</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="Bets" v-for="(res,i) in gamesPlay" :key="i" v-show="activeIndex===index">
                                <span class="victory">{{res.Team_1.bet_title}}</span>
                                <div>
                                    <p class="teamA" v-for="(buts,n,index) in res" :class="`${index+1}`%2==0?classC:classD"><span
                                            style="border-right:1px solid #000" v-html='buts.odds_name'>{{buts.odds_name}}</span><span
                                            class="Amouse" @click="Abets(buts)">{{buts.odds}}</span></p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="赛果" name="second" style="color:#fff" v-loading="pictLoading2"
                    element-loading-background="rgba(0, 0, 0, 0.5)" element-loading-text="正在加载中">
                    <ul class="secondList">
                        <!-- <Scroll > -->
                        <li class="resultsMes" v-for="(item,index) in gameResults">
                            <div style="display:flex;height: 60px;line-height: 60px;border-bottom: 1px solid #000;box-sizing: border-box">
                                <div class="left">
                                    <div class="box1">
                                        <div class="left-l">
                                            <img :src="item.GamePic" alt="">
                                        </div>
                                        <div class="left-r">
                                            <p class="time">{{item.BeginTime | dateFmt('YYYY-MM-DD HH:mm')}}</p>
                                            <p>{{item.Event}}</p>
                                            <p><span v-html='item.TeamAName'>{{item.TeamAName}}</span> VS <span v-html='item.TeamBName'>{{item.TeamBName}}</span></p>
                                        </div>
                                    </div>
                                    <div class="box2">
                                        <span class="TeamAName" v-html='item.TeamAName'>{{item.TeamAName}}</span>
                                        <div class="TeamAIcon"> <img :src="item.TeamAIcon" alt=""></div>
                                        <button class="ScoreA">{{item.ScoreA}}</button>
                                    </div>
                                </div>
                                <span class="score">:</span>
                                <div class="right">
                                    <div class="box3">
                                        <div class="right-l">
                                            <button class="ScoreB">{{item.ScoreB}}</button>
                                            <div class="TeamBIcon"><img :src="item.TeamBIcon" alt=""></div>
                                            <span v-html='item.TeamBName'>{{item.TeamBName}}</span>
                                        </div>
                                        <div class="right-r">
                                            <button @click="playMatchs(item,index)">+{{item.betcount}}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="res" v-show="activeIndex1===index">
                                <span class="victory">全场</span>
                                <div>
                                    <p class="gamaRes" v-for="(rults,i) in gamesRes" :class="`${i+1}`%2==0?classC:classD">
                                        <span style="border-right:1px solid #000;">{{rults.bet_title}}</span>
                                        <span class="winName" v-html='rults.odds_name'>{{rults.odds_name}}</span>
                                    </p>
                                </div>
                            </div>
                        </li>
                        <!-- </Scroll> -->
                    </ul>
                </el-tab-pane>
                <el-pagination
                    v-show='gameMessage.length == 0?false:true'
                    @current-change="handleCurrentChange"
                    background
                    :current-page="pageNum"
                    :page-size="15"
                    layout="prev, pager, next, jumper"
                    :total="count">
                </el-pagination>
            </el-tabs>
            <div class="searchBar">
                <el-input v-model="searchText" placeholder="请输入内容"></el-input><span class="el-icon-search" @click="searchMatch"></span>
            </div>
        </div>
        <div class="shopCar">
            <div class="shopCar-t">
                <div>
                    <span class="el-icon-arrow-left" @click="btnsShop"></span>
                    <span>竞猜单</span>
                </div>
                <span class="el-icon-delete" @click="deleteAll"></span>
            </div>
            <div class="shopCar-b">
                <ul class="Orders">
                    <li v-for="(item,index) in shoppingList">
                        <p class="betTeam"><span v-html='item.begTeanA'>{{item.begTeanA}}</span> VS <span v-html='item.begTeanB'>{{item.begTeanB}}</span>
                            {{item.bets}}</span><span class="el-icon-arrow-down"></span></p>
                        <div class="betMess">
                            <p class="playway"><span v-html='item.betteamid'>{{item.betteamid}}</span><span>投注额</span><span>收益</span></p>
                            <p class="betNum">
                                <button :class="`${item.status}`==1?classA:classB">{{item.odds}}</button><span class="el-icon-close"></span>
                                <input type="text" @change="betMoney(item,index)" v-model="item.price" @input="inputChange">
                                <span class="res">=</span>
                                <span class="Totalamount">￥{{Math.floor(item.odds*item.price*100)/100}}</span>
                                <span class="el-icon-circle-close" @click="deleteOne(item)"></span>
                            </p>
                        </div>
                    </li>
                </ul>
                <div class="setBets">
                    <p class="amount"><span class="TmoneyName">总投注额 : ￥</span><span class="Tmoney">{{this.totalBet}}</span><span
                            class="SmoneyName">总收益额 : ￥</span><span class="Smoney">{{this.totalProfit}}</span></p>
                    <div class="submit">
                        <button @click="subShoppingcar">确定投注</button>
                        <p><span class="el-icon-warning"></span>系统将自动接收较佳收益率</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    export default {    
        data() {
            return {
                pictLoading1: true,
                pictLoading2: true,
                activeIndex: -1,
                activeIndex1: -1,
                count: 0,
                gameid:'',
                pageNum:1,
                isShow: true,
                current: 0,
                gamasList: [],
                activeName: 'first',
                searchText: '',
                gameMessage: [],
                gameResults: [],
                currentTime: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
                gamesPlay: [],
                shoppingList: [],
                gamesRes: [],
                price: 0,
                totalBet: 0,
                totalProfit: 0,
                minHeight: 0,
                list: [],
                classA: 'classA',
                classB: 'classB',
                classC: 'classC',
                classD: 'classD',
            }
        },
        created() {
            //查看所有游戏项目列表
            this.$api.apitest.getallgamelist().then(response => {
                    // console.log(response)
                    this.gamasList = response.data.results
                }).catch(error => {

                })
                // 查看所有比赛列表
            // this.currentTime = this.$moment().format('YYYY-MM-DD HH:mm:ss');
            this.$api.apitest.getallmatchlist(this.currentTime, 1).then(response => {
                    console.log(response)
                    this.pictLoading1 = false
                    this.gameMessage = response.data.results
                    this.count = response.data.count
            }).catch(error => {

            })
        },
        methods: {
            // 分页跳转
            handleCurrentChange(val) {
                if(this.activeName == 'first'){
                     this.pictLoading1 = true
                 this.$api.apitest.checkGame(this.gameid, this.currentTime,val).then(response => {
                        this.gameMessage = response.data.results
                        this.pictLoading1 = false
                    }).catch(error => {

                    })
                }else if(this.activeName == 'second'){
                     this.$api.apitest.getOnematchedlist(this.gameid, val).then(response => {
                        this.gameResults = response.data.results
                        // this.pictLoading2 = false
                    }).catch(error => {

                    })
                }
            },
              // tab切换
            checktab() {
                // console.log(111)
                if(this.activeName == 'second'){
                     this.$api.apitest.getOnematchedlist(this.gameid,1).then(response => {
                    console.log(response)
                    this.gameResults = response.data.results
                    this.count = response.data.count
                    }).catch(error => {

                    })
                }else if(this.activeName == 'first'){
                     this.pictLoading1 = true
                     this.$api.apitest.checkGame(this.gameid,this.currentTime, 1).then(response => {
                    console.log(response)
                    this.activeIndex1 = -1
                    this.gameMessage = response.data.results
                    this.count = response.data.count
                    this.pictLoading1 = false
                    }).catch(error => {

                    })
                }
               
            },
            // 点击A队按钮下注
            Aratio(item, index) {
                $(".Aratio").eq(index).css('box-shadow', '0 0 8px #fff,0 0 8px #fff,0 0 8px #fff,0 0 8px #fff').parent().parent()
                    .siblings('.right').children('.box3').children('.right-l').children('.el-button').css('box-shadow', 'none')
                    // console.log(item)
                this.$api.apitest.teamBets(item.TeamAoddsnum).then(response => {
                    this.ejectShopCar()
                    this.getShoppingList()
                }).catch(error => {
                    // console.log(error.response.status)
                    if (error.response.status == 401) {
                        this.$message.warning(error.response.data.msg)
                        this.$router.push('/home/login')
                    } else if (error.response.status == 400) {
                        this.$message.warning(error.response.data.msg)

                    } else {
                        this.$message.error(JSON.stringify(error.response.data))
                    }

                })
            },
            // 点击B对按钮下注
            Bratio(item, index) {
                $(".Bratio").eq(index).css('box-shadow', '0 0 8px #fff,0 0 8px #fff,0 0 8px #fff,0 0 8px #fff').parent().parent()
                    .parent().siblings('.left').find('.Aratio').css('box-shadow', 'none')
                this.$api.apitest.teamBets(item.TeamBoddsnum).then(response => {
                    this.ejectShopCar()
                    this.getShoppingList()
                }).catch(error => {
                    if (error.response.status == 401) {
                        this.$message.warning(error.response.data.msg)
                        this.$router.push('/home/login')
                    } else if (error.response.status == 400) {
                        this.$message.warning(error.response.data.msg)

                    } else {
                        this.$message.error(JSON.stringify(error.response.data))
                    }
                })
            },
            // 查看某一游戏的比赛列表
            checkGame(item, index) {
                this.gameid = item.GameProjId
                this.pictLoading1 = true,
                    $('.gamenames .el-icon-arrow-right').eq(index).css({
                        'visibility': 'visible',
                    }).parent().parent().siblings('.gamenames').children().children('.el-icon-arrow-right').css('visibility',
                        'hidden')
                $('.gamenames').eq(index).css({
                        'color': 'white',
                        'backgroundColor': '#313d57'
                    }).siblings().css({
                        'color': '#6c7995',
                        'backgroundColor': '#273044'
                    })
                    //查看某一游戏比赛列表
                this.$api.apitest.checkGame(item.GameProjId, this.currentTime,1).then(response => {
                        console.log(item.GameProjId)
                        this.activeIndex = -1
                        this.pictLoading1 = false,
                        this.gameMessage = response.data.results
                        this.count = response.data.count
                    }).catch(error => {

                    })
                    // 查看某一游戏比赛结果
                 if(this.activeName == 'second'){
                     this.$api.apitest.getOnematchedlist(this.gameid,1).then(response => {
                    // console.log(response)
                    this.activeIndex1 = -1
                    this.gameResults = response.data.results
                    }).catch(error => {

                    })
                }
            },
            // 搜索某一场比赛或赛果
            searchMatch() {
                // this.currentTime = this.$moment().format('YYYY-MM-DD HH:mm:ss');
                if (this.activeName == 'first') {
                    this.$api.apitest.searchMatch(this.searchText,this.currentTime).then(response => {
                        console.log(response)
                        this.gameMessage = response.data.results
                        this.count = response.data.count
                    }).catch(error => {

                    })
                } else if (this.activeName == 'second') {
                    this.$api.apitest.searchMatchedList(this.searchText).then(response => {
                        // console.log(response)
                        this.gameResults = response.data.results
                        this.count = response.data.count
                    })
                }
            },
            // 获取玩法信息
            getGamesplay(item, index) {
                // console.log(this.gamesPlay)
                this.$api.apitest.getGamesplay(item.GameID).then(response => {
                    console.log(response)
                    this.gamesPlay = response.data.results
                    this.activeIndex = this.activeIndex == index ? -1 : index;
                }).catch(error => {

                })
            },
            // 获取玩法结果
            playMatchs(item, index) {
                this.$api.apitest.playMatchs(item.GameID).then(response => {
                    // console.log(response.data.results.length)
                    this.gamesRes = response.data.results
                    if (response.data.results.length != 0) {
                        this.activeIndex1 = this.activeIndex1 == index ? -1 : index;
                    } else {

                    }

                }).catch(error => {

                })
            },

            // 根据玩法下注
            Abets(buts) {
                // $(".Aratio").eq(index).css('box-shadow', '0 0 8px #fff,0 0 8px #fff,0 0 8px #fff,0 0 8px #fff').parent().parent().siblings('.right').children('.box3').children('.right-l').children('.el-button').css('box-shadow', 'none')
                this.$api.apitest.playbets(buts.bet_num).then(response => {
                    this.ejectShopCar()
                    this.getShoppingList()
                }).catch(error => {
                    if (error.response.status == 401) {
                        this.$message.warning(error.response.data.msg)
                        this.$router.push('/home/login')
                    } else if (error.response.status == 400) {
                        this.$message.warning(error.response.data.msg)

                    } else {
                        this.$message.error(JSON.stringify(error.response.data))
                    }
                    // this.$router.push('/home/login')    
                })

            },
            // 点击显示隐藏购物车
            btnsShop() {
                if ($(".shopCar").children(".shopCar-t").children().children("span").hasClass("el-icon-arrow-left")) {
                    $(".shopCar").css("right", "0px").children(".shopCar-t").children().children(".el-icon-arrow-left").attr("class", "el-icon-arrow-right")
                    this.getShoppingList()
                } else if ($(".shopCar").children(".shopCar-t").children().children("span").hasClass("el-icon-arrow-right")) {
                    $(".shopCar").css("right", "-400px").children(".shopCar-t").children().children(".el-icon-arrow-right").attr("class", "el-icon-arrow-left")
                }
            },
            // 获取购物车清单
            getShoppingList() {
                this.$api.apitest.getShoppingList().then(response => {
                    console.log(response)
                    this.shoppingList = response.data.results
                    this.totalProfitMoney()
                }).catch(error => {

                })
            },
            // 删除某一个订单
            deleteOne(item) {
                this.$api.apitest.deleteOne(item.id).then(response => {
                    // console.log(response)
                    this.getShoppingList()
                }).catch(error => {

                })
            },
            // 清除购物车订单
            deleteAll() {
                this.$api.apitest.deleteAll().then(response => {
                    // console.log(response)
                    this.getShoppingList()
                }).catch(error => {

                })
            },
            // 修改下注金额
            betMoney(item, index) {
                this.price = $(".betNum").eq(index).children("input").val()
                var regPrice = /^\d*\.{0,9}\d{0,9}$/
                if (!regPrice.test(this.price)) {
                    this.$message.warning("只能输入数字")
                    return false
                }
                this.$api.apitest.betMoney(item.id, this.price).then(response => {

                }).catch(error => {

                })
            },
            // 总投注额
            inputChange() {
                this.totalProfitMoney()
            },
            // 总收益额
            totalProfitMoney() {
                var prices = 0
                for (var i = 0; i < this.shoppingList.length; i++) {
                    prices += Number(this.shoppingList[i].price)
                }
                this.totalBet = prices
                var money = 0
                for (var i = 0; i < this.shoppingList.length; i++) {
                    money += Math.floor(this.shoppingList[i].odds * this.shoppingList[i].price * 100) / 100
                }
                this.totalProfit = money
            },
            // 提交购物车
            subShoppingcar() {
                this.$api.apitest.subShoppingcar().then(response => {
                    // console.log(response)
                    this.$message.success("投注成功")
                    this.getShoppingList()
                }).catch(error => {
                    if (error.response.data.msg) {
                        this.$message.warning(error.response.data.msg)
                    } else {
                        this.$message.error(JSON.stringify(error.response.data))
                    }
                })
            },
            // 点击下注弹出购物车
            ejectShopCar() {
                if ($(".shopCar").children(".shopCar-t").children().children("span").hasClass("el-icon-arrow-left")) {
                    $(".shopCar").css("right", "0px").children(".shopCar-t").children().children(".el-icon-arrow-left").attr("class", "el-icon-arrow-right")
                }
            },
            handleReachBottom() {

            }
        },

    }
</script>
<style lang="scss">
    .whole {
        position: relative;
        // top: 80px;
        display: flex;
        height: 100%;
        .gameList {
            margin-top: 0px;
            list-style: none;
            width: 210px;
            // height:670px;
            // overflow-y:none;
            position: relative;
            left: 0px;
            display: flex;
            flex-direction: column;
            .gamenames {
                display: flex;
                justify-content: space-between;
                // width: 200px;
                height: 40px;
                line-height: 40px;
                margin-bottom: 1px;
                background-color: #273044;
                color: #6c7995;
                cursor: pointer;
                .imgName {
                    position: relative;
                    margin-left: 10px;
                    .icon {
                        display: inline-block;
                        width: 25px;
                        height: 40px;
                        line-height: 40px;
                        // position:relative;
                        img {
                            position: absolute;
                            left: 0px;
                            top: 8px;
                            width: 25px;
                            height: 25px;
                        }
                    }
                    .gamename {
                        position: absolute;
                        top: 0px;
                        left: 30px;
                        display: inline-block;
                        width: 75px;
                        font-size: 14px;
                        // margin-left:-40px;
                    }
                }
                .nums {
                    margin-right: 20px;
                    .gamanum {
                        //  margin-right:-20px;
                    }
                    .el-icon-arrow-right {
                        visibility: hidden;
                        cursor: pointer;
                    }
                }
            }
            .gamenames:first-child {
                color: white;
                background-color: #313d57;
                .el-icon-arrow-right {
                    visibility: visible;
                    // color: white;
                }
            }
        }
        .matchList {
            margin-left: 10px;
            width: 1000px;
            position: relative;
            .el-tabs {
                height: 100%;
                .el-tabs__header {
                    .el-tabs__nav-wrap {
                        .el-tabs__nav-scroll {
                            .el-tabs__nav {
                                .el-tabs__item {
                                    color: #fff !important;
                                }
                            }
                        }
                    }
                }
                .el-tabs__content {
                    height: 100%;
                    .el-tab-pane {
                        .el-loading-mask {
                            .el-loading-spinner {
                                top: 0%;
                                margin-top: 350px;
                            }
                        }
                    }
                }
            }
            .searchBar {
                position: absolute;
                right: 0px;
                top: 0px;
                height: 41px;
                line-height: 41px;
                input {
                    background-color: #141821;
                    border: 1px solid white;
                    height: 24px;
                    line-height: 24px;
                    color: white;
                    font-weight: bold;
                    border: 1px solid #999;
                    padding-left: 8px;
                }
                span {
                    position: absolute;
                    right: 5px;
                    top: 15px;
                    color: white
                }
            }
            .el-pagination {
                margin-top:10px;
                text-align: center;
                .el-pager{
                    li.active{
                        background-color: #273044 !important
                    }
                    li:hover:not(.active){
                        color: #273044 !important
                    }
                }
            }
            .firstList {
                list-style: none;
                display: flex;
                flex-direction: column;
                // border-bottom:-1px;
                .ivu-scroll-loader-text {
                    color: #fff;
                }
                .matchMes {
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    background-color: #273044;
                    color: white;
                    font-weight: bold;
                    .left {
                        display: flex;
                        justify-content: space-between;
                        width: 500px;
                        // height: 60px;
                        // line-height: 60px;
                        .box1 {
                            padding-left: 10px;
                            // padding-top: 10px;
                            // margin-top:10px;
                            //  height:60px;
                            //  line-height:60px;
                            display: flex;
                            .left-l {
                                padding-top: 12px;
                                // height: 60px;
                                // line-height: 60px;
                                img {
                                    width: 35px;
                                    height: 35px;
                                }
                            }
                            .left-r {
                                padding-top: 5px;
                                margin-left: 10px;
                                //   height:60px;
                                //  line-height:60px;
                                .time {
                                    // margin-top: -5px;
                                    color: #6c7995;
                                }
                                p {
                                    margin-bottom: 5px !important;
                                    height: 12px;
                                    line-height: 12px;
                                    font-size: 10px;
                                    margin-top: 0px;
                                    margin-bottom: 0px;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }
                            }
                        }
                        .box2 {
                            // position:relative;
                            display: flex;
                            .TeamAIcon {
                                position: relative;
                                // height: 60px;
                                width: 35px;
                                img {
                                    position: absolute;
                                    left: 0px;
                                    top: 12.5px;
                                    width: 35px;
                                    height: 35px;
                                }
                            }
                            >span {
                                text-align: right;
                                margin-right: 13px;
                                font-size: 14px;
                            }
                            button {
                                margin-top: 15px;
                                margin-left: 17px;
                                width: 53px;
                                height: 30px;
                                border-radius: 5px;
                                // background-color: #45526d;
                                border: none;
                                color: #fff;
                                padding: 0px;
                                font-weight: bold;
                                // position:relative;
                            }
                            .classA {
                                background-color: #ff7800;
                            }
                            .classB {
                                background-color: #45526d;
                                // cursor: not-allowed;
                            
                            }
                            .ScoreA {
                                background-color: #45526d;
                                border-color: #45526d
                            }
                        }
                    }
                    .vs {
                        font-size: 20px;
                        margin-left: 20px;
                        margin-right: 20px;
                    }
                    .score {
                        font-size: 25px;
                    }
                    .right {
                        width: 350px;
                        .box3 {
                            height: 60px;
                            box-sizing: border-box;
                            display: flex;
                            justify-content: space-between;
                            .right-l {
                                display: flex;
                                img {
                                    margin-top: 12.5px;
                                    width: 35px;
                                    height: 35px;
                                    // line-height:35px;
                                }
                                .teams {
                                    margin-left: 15px;
                                    height: 60px;
                                    font-size: 14px;
                                }
                                button {
                                    margin-top: 15px;
                                    margin-right: 17px;
                                    width: 53px;
                                    height: 30px;
                                    border-radius: 5px;
                                    // background-color: #45526d;
                                    border: none;
                                    color: #fff;
                                    padding: 0px;
                                    font-weight: bold;
                                }
                                .classA {
                                    background-color: #ff7800;
                                }
                                .classB{
                                    background-color: #45526d;
                                    // cursor: not-allowed;
                                    // pointer-events:none
                                }
                                .ScoreB {
                                    background-color: #45526d;
                                    border-color: #45526d
                                }
                            }
                            .right-r {
                                button {
                                    width: 38px;
                                    height: 24px;
                                    border-radius: 8px;
                                    background-color: #273044;
                                    color: #fff;
                                    border-color: white;
                                    outline: none;
                                    font-weight: bold;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                    .Bets {
                        width: 100%;
                        display: flex;
                        border-bottom: 1px solid #000;
                        text-align: center;
                        position: relative;
                        .victory {
                            /* border-bottom: 1px solid #000; */
                            display: inline-block;
                            width: 190px;
                            font-size: 14px;
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                        div {
                            margin-left: 190px;
                            border-left: 1px solid #000;
                            .teamA {
                                text-align: left;
                                display: flex;
                                /* margin: 0px; */
                                height: 40px;
                                line-height: 40px;
                                // background-color: #273044;
                                border-bottom: 1px solid #000;
                                border-top: -1px;
                                span {
                                    text-align: center;
                                    display: inline-block;
                                    height: 40px;
                                    width: 405px;
                                    font-size: 13px;
                                    box-sizing: border-box;
                                    /* cursor: pointer */
                                }
                                .Amouse {
                                    cursor: pointer
                                }
                            }
                            .teamA:last-child {
                                border-bottom: none;
                            }
                            .classC {
                                background-color: #273044
                            }
                            .classD {
                                background-color: rgb(49, 61, 87)
                            }
                        }
                    }
                }
            }
            .secondList {
                width: 100%;
                height: 100%;
                list-style: none;
                display: flex;
                flex-direction: column;
                .resultsMes {
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    // margin-top: -2px;
                    // border-bottom: none;
                    background-color: #273044;
                    color: white;
                    font-weight: bold;
                    .left {
                        display: flex;
                        justify-content: space-between;
                        width: 500px;
                        // height: 60px;
                        // line-height: 60px;
                        .box1 {
                            margin-left: 10px;
                            // margin-top:10px;
                            // height: 60px;
                            // line-height: 60px;
                            display: flex;
                            .left-l {
                                padding-top: 13px;
                                // height: 60px;
                                // line-height: 60px;
                                img {
                                    width: 35px;
                                    height: 35px;
                                }
                            }
                            .left-r {
                                padding-top: 6px;
                                margin-left: 10px;
                                // height: 60px;
                                // line-height: 60px;
                                .time {
                                    // margin-top: -5px;
                                    color: #6c7995;
                                    font-weight: bold;
                                }
                                p {
                                    margin-bottom: 5px !important;
                                    height: 12px;
                                    line-height: 12px;
                                    font-size: 12px;
                                    margin-top: 0px;
                                    margin-bottom: 0px;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }
                            }
                        }
                        .box2 {
                            // position:relative;
                            display: flex;
                            .TeamAIcon {
                                position: relative;
                                // height: 60px;
                                width: 35px;
                                img {
                                    position: absolute;
                                    left: 0px;
                                    top: 12.5px;
                                    width: 35px;
                                    height: 35px;
                                }
                            }
                            >span {
                                margin-right: 13px;
                            }
                            .ScoreA {
                                margin-top: 15px;
                                margin-left: 17px;
                                width: 53px;
                                height: 30px;
                                border-radius: 5px;
                                background-color: #45526d;
                                border: none;
                                color: #fff;
                                padding: 0px;
                                outline: none;
                                font-weight: bold;
                                // position:relative;
                            }
                        }
                    }
                    .score {
                        font-size: 25px;
                        margin: 0px 20px;
                    }
                    .right {
                        width: 350px;
                        .box3 {
                            box-sizing: border-box;
                            display: flex;
                            justify-content: space-between;
                            .right-l {
                                display: flex;
                                .TeamBIcon {
                                    height: 60px;
                                    // position: relative;
                                    img {
                                        // position: absolute;
                                        //  left:10px;
                                        margin-top: 12.5px;
                                        width: 35px;
                                        height: 35px;
                                    }
                                }
                                span {
                                    margin-left: 15px;
                                }
                                button {
                                    margin-top: 15px;
                                    margin-right: 17px;
                                    width: 53px;
                                    height: 30px;
                                    border-radius: 5px;
                                    background-color: #45526d;
                                    border: none;
                                    color: #fff;
                                    outline: none;
                                    font-weight: bold;
                                }
                            }
                            .right-r {
                                button {
                                    width: 38px;
                                    height: 24px;
                                    border-radius: 8px;
                                    background-color: #273044;
                                    color: #fff;
                                    border-color: white;
                                    outline: none;
                                    font-weight: bold;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                    .res {
                        width: 100%;
                        display: flex;
                        border-bottom: 1px solid #000;
                        position: relative;
                        text-align: center;
                        .victory {
                            display: inline-block;
                            width: 140px;
                            font-size: 14px;
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                        div {
                            margin-left: 140px;
                            .gamaRes {
                                display: flex;
                                margin: 0px;
                                height: 40px;
                                line-height: 40px;
                                background-color: #273044;
                                border-left: 1px solid #000;
                                border-bottom: 1px solid #000;
                                span {
                                    display: inline-block;
                                    height: 40px;
                                    width: 430px;
                                    font-size: 13px;
                                    /* border-bottom: 1px solid #000; */
                                }
                            }
                            .gamaRes:last-child {
                                border-bottom: none;
                            }
                            .classC {
                                background-color: #273044
                            }
                            .classD {
                                background-color: rgb(49, 61, 87)
                            }
                        }
                    }
                }
            }
        }
        .shopCar {
            position: fixed;
            top: 190px;
            right: -400px;
            text-align: center;
            .shopCar-t {
                display: flex;
                justify-content: space-between;
                width: 400px;
                height: 40px;
                line-height: 40px;
                color: #fff;
                font-size: 14px;
                background-color: #000;
                border-radius: 5px;
                padding: 0px 10px;
                span {
                    line-height: 40px;
                }
                .el-icon-delete {
                    cursor: pointer;
                }
            }
            .shopCar-b {
                position: absolute;
                right: 0px;
                width: 390px;
                height: 470px;
                background-color: #2f3b55;
                .Orders {
                    width: 100%;
                    height: 300px;
                    list-style: none;
                    overflow-y: scroll;
                     ::-webkit-scrollbar {
                        width: 4px;
                    }
                    li {
                        padding: 0px 10px;
                        // width: 390px;
                        .betTeam {
                            height: 30px;
                            line-height: 30px;
                            background-color: #000;
                            color: #fff;
                            display: flex;
                            justify-content: space-between;
                            font-weight: bold;
                            font-size: 12px;
                            span {
                                font-size: 14px;
                                line-height: 30px;
                            }
                        }
                        div {
                            // width: 360px;
                            .playway {
                                margin: 5px 0px 0px 0px;
                                // padding-left: 10px;
                                width: 100%;
                                height: 20px;
                                line-height: 20px;
                                background-color: #21293c;
                                color: #fff;
                                font-size: 12px;
                                // margin-left: -40px;
                                font-weight: bold;
                                span {
                                    display: inline-block;
                                    width: 33.333%;
                                    text-align: left;
                                }
                            }
                            .betNum {
                                width: 100%;
                                height: 43px;
                                line-height: 43px;
                                color: #fff;
                                background-color: #1a2131;
                                margin: 0px;
                                // margin-left: -40px;
                                position: relative;
                                text-align: left;
                                button {
                                    width: 50px;
                                    height: 32px;
                                    // background-color: #ff7800;
                                    outline: none;
                                    border: none;
                                    border-radius: 5px;
                                    color: #fff;
                                    font-weight: bold;
                                    position: absolute;
                                    top: 7px;
                                    left: 10px;
                                }
                                .classA {
                                    background-color: #ff7800;
                                }
                                .classB {
                                    background-color: #45526d;
                                }
                                input {
                                    width: 100px;
                                    height: 25px;
                                    background-color: #323d56;
                                    border-color: #000;
                                    color: #fff;
                                    outline: none;
                                    padding-left: 5px;
                                    position: absolute;
                                    top: 8px;
                                    left: 100px;
                                }
                                .el-icon-close {
                                    position: absolute;
                                    top: 15px;
                                    left: 70px;
                                }
                                .res {
                                    position: absolute;
                                    left: 220px;
                                }
                                .el-icon-circle-close {
                                    position: absolute;
                                    top: 15px;
                                    right: 10px;
                                    cursor: pointer
                                }
                                .Totalamount {
                                    position: absolute;
                                    left: 250px;
                                    font-size: 14px;
                                    font-weight: bold;
                                    display: inline-block;
                                    width: 100px;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }
                            }
                        }
                    }
                }
                .el-pagination {
                    margin: 10px 0px;
                    .el-pagination__total {
                        color: #fff !important;
                    }
                }
                .setBets {
                    margin-top: 20px;
                    .amount {
                        width: 390px;
                        height: 45px;
                        line-height: 45px;
                        font-size: 14px;
                        font-weight: bold;
                        color: #fff;
                        background-color: #192031;
                        position: relative;
                        .TmoneyName {
                            position: absolute;
                            left: 20px;
                        }
                        .Tmoney {
                            color: #ff7800;
                            display: inline-block;
                            width: 90px;
                            text-align: left;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            position: absolute;
                            left: 103px;
                        }
                        .SmoneyName {
                            position: absolute;
                        }
                        .Smoney {
                            color: #ff7800;
                            display: inline-block;
                            width: 90px;
                            text-align: left;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            position: absolute;
                            left: 278px
                        }
                    }
                    .submit {
                        width: 390px;
                        height: 90px;
                        background-color: #192031;
                        margin-top: -12px;
                        button {
                            height: 38px;
                            width: 250px;
                            line-height: 38px;
                            background-color: #ff7800;
                            color: #fff;
                            font-weight: bold;
                            outline: none;
                            border: none;
                            border-radius: 5px;
                            margin: 15px 0px;
                            cursor: pointer
                        }
                        p {
                            margin: -5px 0px 0px 0px;
                            color: #c3c3c3;
                            font-size: 14px;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
</style>