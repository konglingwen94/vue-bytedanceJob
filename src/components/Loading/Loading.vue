<template>
  <div class="bytedanceLoading">
    <div class="bytedanceLoading__wrapper">
      <!-- <div class="bytedanceLoading__background"></div> -->
      <div class="bytedanceLoading__inner">
        <div class="bytedanceLoading__inner-item"></div>
        <div class="bytedanceLoading__inner-item"></div>
        <div class="bytedanceLoading__inner-item"></div>
        <div class="bytedanceLoading__inner-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {
      fullscreen: false,
      lock: false
    };
  },
  methods: {
    close() {
      this.$el.remove();
      this.$destroy();
    }
  }
};
</script>

<style lang="less">
.directiveLoading {
  &-parent {
    position: relative;
    &-visible {
      // max-height: 100vh !important;
      // overflow: hidden;
      // min-height: 500px !important;
    }
  }
}
</style>
<style lang="less">
@height: 10px;
@duration: 400ms;
@itemWidth: 9px;
@doubleHorizontalSpace: 2px;
@longerHeight: 29px;
@shorterHeight: 14px;

@keyframes verticalDance {
  0% {
    transform: translate3d(0, @height, 0);
  }
  50% {
    transform: translate3d(0, -@height, 0);
  }
  100% {
    transform: translate3d(0, @height, 0);
  }
}

.bytedanceLoading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 1);
  z-index: 100;
  &-fullscreen {
    position: fixed !important;
  }

  &__inner {
    display: flex;
    height: 20px;
    &-item {
      width: @itemWidth;
      margin: 0 @doubleHorizontalSpace;
      animation-name: verticalDance;
      animation-duration: @duration;
      animation-iteration-count: infinite;
      &:first-child {
        background-color: #2d5fb2;
        height: @longerHeight;

        animation-delay: -300ms;
      }
      &:nth-child(2) {
        background-color: #3682c7;
        height: @shorterHeight;
        animation-delay: -400ms;
      }
      &:nth-child(3) {
        animation-delay: -600ms;
        background-color: #00bfc5;
        height: @shorterHeight;
      }
      &:last-child {
        animation-delay: -900ms;
        background-color: #5acec6;
        height: @longerHeight;
      }
    }
  }
}
</style>
