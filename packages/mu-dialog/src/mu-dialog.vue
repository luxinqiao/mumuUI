<template>
    <div class='mu-dialog' v-if='isShow'>
        <div v-if='type=="alert"||type=="confirm"||type=="content"' class='shade' ref='muDialogShade'></div>
        <div class='tip trans-center' v-if='type=="tip"'>{{tipObj.content}}</div>
        <div class='alert pos-center' v-if='type=="alert" && alertObj.isShow'>
            <div class='title'>
                <span class='titleText'>{{alertObj.title}}</span>
                <span class='close' @click='close()'></span>
            </div>
            <div class='content flex-center'>
                <span>{{alertObj.content}}</span>
            </div>
            <div class='button' @click='clickAlertButton()'>{{alertObj.button}}</div>
        </div>
        <div class='confirm pos-center' v-if='type=="confirm" && confirmObj.isShow'>
            <div class='title'>
                <span class='titleText'>{{confirmObj.title}}</span>
                <span class='close' @click='close()'></span>
            </div>
            <div class='content flex-center'>
                <span>{{confirmObj.content}}</span>
            </div>
            <div class='button'>
                <span class='leftButton' @click='close()'>{{confirmObj.leftButton}}</span>
                <span class='rightButton' @click='clickConfirmRight()'>{{confirmObj.rightButton}}</span>
            </div>
        </div>
        <div class='content pos-center' v-if='type=="content" && contentObj.isShow'>
            <div class='title'>
                <span class='titleText'>{{contentObj.title}}</span>
                <span class='close' @click='close()'></span>
            </div>
            <div class='slot'>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'muDialog',
        data() {
            return {
                isShow: false,
                type: '', //弹出框类型（tip、alert、confirm、content）
                tipObj: {
                    content: ''
                },
                alertObj: {
                    isShow: true,
                    title: '',
                    content: '',
                    button: ''
                },
                confirmObj: {
                    isShow: true,
                    title: '',
                    content: '',
                    leftButton: '',
                    rightButton: ''
                },
                contentObj: {
                    isShow: true,
                    title: ''
                },
                timeoutFun: ()=>{}
            }
        },
        methods: {
            /**
                提示框
                @param {String} content 内容
                @param {Number} time 提示时间
                @return
             */
            tip(content, time = 2000) {
                clearTimeout(this.timeoutFun)
                this.isShow = true
                this.type = 'tip'
                this.tipObj.content = content
                this.timeoutFun = setTimeout(()=>{
                    this.isShow = false
                }, time)
            },
            /**
                警告框
                @param {
                    {String} title 头部标题
                    {String} content 内容
                    {String} button 底部按钮文案
                }
                @return
             */
            alert({title = '警告', content, button = '确定', callBack}) {
                this.isShow = true
                this.type = 'alert'
                this.alertObj = {
                    isShow: true,
                    title: title,
                    content: content,
                    button: button,
                    callBack: callBack
                }
            },
            /**
                点击警告框按钮
                @param
                @return
             */
            clickAlertButton() {
                this.close(()=> {
                    typeof(this.alertObj.callBack) == 'function' ? this.alertObj.callBack() : ''
                })
            },

            /**
                确认框
                @param {
                    {String} title 头部标题
                    {String} content 内容
                    {String} leftButton 左按钮文案
                    {Function} leftCallBack 左按钮回调函数
                    {String} rightButton 右按钮文案
                    {Function} rightCallBack 右按钮回调函数
                }
                @return
             */
            confirm({title = '确认', content, leftButton = '关闭', leftCallBack, rightButton = '确定', rightCallBack}) {
                this.isShow = true
                this.type = 'confirm'
                this.confirmObj = {
                    isShow: true,
                    title: title,
                    content: content,
                    leftButton: leftButton,
                    leftCallBack: leftCallBack,
                    rightButton: rightButton,
                    rightCallBack: rightCallBack
                }
            },
            /**
                点击确认框右侧按钮
                @param
                @return
             */
            clickConfirmRight() {
                this.close(()=> {
                    typeof(this.confirmObj.rightCallBack) == 'function' ? this.confirmObj.rightCallBack() : ''
                })
            },
            /**
                内容框
                @param {
                    {String} title 头部标题
                }
                @return
             */
            content({title}) {
                this.isShow = true
                this.type = 'content'
                this.contentObj = {
                    isShow: true,
                    title: title
                }
            },
            /**
                点击内容框右侧按钮
                @param
                @return
             */
            clickContentRight() {
                this.close(()=> {
                    typeof(this.contentObj.rightCallBack) == 'function' ? this.contentObj.rightCallBack() : ''
                })
            },
            /**
                关闭弹出框
                @param 
                @return
             */
            close(callback) {
                this.$refs.muDialogShade.className += ' shadeOut'
                if (this.type == 'alert') {
                    this.alertObj.isShow = false
                } else if (this.type == 'confirm') {
                    this.confirmObj.isShow = false
                } else if (this.type == 'content') {
                    this.contentObj.isShow = false
                }
                setTimeout(()=>{
                    this.isShow = false
                    typeof(callback) == 'function' ? callback() : ''
                }, 300)
            }
        }
    }
