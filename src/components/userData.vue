<template>
    <div class="box">
        <p class="title">&nbsp&nbsp&nbsp&nbsp用户中心/个人资料</p>
        <div class="userData">
            <p><span class="data">个人资料&nbsp&nbsp&nbsp&nbsp</span><span class="tips">| 为了您的账号与资金安全，请完善以下信息。</span></p>
            <div class="userData-b">
                <ul>
                    <li><span class="userMess">用户名 : </span><span style="font-size:13px">{{this.username}}</span></li>
                    <li><span class="userMess">注册日期 : </span><span style="font-size:13px">2018-11-12</span></li>
                    <li><span class="userMess">真实姓名 : </span><span style="font-size:13px">{{this.ActualName}}</span><span v-show="bindShow" style="cursor:pointer;color:#1e9fff;font-size:13px;margin-left: 20px" @click="bindshow">绑定</span></li>
                    <li v-show="inputShow"><input type="text" style="margin-left: 80px;width:140px" v-model="inActualName"></li>
                    <li><button style="background-color:#009688;width:65px;height:37px;border:none;margin-left:80px;color:#fff" @click="bindActualName" v-show="submitShow">保存</button></li>
                </ul>
            </div>
        </div>
        <!-- <div class="personalities">
            <p class="icon">个性头像</p>
            <div class="upload">
                <form id="imgForm">
                    <input type="file" class="addBorder" @change="loadImg">
                    <br/>
                </form>
                <div class="addBorder" id="imgDiv">
                    <img id="imgContent">
                </div>
                <button class="complete">完成</button>
            </div>
        </div> -->
    </div>
</template>
<script>
    import $ from 'jquery'
    export default {
        data() {
            return {
                username: window.localStorage.getItem('username'),
                ActualName: '',
                bindShow: true,
                inputShow: false,
                inActualName: '',
                submitShow:true
            }
        },
        created() {
            this.getActualname()
        },
        methods: {
            // loadImg() {
            //     //获取文件
            //     var file = $("#imgForm").find("input")[0].files[0];

            //     //创建读取文件的对象
            //     var reader = new FileReader();

            //     //创建文件读取相关的变量
            //     var imgFile;

            //     //为文件读取成功设置事件
            //     reader.onload = function(e) {
            //         // alert('文件读取完成');
            //         imgFile = e.target.result;
            //         console.log(imgFile);
            //         $("#imgContent").attr('src', imgFile);
            //     };
            //     //正式读取文件
            //     reader.readAsDataURL(file);
            // },

            // 获取用户真实姓名
            getActualname() {
                this.$api.apitest.getActualname(this.username).then(response => {
                    console.log(response)
                    this.ActualName = response.data.results.ActualName
                    if (this.ActualName === null) {
                        this.ActualName = "未绑定"
                    } else {
                        this.bindShow = false
                        this.submitShow = false
                        this.inputShow = false
                    }
                }).catch(error => {
                   
                })
            },
            // 显示绑定真实姓名
            bindshow() {
                this.bindShow = false
                this.inputShow = true
            },
            // 绑定真实姓名
            bindActualName() {
                this.$api.apitest.bindActualName(this.username,this.inActualName).then(response => {
                    console.log(response)
                    this.getActualname()
                }).catch(error => {
                      if (error.response.data.msg) {
                            this.$message.warning(error.response.data.msg)
                        } else {
                            this.$message.error(JSON.stringify(error.response.data))
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .title {
        display: inline-block;
        width: 100%;
        height: 30px;
        line-height: 30px;
        color: #666;
        font-weight:bold;
        border-bottom: 1px solid #eeeeee;
        font-size: 12px;
    }
    
    .userData {
        // height: 50px;
        border: 1px solid #eeeeee;
        margin: 0px 12px 12px 12px;
        p {
            height:30px;
            line-height:30px;
            padding-left: 15px;
            .data {
                font-size: 14px;
                color: #666666;
            }
            .tips {
                font-size: 14px;
                color: #666666;
            }
        }
        .userData-b {
            padding-top:15px;
            // padding-left: 15px;
            height: 234px;
            border: 1px solid #eeeeee;
            // margin-top: -3px;
            ul {
                height: 234px;
                list-style: none;
                li {
                    margin-bottom: 15px;
                    .userMess {
                        font-size: 13px;
                        color: #666666;
                        display: inline-block;
                        width: 80px;
                        text-align:right;
                        margin-right:20px;
                    }
                }
            }
        }
    }
    
    .personalities {
        margin: 235px 12px 12px 12px;
        width: 97.5%;
        height: 500px;
        // border:1px solid #eeeeee;
        .icon {
            display: inline-block;
            width: 98.4%;
            height: 50px;
            line-height: 50px;
            margin-bottom: -1px;
            border: 1px solid #eeeeee;
            padding-left: 15px;
            font-size: 14px;
            color: #5f5f5f;
        }
        .upload {
            padding-left: 46px;
            height: 448px;
            border: 1px solid #eeeeee;
            .addBorder {
                border: 1px solid #ccc;
                margin-top: 20px;
            }
            #imgDiv {
                width: 200px;
                height: 200px;
                #imgContent {
                    width: 200px;
                    height: 200px;
                }
            }
            .complete {
                margin-top: 10px;
            }
        }
    }
</style>