<template>
    <div>
        <div class="account">
             <p class="title">&nbsp&nbsp&nbsp&nbsp帐变记录<span>| 帐变明细只保留30天数据。</span></p>
             <el-tabs v-model="activeName" >
                <el-tab-pane label="中心钱包" name="first">
                    <div class="search">
                        <div>
                           <div class="searchTop">
                            <span class="stitle">订单号 : &nbsp</span><el-input v-model="number" placeholder="请输入内容" style="width:180px;marginTop:1px"></el-input>
                             <span class="stitle">时间 : &nbsp</span>
                              <el-date-picker
                            v-model="time"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                           >
                            </el-date-picker>
                            <span class="stitle">状态 : &nbsp</span>
                             <el-select v-model="gameState" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.gameState"
                                :label="item.label"
                                :value="item.gameState">
                                </el-option>
                            </el-select>
                            <el-button type="primary" class="sbtn" @click="searchList">搜索</el-button><el-button class='cbtn' @click="cleartest">重置</el-button>
                           </div>
                            <el-table :data="tableData" border style="width: 100%">
                                <el-table-column prop="OderNumber" label="订单号" width="150px">
                                </el-table-column>
                                <el-table-column prop="PalyerNumber" label="用户名" width="100px">
                                </el-table-column>
                                <el-table-column prop="accountmoney" label="余额" width="100px">
                                </el-table-column>
                                <el-table-column prop="CreateDate" label="创建日期">
                                    <template slot-scope="scope">
                                        <i class="el-icon-time"></i>
                                        <span style="margin-left: 10px">{{ scope.row.CreateDate | dateFmt('YYYY-MM-DD HH:mm')}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Type" label="交易类型" width="100px">
                                </el-table-column>
                                <el-table-column prop="money" label="交易金额">
                                </el-table-column>
                                <el-table-column prop="Remark" label="备注">
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-size="pageSize"
                                layout="total, prev, pager, next, jumper"
                                :total="count">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                number:'',
                time:[],  
                activeName: 'first',
                count:0,
                currentPage:1,
                pageSize:0,
                tableData: [{
                    OderNumber: '2016-05-02',
                    PalyerNumber: '王小虎',
                    accountmoney: '上海市普陀区金沙江路 1518 弄',
                    CreateDate: '2016-05-02',
                    Type: '王小虎',
                    Remark: '上海市普陀区金沙江路 1518 弄',
                    money: '2016-05-02',
                }],
               options: [{
                    gameState: '',
                    label: '全部'
                    }, {
                    gameState: '竞猜',
                    label: '竞猜'
                    }, {
                    gameState: '充值',
                    label: '充值'
                    }, {
                    gameState: '提现',
                    label: '提现'
                    }],
                gameState: ''
            };
        },
        created() { 
            // 账单变化明细
            this.$api.apitest.moneychangelist().then(response=>{
                console.log(response)
                this.tableData = response.data.results
                this.count = response.data.count
                this.pageSize = response.data.results.length
            }).catch(error=>{

            })
        },
        methods: {
            // 搜索账单
           searchList(){
                if(this.time[0]==undefined){
                    this.time[0] = this.$moment('20000101').format('YYYY-MM-DD')
                    this.time[1] = this.$moment().format('YYYY-MM-DD')
                }
                this.$api.apitest.searchList(this.number,this.time[0],this.time[1],this.gameState).then(response=>{
                console.log(response)
                this.tableData = response.data.results
                this.count = response.data.count
                }).catch(error=>{

                })
           },
            // 到某一页
             handleCurrentChange(val) {
                 if(this.time[0]==undefined){
                    this.time[0] = this.$moment('20000101').format('YYYY-MM-DD')
                    this.time[1] = this.$moment().format('YYYY-MM-DD')
                }
                  this.$api.apitest.handleCurrentChange(this.number,this.time[0],this.time[1],this.gameState,val).then(response=>{
                    console.log(response)
                    this.tableData = response.data.results
                }).catch(error=>{

                })
            },
            // 清除搜索文本
            cleartest(){
                this.number=""
                this.gameState=""
            }
        }
    };
</script>
<style lang="scss" scoped>
    .account {
        border: 1px solid #e6e6e6;
        margin: 10px;
        padding-left: 10px;
        .title {
            display: inline-block;
            width: 100%;
            height: 30px;
            line-height: 30px;
            color: #666;
            font-size: 15px;
            margin-left: -18px;
        }
        .search {
            text-align:center;
            .searchTop {
                display:flex;
                height: 40px;
                line-height: 40px;
                margin-bottom: 20px;
                .stitle{
                        display:inline-block;
                        width:70px;
                        text-align:right;
                        font-size:14px;
                        color:#666
                    }
                button {
                    margin-top:5px;
                    height:30px;
                    padding:8px 13px;
                  
                }
                .sbtn{
                      margin-left: 18px;
                }
                .cbtn{
                    margin-right: 18px;
                }
            }
            .block{
                 margin:30px 0px;
            }
        }
    }
</style>