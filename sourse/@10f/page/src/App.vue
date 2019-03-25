<template>
  <div class="main" :class="{'is-active': edit,'dark':dark}">
    <Container/>
    <Control/>
    <Sidebar />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>-->
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import Container from "@/components/Container.vue";
import Control from "@/components/Control.vue";
import Sidebar from '@/components/Sidebar.vue';
export default {
  name: "app",
  components: {
    Container,
    Control,
    Sidebar
  },
  computed: {
    ...mapState(["edit", "dark"])
  },
  created() {}
};
</script>


<style lang="scss">
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
</style>
