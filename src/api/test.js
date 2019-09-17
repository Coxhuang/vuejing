import axios from '../utils/axios'
// import { getCookie } from '@/utils/util'

const apitest = {
    // 验证token
    checktoken(token) {
        return axios({
            url: '/User/api-token-verify/',
            method: 'POST',
            data: {
                token: token
            },

        })
    },
    // 获取验证码
    createcode() {
        return axios({
            url: '/User/createcaptcha/',
            method: 'post'
        })
    },
    // 查看玩家注册项
    getregisterlist() {
        return axios({
            url: '/Jingcai/getoptionregisterjingcai/',
            method: 'get',
        })
    },
    // 查看玩家必选列表
    getmustregisterlist() {
        return axios({
            url: '/Jingcai/getmustregisterjingcai/',
            method: 'get',
        })
    },
    // 新增玩家
    addPlayer(data) {
        return axios({
            url: '/Jingcai/playernew/',
            method: 'post',
            data
        })
    },
    // 获取密保问题
    getPassQues() {
        return axios({
            url: '/Jingcai/safequestionjingcai/',
            method: 'get'
        })
    },
    // 玩家登录
    playerLogin(username, password, captcha) {
        return axios({
            url: '/Jingcai/login/',
            method: 'post',
            data: {
                username: username,
                password: password,
                captcha: captcha,
            },
        })
    },
    // 获取用户信息
    getPlayerMessage(username) {
        return axios({
            url: '/Jingcai/playerviewjingcai/' + username,
            method: 'get',
        })
    },
    // 获取游戏列表
    getallgamelist() {
        return axios({
            url: '/gameApi/getallgamelist/',
            method: 'get',
        })
    },
    // 查看全部比赛
    getallmatchlist(currentTime, pagenum) {
        return axios({
            url: '/gameApi/getallmatchlist/' + "?BeginTime_after=" + currentTime + "&" + "size=" + 15 + "&" + "page=" + pagenum,
            method: 'get',

        })
    },
    // 查看比赛结果
    getallmatchedlist(pagenum) {
        return axios({
            url: '/gameApi/getallmatchedlist/' + "?size=" + 15 + "&" + "page=" + pagenum,
            method: 'get',

        })
    },
    // 获取购物车清单
    getShoppingList() {
        return axios({
            url: '/gameApi/listshoppingcar/',
            method: 'get',
        })
    },
    // 查看某一游戏比赛列表
    checkGame(GameProjId, currentTime, pagenum) {
        return axios({
            url: '/gameApi/getallmatchlist/' + "?EventID=" + GameProjId + "&" + "BeginTime_after=" + currentTime + "&" + "size=" + 15 + "&" + "page=" + pagenum,
            method: 'get',
        })
    },
    // 查看某一游戏结果列表
    getOnematchedlist(GameProjId, pagenum) {
        return axios({
            url: '/gameApi/getallmatchedlist/' + "?EventID=" + GameProjId + "&" + "size=" + 15 + "&" + "page=" + pagenum,
            method: 'get',

        })
    },
    // 搜索某一场比赛
    searchMatch(searchText, currentTime) {
        return axios({
            url: '/gameApi/getallmatchlist/' + "?search=" + searchText + "&" + "BeginTime_after=" + currentTime + "&" + "size=" + 15,
            method: 'get',

        })
    },
    // 搜索某一场比赛结果
    searchMatchedList(searchText) {
        return axios({
            url: '/gameApi/getallmatchedlist/' + "?search=" + searchText,
            method: 'get',

        })
    },
    // 点击按钮下注
    teamBets(Teamoddsnum) {
        return axios({
            url: '/gameApi/postshoppingcar/',
            method: 'post',
            data: {
                betnum: Teamoddsnum
            }
        })
    },
    // 获取玩法信息
    getGamesplay(GameID) {
        return axios({
            url: '/gameApi/getbetlistongame/',
            method: 'post',
            data: {
                GameID: GameID
            },
        })
    },
    // 获取玩法结果
    playMatchs(GameID) {
        return axios({
            url: '/gameApi/getbetresultongame/',
            method: 'post',
            data: {
                GameID: GameID
            },
        })
    },
    // A玩法下注
    playbets(bet_num) {
        return axios({
            url: '/gameApi/postshoppingcar/',
            method: 'post',
            data: {
                betnum: bet_num
            }
        })
    },
    // 删除购物车某条清单
    deleteOne(id) {
        return axios({
            url: '/gameApi/listshoppingcar/' + id + '/',
            method: 'delete',
        })
    },
    // 获取购物车当前页数据
    currentPage(val) {
        return axios({
            url: '/gameApi/listshoppingcar/' + '?page=' + val,
            method: 'get',
        })
    },
    // 清除购物车订单
    deleteAll() {
        return axios({
            url: '/gameApi/clearshoppingcar/0/',
            method: 'delete'
        })
    },
    // 输入下注金额
    betMoney(id, price) {
        return axios({
            url: '/gameApi/updateshoppingcar/' + id + '/',
            method: 'put',
            data: {
                price: price
            }
        })
    },
    // 提交购物车
    subShoppingcar() {
        return axios({
            url: '/gameApi/submitshoppingcar/',
            method: 'post',
        })
    },
    //用户钱包余额
    getWallet() {
        return axios({
            url: '/Jingcai/getwalletjingcai/',
            method: 'get',
        })
    },
    // 获取充值方式
    getListway() {
        return axios({
            url: '/Operation/listPayCode',
            method: 'get',
        })
    },
    // 支付宝/微信充值
    PayFor(payWay, rechargeMoney) {
        return axios({
            url: '/Operation/makeOrder' + "?paycode=" + payWay + "&" + "paynum=" + rechargeMoney,
            method: 'get',
        })
    },
    // 显示银行卡
    Cash() {
        return axios({
            url: '/User/getbackcardetail/',
            method: 'get',
        })
    },
    // 获取总资产
    getAssets() {
        return axios({
            url: '/gameApi/getassets/',
            method: 'get',
        })
    },
    // 确认提现
    submitCash(cashMoney) {
        return axios({
            url: '/funds/createWithdrawMoney/',
            method: 'post',
            data: {
                money: cashMoney
            }
        })
    },
    // 获取帐变明细
    moneychangelist() {
        return axios({
            url: '/Jingcai/moneychangelistjingcai/',
            method: 'get'
        })
    },
    // 搜索账单
    searchList(number, time1, time2, couponSelected) {
        return axios({
            url: '/Jingcai/moneychangelistjingcai/' + "?OderNumber=" + number + "&" + "CreateDate_after=" + time1 + "&" + "CreateDate_before=" + time2 + "&" + "Type=" + couponSelected,
            method: 'get',
        })
    },
    // 到账单某一页
    handleCurrentChange(number, time1, time2, couponSelected, val) {
        return axios({
            url: '/Jingcai/moneychangelistjingcai/' + "?OderNumber=" + number + "&" + "CreateDate_after=" + time1 + "&" + "CreateDate_before=" + time2 + "&" + "Type=" + couponSelected + "&" + "page=" + val,
            method: 'get',
        })
    },
    // 获取游戏下注记录
    getgamerecordlist() {
        return axios({
            url: '/Jingcai/getgamerecordlistjingcai/',
            method: 'get',
        })
    },
    // 搜索游戏记录
    searchgamerecordlist(username, time1, time2, gameName, number, gameState) {
        return axios({
            url: '/Jingcai/getgamerecordlistjingcai/' + "?playeruser=" + username + "&" + "time_after=" + time1 + "&" + "time_before=" + time2 + "&" + "gamename=" + gameName + "&" + "OderNumber=" + number + "&" + "gamestatus=" + gameState,
            method: 'get',
        })
    },
    // 到游戏记录某一页
    getgamerecordPage(val, gameState) {
        return axios({
            url: '/Jingcai/getgamerecordlistjingcai/' + "?page=" + val + "&" + "gamestatus=" + gameState,
            method: 'get',
        })
    },
    // 获取用户真实姓名
    getActualname(usernama) {
        return axios({
            url: '/Jingcai/playerviewjingcai/' + usernama,
            method: 'get',
        })
    },
    // 绑定真实姓名
    bindActualName(usernama, inActualName) {
        return axios({
            url: '/Jingcai/setnamejingcai/' + usernama + '/',
            method: 'put',
            data: {
                ActualName: inActualName
            }
        })
    },
    // 获取银行卡信息
    getbackcardetail() {
        return axios({
            url: '/Jingcai/getbackcardetailjingcai/',
            method: 'get',
        })
    },
    // 添加银行卡
    addBankCard(username, bankNum, bankName) {
        return axios({
            url: '/Jingcai/setbankcardjingcai/' + username + '/',
            method: 'put',
            data: {
                BankCardNum: bankNum,
                Bank: bankName
            }
        })
    },
    // 修改玩家密码
    submitPass(username, firstPass, secondPass) {
        return axios({
            url: '/Jingcai/setpasswordplayerjingcai/' + username + '/',
            method: 'put',
            data: {
                passwordfirst: firstPass,
                passwordlast: secondPass
            }
        })
    },
    //修改支付密码
    submitPay(username, oldPass, payPass1, payPass2) {
        return axios({
            url: '/Jingcai/setplayerpasswordpayjingcai/' + username + '/',
            method: 'put',
            data: {
                passwordpay: oldPass,
                passwordfirst: payPass1,
                passwordlast: payPass2
            }
        })
    },
    // 修改密保问题
    submitQues(username, question, answer) {
        return axios({
            url: '/Jingcai/resetsafequestionuserjingcai/' + username + '/',
            method: 'put',
            data: {
                SafeQuestion: question,
                SafeReply: answer
            }
        })
    },
    // 修改邮箱
    submitEmail(username, email) {
        return axios({
            url: '/Jingcai/playeremailjingcai/' + username + '/',
            method: 'put',
            data: {
                email: email
            }
        })
    },
    // 申请代理
    appliAgent(username, qq, phoneNumber, textarea) {
        return axios({
            url: '/User/applyagent/',
            method: 'post',
            data: {
                user: username,
                QQ: qq,
                phone: phoneNumber,
                remake: textarea
            }
        })
    },
    // 获取公告列表
    getannouncementlist() {
        return axios({
            url: '/Jingcai/getannouncementlistjingcai/',
            method: 'get',
        })
    },
    // 公告列表分页
    getannouncementlistpage(pageNum) {
        return axios({
            url: '/Jingcai/getannouncementlistjingcai/' + '?page=' + pageNum,
            method: 'get',
        })
    },
    //公告详情
    getannouncementDetail(id) {
        return axios({
            url: '/Jingcai/getannouncementlistjingcai/' + id + '/',
            method: 'get',
        })
    }
}
export default apitest