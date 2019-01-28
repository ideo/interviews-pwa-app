<template>
  <div class="toggle-button d-none d-lg-block">
    <button
      :class="{ 'is-users': isUsers, 'is-topics': !isUsers }"
      class="toggle-button__switcher"
      @click.prevent="toggleContent"
    >
      <div class="toggle-button__switcher-label">
        <img
          v-if="switcherLabelIconUrl !== ''"
          :src="switcherLabelIconUrl"
          alt=""
          class="toggle-button__switcher-icon"
        >
      </div>
    </button>
  </div>
</template>

<script>
import {SET_CURRENT_MODULE} from '../store/actions/content'
import {mapGetters, mapState} from 'vuex'

export default {
  name: 'ToggleButton',

  data () {
    return {
      switcherLabelIconUrl: ''
    }
  },

  computed: {
    ...mapGetters(['isUsers']),
    ...mapState({
      isUsers: state => state.content.isUsers
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
