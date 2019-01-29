<script>
/* eslint-disable vue/attribute-hyphenation */
import {GET_USERS, GET_TOPICS} from './store/actions/content'
import {TOGGLE_SLICK_STATUS} from './store/actions/status'
import {mapState} from 'vuex'
// Disable bounce effect on scroll (iOS devices only).
import iNoBounce from 'inobounce'
// Import videojs to create our custom fullscreen button component.
import videojs from 'video.js'
// Slick library was modified to meet our requirements.
import Slick from './helpers/slick'
// getMobileOperatingSystem
import {getMobileOperatingSystem, isIpad} from './helpers/detectMobileOperatingSystem'

/**
 * 1. Name
 * 2. Components
 * 3. Data
 * 4. Computed
 * 5. Mounted
 * 6. Before Destroy
 * 7. Before Update
 * 8. Updated
 * 9. Methods
 */
export default {
  name: 'App',

  components: {Slick},

  data () {
    return {
      slickOptions: {
        slidesToShow: 1,
        infinite: false,
        arrows: false,
        dots: false,
        swipe: false,
        mobileFirst: true,
        variableWidth: true,
        setPosition: 0,
        touchThreshold: 10,
        accessibility: false,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              variableWidth: false,
              swipe: true,
              centerMode: true,
              centerPadding: '104px'
            }
          }
        ]
      },
      sidebarHidden: false,
      hamburgerHidden: false,
      isStandalone: false,
      isMobile: false,
      isMobileOnPC: false,
      isUsersLoaded: false,
      isTopicsLoaded: false,
      awsUrl: process.env.AWS_URL,
      playerOptions: {
        muted: false,
        language: 'en',
        resizeManager: false,
        sources: [{
          type: 'video/mp4',
          src: ''
        }],
        controlBar: {
          fullscreenToggle: false,
          customFullscreenButton: true
        }
      },
      isPlayed: false,
      windowWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      isIpad: isIpad(),
      isIos: false
    }
  },

  computed: {
    ...mapState({
      isUsers: state => state.status.isUsers,
      isAuth: state => state.status.isAuth,
      isLoading: state => state.status.isLoading,
      isShare: state => state.status.isShare,
      isMobileMenuOpened: state => state.status.isMobileMenuOpened,
      users: state => state.content.users,
      topics: state => state.content.topics,
      slickInited: state => state.status.slickInited
    }),
    player () {
      return this.$refs.videoPlayer.player
    }
  },

  mounted () {
    /** Handle swipe for mobile version **/
    if (this.isMobile && this.windowWidth < 992) {
      this.xDown = null

      this.getTouches = (event) => event.touches || event.originalEvent.touches

      this.handleTouchStart = (event) => {
        const firstTouch = this.getTouches(event)[0]
        this.xDown = firstTouch.clientX
      }

      this.handleTouchEnd = (event) => {
        if (this.sidebarHidden && this.$refs.slick.currentSlide() === 0) {
          this.$refs.slick.setOption('swipe', true)
          this.$refs.slick.setPosition()
        }
      }

      this.handleTouchSwipe = (event) => {
        if (!this.xDown) {
          return true
        }

        let xUp = event.touches[0].clientX

        let xDiff = this.xDown - xUp

        if (!this.isMobileMenuOpened) {
          if (xDiff > 0) {
            if (!this.sidebarHidden) {
              this.sidebarHidden = true
            }
          } else if (xDiff < 0 && this.sidebarHidden && this.$refs.slick.currentSlide() === 0) {
            this.sidebarHidden = false
            this.$refs.slick.setOption('swipe', false)
            this.$refs.slick.setPosition()
          }
        }

        this.xDown = null
      }

      document.addEventListener('touchstart', this.handleTouchStart, false)
      document.addEventListener('touchend', this.handleTouchEnd, false)
      document.addEventListener('touchmove', this.handleTouchSwipe, false)
    } else if (!this.isMobile && this.windowWidth < 992) {
      // Show placeholder on mobile version for PC users
      this.isMobile = true
      this.isMobileOnPC = true
    }
  },

  created: function () {
    /** Detect device OS and standalone mode **/
    this.detectDevice()

    /** Fetch users and then fetch topics */
    this.$store.dispatch(GET_USERS)
      .then(response => {
        this.isUsersLoaded = true
        this.$store.dispatch(GET_TOPICS)
          .then(response => {
            this.isTopicsLoaded = true
          })
      })

    /** Create custom fullscreen button for video.js player **/
    this.createCustomFullscreenButton()

    /** Call event listener to listen for ESC button click **/
    document.addEventListener('keyup', this.closeVideoOnEscape)

    /** Call event listener to listen for orientation change **/
    window.addEventListener('orientationchange', this.onOrientationChange, false)
  },

  beforeDestroy () {
    this.removeTouchEventListeners()
    document.removeEventListener('orientationchange', this.onOrientationChange)
    document.removeEventListener('keyup', this.closeVideoOnEscape)
  },

  beforeUpdate () {
    if (this.$refs.slick && !this.slickInited) {
      this.$refs.slick.destroy()
    }
  },

  updated () {
    if (this.$refs.slick && !this.$refs.slick.$el.classList.contains('slick-initialized')) {
      this.$refs.slick.create()
      this.$store.commit(TOGGLE_SLICK_STATUS, 1)
    }
  },

  methods: {
    /** Detect device OS and standalone mode **/
    detectDevice () {
      if (getMobileOperatingSystem() !== 'unknown') {
        if (getMobileOperatingSystem() === 'iOS') {
          this.isIos = true
        }
        this.isMobile = true
        if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator.standalone)) {
          this.isStandalone = true
        }
        // Disable bounce effect on scroll for iOS devices
        if (getMobileOperatingSystem() === 'iOS') {
          iNoBounce.enable()
        } else {
          iNoBounce.disable()
        }
      }
    },

    /** Slick go to next slide **/
    next () {
      this.$refs.slick.next()
    },

    /** Slick go to prev slide **/
    prev () {
      this.$refs.slick.prev()
    },

    /** Slick re-init **/
    reInit () {
      this.$nextTick(() => {
        this.$refs.slick.reSlick()
      })
    },

    /** Scroll top of the card when slide change (mobile only) **/
    handleBeforeChange (event, slick, currentSlide) {
      if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 992) {
        setTimeout(() => {
          document.getElementsByClassName('card')[currentSlide].scroll({top: 0, left: 0, behavior: 'smooth'})
        }, 300)
      }
    },

    /** Remove touch event listeners **/
    removeTouchEventListeners () {
      document.removeEventListener('touchstart', this.handleTouchStart)
      document.removeEventListener('touchend', this.handleTouchEnd)
      document.removeEventListener('touchmove', this.handleTouchSwipe)
    },

    /** Create custom fullscreen button for video.js player **/
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
          that.isPlayed = false
        }
      })

      videojs.registerComponent('customFullscreenButton', CustomFullscreenButton)
    },

    launchIntoFullscreen (element) {
      if (element.requestFullScreen) {
        element.requestFullScreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen()
      } else if (element.webkitEnterFullscreen) {
        element.webkitEnterFullscreen()
      }
    },

    /**
     * Open video by button click
     * @param videoSrc = Video URL
     */
    openVideo (videoSrc) {
      const videoID = videoSrc
      if (this.isIos && !this.isIpad) {
        this.$refs[videoID][0].currentTime = 0
        this.launchIntoFullscreen(this.$refs[videoID])
        setTimeout(() => {
          this.$refs[videoID][0].play()
        }, 200)
      } else {
        this.playerOptions.sources[0].src = videoSrc
        this.isPlayed = true
        setTimeout(() => {
          this.player.play()
          this.player.setAttribute('autoplay', 'autoplay')
        }, 200)
      }
    },

    /**
     * Close video by ESC button click
     * @param event
     */
    closeVideoOnEscape (event) {
      if (event.keyCode === 27) {
        this.player.reset()
        this.playerOptions.sources[0].src = ''
        this.isPlayed = false
      }
    },

    /**
     * Event on Vides.js player is ready
     * @param player
     */
    playerReadied (player) {
      player.tech_.off('dblclick')
    },

    /** Event on orientation change **/
    onOrientationChange () {
      // Re-init slick carousel
      if (this.$refs.slick) {
        this.$refs.slick.setPosition()
      }
    },

    /**
     * Toggle Hamburger at card scroll (mobile only)
     * @param event
     */
    cardScroll (event) {
      if (screen.availWidth < 992) {
        if (event.target.scrollTop > 50) {
          this.hamburgerHidden = true
        } else {
          this.hamburgerHidden = false
        }
      }
    }
  }
}
</script>

