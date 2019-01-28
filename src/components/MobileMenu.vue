<template>
  <div
    class="mobile-menu"
  >
    <button class="mobile-menu__item">
      Themes
    </button>
    <button
      class="mobile-menu__item"
      @click.prevent="openShareScreen"
    >
      Share
    </button>
  </div>
</template>

<script>
import {OPEN_SHARE_SCREEN, TOGGLE_MOBILE_MENU} from '../store/actions/status'

export default {
  name: 'MobileMenu',

  methods: {
    openShareScreen () {
      this.$store.commit(OPEN_SHARE_SCREEN)
      setTimeout(() => {
        this.$store.commit(TOGGLE_MOBILE_MENU, false)
      }, 400)
    }
  }
}
</script>
