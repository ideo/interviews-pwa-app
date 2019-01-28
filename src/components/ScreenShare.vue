<template>
  <transition
    name="screen-animation"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    mode="out-in"
  >
    <div
      class="screen-share"
    >
      <button
        class="screen-share__close"
        @click.prevent="closeShareScreen"
      >
        <img
          src="/static/images/icon-close.svg"
          alt=""
        >
      </button>
      <div class="d-flex flex-wrap justify-content-center align-items-center h-100">
        <div class="screen-share__container">
          <div class="screen-share__title">Scan this code to get an <br>app on your device.</div>
          <div class="screen-share__code-container">
            <img
              src="/static/images/share-code.jpg"
              alt=""
              class="screen-share__code"
            >
          </div>
          <div class="screen-share__password">
            You’l be asked to input a <br>password which is <span>Knowyouruser</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {CLOSE_SHARE_SCREEN} from '../store/actions/status'

export default {
  name: 'ScreenShare',

  methods: {
    closeShareScreen () {
      this.$store.commit(CLOSE_SHARE_SCREEN)
    }
  }
}
</script>
