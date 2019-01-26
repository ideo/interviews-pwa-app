<template>
  <div class="sidebar h-100 d-flex flex-wrap flex-column justify-content-between align-items-center">
    <div class="sidebar__share">
      <img
        src="/static/images/icon-share.svg"
        class="sidebar__share-icon"
        alt=""
      >
    </div>
    <div class="sidebar__logo">
      <img
        src="/static/images/logo.png"
        class="sidebar__logo-image"
        alt=""
      >
    </div>
    <div class="sidebar__switcher-container">
      <button
        :class="{ 'is-users': isUsers, 'is-topics': isTopics }"
        class="sidebar__switcher"
        @click.prevent="toggleContent"
      >
        <div class="sidebar__switcher-label">
          <img
            :src="switcherLabelIconUrl"
            alt=""
            class="sidebar__switcher-label-icon"
          >
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',

  data () {
    return {
      isUsers: true,
      isTopics: false,
      switcherLabelIconUrl: '/static/images/icon-user.svg'
    }
  },

  methods: {
    toggleContent () {
      this.isUsers = !this.isUsers
      this.isTopics = !this.isTopics
      this.switcherLabelIconUrl = this.isUsers ? '/static/images/icon-user.svg' : '/static/images/icon-star.svg'
    }
  }
}
</script>
