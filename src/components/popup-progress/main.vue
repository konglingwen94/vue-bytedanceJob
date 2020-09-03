<template>
  <transition name="fade">
    <div class="popup" v-if="visible">
      <!-- 遮罩 -->
      <div class="popup-mask"></div>
      <div class="popup-model">
        <div class="popup-fileicon" v-if="fileicon">
          <file-icon :file-type="fileicon"></file-icon>
        </div>
        <!-- 标题 -->
        <h3 class="popup-title">{{ title }}</h3>
        <!-- 进度条 -->
        <div class="popup-progressbar">
          <div ref="track" class="popup-progressbar__track">
            <div :style="sliderStyle" class="popup-progressbar__inner"></div>
          </div>
        </div>
        <!-- 取消按钮 -->
        <div class="popup-cancelBtn" @click="abort">取消</div>
      </div>
    </div>
  </transition>
</template>

<script>
import FileIcon from "@/components/File-Icon";
export default {
  components: { FileIcon },
  data() {
    return {
      title: "",
      value: 0,
      visible: false,
      fileicon: "",
    };
  },

  computed: {
    sliderStyle() {
      let percentage = Math.max(0, Math.min(100, this.value));
      
      return {
        width: percentage + "%",
      };
    },
  },
  methods: {
    abort() {
      this.close();
      this.$emit("abort");
    },
  },
};
</script>

<style scoped lang="less">
.popup {
  text-align: center;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  &-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
  &-model {
    padding: 30px;
    position: relative;
    z-index: 100;
    background: #fff;
    border-radius: 3px;
    width: 400px;
  }
  &-fileicon {
    width: 50px;
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 7px;
  }
  &-progressbar {
    margin: 12px 0;
    &__track {
      position: relative;
      width: 70%;
      display: inline-block;
      vertical-align: middle;
      border-radius: 3px;
      overflow: hidden;
      background: @bg-base-color;
    }
    &__inner {
      height: 7px;
      transition: width 0.9s;
      background: @main-color;
    }
  }
  &-cancelBtn {
    cursor: pointer;
    color: @main-color;
  }
}

.fade-leave-to {
  .popup-model {
    transform: scale(0);
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
  .popup-model {
    transition: transform 0.3s;
  }
}
</style>
