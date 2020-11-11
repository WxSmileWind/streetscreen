<template>
        <div id="demo" style="overflow: hidden;width:43vw;height:3.6vh;">
                <div id="indemo" style="float: left;width:880%;height:3.6vh;">
                    <div ref="content" id="demo1" style="float:left;height:3.6vh;">
                        <slot></slot>
                    </div>
                    <div id="demo2" style="float: left;height:3.6vh;">
                    </div>
                </div>
        </div>
</template>

<script>
    export default {
        name: "paomadeng",
        props: {
            content: {
                default: ''
            }
        },
        mounted() {},
        data() {
            return {
                sum:0,
                status:false,
                arr:[],
                MyMar:null,
                speed:20
                // wrapWidth: 0,
                // firstRound: true,
                // duration: 0,
                // offsetWidth: 0,
                // animationClass: '',
            };
        },
        created() {
            //将vue方法转换为js原生方法
            // let _this=this;
            // window.OpenYqInfo=_this.OpenYqInfo;
            },
        // computed: {
        //     contentStyle() {
        //         return {
        //             paddingLeft: (this.firstRound ? 0 : this.wrapWidth) + 'px',
        //             animationDelay: (this.firstRound ? this.delay : 0) + 's',
        //             animationDuration: this.duration + 's'
        //         };
        //     }
        // },
        // watch: {
        //     content: {
        //         immediate:true,
        //         handler() {
        //             console.log("watched:");
        //
        //              this.clearall();
        //
        //         }
        //     }
        // },
        methods: {
            //清空所有定时器
            clearall() {
                console.log("调用清空");
                console.log("+++++++++++++ this.arr:", this.arr);
                for (let i = this.arr.length - 1; i >= 0; i--) {
                    if (typeof this.arr[i] !== 'undefined') {
                        console.log("++++++++++++++调用清空成功，this.arr[i]：",this.arr[i]);
                        clearInterval(this.arr[i]);
                        //删除
                       // this.arr[i].splice(i, 1);

                    }
                }
            },
            bindevents() {
                let arrlist = [];
                //清空所有定时器
                this.clearall();
                let that=this;
                this.$nextTick(() => {

                    //let speed = 20;
                    let tab = document.getElementById("demo");
                    let tab1 = document.getElementById("demo1");
                    let tab2 = document.getElementById("demo2");
                    tab2.innerHTML = tab1.innerHTML;

                    function Marquee() {
                        if (tab2.offsetWidth - tab.scrollLeft <= 0)
                            tab.scrollLeft -= tab1.offsetWidth
                        else {
                            tab.scrollLeft++;
                        }
                    }

                    that.MyMar = setInterval(Marquee, that.speed);

                    //console.log("++++++++that.MyMar:",that.MyMar);

                    that.arr.push(that.MyMar);


                    tab.onmouseover = function () {
                        console.log("++++++++that.MyMar:",that.MyMar);
                        clearInterval(that.MyMar)
                    };
                    tab.onmouseout = function () {
                        that.MyMar = setInterval(Marquee, that.speed);
                        that.arr.push(that.MyMar);
                    };

                });

            }

            // OpenYqInfo(index){
            //     console.log("+++++++++++++index:",index)
            //
            //     this.$notify({
            //         title: '舆情-'+this.arr[index].title+' 时间:'+this.arr[index].date,
            //         dangerouslyUseHTMLString: true,
            //         message: '<strong> <i>'+this.arr[index].content+'</i> </strong>'
            //     });
            //     //alert('你好，再见！')
            // }
        },
        beforeDestroy() {

        },
        destroyed(){

        }
    }
</script>

<style scoped>
    .wrap {
        width: 100%;
        height: 3.6vh;
        line-height: 3.6vh;
        overflow: hidden;
        position: relative;
        background: rgba(0, 0, 0, 0.5);
        position: relative;
        padding: 0;
        color: #fff;
    }
    .wrap .content {
        position: absolute;
        white-space: nowrap;
    }


</style>