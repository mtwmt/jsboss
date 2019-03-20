<template>
  <div class="main">
    <Container />
    <!-- <Control />
    <Sidebar /> -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
  </div>
</template>

<script>
import Container from '@/components/Container.vue';
// import Control from '@/components/Control.vue';
// import Sidebar from '@/components/Sidebar.vue';
export default {
  components: {
    Container,
  },
}
</script>


<style lang="scss">
html,body{
  position: relative;
  width: 100%;
  height: 100%;
  font-family: "Roboto Condensed","微軟正黑體", Arial, sans-serif;
  overflow: hidden;
}

.main{
  position: relative;
  width: 100%;
  height: 100%;
  .icon{
    font-size: 40px;
    cursor: pointer;
  }
}

</style>
