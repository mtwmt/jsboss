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
          <span class="txt" v-if="!item.edit">{{ item.text }}</span>
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
export default {
  name: "app",
  data() {
    return {
      dark: false,
      toggleAdd: false,
      addquote: '',
      quote: [
        { text: "路 就是一條直直的", edit: false },
        { text: "雨後的高雄，有下過雨的味道。", edit: false },
        { text: "當我閉上雙眼，眼前只有一片漆黑", edit: false }
      ]
    }
  },
  watch:{
    dark(){
      let _self = this;
      chrome.storage.sync.set({'dark': _self.dark} ,function(){});
    }
  },
  created(){
    let _self = this;
    chrome.storage.sync.get(function( items ) {
      if( !items.hasOwnProperty('dark') ){
        chrome.storage.sync.set({
          'dark': _self.dark
        }, function(){});
      }else{
        _self.dark = items.dark;
      }

      if( !items.hasOwnProperty('quote') ){
        chrome.storage.sync.set({
          'quote': _self.quote
        }, function(){});
      }else{
        _self.quote = items.quote;
      }

    });

    chrome.storage.onChanged.addListener((data,type) => {
      for( let i in data ){
        _self[i] = data[i].newValue;
      }
    });
    
  },
  methods: {
    setQuote( obj,callback ){
      let _self = this;
      chrome.storage.sync.get(function( items ) {
        chrome.storage.sync.set( obj, callback);

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

      chrome.storage.sync.get(null,function( items ) {
        chrome.storage.sync.set( { random: items.random + 1 } );
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
      if( _self.quote.length == 1 ) return;

      chrome.storage.sync.get(null,function( items ) {
        if( items.random > idx ){
          chrome.storage.sync.set( { random: items.random - 1 } );
        }
      });

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
      max-height: 243px;
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
        // .txt{
        //   flex: 1 1 auto;
        //   display: -webkit-box;
        //   overflow: hidden;
        //   text-overflow: ellipsis;
        //   -webkit-line-clamp: 1;
        //   /*! autoprefixer: off */
        //   -webkit-box-orient: vertical;
        // }
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
