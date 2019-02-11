<template>
  <div
    class="mobile-menu"
  >
    <button
      class="mobile-menu__item"
      @click.prevent="closeMenu"
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
import {TOGGLE_MOBILE_MENU, SET_CURRENT_MODULE} from '../store/actions/status'
import {mapState} from 'vuex'

export default {
  name: 'MobileMenu',

  computed: {
    ...mapState({
      isUsers: state => state.status.isUsers
    })
  },

  methods: {
    openShareScreen () {
      this.$eventHub.$emit('IS_SHARE', true)
      setTimeout(() => {
        this.$store.commit(TOGGLE_MOBILE_MENU, false)
      }, 400)
    },

    closeMenu () {
      this.$store.commit(TOGGLE_MOBILE_MENU, false)
      this.$store.commit(SET_CURRENT_MODULE, this.isUsers ? 0 : 1)
    }
  }
}
</script>
