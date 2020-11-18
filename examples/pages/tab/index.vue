<template>
    <div id='main'>
        <mu-tab id='main-tab'>
            <mu-tab-item title='全部' :active='true'>
                <p>这里是tab-item：全部</p>
                <input type='text'/>
            </mu-tab-item>
            <mu-tab-item title='家电' :close='true'>
                <p>这里是tab-item：家电</p>
                <input type='text'/>
            </mu-tab-item>
            <mu-tab-item title='母婴' :close='true'>
                <p>这里是tab-item：母婴</p>
                <input type='text'/>
            </mu-tab-item>
            <mu-tab-item title='电动车' :close='true'>
                <p>这里是tab-item：电动车</p>
                <input type='text'/>
            </mu-tab-item>
            <mu-tab-item title='情趣用品' :close='true'>
                <p>这里是tab-item：情趣用品</p>
                <input type='text'/>
            </mu-tab-item>
            <mu-tab-item title='酒水饮料' :close='true'>
                <p>这里是tab-item：酒水饮料</p>
                <input type='text'/>
            </mu-tab-item>
        </mu-tab>
    </div>
</template>

<style scoped lang='scss'>
    #main-tab {
        width: 100rem; height: 60rem;
    }
</style>