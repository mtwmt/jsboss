<template>
  <div class="container">
    <div class="layer">
      <div
        class="bg"
        style="background-image: url('https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80')"
      ></div>
      <div class="blank"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Container"
};
</script>

<style lang="scss">
.container {
  position: relative;
  width: 100%;
  height: 100%;
  transform: translateX(0%);
  transition: 0.3s;
  .layer {
    transition: 0.3s;
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    .bg {
      position: absolute;
      left: 30%;
      top: 0;
      width: 70%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}
</style>
