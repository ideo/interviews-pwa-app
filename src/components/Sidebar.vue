<template>
  <div class="sidebar h-100 d-flex flex-wrap flex-column justify-content-center align-items-center">
    <div class="sidebar__logo">
      <img
        src="/static/images/logo.png"
        class="sidebar__logo-image"
        alt=""
      >
    </div>
  </div>
</template>

<script>
import {SET_CURRENT_MODULE} from '../store/actions/status'
import {mapState} from 'vuex'

export default {
  name: 'Sidebar',

  data () {
    return {
      switcherLabelIconUrl: ''
    }
  },

  computed: {
    ...mapState({
      isUsers: state => state.status.isUsers
    })
  },

  mounted () {
    this.switcherLabelIconUrl = this.isUsers ? '/static/images/icon-user.svg' : '/static/images/icon-star.svg'
  },

  methods: {
    toggleContent () {
      this.$store.commit(SET_CURRENT_MODULE, this.isUsers ? 0 : 1)
      this.switcherLabelIconUrl = this.isUsers ? '/static/images/icon-user.svg' : '/static/images/icon-star.svg'
    }
  }
}
</script>
