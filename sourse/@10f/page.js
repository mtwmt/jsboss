

var vm = new Vue({
  el: '#app',
  data:{
    edit: false,
    dark: false
  },
  methods: {
    isActive(){
      if( this.edit ){
        this.edit = false;
      }else{
        this.edit = true;
      }
      // :class=" (!edit ? '':' is-active') + (!dark ? '':' dark')"
    }
  },
  template: `
  <div class="main"
    :class="{'is-active': edit,'dark':dark}"
  >
    <div class="container">
      <div class="layer">
        <div class="bg" style="background-image: url('https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80')"></div>
        <div class="blank"></div>
      </div>
    </div>
    <div class="control">
      <i class="icon fas fa-bars" @click="isActive"></i>
      <div data="checkbox-switch" v-if="!edit">
        <input type="checkbox" id="switch1" v-model="dark" value="true" />
        <label for="switch1"></label>
      </div>
      <div class="quote">
        <div class="quote-text">
          <p>跟你講電話的那個晚上，我聽見了你的聲音。</p>
        </div>
        <div class="quote-add">
          <div class="tit">“新增語錄”</div>
          <input type="text" placeholder="">
          <button>+</button>
        </div>
      </div>
    </div>
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
  </div>
  `
});