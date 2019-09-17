<template>
    <div>
        <div class="account">
             <p class="title">&nbsp&nbsp&nbsp&nbsp游戏记录<span>|  投注记录只保留30天数据。</span></p>
             <el-tabs v-model="activeName" >
                <el-tab-pane label="电竞" name="first">
                    <div class="search">
                        <div>
                           <div class="searchTop">
                             <p class="obox">
                                <span class="stitle">用户名 : &nbsp</span><el-input v-model="username" placeholder="请输入内容" style="width:180px;"></el-input>
                             <span class="stitle">订单号 : &nbsp</span><el-input v-model="number" placeholder="请输入内容" style="width:180px;"></el-input>
                             <span class="stitle">游戏 : &nbsp</span><el-input v-model="gameName" placeholder="请输入内容" style="width:180px;"></el-input>
                             </p>
                             <p class="tbox"><span class="stitle">时间 : &nbsp</span>
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
   <el-button type="primary" class="sbtn" @click="search">搜索</el-button><el-button class="cbtn" @click="reset">重置</el-button>
  </p>
                            
                           </div>
                           <el-table :data="tableData" border style="width: 100%">
                                <el-table-column prop="username" label="用户名" width="100px;">
                                </el-table-column>
                                <el-table-column prop="OderNumber" label="订单号">
                                </el-table-column>
                                <el-table-column prop="betteamid" label="投注战队名" width="100px;">
                                </el-table-column>
                                <el-table-column prop="gameid" label="投注比赛名" >
                                </el-table-column>
                                <el-table-column prop="price" label="投注金额" width="90px">
                                </el-table-column>
                                <el-table-column prop="CreateDate" label="投注时间" width="150px">
                                      <template slot-scope="scope">
                                        <i class="el-icon-time"></i>
                                        <span style="margin-left: 10px">{{ scope.row.CreateDate | dateFmt('YYYY-MM-DD HH:mm')}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="odds" label="赔率" width="50px">
                                </el-table-column>
                                <el-table-column prop="gamestatue" label="比赛状态" width="80px">
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper" >
                                            <el-tag size="medium" :class="`${scope.row.gamestatue}` == '未开始'?classW:classY">{{scope.row.gamestatue}}</el-tag>
                                        </div>
                                    </template>
                                </el-table-column>
                                 <el-table-column prop="isWin" label="胜负" width="55px"> 
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper" >
                                            <el-tag size="medium" :class="`${scope.row.isWin}` == '胜'?classS:classF">{{scope.row.isWin}}</el-tag>
                                        </div>
                                    </template>
                                </el-table-column>
                                 <el-table-column prop="bet" label="投注玩法">
                                </el-table-column>
                           </el-table>
                           <div class="block">
                                <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                 :page-size="pageSize"
                                layout="total,  prev, pager, next, jumper"
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
                username:'',
                gameName:'',
                number:'',
                time:[], 
                gameState:"",
                activeName: 'first',
                count:0,
                currentPage:1,
                pageSize:0,
                classW:'classW',
                classY:'classY',
                classS:'classS',
                classF:'classF',
                tableData: [{
                    username:'黄民航',
                    OderNumber:'123456',
                    betteamid: '2016-05-02',
                    gameid: '王小虎',
                    price: '上海市普陀区金沙江路 1518 弄',
                    CreateDate:'2018-11-22',
                    odds:'3242',
                    gamestatue:'1323',
                    isWin:'rng',
                    bet:'平局'
                }],
                options: [{
                    gameState: '',
                    label: '全部'
                    }, {
                    gameState: '2',
                    label: '已结束'
                    }, {
                    gameState: '0',
                    label: '未开始'
                    }, {
                    gameState: '1',
                    label: '进行中'
                    }],
                    gameState: ''
            };
        },
        created() {
            // 下注记录
             this.$api.apitest.getgamerecordlist().then(response=>{
                    // console.log(response)
                    this.tableData = response.data.results
                    this.count = response.data.count
                    this.pageSize = response.data.results.length
                }).catch(error=>{
                    
                })
        },
        methods: {
            // 搜索
            search(){
                if(this.time[0]==undefined){
                    this.time[0] = this.$moment('20000101').format('YYYY-MM-DD')
                    this.time[1] = this.$moment().format('YYYY-MM-DD')
                }
                this.$api.apitest.searchgamerecordlist(this.username,this.time[0],this.time[1],this.gameName,this.number,this.gameState).then(response=>{
                    console.log(response)
                    this.tableData = response.data.results
                    this.count = response.data.count
                }).catch(error=>{

                })
            },
             // 重置
            reset(){
                this.username = ''
                this.gameName = ''
                this.number = ''
                this.gameState = ''
            },
            // 到某一页
            handleCurrentChange(val) {
                 this.$api.apitest.getgamerecordPage(val,this.gameState).then(response=>{
                    // console.log(response)
                    this.tableData = response.data.results
                    // this.count = response.data.count
                }).catch(error=>{
                    
                })
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
                flex-wrap:wrap;
                // height:40px;
                // line-height:40px;
                margin-bottom: 20px;
               .obox,.tbox{
                     display:flex;
                     height:40px;
                    line-height:40px;
                    margin-top:0px;
                    margin-bottom:10px;
                    .stitle{
                        display:inline-block;
                        width:70px;
                        text-align:right;
                        font-size:14px;
                        color:#666
                    }
               }
            

                .type {
                    font-size: 14px;
                    color: #666666;
                    margin-left: 20px;
                }
                .el-button  {
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
        .el-table__body-wrapper{
            .el-table__body{
                .el-table__row{
                    .el-table_1_column_8{
                        .name-wrapper{
                            .classW{
                                background-color:rgb(87,197,247);
                                color:#fff
                            }
                            .classY{
                                background-color:#999;
                                color:#fff
                            }
                            
                        }
                    }
                    .el-table_1_column_9{
                        .name-wrapper{
                            span{
                                display:block;
                                width:34px;
                            }
                            .classS{
                                background-color:rgb(25,190,107);
                                color:#fff
                            }
                            .classF{
                                background-color:rgb(239,80,40);
                                color:#fff
                            }
                        }
                    }
                }
            }
        }
    }
</style>