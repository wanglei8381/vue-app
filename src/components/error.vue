<template>
    <header>{{msg}}</header>
</template>
<script>
    export default {
        props: ['msg']
    }
</script>

<style>
    header {
        height: 50px;
        background-color: #40a070;
        line-height: 50px;
        color: #fff;
        text-align: center;
    }
</style>