<template>
  <div class="control">
    <i class="icon fas fa-bars" @click="isActive"></i>
    <div data="checkbox-switch" v-if="!edit">
      <input type="checkbox" id="switch1" v-model="dark" value="true" />
      <label for="switch1"></label>
    </div>
    <div class="quote">
      <div class="quote-text">
        <!-- <p>跟你講電話的那個晚上，我聽見了你的聲音。</p>
        <p>{{ edit }}</p> -->
      </div>
      <div class="quote-add">
        <div class="tit">“新增語錄”</div>
        <input type="text" placeholder="">
        <button>+</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState  } from "vuex";
export default {
  name: "Control",
  props: [],
  data(){
    return{

    }
  },
  computed: {
    ...mapState(["edit","dark"]),
    dark:{
      get(){
        return this.$store.state.dark
      },
      set( val ){
        this.$store.commit('updateDark', val)
      }
    }
  },
  methods: {
    isActive(){
      if( this.edit ){
        this.$store.commit('updateEdit',false);
      }else{
        this.$store.commit('updateEdit',true);
      }
      // :class=" (!edit ? '':' is-active') + (!dark ? '':' dark')"
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_mixin.scss';

.control{
  position: relative;
  z-index: 99;
  .icon{
    position: fixed;
    top: 50px;
    right: 90px;
    color: #fff;
  }
  .quote{
    position: fixed;
    bottom: 30%;
    left: 13%;
    width: 50%;
    font-size: 56px;
    font-weight: bold;
    line-height: 1.2;
    font-family: 'Open Sans';
    font-style: italic;
    .quote-text{
      display: block;
      p{
        transition: 0.3s;
        display: inline-block;
        background: #fff;
        &:before{
          position: absolute;
          top: -160px;
          left: -100px;
          content: '“';
          font-size: 160px;
          line-height: 160px;
        }
      }
      
    }
    .quote-add{
      display: none;
      position: relative;
      .tit{ color: #fff; }
      input[type='text']{
        border: 0;
        background: transparent;
        border-bottom: 1px solid #fff;
        font-size: 24px;
        color: #fff;
        width: 100%;
        line-height: 2.5;
        &:focus { outline: 0; }
      }
      button{
        &:focus { outline: 0; }
        position: absolute;
        right: 0;
        bottom: 0;
        border: 0;
        font-size: 48px;
        color: #fff;
        background: none;
      }
    }
  }
  [data='checkbox-switch']{
    position: fixed;
    bottom: 30px;
    right: 90px;
  }
}

[data='checkbox-switch'] {
  @include checkbox-switch(60px, 28px, 2px, #EDEDED, #575757);
}

</style>
