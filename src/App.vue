<template>
  <div
    id="app"
    :class="{ 'is-placeholder-screen': isMobile && !isStandalone }"
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
    <div v-else-if="!isStandalone && isMobile">
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
              <div class="card__hero">
                <div class="card__featured">
                  <img
                    class="card__featured-image"
                    src="/static/demo/users-demo-featured-1.jpg"
                    alt=""
                  >
                  <div class="card__featured-meta">
                    <ButtonPlay/>
                    <div class="card__featured-meta-title">
                      My day starts with a search <br>for a new meanings
                    </div>
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
                <div class="row text-center">
                  <div class="col-md-6 col-lg-4">
                    <div class="card__content-video">
                      <div class="card__content-video-poster">
                        <img
                          src="/static/demo/users-demo-video-poster-3.jpg"
                          alt=""
                        >
                        <ButtonPlay/>
                      </div>
                      <div class="card__content-video-title">On Self-Discipline</div>
                      <div class="card__content-video-duration">00:43</div>
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
                  <img
                    :src="awsUrl + topic.thumbnail[0].filename"
                    class="card__featured-image"
                    alt=""
                  >
                </div>
              </div>
              <div class="card__content">
                <div class="card__content-meta">
                  <div class="card__content-meta-info">
                    <div class="card__content-meta-title">{{ topic.title }}</div>
                    {{ topic.videos[0].length }} Mentions
                  </div>
                  <div class="card__content-meta-description">{{ topic.description }}</div>
                </div>
                <div class="row text-center">
                  Empty
                </div>
              </div>
            </div>
          </slick>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {GET_USERS, GET_TOPICS} from './store/actions/content'
import {TOGGLE_SLICK_STATUS} from './store/actions/status'
import {mapGetters, mapState} from 'vuex'
// Vendor
import iNoBounce from 'inobounce'
import getMobileOperatingSystem from './helpers/detectMobileOperatingSystem'
import Slick from './helpers/slick'

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
      isStandalone: true,
      isMobile: false,
      isUsersLoaded: false,
      isTopicsLoaded: false,
      awsUrl: process.env.AWS_URL
    }
  },

  computed: {
    ...mapGetters(['isUsers', 'isAuth', 'isLoading', 'isShare', 'isMobileMenuOpened']),
    ...mapState({
      isUsers: state => state.status.isUsers,
      isAuth: state => state.status.isAuth,
      isLoading: state => state.status.isLoading,
      isShare: state => state.status.isShare,
      isMobileMenuOpened: state => state.status.isMobileMenuOpened,
      users: state => state.content.users,
      topics: state => state.content.topics,
      slickInited: state => state.status.slickInited
    })
  },

  mounted () {
    /**
     * Check if mobile & standalone on render
     */
    if (getMobileOperatingSystem() !== 'unknown') {
      this.isMobile = true
      if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator.standalone)) {
        this.isStandalone = true
      }
    }

    /**
     * Handle swipe for mobile version
     */
    if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 992) {
      if (getMobileOperatingSystem() === 'iOS') {
        iNoBounce.enable()
      }

      this.xDown = null
      this.yDown = null

      this.getTouches = (event) => {
        return event.touches || event.originalEvent.touches
      }

      this.handleTouchStart = (event) => {
        const firstTouch = this.getTouches(event)[0]
        this.xDown = firstTouch.clientX
        this.yDown = firstTouch.clientY
      }

      this.handleTouchEnd = (event) => {
        if (this.sidebarHidden && this.$refs.slick.currentSlide() === 0) {
          this.$refs.slick.setOption('swipe', true)
          this.$refs.slick.setPosition()
        }
      }

      this.handleTouchSwipe = (event) => {
        if (!this.xDown || !this.yDown) {
          return true
        }

        let xUp = event.touches[0].clientX
        let yUp = event.touches[0].clientY

        let xDiff = this.xDown - xUp
        let yDiff = this.yDown - yUp

        if (Math.abs(xDiff) > Math.abs(yDiff) && !this.isMobileMenuOpened) {
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
        this.yDown = null
      }

      document.addEventListener('touchstart', this.handleTouchStart, false)
      document.addEventListener('touchend', this.handleTouchEnd, false)
      document.addEventListener('touchmove', this.handleTouchSwipe, false)
    }

    /**
     * Add event listener for orientation change
     */
    window.addEventListener('orientationchange', this.onOrientationChange, false)
  },

  beforeDestroy () {
    this.removeEventListeners()

    // Do NOT place "orientationchange" listener in the removeEventListeners() method!
    document.removeEventListener('orientationchange', this.onOrientationChange)
  },

  created: function () {
    /**
     * Fetch users
     */
    this.$store.dispatch(GET_USERS)
      .then(response => {
        this.isUsersLoaded = true
        this.$store.dispatch(GET_TOPICS)
          .then(response => {
            this.isTopicsLoaded = true
          })
      })
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
    /**
     * Slick carousel methods goes below
     */
    next () {
      this.$refs.slick.next()
    },

    prev () {
      this.$refs.slick.prev()
    },

    reInit () {
      this.$nextTick(() => {
        this.$refs.slick.reSlick()
      })
    },

    /**
     * Scroll top of the card when slide change (mobile only)
     */
    handleBeforeChange (event, slick, currentSlide, nextSlide) {
      if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 992) {
        setTimeout(() => {
          document.getElementsByClassName('card')[currentSlide].scroll({top: 0, left: 0, behavior: 'smooth'})
        }, 300)
      }
    },

    removeEventListeners () {
      document.removeEventListener('touchstart', this.handleTouchStart)
      document.removeEventListener('touchend', this.handleTouchEnd)
      document.removeEventListener('touchmove', this.handleTouchSwipe)
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
    },

    /**
     * Orientation Change Listener
     */
    onOrientationChange () {
      // Re-init slick carousel
      this.reInit()
    }
  }
}
</script>
