<template>
    <div id='main'>
        <div id='content'>
            <mu-form labelWidth='10rem' :data='userObj' ref='muForm'>
                <mu-form-frame label='基本信息'>
                    <mu-form-text field='name' label='姓名'></mu-form-text>
                    <mu-form-radio field='sex' label='性别' :datas='sexArr'></mu-form-radio>
                    <mu-form-text field='age' label='年龄'></mu-form-text>
                    <mu-form-text field='weight' label='体重'></mu-form-text>
                    <mu-form-text field='birthday' label='生日'></mu-form-text>
                    <mu-form-checkbox field='habit' label='兴趣爱好' :datas='habitArr'></mu-form-checkbox>
                </mu-form-frame>
                <mu-form-frame label='联系方式'>
                    <mu-form-text field='phone' label='手机号'></mu-form-text>
                    <mu-form-text field='email' label='email'></mu-form-text>
                    <mu-form-text field='post' label='邮编'></mu-form-text>
                    <mu-form-text field='address' label='家庭地址'></mu-form-text>
                </mu-form-frame>
                <mu-form-frame label='学历信息'>
                    <mu-form-text field='school' label='毕业院校'></mu-form-text>
                    <mu-form-text field='major' label='专业'></mu-form-text>
                    <mu-form-select field='education' label='学历' :datas='educationArr'></mu-form-select>
                </mu-form-frame>
                <mu-form-frame label='工作信息'>
                    <mu-form-text field='company' label='公司名称'></mu-form-text>
                    <mu-form-select field='job' label='岗位' :datas='jobArr'></mu-form-select>
                    <mu-form-select field='income' label='年收入' :datas='incomeArr'></mu-form-select>
                </mu-form-frame>
                <mu-form-frame label='其他'>
                    <mu-form-textarea field='remark' label='备注'></mu-form-textarea>
                </mu-form-frame>
            </mu-form>
        </div>
        <div id='button'>
            <button class='cancel' @click='close()'>取消</button>
            <button class='confirm' @click='confirm()'>确定</button>
        </div>
    </div>
</template>

<script type="text/javascript">
    import {getDicts} from '../../utils/dict.js'

    export default {
        name: "userAdd",
        data() {
            return {
                userObj: {
                    name: '',
                    sex: '1',
                    age: '',
                    weight: '',
                    birthday: '',
                    phone: '',
                    avatar: '',
                    email: '',
                    post: '',
                    address: '',
                    habit: '',
                    education: '0',
                    school: '',
                    major: '',
                    company: '',
                    job: '0',
                    income: '0',
                    remark: ''
                },
                sexArr: [],
                habitArr: [],
                educationArr: [],
                jobArr: [],
                incomeArr: []
            }
        },
        mounted() {
            this.initDict()
        },
        methods: {
            initDict() {
                const sexs = getDicts('user', 'sex')
                for (let i=0; i<sexs.length; i++) {
                    this.sexArr.push({
                        value: sexs[i].value,
                        label: sexs[i].desc
                    })
                }
                const habits = getDicts('user', 'habit')
                for (let i=0; i<habits.length; i++) {
                    this.habitArr.push({
                        value: habits[i].value,
                        label: habits[i].desc
                    })
                }
                const educations = getDicts('user', 'education')
                for (let i=0; i<educations.length; i++) {
                    this.educationArr.push({
                        value: educations[i].value,
                        label: educations[i].desc
                    })
                }
                const jobs = getDicts('user', 'job')
                for (let i=0; i<jobs.length; i++) {
                    this.jobArr.push({
                        value: jobs[i].value,
                        label: jobs[i].desc
                    })
                }
                const incomes = getDicts('user', 'income')
                for (let i=0; i<incomes.length; i++) {
                    this.incomeArr.push({
                        value: incomes[i].value,
                        label: incomes[i].desc
                    })
                }
            },

            close() {
                this.$parent.close()
            },
            confirm() {
                this.$axios.post(`${this.$domain}user/add`,
                    this.userObj
                ).then(res => {
                    this.$parent.close(()=> {
                        this.$parent.$parent.$refs.muDialog.tip('新增成功')
                        this.$parent.$parent.initData()
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #main {
        height: 100%;
        >#content {
            padding: 1.6rem;
            height: 51.5rem;
            overflow: auto;
        }
        >#button {
            position: relative;
            height: 8rem;
            border-top: 0.1rem solid #e6e6e6;
            >button {
                width: 11rem; height: 4rem;
                line-height: 4rem;
                border-radius: 0.3rem;
                font-size: 1.6rem;
                border: none; outline: none; background: none;
                cursor: pointer;
            }
            >.cancel {
                position: absolute;
                top: 2rem; left: 0; right: 15rem;
                margin: auto;
                border: 0.1rem solid #ddd;
            }
            >.confirm {
                position: absolute;
                top: 2rem; left: 15rem; right: 0;
                margin: auto;
                background-color: #3698ef; color: #fff;
            }
        }
    }
</style>