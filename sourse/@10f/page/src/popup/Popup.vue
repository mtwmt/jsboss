<template>
  <div class="main">
    <div class="main-block">
      <div class="col">
        <div class="tit">夜間模式</div>
        <div data="checkbox-switch">
          <input type="checkbox" id="switch" v-model="dark" value="true" />
          <label for="switch"></label>
        </div>
      </div>  
    </div>
    <div class="main-block">
      <div class="col">
        <div class="tit">我的語錄</div>
        <span>編輯</span>
      </div>
      <div class="add" @click="addQuote">+ 新增語錄</div>
    </div>
    <div class="main-block">
      <div>偏好設定…</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "app",
  data(){
    return{}
  },
  components: {},
  computed: {
    ...mapState(["edit", "dark"]),
    dark:{
      get(){
        return this.$store.state.dark
      },
      set( val ){
        this.$store.commit('updateDark', val)
      }
    }
  },
  created() {},
  methods: {
    addQuote(){
      console.log(123)
    }
  }
};
</script>


<style lang="scss" >
@import '@/assets/scss/_mixin.scss';

*{
  box-sizing: border-box;
}

.main{
  font-family: "Roboto Condensed","微軟正黑體", Arial, sans-serif;
  width: 320px;
  padding: 0 20px;
  &.dark{
    background: #000;
    color: #fff;
  }
  .main-block{
    padding: 20px 0;
    font-size: 24px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    &:last-child{
      border:0;
    }
    .col{
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{ font-size: 16px; }
    }
  }
  .add{
    margin-top: 20px;
    width: 100%;
    line-height: 56px;
    background: #000;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
}

[data='checkbox-switch'] {
  @include checkbox-switch(60px, 28px, 2px, #EDEDED, #575757);
}
</style>
