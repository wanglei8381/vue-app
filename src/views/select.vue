<template>
  <div class="select-wappper">
    <w-select :list="list" placeho></w-select>
  </div>
</template>
<script type="text/babel">
  export default{
    data () {
      return {
        list: [
          {
            label: '1',
            value: '2'
          },
          {
            label: '1',
            value: '2'
          },
          {
            label: '1',
            value: '2'
          }
        ]
      }
    },
    components: {}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .select-wappper {
    position relative
    width 200px
    height 30px
  }
</style>
