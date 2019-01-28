<template>
  <button
    class="button-hamburger d-lg-none"
    @click.prevent="toggleMobileMenu"
  >
    <span/>
    <span/>
    <span/>
  </button>
</template>

<script>
import {TOGGLE_MOBILE_MENU} from '../store/actions/status'
import {mapGetters, mapState} from 'vuex'

export default {
  name: 'ButtonHamburger',

  data () {
    return {
      isClicked: false
    }
  },

  computed: {
    ...mapGetters(['isMobileMenuOpened']),
    ...mapState({
      isMobileMenuOpened: state => state.status.isMobileMenuOpened
    })
  },

  methods: {
    toggleMobileMenu () {
      if (!this.isClicked) {
        this.isClicked = true
        this.$store.commit(TOGGLE_MOBILE_MENU, !this.isMobileMenuOpened)
        setTimeout(() => {
          this.isClicked = false
        }, 200)
      }
    }
  }
}
</script>
