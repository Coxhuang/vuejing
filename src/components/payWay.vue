<template>
    <div>
        <div v-html="payHtml">
       
        </div>
    </div>
</template>
<script>
    // import Vue from 'vue'
    // Vue.component('menberCenter', {
    //     props: ['payHtml'],
    // })
    export default {
        name: 'app',
        data() {
            return { 
                payHtml:''
            } 
        },
        created() {
            this.axios.get('/Api/Operation/makeOrder' + "?paycode=" + this.$route.query.paycode + "&" + "paynum=" + this.$route.query.paynum).then(response => {
                    console.log(response)
                    this.payHtml = response.data.data
            }).catch(error => {

            })
        },
    }
</script>
<style lang="scss" scoped>
    
</style>