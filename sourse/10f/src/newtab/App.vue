<template>
  <div class="main" :class="{'is-active': edit,'dark':dark}">
    <div class="container">
      <div class="layer">
        <div
          class="bg"
          style="background-image: url('https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80')"
        ></div>
        <div class="blank"></div>
      </div>
    </div>
    <div class="control">
      <i class="icon fas fa-bars" @click="isActive"></i>
      <div data="checkbox-switch" v-if="!edit">
        <input type="checkbox" id="switch1" v-model="dark" value="true">
        <label for="switch1"></label>
      </div>
      <div class="quote">
        <div class="quote-text">
          <p>{{ quote[0] }}</p>
        </div>
        <div class="quote-add">
          <div class="tit">“新增語錄”</div>
          <input type="text" placeholder v-model="addquote">
          <button @click="isSave()">+</button>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <i class="icon fas fa-arrow-right" @click="isActive"></i>
      <div class="sidebar-block">
        <div class="col">
          <div class="tit">夜間模式</div>
          <div data="checkbox-switch">
            <input type="checkbox" id="switch2" v-model="dark" value="true">
            <label for="switch2"></label>
          </div>
        </div>
      </div>
      <div class="sidebar-block">
        <label>我的語錄</label>
        <ul>
          <li v-for="(item,i) in quote" :key="i">
            <span v-if="!slideEdit[i]">{{ item }}</span>
            <input v-else-if="slideEdit[i]" type="text" v-model="quote[i]">
            <span class="fn">
              <i class="edit fas fa-pen" @click="isEdit(i)"></i>
              <i class="del fas fa-trash" @click="isDel(i)"></i>
            </span>
          </li>
        </ul>
        <p>
          <!-- <a href class="more">載入更多</a> -->
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      edit: false,
      dark: false,
      addquote: '',
      slideEdit: [],
      quote: []
    };
  },
  computed: {
    upadte(){
      let _self = this;

      chrome.storage.onChanged.addListener(changes => {
        return _self.quote = changes.quote.newValue;
      });
      chrome.storage.sync.get(function(items) {
        console.log('update',items)
      });
    }
  },
  created() {
    let _self = this;
    chrome.storage.sync.get("quote", function(items) {
      if( !items.quote ){
        chrome.storage.sync.set({ quote: ['路就是一條直直的。'] }, function(items) {
          console.log('add success');
        });
        _self.upadte;
      }else{
        _self.quote = items.quote;
        
        console.log('items',items.quote );
      }
    });
  },
  methods: {
    isActive() {
      if (this.edit) {
        this.edit = false;
      } else {
        this.edit = true;
      }
    },
    isSave(){
      let _self = this;
      if( !_self.addquote ) return;
      chrome.storage.sync.get(function(items) {
        chrome.storage.sync.set({ quote: [_self.addquote,...items.quote] }, function(items) {
          console.log('add success');
          _self.addquote = '';
        });
        _self.upadte;
      });
    },
    isEdit(idx){
      console.log( 'idx',idx )
      if (this.slideEdit[idx]) {
        this.slideEdit[idx] = false;
      } else {
        this.slideEdit[idx] = true;
      }
      // this.slideEdit[idx] = this.slideEdit[idx] || false;
      // console.log( 'edit1',this.slideEdit[idx] )
      // if (!this.slideEdit[idx]) {
        
      //   this.slideEdit[idx] = true;
      // } else {
      //   this.slideEdit[idx] = false;
      // }
      // console.log( 'edit2',this.slideEdit[idx] )
    },
    isDel(idx){
      let _self = this;
      chrome.storage.sync.get(function(items) {
        chrome.storage.sync.set({ quote: [...items.quote.slice(0,idx),...items.quote.slice(idx + 1)] }, function(items) {
          console.log('del success');
        });
        _self.upadte;

      });
    },
    
  }
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
      left: 13%;
      width: 50%;
      font-size: 56px;
      font-weight: bold;
      line-height: 1.2;
      font-family: "Open Sans";
      font-style: italic;
      .quote-text {
        display: block;
        p {
          transition: 0.3s;
          display: inline-block;
          background: #fff;
          &:before {
            position: absolute;
            top: -160px;
            left: -100px;
            content: "“";
            font-size: 160px;
            line-height: 160px;
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
        input[type='text']{
          border:0;
          font-size: 16px;
          font-family: "Roboto Condensed";
          font-weight: bold;
          width: 100%;
        }
        .fn {
          display: inline-block;
          white-space: nowrap;
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
      .quote {
        color: #fff;
        .quote-add {
          color: #000;
          .tit,
          input[type="text"] {
            color: #000;
          }
        }
        .quote-text {
          p {
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