<template>
  <div
    id="app"
    :class="{ 'is-placeholder-screen': isMobile && !isStandalone, 'is-mobile-on-pc': isMobileOnPC }"
  >
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
    <div
      v-else-if="(!isAuth && isStandalone) || (!isAuth && !isStandalone && !isMobile)"
      class="screen-login"
    >
      <ScreenLogin/>
    </div>
    <div
      v-else-if="!isStandalone && isMobile"
      class="h-100"
    >
      <ScreenPlaceholder/>
    </div>
    <div
      v-else-if="(isAuth && isStandalone) || (isAuth && !isMobile)"
      :class="{ 'is-sidebar-hidden': sidebarHidden, 'is-hamburger-hidden': hamburgerHidden, 'is-mobile-menu-opened': isMobileMenuOpened }"
      class="h-100"
    >
      <MobileMenu/>
      <ScreenShare v-if="isShare"/>
      <ButtonHamburger/>
      <ButtonShare/>
      <ButtonToggle/>
      <Sidebar/>
      <div
        :class="{ 'is-users': isUsers, 'is-topics': !isUsers }"
        class="content">
        <div
          v-if="isUsersLoaded && isUsers"
          class="content__wrapper"
        >
          <slick
            ref="slick"
            :options="slickOptions"
            class="content__slider"
            @beforeChange="handleBeforeChange"
          >
            <div
              v-for="user in users"
              :key="user.title + user.city"
              class="card"
              @scroll="cardScroll"
            >
              <div
                v-if="user.featured.length > 0 && user.featured[0].video[0]"
                class="card__hero"
              >
                <div class="card__featured">
                  <picture>
                    <source
                      :srcset="awsUrl + user.featured[0].thumbnail[0].tablet"
                      media="(min-width: 768px)"
                    >
                    <img
                      :src="awsUrl + user.featured[0].thumbnail[0].lazyLoad"
                      :data-src="awsUrl + user.featured[0].thumbnail[0].mobile"
                      class="card__featured-image lazyload"
                      alt=""
                    >
                  </picture>
                  <video
                    v-if="isMobile && !isIpad"
                    :ref="user.featured[0].id"
                    :poster="awsUrl + user.featured[0].thumbnail[0].mobile"
                    class="d-none"
                    allowfullscreen
                  >
                    <source
                      :src="awsUrl + user.featured[0].video[0].filename"
                      type="video/mp4"
                    >
                  </video>
                  <div class="card__featured-meta">
                    <button
                      v-if="isMobile && !isIpad"
                      class="button-play"
                      @click.prevent="openVideo(user.featured[0].id)"
                    >
                      <img
                        class="d-block"
                        src="/static/images/icon-play.svg"
                        alt=""
                      >
                    </button>
                    <button
                      v-else
                      class="button-play"
                      @click.prevent="openVideo(awsUrl + user.featured[0].video[0].filename)"
                    >
                      <img
                        class="d-block"
                        src="/static/images/icon-play.svg"
                        alt=""
                      >
                    </button>
                  </div>
                </div>
              </div>
              <div class="card__content">
                <div class="card__content-meta">
                  <div class="card__content-meta-info">
                    <div class="card__content-meta-title">{{ user.title }}</div>
                    {{ user.age }}, {{ user.city }}
                  </div>
                  <div class="card__content-meta-description">{{ user.description }}</div>
                </div>
                <div
                  v-if="user.videos.length > 0"
                  class="row text-center"
                >
                  <div
                    v-for="video in user.videos[0]"
                    :key="video.id"
                    class="col-md-6 col-lg-4"
                  >
                    <div class="card__content-video">
                      <div
                        v-if="video.video[0]"
                        class="card__content-video-poster"
                      >
                        <img
                          :src="awsUrl + video.thumbnail[0].lazyLoad"
                          :data-src="awsUrl + video.thumbnail[0].universal"
                          class="lazyload"
                          alt=""
                        >
                        <video
                          v-if="isMobile && !isIpad"
                          :ref="video.id"
                          :poster="awsUrl + video.thumbnail[0].universal"
                          class="d-none"
                          allowfullscreen
                        >
                          <source
                            :src="awsUrl + video.video[0].filename"
                            type="video/mp4"
                          >
                        </video>
                        <button
                          v-if="isMobile && !isIpad"
                          class="button-play"
                          @click.prevent="openVideo(video.id)"
                        >
                          <img
                            class="d-block"
                            src="/static/images/icon-play.svg"
                            alt=""
                          >
                        </button>
                        <button
                          v-else
                          class="button-play"
                          @click.prevent="openVideo(awsUrl + video.video[0].filename)"
                        >
                          <img
                            class="d-block"
                            src="/static/images/icon-play.svg"
                            alt=""
                          >
                        </button>
                      </div>
                      <div class="card__content-video-title">{{ video.title }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </slick>
        </div>
        <div
          v-else-if="isTopicsLoaded && !isUsers"
          class="content__wrapper"
        >
          <slick
            ref="slick"
            :options="slickOptions"
            class="content__slider"
            @beforeChange="handleBeforeChange"
          >
            <div
              v-for="topic in topics"
              :key="topic.title"
              class="card"
              @scroll="cardScroll"
            >
              <div class="card__hero">
                <div class="card__featured">
                  <picture>
                    <source
                      :srcset="awsUrl + topic.thumbnail[0].tablet"
                      media="(min-width: 768px)"
                    >
                    <img
                      :src="awsUrl + topic.thumbnail[0].lazyLoad"
                      :data-src="awsUrl + topic.thumbnail[0].mobile"
                      class="card__featured-image lazyload"
                      alt=""
                    >
                  </picture>
                </div>
              </div>
              <div class="card__content">
                <div class="card__content-meta">
                  <div class="card__content-meta-info">
                    <div
                      class="card__content-meta-title"
                      v-html="topic.title"
                    />
                    {{ topic.videos[0].length }} Mentions
                  </div>
                  <div class="card__content-meta-description">{{ topic.description }}</div>
                </div>
                <div
                  v-if="topic.videos.length > 0"
                  class="row text-center"
                >
                  <div
                    v-for="video in topic.videos[0]"
                    :key="video.id"
                    class="col-md-6 col-lg-4"
                  >
                    <div class="card__content-video">
                      <div
                        v-if="video.video[0]"
                        class="card__content-video-poster"
                      >
                        <img
                          :src="awsUrl + video.thumbnail[0].lazyLoad"
                          :data-src="awsUrl + video.thumbnail[0].universal"
                          class="lazyload"
                          alt=""
                        >
                        <video
                          v-if="isMobile && !isIpad"
                          :ref="video.id"
                          :poster="awsUrl + video.thumbnail[0].universal"
                          class="d-none"
                          allowfullscreen
                        >
                          <source
                            :src="awsUrl + video.video[0].filename"
                            type="video/mp4"
                          >
                        </video>
                        <button
                          v-if="isMobile && !isIpad"
                          class="button-play"
                          @click.prevent="openVideo(video.id)"
                        >
                          <img
                            class="d-block"
                            src="/static/images/icon-play.svg"
                            alt=""
                          >
                        </button>
                        <button
                          v-else
                          class="button-play"
                          @click.prevent="openVideo(awsUrl + video.video[0].filename)"
                        >
                          <img
                            class="d-block"
                            src="/static/images/icon-play.svg"
                            alt=""
                          >
                        </button>
                      </div>
                      <div class="card__content-video-title">{{ video.title }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </slick>
        </div>
      </div>
    </div>
    <div
      :class="{ 'is-played': isPlayed }"
      class="video-container"
    >
      <video-player
        v-if="playerOptions.sources[0].src"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        class="video-player-box"
        @ready="playerReadied"
      />
    </div>
  </div>
</template>
