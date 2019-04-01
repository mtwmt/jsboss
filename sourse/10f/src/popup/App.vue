<template>
  <div class="main" :class="{'dark':dark}">
    <div class="main-block">
      <div class="col">
        <div class="tit">夜間模式</div>
        <div data="checkbox-switch">
          <input type="checkbox" id="switch" v-model="dark" />
          <label for="switch"></label>
        </div>
      </div>  
    </div>
    <div class="main-block">
      <div class="col">
        <div class="tit">我的語錄</div>
        <span>編輯</span>
      </div>
      <ul>
        <li v-for="(item,i) in quote" :key="i">
          <span v-if="!item.edit">{{ item.text }}</span>
          <input v-else type="text" v-model="item.text" @keyup.enter="isEdit(i)">
          <span class="fn">
            <i class="edit fas fa-pen" @click="isEdit(i)"></i>
            <i class="del fas fa-trash" @click="isDel(i)"></i>
          </span>
        </li>
      </ul>
      <div class="add" v-if="!toggleAdd" @click="isToggleAdd()">+ 新增語錄</div>
      <div class="addedit" v-else>
        <input type="text" v-model="addquote" placeholder="新增語錄">
        <button @click="isAdd()">+</button>
      </div>
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
      toggleAdd: false,
      addquote: ''
    }
  },
  watch: {
    dark(){
      let _self = this;
      console.log( 'Watch dark.pop' ,_self.$store.state.dark )
      // chrome.storage.sync.get(function(data) {
      //   _self.dark = data.dark
      // });
    },
  },
  mounted(){
    let _self = this;
    chrome.storage.sync.get(function(data) {
      console.log( 'POPmounted',data ,_self.$store.state.dark )
    })
  },
  created(){
    let _self = this;

    chrome.storage.sync.get(function(data) {
      data = data || {};
      data.quote = data.quote ||  _self.quote;
      data.dark = data.dark || _self.dark;

      _self.$store.commit('updateDark',data.dark );

      console.log( 'created.pop',data,  _self.$store.state.dark )
    });

    // chrome.storage.sync.get(function(data) {
    //   if (!data.quote) {
    //     _self.setQuote( {quote: false} );
    //   }else{
    //     _self.$store.commit('updateQuote',data.quote );
    //   }

    //   if( !data.dark ){
    //     chrome.storage.sync.set( {dark: _self.dark},function(){} );
    //   }else{
    //     _self.$store.commit('updateDark',data.dark );
    //   }
    // });

  },
   computed: {
    ...mapState(["edit","dark","quote"]),
    dark:{
      get(){
        let _self = this;
        return this.$store.state.dark;
      },
      set( val ){
        let _self = this;

        chrome.storage.sync.set( {dark: val},function(){
          console.log( 'dark.pop',val )
        });
        chrome.storage.onChanged.addListener( (data,type) => {
          console.log( 'onChanged.pop',data.dark.newValue )
          _self.$store.commit('updateDark', data.dark.newValue);
        });

      }
    }
  },
  methods: {
    setQuote( obj,callback ){
      let _self = this;
      chrome.storage.sync.get(function( data ) {
        chrome.storage.sync.set( obj , callback);
        console.log( 'setQuotepop', data ,obj)
      });
      chrome.storage.onChanged.addListener( (data,type) => {
        // data.quote.newValue = data.quote.newValue || obj;
        
        _self.$store.commit('updateQuote', obj );
      });
    },
    isToggleAdd(){
      this.toggleAdd = !this.toggleAdd;
    },
    isSave() {
      var _self = this;
      _self.setQuote( { quote: _self.quote },function(){
      });
    },
    isAdd(){
      let _self = this;
      if (!_self.addquote) return;
      _self.quote.unshift({ text: _self.addquote, edit: false });
      _self.setQuote( {quote: _self.quote },function(){

        _self.addquote = '';
        _self.toggleAdd = false;
      });
    },
    isEdit( idx ){
      this.quote[idx].edit = !this.quote[idx].edit;
      if( !this.quote[idx].edit ){
        this.isSave();
      }
    },
    isDel(idx) {
      let _self = this;
      _self.quote.splice(idx,1);
      _self.setQuote( { quote: _self.quote },function(){});
    }
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
    .addedit{
      input[type="text"],button {
        color: #fff;
      }
    }
    .main-block{
      ul li{
        border-bottom: 1px solid #fff;
        &:last-child {
          border-bottom: 1px solid #fff;
        }
      }
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
    ul {
      max-height: 245px;
      overflow: hidden;
      li {
        display: flex;
        justify-content: space-between;
        padding: 13px 0;
        line-height: 1.5;
        font-size: 16px;
        border-bottom: 1px solid #000;
        input[type="text"] {
          width: 100%;
        }
        > span {
          word-break: break-word;
        }
        .fn {
          display: inline-block;
          white-space: nowrap;
          i {
            cursor: pointer;
          }
        }
        i {
          margin-left: 20px;
        }
        &:last-child {
          border-bottom: 1px solid #000;
        }
      }
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
  .addedit{
    position: relative;
    padding-top: 20px;
    text-align: center;
    input[type="text"] {
      border: 0;
      background: transparent;
      padding-right: 30px;
      font-size: 16px;
      color: #000;
      width: 100%;
      // line-height: 2.5;
      &:focus {
        outline: 0;
      }
    }
    button {
      &:focus {
        outline: 0;
      }
      cursor: pointer;
      position: absolute;
      right: 0;
      bottom: -6px;
      border: 0;
      font-size: 30px;
      color: #000;
      background: none;
    }
  }
}

[data='checkbox-switch'] {
  @include checkbox-switch(60px, 28px, 2px, #EDEDED, #575757);
}
</style>
