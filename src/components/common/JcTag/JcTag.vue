<template>
  <span class="jc-tag"
    ><slot
      ><span class="jc-tag__text">{{ text }}</span></slot
    ><span v-if="closable" class="jc-tag__close" @click="handleClose"
      ><slot name="close">x</slot></span
    ></span
  >
</template>

<script>
export default {
  name: 'JcTag',
  props: {
    text: String,
    closable: Boolean,
  },
  methods: {
    handleClose(event) {
      event.stopPropagation();
      this.$emit('close', event);
    },
    handleClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>

<style lang="scss" scoped>
.jc-tag {
  .jc-tag__close {
    margin-left: 5px;
  }
}
</style>
