<template>
  <div class="jc-zoom">
    <img :src="imgUrl" />
    <div class="jc-zoom__event" @mousemove="handleMove"></div>
    <div class="jc-zoom__zoom-wrap" ref="zoomWrap">
      <img ref="zoomImg" :src="imgUrl" />
    </div>
    <div class="jc-zoom__mask" ref="mask"></div>
  </div>
</template>

<script>
import '../../theme-chalk/common/jc-zoom.scss';

export default {
  name: 'JcZoom',
  props: {
    imgUrl: String,
  },
  methods: {
    handleMove(e) {
      const mask = this.$refs.mask,
        zoomWrap = this.$refs.zoomWrap,
        zoomImg = this.$refs.zoomImg;
      let times = zoomWrap.offsetWidth / mask.offsetWidth; // 注意元素必须是块元素，否则获取不到 offsetWidth
      let left = e.offsetX - mask.offsetWidth / 2,
        top = e.offsetY - mask.offsetHeight / 2;
      left = Math.max(Math.min(left, mask.offsetWidth), 0);
      top = Math.max(Math.min(top, mask.offsetHeight), 0);
      mask.style.left = left + 'px';
      mask.style.top = top + 'px';
      zoomImg.style.left = -times * left + 'px';
      zoomImg.style.top = -times * top + 'px';
    },
  },
};
</script>
