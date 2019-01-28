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
import {OPEN_SHARE_SCREEN} from '../store/actions/status'

export default {
  name: 'ShareButton',

  methods: {
    openShareScreen () {
      this.$store.commit(OPEN_SHARE_SCREEN)
    }
  }
}
</script>
