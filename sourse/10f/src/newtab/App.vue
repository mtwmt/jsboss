<template>
  <div class="main" :class="{'is-active': edit,'dark':dark}">
    <div class="container">
      <div class="layer">
        <div
          v-if="dark"
          class="bg"
          style="-webkit-filter:grayscale(1); background-image: url('https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80')"
        ></div>
        <div
          v-else
          class="bg"
          style="background-image: url('https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80')"
        ></div>
        <div class="blank"></div>
      </div>
    </div>
    <div class="control">
      <i class="icon fas fa-bars" @click="isActive"></i>
      <div data="checkbox-switch" v-if="!edit">
        <input type="checkbox" id="switch1" v-model="dark">
        <label for="switch1"></label>
      </div>
      <div class="quote">
        <div class="quote-text">
          <p
            @click="isPageEdit()"
            v-if="!pagequote"
            v-html="$options.filters.txtformat(quote[random].text)"
          ></p>
          <div v-else>
            <textarea v-model="quote[random].text"></textarea>
            <div class="btns">
              <button class="btn-save" @click="isPageEdit()">儲存</button>
              <button class="btn-cancle" @click="isCancle()">取消</button>
            </div>
          </div>
        </div>
        <div class="quote-add">
          <div class="tit">“新增語錄”</div>
          <input type="text" placeholder v-model="addquote">
          <button @click="isAdd()">+</button>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <i class="icon fas fa-arrow-right" @click="isActive"></i>
      <div class="sidebar-block">
        <div class="col">
          <div class="tit">夜間模式</div>
          <div data="checkbox-switch">
            <input type="checkbox" id="switch2" v-model="dark">
            <label for="switch2"></label>
          </div>
        </div>
      </div>
      <div class="sidebar-block">
        <label>我的語錄</label>
        <ul>
          <li v-for="(item,i) in quote" :key="i">
            <!-- <span class="txt" v-if="!item.edit">{{ item.text }}</span> -->
            <span class="txt" v-if="!item.edit" v-html="$options.filters.txtformat(item.text)"></span>
            <input v-else type="text" v-model="item.text" @keyup.enter="isEdit(i)">
            <span class="fn">
              <i class="edit fas fa-pen" @click="isEdit(i)"></i>
              <i class="del fas fa-trash" @click="isDel(i)"></i>
            </span>
          </li>
        </ul>
        <!-- <p>
          <a href="" class="more" v-if="quote.length>5" >載入更多</a>
        </p>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      dark: false,
      edit: false,
      pagequote: false,
      addquote: "",
      random: 0,
      randomquote: "",
      quote: [
        { text: "路 就是一條直直的", edit: false },
        { text: "雨後的高雄，有下過雨的味道。", edit: false },
        { text: "當我閉上雙眼，眼前只有一片漆黑", edit: false }
      ]
    };
  },
  filters: {
    txtformat(t) {
      var temp = [],
          w;
      
      if( t.indexOf('，') >=0 ){
        w = '，';
      }else if(t.indexOf(',') >=0){
        w = ',';
      }

      temp = t.split(w);
      temp = [temp.join("，</span><br /><span>")];
      temp.unshift("<span>");
      temp.push("</span>");
      return temp.join("");
    }
  },
  watch: {
    dark() {
      let _self = this;
      chrome.storage.sync.set({ dark: _self.dark }, function() {});
    },
  },
  created() {
    let _self = this;
    chrome.storage.sync.get(null, function(items) {
      if (!items.hasOwnProperty("dark")) {
        chrome.storage.sync.set({dark: _self.dark},function() {});
      } else {
        _self.dark = items.dark;
      }
      if (!items.hasOwnProperty("quote")) {
        chrome.storage.sync.set( { quote: _self.quote },function() {});
      } else {
        _self.quote = items.quote;
      }
      _self.getRandom();
    });

    chrome.storage.onChanged.addListener((data, type) => {
      for (let i in data) {
        _self[i] = data[i].newValue;
      }
      
    });
    _self.random = _self.getRandom(0, (_self.quote.length - 1));
    chrome.storage.sync.set( { random: _self.random });
  },
  methods: {
    getRandom(min,max) {
      if( max <= 0 ) return;
      return Math.round(Math.random() * (max - min) + min);
    },
    setQuote(obj, callback) {
      let _self = this;
      chrome.storage.sync.get(function(items) {
        chrome.storage.sync.set(obj, callback);
      });
    },
    isActive() {
      this.edit = !this.edit;
    },
    isAdd() {
      let _self = this;
      if (!_self.addquote) return;
      _self.quote.unshift({ text: _self.addquote, edit: false });
      _self.setQuote({ quote: _self.quote }, function() {
        _self.addquote = "";
        _self.random = _self.random + 1;
        chrome.storage.sync.set( { random: _self.random });
      });
    },
    isPageEdit() {
      var _self = this;
      this.pagequote = !this.pagequote;

      _self.isSave();
    },
    isEdit(idx) {
      this.quote[idx].edit = !this.quote[idx].edit;
      if (!this.quote[idx].edit) {
        this.isSave();
      }
    },
    isSave() {
      var _self = this;
      _self.setQuote({ quote: _self.quote }, function() {});
    },

    isCancle() {
      var _self = this;
      chrome.storage.sync.get(function(items) {
        _self.quote = items.quote;
      });
    },
    isDel(idx) {
      let _self = this;
      if (_self.quote.length == 1) return;
      if( _self.random > idx ){
        _self.random = _self.random - 1;
        chrome.storage.sync.set( { random: _self.random });
      }
      _self.quote.splice(idx, 1);
      _self.setQuote({ quote: _self.quote }, function() {});
    }
  },
  
};
</script>

