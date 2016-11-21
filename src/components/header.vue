<template>
  <header class="m-header">
    <div class="header-side" @click="leftNav" v-html="leftCnt"></div>
    <div class="uf-f1 header-title" v-html="title"></div>
    <div class="header-side" @click="rightNav" v-html="rightCnt"></div>
  </header>
</template>

<script>
  export default {
    props: ['leftCnt', 'title', 'rightCnt'],
    methods: {
      leftNav(){
        this.$emit('leftNav');
      },
      rightNav(){
        this.$emit('rightNav');
      }
    }
  }
</script>