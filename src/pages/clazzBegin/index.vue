<template>
  <div class="real">
    <!-- <span>{{msg}}</span> -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'real',
  data(){
    return {
      msg: '实时监测'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