<style lang="scss">
@import "../../common/scss/mixin";
* {
  box-sizing: border-box;
}

html,
body {
  position: relative;
  width: 100%;
  height: 100%;
  font-family: "Roboto Condensed", "微軟正黑體", Arial, sans-serif;
  overflow: hidden;
}

.main {
  &.is-active {
    .container {
      transform: translateX(-30%);
      .layer {
        .blank {
          position: relative;
          width: 100%;
          height: 100%;
          background: rgba(#000, 0.5);
        }
      }
    }
    .sidebar {
      transform: translateX(0%);
    }
    .control {
      .quote {
        left: 10%;
        .quote-text {
          display: none;
        }
        .quote-add {
          display: block;
        }
      }
    }
  }
  position: relative;
  width: 100%;
  height: 100%;
  .icon {
    font-size: 40px;
    cursor: pointer;
  }
  .control {
    position: relative;
    z-index: 99;
    .icon {
      position: fixed;
      top: 50px;
      right: 90px;
      color: #fff;
    }
    .quote {
      position: fixed;
      bottom: 30%;
      left: 30%;
      transform: translateX(-82px);
      width: 50%;
      font-size: 56px;
      font-weight: bold;
      line-height: 1.2;
      font-family: "Open Sans";
      .quote-text {
        display: block;
        p {
          position: relative;
          left: -15%;
          top: 0;
          transition: 0.3s;
          display: inline-block;
          // padding: 10px;
          // background: #fff;
          word-break: break-word;
          &:before {
            position: absolute;
            top: -160px;
            left: -100px;
            content: "“";
            font-size: 160px;
            line-height: 160px;
            color: #000;
            -webkit-text-stroke: 1px #fff;
          }
          span {
            padding: 5px 10px;
            display: inline-block;
            background: #fff;
          }
        }
        textarea {
          position: relative;
          left: -15%;
          top: 0;
          font-size: 55px;
          width: 100%;
          border: 0;
          border-bottom: 1px solid #000;
          font-family: "微軟正黑體";
          font-weight: bold;
          resize: none;
        }
        .btns {
          display: flex;
          button {
            border: 0;
            line-height: 50px;
            padding: 0 24px;
            font-weight: bold;
            &.btn-save,
            _self.quote[idx].text {
              color: #fff;
              background: #000;
            }
            &.btn-cancle {
              color: #000;
              background: #fff;
            }
          }
        }
      }
      .quote-add {
        display: none;
        position: relative;
        .tit {
          color: #fff;
        }
        input[type="text"] {
          border: 0;
          background: transparent;
          border-bottom: 1px solid #fff;
          padding-right: 63px;
          font-size: 24px;
          color: #fff;
          width: 100%;
          line-height: 2.5;
          &:focus {
            outline: 0;
          }
        }
        button {
          &:focus {
            outline: 0;
          }
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
    [data="checkbox-switch"] {
      position: fixed;
      bottom: 30px;
      right: 90px;
    }
  }
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
  .sidebar {
    position: absolute;
    top: 0;
    right: 0;
    padding: 40px 2%;
    width: 30%;
    height: 100%;
    transition: 0.3s;
    transform: translateX(100%);
    z-index: 999;
    .col {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .sidebar-block {
      margin-top: 20px;
      padding-left: 40px;
      font-size: 24px;
      font-weight: bold;
      line-height: 2.5;
      p {
        text-align: right;
        a {
          display: inline-block;
          font-size: 16px;

          color: #000;
          text-decoration: none;
        }
      }
    }
    ul {
      li {
        display: flex;
        justify-content: space-between;
        padding: 13px 0;
        line-height: 1.5;
        font-size: 16px;
        border-top: 1px solid #000;
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
          flex: 0 0 auto;
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
  &.dark {
    .control {
      .icon {
        color: #000;
      }
      .quote {
        color: #fff;
        .quote-add {
          color: #000;
          .tit,
          input[type="text"] {
            color: #000;
          }
          input[type="text"] {
            border-bottom: 1px solid #000;
          }
          button {
            color: #000;
          }
        }
        .quote-text {
          span {
            background: #000;
          }
        }
      }
    }
    .container {
      .layer {
        background: #000;
        .blank {
          background: rgba(#fff, 0.5);
        }
      }
    }
    .sidebar {
      color: #fff;
      background: #000;
      ul li {
        &:last-child {
          border-color: #fff;
        }
        border-color: #fff;
      }
      .more {
        color: #fff;
      }
    }
  }
}
[data="checkbox-switch"] {
  @include checkbox-switch(60px, 28px, 2px, #ededed, #575757);
}
</style>
