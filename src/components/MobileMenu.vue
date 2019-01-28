<template>
  <div
    class="mobile-menu"
  >
    <button
      class="mobile-menu__item"
      @click.prevent="toggleContent"
    >
      <span v-if="isUsers">Themes</span>
      <span v-else-if="!isUsers">People</span>
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
import {OPEN_SHARE_SCREEN, TOGGLE_MOBILE_MENU, TOGGLE_SLICK_STATUS, SET_CURRENT_MODULE} from '../store/actions/status'
import {mapGetters, mapState} from 'vuex'

export default {
  name: 'MobileMenu',

  computed: {
    ...mapGetters(['isUsers']),
    ...mapState({
      isUsers: state => state.status.isUsers
    })
  },

  methods: {
    openShareScreen () {
      this.$store.commit(OPEN_SHARE_SCREEN)
      setTimeout(() => {
        this.$store.commit(TOGGLE_MOBILE_MENU, false)
      }, 400)
    },

    toggleContent () {
      this.$store.commit(TOGGLE_MOBILE_MENU, false)
      this.$store.commit(TOGGLE_SLICK_STATUS, 0)
      this.$store.commit(SET_CURRENT_MODULE, this.isUsers ? 0 : 1)
    }
  }
}
</script>
