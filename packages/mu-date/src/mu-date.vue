<template>
    <div class='mu-date'>
        <div class='year' v-if='type=="year"'>
            <div class='head'>
                <img class='prev' :src='require("../img/arrow-left.png")' @click='prevTwelveYear()'>
                <span class='title'>{{startYear}}年-{{endYear}}年</span>
                <img class='next' :src='require("../img/arrow-right.png")' @click='nextTwelveYear()'>
            </div>
            <div class='content'>
                <span class='content-year' v-for='(item, i) in datas' :key='i'>
                    <span :class='item==year?"active":""' @click='checkYear(item)'>{{item}}年</span>
                </span>
            </div>
            <div class='button'>
                <button class='today' @click='goToday()'>本月</button>
                <button class='confirm' @click='confirm()'>确定</button>
            </div>
        </div>
        <div class='year-month' v-if='type=="year-month"'>
            <div class='head'>
                <img class='prev' :src='require("../img/arrow-left.png")' @click='prevYear()'>
                <span class='title'>{{year}}年</span>
                <img class='next' :src='require("../img/arrow-right.png")' @click='nextYear()'>
            </div>
            <div class='content'>
                <span class='content-month' v-for='(item, i) in datas' :key='i'>
                    <span :class='item==month?"active":""' @click='checkMonth(item)'>{{item+1}}月</span>
                </span>
            </div>
            <div class='button'>
                <button class='today' @click='goToday()'>今年</button>
                <button class='confirm' @click='confirm()'>确定</button>
            </div>
        </div>
        <div class='year-month-day' v-if='type=="year-month-day"'>
            <div class='head'>
                <div class='head-item year'>
                    <img class='prev' :src='require("../img/arrow-left.png")' @click='prevYear()'>
                    <span class='title'>{{year}}年</span>
                    <img class='next' :src='require("../img/arrow-right.png")' @click='nextYear()'>
                </div>
                <div class='head-item month'>
                    <img class='prev' :src='require("../img/arrow-left.png")' @click='prevMonth()'>
                    <span class='title'>{{month+1}}月</span>
                    <img class='next' :src='require("../img/arrow-right.png")' @click='nextMonth()'>
                </div>
            </div>
            <div class='content'>
                <div class='content-title'>
                    <span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span>
                </div>
                <div class='content-week' v-for='(weekItem, i) in datas' :key='i'>
                    <span :class='"content-day "+dayItem.type' v-for='(dayItem, j) in weekItem' :key='j'>
                        <span :class='dayItem.date.getMonth()==month&&dayItem.date.getDate()==day?"active":""' @click='checkDay(dayItem.date, dayItem.type)'>{{dayItem.date.getDate()}}</span>
                    </span>
                </div>
            </div>
            <div class='button'>
                <button class='today' @click='goToday()'>今天</button>
                <button class='confirm' @click='confirm()'>确定</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'muDate',
        props: {
            type: {
                type: String,
                default: 'year-month-day'
            },
            active: {
                type: String,
                default: new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate()
            }
        },
        data() {
            return {
                year: 0,
                startYear: 0,
                endYear: 0,
                month: 0,
                day: 0,
                datas: []
            }
        },
        mounted() {
            const activeDay = new Date(this.active)
            this.year = activeDay.getFullYear()
            this.month = activeDay.getMonth()
            this.day = activeDay.getDate()
            this.initData()
        },
        methods: {
            /**
                初始化数据
                @param
                @return
             */
            initData() {
                this.datas = []
                if (this.type == 'year') {
                    this.initYear()
                } else if (this.type == 'year-month') {
                    this.initMonth()
                } else if (this.type == 'year-month-day') {
                    this.initDay()
                }
            },
            /**
                初始化年
                @param
                @return
             */
            initYear() {
                this.startYear = this.year
                this.endYear = this.year + 11
                for (let i=this.startYear; i<=this.endYear; i++) {
                    this.datas.push(i)
                }
            },
            /**
                初始化月
                @param
                @return
             */
            initMonth() {
                this.datas = [0,1,2,3,4,5,6,7,8,9,10,11]
            },
            /**
                初始化天
                @param
                @return
             */
            initDay() {
                const firstDate = new Date(this.year, this.month, 1)
                const lastDate = new Date(this.year, this.month + 1, 0)
                if (this.day > lastDate.getDate()) {
                    this.day = lastDate.getDate()
                }
                const days = []
                //添加上月数据
                const firstDay = firstDate.getDay() == 0 ? 7 : firstDate.getDay()
                for (let i=1; i<=firstDay-1; i++) {
                    days.push({
                        type: 'prev',
                        date: new Date(this.year, this.month, i - (firstDay - 1))
                    })
                }
                //添加本月数据
                for (let i=1; i<=lastDate.getDate(); i++) {
                    days.push({
                        type: 'curr',
                        date: new Date(this.year, this.month, i)
                    })
                }
                //添加下月数据
                const lastDay = lastDate.getDay() == 0 ? 7 : lastDate.getDay()
                for (let i=lastDay+1; i<=7; i++) {
                    days.push({
                        type: 'next',
                        date: new Date(this.year, this.month+1, i-lastDay)
                    })
                }
                //数据拆分成以周为组的格式
                let week = []
                for (let i=0; i<days.length; i++) {
                    if (i % 7 == 0) {
                        week = []
                    }
                    week.push(days[i])
                    if (i % 7 == 6 || i == days.length - 1) {
                        this.datas.push(week)
                    }
                }
            },
            /**
                上一年
                @param
                @return
             */
            prevYear() {
                this.year--
                this.initData()
            },
            /**
                前12年
                @param
                @return
             */
            prevTwelveYear() {
                this.year -= 12
                this.initData()
            },
            /**
                下一年
                @param
                @return
             */
            nextYear() {
                this.year++
                this.initData()
            },
            /**
                后12年
                @param
                @return
             */
            nextTwelveYear() {
                this.year += 12
                this.initData()
            },
            /**
                上个月
                @param
                @return
             */
            prevMonth() {
                if (this.month == 0) {
                    this.month = 11
                    this.year--
                } else {
                    this.month--
                }
                this.initData()
            },
            /**
                下个月
                @param
                @return
             */
            nextMonth() {
                if (this.month == 11) {
                    this.month = 0
                    this.year++
                } else {
                    this.month++
                }
                this.initData()
            },
            /**
                选中年
                @param {Number} year 年
                @return
             */
            checkYear(year) {
                this.year = year
            },
            /**
                选中月
                @param {Number} month 月
                @return
             */
            checkMonth(month) {
                this.month = month
            },
            /**
                选中天
                @param {Date} date 日期
                @param {String} type 类型(prev/curr/next)
                @return
             */
            checkDay(date, type) {
                if (type == 'prev') {
                    this.prevMonth()
                } else if (type == 'next') {
                    this.nextMonth()
                }
                this.day = date.getDate()
            },
            /**
                去今天
                @param
                @return
             */
            goToday() {
                const today = new Date()
                this.year = today.getFullYear()
                this.month = today.getMonth()
                this.day = today.getDate()
                this.initData()
            },
            /**
                确定
                @param
                @return
             */
            confirm() {
                let result = {}
                if (this.type == 'year') {
                    result.year = this.year
                    result.format = this.year.toString()
                } else if (this.type == 'year-month') {
                    result.year = this.year
                    result.month = this.month + 1
                    result.format = this.year + '-' + (this.month + 1)
                } else if (this.type == 'year-month-day') {
                    result.year = this.year
                    result.month = this.month + 1,
                    result.day = this.day,
                    result.format = this.year + '-' + (this.month + 1) + '-' + this.day
                }
                this.$emit('confirm', result)
            }
        }
    }
