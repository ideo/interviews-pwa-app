<template>
  <button
    class="share-button d-none d-lg-block"
    @click.prevent="openShareScreen"
  >
    <img
      src="/static/images/icon-share.svg"
      class="share-button__icon"
      alt=""
    >
  </button>
</template>

<script>
export default {
  name: 'ShareButton',

  methods: {
    openShareScreen () {
      this.$eventHub.$emit('IS_SHARE', true)
    }
  }
}
</script>
