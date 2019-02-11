<template>
  <div
    id="app"
    :class="{ 'is-placeholder-screen': isMobile && !isStandalone, 'is-mobile-on-pc': isMobileOnPC, 'is-auth': isAuth, 'is-mobile': isMobile }"
  >

    <!-- SCREEN LOADING -->
    <transition
      v-if="isLoading"
      :duration="1000"
      name="screen-animation"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
    >
      <div
        v-if="isLoading && isAuth"
        class="screen-loading"
      />
    </transition>

    <!-- SCREEN LOGIN -->
    <div
      v-else-if="(!isAuth && isStandalone) || (!isAuth && !isStandalone && !isMobile)"
      class="screen-login"
    >
      <ScreenLogin/>
    </div>

    <!-- SCREEN PLACEHOLDER -->
    <div
      v-else-if="!isStandalone && isMobile"
      class="h-100"
    >
      <ScreenPlaceholder/>
    </div>

    <!-- CONTENT -->
    <div
      v-else-if="(isAuth && isStandalone) || (isAuth && !isMobile)"
      :class="{ 'is-sidebar-hidden': sidebarHidden, 'is-mobile-menu-opened': isMobileMenuOpened }"
      class="h-100"
    >
      <MobileMenu/>
      <ScreenShare v-if="isShare"/>
      <ButtonShare/>
      <ButtonToggle/>
      <Sidebar/>
      <div
        :class="{ 'is-users': isUsers, 'is-topics': !isUsers }"
        class="content"
      >
        <!-- USERS -->
        <Slider
          v-if="isUsers"
          :content="users"
          content-type="users"
        />
        <!-- TOPICS -->
        <Slider
          v-else
          :content="topics"
          content-type="topics"
        />
      </div>
      <Video/>
    </div>
  </div>
</template>

<script>
import {GET_USERS, GET_TOPICS} from './store/actions/content'
import {mapState} from 'vuex'
/**
 * DISABLE BOUNCE EFFECT ON SCROLL ON IOS DEVICES.
 **/
import iNoBounce from 'inobounce'
/**
 * IMPORT JS HELPER TO DETECT USER OS.
 **/
import {getMobileOperatingSystem} from './helpers/detectMobileOperatingSystem'
/**
 * IMPORT COMPONENTS.
 **/
import ButtonShare from './components/ButtonShare'
import ButtonToggle from './components/ButtonToggle'
import MobileMenu from './components/MobileMenu'
import ScreenLogin from './components/ScreenLogin'
import ScreenPlaceholder from './components/ScreenPlaceholder'
import ScreenShare from './components/ScreenShare'
import Sidebar from './components/Sidebar'
import Slider from './components/Slider'
import Video from './components/Video'

export default {
  name: 'App',

  components: {
    ButtonShare,
    ButtonToggle,
    MobileMenu,
    ScreenLogin,
    ScreenPlaceholder,
    ScreenShare,
    Sidebar,
    Slider,
    Video
  },

  data () {
    return {
      isMobile: false,
      isMobileOnPC: false,
      isShare: false,
      sidebarHidden: false,
      // Single
      isStandalone: false,
      windowWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    }
  },

  computed: {
    ...mapState({
      isUsers: state => state.status.isUsers,
      isAuth: state => state.status.isAuth,
      isLoading: state => state.status.isLoading,
      isMobileMenuOpened: state => state.status.isMobileMenuOpened,
      users: state => state.content.users,
      topics: state => state.content.topics
    })
  },

  watch: {
    'isUsers': function () {
      this.retrieveContent()
    },
    'isAuth': function () {
      this.retrieveContent()
    }
  },

  created: function () {
    this.$eventHub.$on('IS_MOBILE', this.udpateIfMobile)
    this.$eventHub.$on('IS_MOBILE_ON_PC', this.updateIfMobileOnPc)
    this.$eventHub.$on('IS_SHARE', this.updateIfShare)
    this.$eventHub.$on('IS_SIDEBAR_HIDDEN', this.updateIfSidebarHidden)

    if (this.isAuth) {
      this.retrieveContent()
    }

    this.detectDevice()
  },

  mounted: function () {
    if (this.windowWidth < 992) {
      this.sidebarHidden = true
      this.$eventHub.$emit('IS_SIDEBAR_HIDDEN', true)
    }
  },

  methods: {
    /**
     * Detect device OS and standalone mode.
     **/
    detectDevice () {
      if (getMobileOperatingSystem() !== 'unknown') {
        this.isMobile = true
        this.$eventHub.$emit('IS_MOBILE', true)
        if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator.standalone)) {
          this.isStandalone = true
        }
        if (getMobileOperatingSystem() === 'iOS') {
          iNoBounce.enable()
        } else {
          iNoBounce.disable()
        }
      }
    },
    /**
     * Retrieve content from back-end.
     */
    retrieveContent () {
      if (this.isUsers) {
        if (!this.users.length) {
          this.$store.dispatch(GET_USERS)
        }
      } else {
        if (!this.topics.length) {
          this.$store.dispatch(GET_TOPICS)
        }
      }
    },
    /**
     * Watch for events and update variables.
     */
    udpateIfMobile (bool) {
      this.isMobile = bool
    },
    updateIfMobileOnPc (bool) {
      this.isMobileOnPC = bool
    },
    updateIfSidebarHidden (bool) {
      this.sidebarHidden = bool
    },
    updateIfShare (bool) {
      this.isShare = bool
    }
  }
}
</script>
