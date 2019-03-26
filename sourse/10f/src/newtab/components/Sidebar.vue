<template>
  <div class="sidebar">
    <i class="icon fas fa-arrow-right" @click="isActive"></i>
    <div class="sidebar-block">
      <div class="col">
        <div class="tit">夜間模式</div>
        <div data="checkbox-switch">
          <input type="checkbox" id="switch2" v-model="dark" value="true" />
          <label for="switch2"></label>
        </div>
      </div>  
    </div>
    <div class="sidebar-block">  
      <label>我的語錄</label>
      <ul>
        <li>
          <span>路，就是一條直直的</span>
          <span class="fn"><i class="edit fas fa-pen"></i><i class="del fas fa-trash"></i></span>
        </li>
      </ul>
      <p><a href="" class="more">載入更多</a></p>
    </div>
  </div>
</template>

<script>
import { mapState  } from "vuex";
export default {
  name: "Sidebar",
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
// @import '@/assets/scss/_mixin.scss';
@import '../../assets/scss/_mixin.scss';
.sidebar{
  position: absolute;
  top:0;
  right: 0;
  padding: 40px 2%;
  width: 30%;
  height: 100%;
  transition: .3s;
  transform: translateX(100%);
  z-index: 999;
  .col{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .sidebar-block{
    margin-top: 20px;
    padding-left: 40px;
    font-size: 24px;
    font-weight: bold;
    line-height: 2.5;
    p{
      text-align: right;
      a{
        display: inline-block;
        font-size: 16px;
        
        color: #000;
        text-decoration: none;
      }
    }
  }
  ul{
    li{
      display: flex;
      justify-content: space-between;
      padding: 13px 0;
      line-height: 1.5;
      font-size: 16px;
      border-top: 1px solid #000;
      .fn{
        display: inline-block;
        white-space:nowrap;
      }
      i{
        margin-left: 20px;
      }
      &:last-child{
        border-bottom: 1px solid #000;
      }
    }
  }
}
</style>
