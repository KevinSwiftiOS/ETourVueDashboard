<template>
    <transition name="el-fade-in">
        <div class="page-up" @click="scrollToTop" v-show="toTopShow">
            <i class="el-icon-caret-top"></i>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "app-to-top",
        data(){
            return{
                toTopShow:false,
            }
        },
        methods:{
            handleScroll() {
                /* 获取回到顶部的位置元素 .content-container-top */
                let dom =document.getElementsByClassName('domBoss')[0];
                this.scrollTop = dom.scrollTop;
                if (this.scrollTop > 250) {
                    this.toTopShow = true;
                }else {
                    this.toTopShow = false;
                }
            },
            scrollToTop() {
                let timer = null;
                let _this = this;
                cancelAnimationFrame(timer);
                timer = requestAnimationFrame(function fn() {
                    if (_this.scrollTop > 5000) {
                        _this.scrollTop -= 1000;
                        document.getElementsByClassName("domBoss")[0].scrollTop =
                            _this.scrollTop;
                        timer = requestAnimationFrame(fn);
                    } else if (_this.scrollTop > 1000 && _this.scrollTop <= 5000) {
                        _this.scrollTop -= 500;
                        document.getElementsByClassName("domBoss")[0].scrollTop =
                            _this.scrollTop;
                        timer = requestAnimationFrame(fn);
                    } else if (_this.scrollTop > 200 && _this.scrollTop <= 1000) {
                        _this.scrollTop -= 100;
                        document.getElementsByClassName("domBoss")[0].scrollTop =
                            _this.scrollTop;
                        timer = requestAnimationFrame(fn);
                    } else if (_this.scrollTop > 50 && _this.scrollTop <= 200) {
                        _this.scrollTop -= 10;
                        document.getElementsByClassName("domBoss")[0].scrollTop =
                            _this.scrollTop;
                        timer = requestAnimationFrame(fn);
                    } else if (_this.scrollTop > 0 && _this.scrollTop <= 50) {
                        _this.scrollTop -= 5;
                        document.getElementsByClassName("domBoss")[0].scrollTop =
                            _this.scrollTop;
                        timer = requestAnimationFrame(fn);
                    } else {
                        cancelAnimationFrame(timer);
                        _this.toTopShow = false;
                    }
                });
            }
        },
        mounted() {
            this.$nextTick(function () {
                window.addEventListener('scroll', this.handleScroll,true);// 取消事件冒泡，防止绑定失败
            });
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll,true);// 取消事件冒泡
        }
    }
</script>

<style scoped>
    .page-up{
        background-color: crimson;
        position: fixed;
        right: 20px;
        bottom: 30px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        cursor: pointer;
        transition: .3s;
        box-shadow: 0 3px 6px rgba(0, 0, 0, .5);
        opacity: .5;
        z-index: 100;
    }
    .el-icon-caret-top{
        color: #fff;
        display: block;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
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