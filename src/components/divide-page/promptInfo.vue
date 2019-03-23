<template>
    <div class="">
        <transition name="el-fade-in1">
            <div class="page-up" @click="scrollToSum">
                评论统计
            </div>
        </transition>
        <transition name="el-fade-in2">
            <div class="page-up" @click="scrollToAnalyze">
                评论分析
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "prompt",
        data(){
            return{
                toTopShow:true,
            }
        },
        methods:{
            scrollToAnalyze() {
                let timer = null;
                let _this = this;
                var domBoss = document.getElementsByClassName("domBoss")[0];
                cancelAnimationFrame(timer);
                timer = requestAnimationFrame(function fn() {
                    if (domBoss.scrollTop == 0) {
                        domBoss.scrollTop += 5;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 0 && domBoss.scrollTop <= 50) {
                        domBoss.scrollTop += 5;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 0 && domBoss.scrollTop <= 50) {
                        domBoss.scrollTop += 5;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 50 && domBoss.scrollTop <= 100) {
                        domBoss.scrollTop += 10;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 100 && domBoss.scrollTop <= 150) {
                        domBoss.scrollTop += 20;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 150 && domBoss.scrollTop <= 200) {
                        domBoss.scrollTop += 30;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 200 && domBoss.scrollTop <= 250) {
                        domBoss.scrollTop += 40;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 250 && domBoss.scrollTop <= 300) {
                        domBoss.scrollTop += 50;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 300 && domBoss.scrollTop <= 400) {
                        domBoss.scrollTop += 60;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 400 && domBoss.scrollTop <= 500) {
                        domBoss.scrollTop += 70;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 500 && domBoss.scrollTop <= 600) {
                        domBoss.scrollTop += 80;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 800 && domBoss.scrollTop <= 900) {
                        domBoss.scrollTop += 100;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 900 && domBoss.scrollTop <= 1000) {
                        domBoss.scrollTop += 100;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 1100 && domBoss.scrollTop <= 1200) {
                        domBoss.scrollTop += 100;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 1200 && domBoss.scrollTop <= 1300) {
                        domBoss.scrollTop += 100;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 1300 && domBoss.scrollTop <= 1400) {
                        domBoss.scrollTop += 100;
                        timer = requestAnimationFrame(fn);
                    }else {
                        domBoss.scrollTop = 1560;
                        cancelAnimationFrame(timer);
                    }
                });
            }, // 函数结束
            scrollToSum() {
                let timer = null;
                let _this = this;
                var domBoss = document.getElementsByClassName("domBoss")[0];
                cancelAnimationFrame(timer);
                timer = requestAnimationFrame(function fn() {
                    if (domBoss.scrollTop == 0) {
                        domBoss.scrollTop += 5;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 0 && domBoss.scrollTop <= 50) {
                        domBoss.scrollTop += 5;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 0 && domBoss.scrollTop <= 50) {
                        domBoss.scrollTop += 5;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 50 && domBoss.scrollTop <= 100) {
                        domBoss.scrollTop += 10;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 100 && domBoss.scrollTop <= 150) {
                        domBoss.scrollTop += 20;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 150 && domBoss.scrollTop <= 200) {
                        domBoss.scrollTop += 30;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 200 && domBoss.scrollTop <= 250) {
                        domBoss.scrollTop += 40;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 250 && domBoss.scrollTop <= 300) {
                        domBoss.scrollTop += 50;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 300 && domBoss.scrollTop <= 400) {
                        domBoss.scrollTop += 60;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 400 && domBoss.scrollTop <= 500) {
                        domBoss.scrollTop += 70;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 500 && domBoss.scrollTop <= 600) {
                        domBoss.scrollTop += 80;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 800 && domBoss.scrollTop <= 900) {
                        domBoss.scrollTop -= 100;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 900 && domBoss.scrollTop <= 1000) {
                        domBoss.scrollTop -= 100;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 1100 && domBoss.scrollTop <= 1200) {
                        domBoss.scrollTop -= 100;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 1200 && domBoss.scrollTop <= 1300) {
                        domBoss.scrollTop -= 100;
                        timer = requestAnimationFrame(fn);
                    }else if (domBoss.scrollTop > 1300 && domBoss.scrollTop <= 1400) {
                        domBoss.scrollTop -= 100;
                        timer = requestAnimationFrame(fn);
                    }else {
                        domBoss.scrollTop = 760;
                        cancelAnimationFrame(timer);
                    }
                });
            } // 函数结束
        }
    }
</script>

<style scoped>
    .page-up{
        background-color: crimson;
        position: fixed;
        width: 100px;
        height: 40px;
        left: 0px;
        border-radius: 5px;
        cursor: pointer;
        transition: .3s;
        box-shadow: 0 3px 6px rgba(0, 0, 0, .5);
        opacity: .5;
        z-index: 100;
        padding: 10px;
        text-align: center;
        font-weight: bolder;
    }
    .page-up:nth-child(1){
        top: 320px;
    }
    .page-up:nth-child(2){
        top: 362px;
    }
    p{
        display: none;
        text-align: center;
        color: #fff;
    }
    .page-up:hover{
        opacity: 1;
    }
</style>