</script>

<style scoped lang='scss'>
    .mu-date {
        width: 26rem;
        border: 0.1rem solid #eee;
        >.year {
            >.head {
                position: relative;
                height: 4rem;
                border-bottom: 0.1rem solid #eee;
                >.prev {
                    position: absolute; z-index: 2;
                    top: 1.2rem; left: 1.2rem;
                    width: 1rem; height: 1.6rem;
                    cursor: pointer;
                }
                >.title {
                    position: absolute; z-index: 1;
                    top: 0; bottom: 0; left: 0; right: 0;
                    text-align: center; line-height: 4rem;
                    font-size: 1.4rem;
                    color: #333;
                }
                >.next {
                    position: absolute; z-index: 2;
                    top: 1.2rem; right: 1.2rem;
                    width: 1rem; height: 1.6rem;
                    cursor: pointer;
                }
            }
            >.content {
                padding: 0.8rem 1.2rem;
                >.content-year {
                    position: relative;
                    display: inline-block;
                    width: 33.3%; height: 4rem;
                    >span {
                        display: inline-block;
                        position: absolute;
                        top: 0; bottom: 0; left: 0; right: 0;
                        margin: auto;
                        width: 6rem; height: 3rem;
                        text-align: center; line-height: 3rem;
                        border-radius: 0.4rem;
                        font-size: 1.4rem;
                        cursor: pointer;
                    }
                    >span:hover {
                        background-color: #c1defc; color: #fff;
                    }
                    >span.active {
                        background-color: #3698ff; color: #fff;
                    }
                }
            }
            >.button {
                clear: left;
                position: relative;
                height: 4rem;
                border-top: 0.1rem solid #eee;
                >.today {
                    position: absolute;
                    top: 0; left: 1.8rem;
                    height: 4rem;
                    line-height: 4rem;
                    border: none; outline: none;
                    font-weight: bold;
                    background: none; color: #3698ff;
                    cursor: pointer;
                }
                >.confirm {
                    position: absolute;
                    top: 0.8rem; right: 1rem;
                    width: 4rem; height: 2.4rem;
                    text-align: center; line-height: 2.4rem;
                    border: none; border-radius: 0.4rem; outline: none;
                    font-size: 1.3rem;
                    background-color: #3698ff; color: #fff;
                    cursor: pointer;
                }
            }
        }

        >.year-month {
            >.head {
                position: relative;
                height: 4rem;
                border-bottom: 0.1rem solid #eee;
                >.prev {
                    position: absolute; z-index: 2;
                    top: 1.2rem; left: 1.2rem;
                    width: 1rem; height: 1.6rem;
                    cursor: pointer;
                }
                >.title {
                    position: absolute; z-index: 1;
                    top: 0; bottom: 0; left: 0; right: 0;
                    text-align: center; line-height: 4rem;
                    font-size: 1.4rem;
                    color: #333;
                }
                >.next {
                    position: absolute; z-index: 2;
                    top: 1.2rem; right: 1.2rem;
                    width: 1rem; height: 1.6rem;
                    cursor: pointer;
                }
            }
            >.content {
                padding: 0.8rem;
                >.content-month {
                    position: relative;
                    display: inline-block;
                    width: 33.3%; height: 4rem;
                    >span {
                        display: inline-block;
                        position: absolute;
                        top: 0; bottom: 0; left: 0; right: 0;
                        margin: auto;
                        width: 5rem; height: 3rem;
                        text-align: center; line-height: 3rem;
                        border-radius: 0.4rem;
                        font-size: 1.4rem;
                        cursor: pointer;
                    }
                    >span:hover {
                        background-color: #c1defc; color: #fff;
                    }
                    >span.active {
                        background-color: #3698ff; color: #fff;
                    }
                }
            }
            >.button {
                clear: left;
                position: relative;
                height: 4rem;
                border-top: 0.1rem solid #eee;
                >.today {
                    position: absolute;
                    top: 0; left: 1.8rem;
                    height: 4rem;
                    line-height: 4rem;
                    border: none; outline: none;
                    font-weight: bold;
                    background: none; color: #3698ff;
                    cursor: pointer;
                }
                >.confirm {
                    position: absolute;
                    top: 0.8rem; right: 1rem;
                    width: 4rem; height: 2.4rem;
                    text-align: center; line-height: 2.4rem;
                    border: none; border-radius: 0.4rem; outline: none;
                    font-size: 1.3rem;
                    background-color: #3698ff; color: #fff;
                    cursor: pointer;
                }
            }
        }
        >.year-month-day {
            >.head {
                height: 4rem;
                border-bottom: 0.1rem solid #eee;
                >.head-item {
                    position: relative;
                    width: 50%; height: 100%;
                    >.prev {
                        position: absolute; z-index: 2;
                        top: 1.2rem; left: 1.2rem;
                        width: 1rem; height: 1.6rem;
                        cursor: pointer;
                    }
                    >.title {
                        position: absolute; z-index: 1;
                        top: 0; bottom: 0; left: 0; right: 0;
                        text-align: center; line-height: 4rem;
                        font-size: 1.4rem;
                        color: #333;
                    }
                    >.next {
                        position: absolute; z-index: 2;
                        top: 1.2rem; right: 1.2rem;
                        width: 1rem; height: 1.6rem;
                        cursor: pointer;
                    }
                }
                >.head-item.year {
                    float: left;
                }
                >.head-item.month {
                    float: right;
                }
            }
            >.content {
                padding-bottom: 0.8rem;
                overflow: hidden;
                >.content-title {
                    display: flex;
                    margin-top: 0.8rem; padding: 0 3%;
                    height: 4rem;
                    >span {
                        flex: 1;
                        height: 4rem;
                        text-align: center; line-height: 4rem;
                        font-size: 1.4rem;
                    }
                }
                >.content-week {
                    display: flex;
                    margin-top: 0.8rem; padding: 0 3%;
                    height: 3rem;
                    >.content-day {
                        flex: 1;
                        height: 3rem;
                        text-align: center; line-height: 3rem;
                        font-size: 1.4rem;
                        color: #333;
                        user-select: none;
                        >span {
                            display: inline-block;
                            width: 3rem; height: 3rem;
                            border-radius: 0.4rem;
                        }
                        >span:hover {
                            background-color: #c1defc; color: #fff;
                        }
                        >span.active {
                            background-color: #3698ff; color: #fff;
                        }
                    }
                    >.content-day.prev {
                        color: #ddd;
                    }
                    >.content-day.next {
                        color: #ddd;
                    }
                }
            }
            >.button {
                position: relative;
                height: 4rem;
                border-top: 0.1rem solid #eee;
                >.today {
                    position: absolute;
                    top: 0; left: 1.8rem;
                    height: 4rem;
                    line-height: 4rem;
                    border: none; outline: none;
                    font-weight: bold;
                    background: none; color: #3698ff;
                    cursor: pointer;
                }
                >.confirm {
                    position: absolute;
                    top: 0.8rem; right: 1rem;
                    width: 4rem; height: 2.4rem;
                    text-align: center; line-height: 2.4rem;
                    border: none; border-radius: 0.4rem; outline: none;
                    font-size: 1.3rem;
                    background-color: #3698ff; color: #fff;
                    cursor: pointer;
                }
            }
        }
    }
</style>
