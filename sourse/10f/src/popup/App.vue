<template>
  <div class="main" :class="{'dark':dark}">
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
      <div class="add" >+ 新增語錄</div>
    </div>
    <div class="main-block">
      <div>偏好設定…</div>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
  name: "app",
  data() {
    return {
      dark: false,
    }
  },
  dark(){
    let _self = this;
    console.log( 'set', _self.dark );
    chrome.storage.sync.set( {dark: _self.dark},function(){} );
    chrome.storage.onChanged.addListener( (data,type) => {
      
      console.log( 'popup',data,type )
    });
  },
  computed: {
    ...mapState(["edit","quote"]),
    // dark:{
    //   get(){
    //     chrome.storage.sync.get(function(data) {
    //       return data.dark;
    //     })
    //     // return this.$store.state.dark
    //   },
    //   set( val ){
    //     let _self = this;    
    //     // this.$store.commit('updateDark', val);
    //     chrome.storage.sync.set( {dark: val},function(){} );

    //     chrome.storage.onChanged.addListener( (data,type) => {
    //       _self.dark = data.dark.newValue;
    //       console.log( 'popdarkonchange',data,type )
    //     });
    //   }
    // },
  },
  created(){
    console.log( 'popup1',this.dark )
    let _self = this;
    chrome.storage.sync.get(function(data) {
      if( !data.dark ){
        chrome.storage.sync.set( {dark: _self.dark},function(){} );
      }else{
        _self.$store.commit('updateDark',data.dark );
      }
    });

  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin";
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
    .add{
      background: #fff;
      color: #000;
    }
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
