<template>
    <header class="m-header">
        <div class="header-side" @click="leftNav">{{{leftCnt}}}</div>
        <div class="uf-f1 header-title">{{{title}}}</div>
        <div class="header-side" @click="rightNav">{{{rightCnt}}}</div>
    </header>
</template>

<script>
    export default {
        props: ['leftCnt', 'title', 'rightCnt'],
        methods: {
            leftNav(event){
                this.$dispatch('left-nav', event);
            },
            rightNav(event){
                this.$dispatch('right-nav', event);
            }
        }
    }
</script>