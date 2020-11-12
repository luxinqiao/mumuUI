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
                sexArr: [
                    {value: '0', label: '未知'},
                    {value: '1', label: '男'},
                    {value: '2', label: '女'}
                ],
                habitArr: [
                    {value: '1', label: '跑步'},
                    {value: '2', label: '游泳'},
                    {value: '3', label: '瑜伽'},
                    {value: '4', label: '音乐'},
                    {value: '5', label: '电影'},
                    {value: '6', label: '旅游'},
                    {value: '7', label: '美食'},
                    {value: '8', label: '购物'},
                    {value: '9', label: '其他'}
                ],
                educationArr: [
                    {value: '0', label: '请选择'},
                    {value: '1', label: '小学'},
                    {value: '2', label: '初中'},
                    {value: '3', label: '高中'},
                    {value: '4', label: '大专'},
                    {value: '5', label: '本科'},
                    {value: '6', label: '硕士'},
                    {value: '7', label: '博士'}
                ],
                jobArr: [
                    {value: '0', label: '请选择'},
                    {value: '1', label: '服务业'},
                    {value: '2', label: '建筑业'},
                    {value: '3', label: '制造业'},
                    {value: '4', label: '农业'},
                    {value: '5', label: '纺织业'},
                    {value: '6', label: '加工业'},
                    {value: '7', label: '个体'},
                    {value: '8', label: 'IT'}
                ],
                incomeArr: [
                    {value: '0', label: '请选择'},
                    {value: '1', label: '10万以下'},
                    {value: '2', label: '10万-20万'},
                    {value: '3', label: '20万-50万'},
                    {value: '4', label: '50万-100万'},
                    {value: '5', label: '100万-500万'},
                    {value: '6', label: '500万以上'}
                ]
            }
        },
        methods: {
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