<template>
    <div id="app">
        <div id='top'></div>
        <div id='left'></div>
        <div id='tab'>
            <span :class='activeMenu=="/home" ? "active tabItem" : "tabItem"'>首页</span>
            <span :class='activeMenu=="/user" ? "active tabItem" : "tabItem"'>
                <span>用户管理</span>
                <img src='./img/common/close-tab.png'>
            </span>
        </div>
        <div id='content'>
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            activeMenu: '/home'
        }
    },
    watch: {
        $route: {
            handler(newVal, oldVal) {
                this.activeMenu = newVal.path
            },
            immediate: true
        }
    }
}
</script>

<style scoped lang="scss">
    #app {
        width: 100%; height: 100%;
        >#top {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 7rem;
            background-color: #3698ff;
        }
        >#left {
            position: absolute;
            top: 7rem; bottom: 0; left: 0;
            width: 15rem;
            border-right: 0.1rem solid #ddd;
            background-color: #fff;
        }
        >#tab {
            position: absolute;
            top: 7rem; left: 15rem; right: 0;
            height: 4.5rem;
            background-color: #fff;
            >.tabItem {
                display: inline-block;
                padding: 0 2rem;
                min-width: 12rem; height: 4.5rem;
                text-align: center; line-height: 4.5rem;
                >img {
                    position: relative;
                    width: 1.2rem; height: 1.2rem;
                    top: 0; right: -1rem;
                }
            }
            >.tabItem.active {
                background-color: #eee;
            }
        }
        >#content {
            position: absolute;
            top: 11.5rem; bottom: 0; left: 15rem; right: 0;
            padding: 2rem;
            background-color: #eee;
        }
    }
</style>
