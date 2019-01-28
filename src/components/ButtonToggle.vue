<template>
  <div class="button-toggle d-none d-lg-block">
    <button
      :class="{ 'is-users': isUsers, 'is-topics': !isUsers }"
      class="button-toggle__switcher"
      @click.prevent="toggleContent"
    >
      <div class="button-toggle__switcher-label">
        <img
          v-if="switcherLabelIconUrl !== ''"
          :src="switcherLabelIconUrl"
          alt=""
          class="button-toggle__switcher-icon"
        >
      </div>
    </button>
  </div>
</template>

<script>
import {SET_CURRENT_MODULE} from '../store/actions/status'
import {mapGetters, mapState} from 'vuex'

export default {
  name: 'ButtonToggle',

  data () {
    return {
      switcherLabelIconUrl: ''
    }
  },

  computed: {
    ...mapGetters(['isUsers']),
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