</script>

<style scoped lang='scss'>
    .mu-dialog {
        position: fixed; z-index: 99;
        top: 0; bottom: 0; left: 0; right: 0;
        .trans-center {
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
        }
        .pos-center {
            top: 0; bottom: 0; left: 0; right: 0;
            margin: auto;
        }
        .flex-center {
            display: flex;
            align-items: center; justify-content: center;
        }
        >.shade {
            position: absolute; z-index: -1;
            top: 0; bottom: 0; left: 0; right: 0;
            background-color: #000;
            opacity: 0.6;
            animation: shadeIn 0.3s;
        }
        >.shade.shadeOut {
            opacity: 0;
            animation: shadeOut 0.3s;
        }
        >.tip {
            position: absolute;
            padding: 1rem 2rem;
            max-width: 24rem;
            border-radius: 0.5rem;
            background-color: rgba(0, 0, 0, 0.8); color: #fff;
        }
        >.alert {
            position: absolute;
            width: 40rem; height: 20rem;
            border-radius: 0.5rem;
            background-color: #fff;
            animation: dialogIn 0.3s;
            >.title {
                position: relative;
                height: 20%;
                border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;
                background-color: #3698ef; color: #fff;
                >.titleText {
                    padding-left: 1.6rem;
                    height: 4rem;
                    line-height: 4rem;
                }
                >.close {
                    position: absolute;
                    top: 0; right: 0;
                    width: 4rem; height: 4rem;
                    background: url(../img/close.png) no-repeat center center;
                    background-size: 1rem 1rem;
                    cursor: pointer;
                }
            }
            >.content {
                position: relative;
                margin: 1.8rem 1.6rem 0 1.6rem;
                height: 35%;
                >span {
                    display: inline-block;
                    text-align: left;
                }
            }
            >.button {
                position: absolute;
                bottom: 1.5rem; left: 0; right: 0;
                margin: auto;
                width: 10rem; height: 3.5rem;
                text-align: center; line-height: 3.5rem;
                border: none; outline: none;
                border-radius: 0.5rem;
                background-color: #3698ef; color: #fff;
                cursor: pointer;
            }
        }
        >.confirm {
            position: absolute;
            width: 40rem; height: 20rem;
            border-radius: 0.5rem;
            background-color: #fff;
            animation: dialogIn 0.3s;
            >.title {
                position: relative;
                height: 20%;
                border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;
                background-color: #3698ef; color: #fff;
                >.titleText {
                    padding-left: 1.6rem;
                    height: 4rem;
                    line-height: 4rem;
                }
                >.close {
                    position: absolute;
                    top: 0; right: 0;
                    width: 4rem; height: 4rem;
                    background: url(../img/close.png) no-repeat center center;
                    background-size: 1rem 1rem;
                    cursor: pointer;
                }
            }
            >.content {
                position: relative;
                margin: 1.8rem 1.6rem 0 1.6rem;
                height: 35%;
                >span {
                    display: inline-block;
                    text-align: left;
                }
            }
            >.button {
                position: absolute;
                bottom: 1.5rem; left: 0; right: 0;
                margin: auto;
                height: 3.5rem;
                >span {
                    width: 10rem; height: 3.5rem;
                    text-align: center; line-height: 3.5rem;
                    border: none; outline: none;
                    border-radius: 0.5rem;
                    cursor: pointer;
                }
                >.leftButton {
                    position: absolute;
                    top: 0; left: 0; right: 13rem;
                    margin: auto;
                    border: 0.1rem solid #eee;
                    background-color: #f6f6f6; color: #333;
                }
                >.rightButton {
                    position: absolute;
                    top: 0; left: 13rem; right: 0;
                    margin: auto;
                    background-color: #3698ef; color: #fff;
                }
            }
        }
        >.content {
            position: absolute;
            width: 50rem; height: 64.5rem;
            border-radius: 0.5rem;
            background-color: #fff;
            >.title {
                position: absolute;
                top: 0; left: 0; right: 0;
                height: 5rem;
                border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;
                background-color: #a9d0fd;
                >.titleText {
                    position: absolute;
                    top: 1rem; left: 1.5rem;
                    height: 3rem;
                    line-height: 3rem;
                    font-size: 1.6rem; font-weight: bold;
                    color: #3366ff;
                }
                >.close {
                    position: absolute;
                    top: 0.5rem; right: 0.5rem;
                    width: 4rem; height: 4rem;
                    background: url(../img/close.png) no-repeat center center;
                    background-size: 1.2rem 1.2rem;
                    cursor: pointer;
                }
            }
            >.slot {
                position: absolute;
                top: 5rem; bottom: 0; left: 0; right: 0;
            }
        }
    }
    @keyframes shadeIn {
        from {
            opacity: 0.1;
        }
        to {
            opacity: 0.6;
        }
    }
    @keyframes shadeOut {
        from {
            opacity: 0.6;
        }
        to {
            opacity: 0;
        }
    }
    @keyframes dialogIn {
        from {
            width: 32rem; height: 16rem;
        }
        to {
            width: 40rem; height: 20rem;
        }
    }
</style>
