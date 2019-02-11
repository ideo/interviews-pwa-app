<template>
  <div
    v-if="playerOptions.sources[0].src"
    :class="{ 'is-played': isPlayed }"
    class="video-container"
  >
    <video-player
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
      class="video-player-box"
      @ready="playerReadied"
    />
  </div>
</template>

<script>
import videojs from 'video.js'

export default {
  name: 'Video',

  data () {
    return {
      // PLAYER
      playerOptions: {
        muted: false,
        language: 'en',
        resizeManager: false,
        sources: [{
          type: 'video/mp4',
          src: null
        }],
        controlBar: {
          fullscreenToggle: false,
          customFullscreenButton: true
        },
        autoplay: true
      },
      isPlayed: false
    }
  },

  computed: {
    player () {
      if (this.playerOptions.sources[0].src) {
        return this.$refs.videoPlayer.player
      }
    }
  },

  created () {
    this.createCustomFullscreenButton()
    document.addEventListener('keyup', this.closeVideoOnEscape)

    this.$eventHub.$on('IS_PLAYED', this.openVideo)
  },

  beforeDestroy () {
    document.removeEventListener('keyup', this.closeVideoOnEscape)
  },

  methods: {
    playerReadied (player) {
      player.tech_.off('dblclick')
    },

    createCustomFullscreenButton () {
      let that = this
      let Button = videojs.getComponent('Button')

      let CustomFullscreenButton = videojs.extend(Button, {
        constructor: function () {
          Button.apply(this, arguments)
          this.addClass('vjs-fullscreen-control')
        },
        handleClick: function () {
          that.player.reset()
          that.playerOptions.sources[0].src = ''
          that.$eventHub.$emit('IS_PLAYED', false)
          this.isPlayed = false
        }
      })

      videojs.registerComponent('customFullscreenButton', CustomFullscreenButton)
    },

    openVideo (videoSrc) {
      if (videoSrc && videoSrc !== '') {
        this.playerOptions.sources[0].src = videoSrc
        this.isPlayed = true
        setTimeout(() => {
          this.player.setAttribute('autoplay', 'autoplay')
          setTimeout(() => {
            this.player.play()
          }, 200)
        }, 100)
      }
    },

    closeVideoOnEscape (event) {
      if (event.keyCode === 27) {
        this.player.reset()
        this.playerOptions.sources[0].src = ''
        this.$eventHub.$emit('IS_PLAYED', false)
        this.isPlayed = false
      }
    }
  }
}
</script>
