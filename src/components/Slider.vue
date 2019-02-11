<template>
  <div
    v-if="content.length"
    class="content__wrapper"
  >
    <slick
      ref="slick"
      :options="slickOptions"
      class="content__slider"
      @beforeChange="handleBeforeChange"
    >
      <div
        v-for="(entry, index) in content"
        :key="entry.title"
        class="card"
      >

        <div
          v-if="contentType === 'users' && entry.featured.length > 0 && entry.featured[0].video[0]"
          class="card__hero"
        >
          <div class="card__featured">
            <picture>
              <source
                :srcset="awsUrl + entry.featured[0].thumbnail[0].lazyLoad"
                :data-srcset="awsUrl + entry.featured[0].thumbnail[0].tablet"
                media="(min-width: 768px)"
              >
              <img
                :src="awsUrl + entry.featured[0].thumbnail[0].lazyLoad"
                :data-src="awsUrl + entry.featured[0].thumbnail[0].mobile"
                class="card__featured-image lazyload"
                alt=""
              >
            </picture>
            <video
              v-if="isMobile && isIphone"
              :ref="entry.featured[0].id"
              class="d-none"
              allowfullscreen
            >
              <source
                :src="awsUrl + entry.featured[0].video[0].filename"
                type="video/mp4"
              >
            </video>
            <div
              class="card__featured-meta"
            >
              <button
                v-if="isMobile && isIphone"
                class="button-play"
                @click="openVideo(entry.featured[0].id, $event)"
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
                @click="openVideo(awsUrl + entry.featured[0].video[0].filename, $event)"
              >
                <img
                  class="d-block"
                  src="/static/images/icon-play.svg"
                  alt=""
                >
              </button>
            </div>
          </div>
          <!-- Card featured END -->
          <div class="card__content">
            <div class="card__content-meta">
              <div class="card__content-meta-info">
                <div class="card__content-meta-title">{{ entry.title }}</div>
                {{ entry.age }}, {{ entry.city }}
              </div>
              <div class="card__content-meta-description">{{ entry.description }}</div>
            </div>
            <div
              v-if="entry.videos.length > 0"
              class="row text-center"
            >
              <div
                v-for="video in entry.videos[0]"
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
                      v-if="isMobile && isIphone"
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
                      v-if="isMobile && isIphone"
                      class="button-play"
                      @click="openVideo(video.id, $event)"
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
                      @click="openVideo(awsUrl + video.video[0].filename, $event)"
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
          <!-- Card content END-->
        </div>

        <div
          v-else-if="contentType === 'topics' && entry.thumbnail.length"
          class="card__hero"
        >
          <div class="card__hero">
            <div class="card__featured">
              <picture>
                <source
                  :srcset="awsUrl + entry.thumbnail[0].lazyLoad"
                  :data-srcset="awsUrl + entry.thumbnail[0].tablet"
                  media="(min-width: 768px)"
                >
                <img
                  :src="awsUrl + entry.thumbnail[0].lazyLoad"
                  :data-src="awsUrl + entry.thumbnail[0].mobile"
                  class="card__featured-image lazyload"
                  alt=""
                >
              </picture>
            </div>
            <!-- Card featured END -->
            <div class="card__content">
              <div class="card__content-meta">
                <div class="card__content-meta-info">
                  <div
                    class="card__content-meta-title"
                    v-html="entry.title"
                  />
                  {{ entry.videos[0].length }} Mentions
                </div>
                <div class="card__content-meta-description">{{ entry.description }}</div>
              </div>
              <div
                v-if="entry.videos.length > 0"
                class="row text-center"
              >
                <div
                  v-for="video in entry.videos[0]"
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
                        v-if="isMobile && isIphone"
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
                        v-if="isMobile && isIphone"
                        class="button-play"
                        @click="openVideo(video.id, $event)"
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
                        @click="openVideo(awsUrl + video.video[0].filename, $event)"
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
            <!-- Card content END -->
          </div>
        </div>

        <div
          :id="index"
          class="card__anchor d-none d-lg-block"
          @click="changeSlide"
        />

      </div>
    </slick>
  </div>
</template>

<script>
import {TOGGLE_MOBILE_MENU} from '../store/actions/status'
import Slick from '../helpers/slick'
import {isIphone} from '../helpers/detectMobileOperatingSystem'

export default {
  name: 'Slider',

  components: {Slick},

  props: {
    contentType: {
      type: String,
      required: true
    },
    content: {
      type: Array | Object,
      required: true
    }
  },

  data () {
    return {
      // SLIDER
      slickOptions: {
        slidesToShow: 1,
        infinite: false,
        arrows: false,
        dots: false,
        swipe: true,
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
      // DATA
      awsUrl: process.env.AWS_URL,
      windowWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      isMobile: false,
      isMobileMenuOpened: false,
      isIphone: isIphone(),
      sidebarHidden: false
    }
  },

  created () {
    this.$eventHub.$on('IS_MOBILE', this.updateIfMobile)
    this.$eventHub.$on('IS_PLAYED', this.updateIsPlayed)
    this.$eventHub.$on('IS_SIDEBAR_HIDDEN', this.updateIfSidebarHidden)

    window.addEventListener('orientationchange', this.onOrientationChange, false)
  },

  mounted () {
    this.handleSwipe()

    if (!this.isMobile && this.windowWidth < 992) {
      // Show placeholder on mobile version for PC users
      this.isMobile = true
      this.$eventHub.$emit('IS_MOBILE', true)
      this.$eventHub.$emit('IS_MOBILE_ON_PC', true)
    }
  },

  beforeUpdate () {
    if (this.$refs.slick) {
      this.$refs.slick.destroy()
    }
  },

  updated () {
    this.$nextTick(function () {
      if (this.$refs.slick && !this.$refs.slick.$el.classList.contains('slick-initialized')) {
        this.$refs.slick.create(this.slickOptions)
      }
    })
  },

  beforeDestroy () {
    this.removeTouchEventListeners()
    document.removeEventListener('orientationchange', this.onOrientationChange)
  },

  methods: {
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

    onOrientationChange () {
      // Re-init slick carousel
      if (this.$refs.slick) {
        this.$refs.slick.setPosition()
      }
    },

    /** Scroll top of the card when slide change (mobile only) **/
    handleBeforeChange (event, slick, currentSlide) {
      if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 992) {
        setTimeout(() => {
          document.getElementsByClassName('card')[currentSlide].scroll({top: 0, left: 0, behavior: 'smooth'})
        }, 300)
      }
    },

    handleSwipe () {
      if (this.isMobile && this.windowWidth < 992) {
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
          if (this.sidebarHidden && this.$refs.slick && this.$refs.slick.currentSlide() === 0) {
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

          if (this.$refs.slick) {
            if (Math.abs(xDiff) > Math.abs(yDiff) && !this.isMobileMenuOpened) {
              if (xDiff > 0) {
                if (!this.sidebarHidden) {
                  this.sidebarHidden = true
                  this.$eventHub.$emit('IS_SIDEBAR_HIDDEN', true)
                }
              } else if (xDiff < 0 && this.sidebarHidden && this.$refs.slick.currentSlide() === 0) {
                this.sidebarHidden = false
                this.$eventHub.$emit('IS_SIDEBAR_HIDDEN', false)
                this.$refs.slick.setOption('swipe', false)
                this.$refs.slick.setPosition()
              }
            } else {
              if (yDiff > 0) {
                if (this.isMobileMenuOpened) {
                  this.$store.commit(TOGGLE_MOBILE_MENU, false)
                  this.isMobileMenuOpened = false
                }
              } else {
                const currentSlideIndex = this.$refs.slick.currentSlide()
                const currentCard = document.querySelectorAll('.card')[currentSlideIndex]
                if (yUp < screen.availHeight) {
                  if (currentCard && currentCard.scrollTop === 0) {
                    this.$store.commit(TOGGLE_MOBILE_MENU, true)
                    this.isMobileMenuOpened = true
                  }
                }
              }
            }
          }

          this.xDown = null
          this.yDown = null
        }

        document.addEventListener('touchstart', this.handleTouchStart, false)
        document.addEventListener('touchend', this.handleTouchEnd, false)
        document.addEventListener('touchmove', this.handleTouchSwipe, false)
      }
    },

    removeTouchEventListeners () {
      document.removeEventListener('touchstart', this.handleTouchStart)
      document.removeEventListener('touchend', this.handleTouchEnd)
      document.removeEventListener('touchmove', this.handleTouchSwipe)
    },

    changeSlide (event) {
      if (event.target.id > this.$refs.slick.currentSlide()) {
        this.next()
      } else if (event.target.id < this.$refs.slick.currentSlide()) {
        this.prev()
      }
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
     * @param $event = event
     */
    openVideo (videoSrc, $event) {
      const that = this
      const videoID = videoSrc
      $event.target.firstElementChild.src = '/static/images/icon-loader.svg'

      if (this.isIphone) {
        this.$refs[videoID][0].currentTime = 0
        this.launchIntoFullscreen(this.$refs[videoID])
        setTimeout(() => {
          this.$refs[videoID][0].play()
        }, 300)
        this.$refs[videoID][0].addEventListener('webkitendfullscreen', function (e) {
          that.updateIsPlayed(false)
        })
      } else {
        setTimeout(() => {
          this.$eventHub.$emit('IS_PLAYED', videoSrc)
        }, 300)
      }
    },

    updateIfMobile (bool) {
      this.isMobile = bool
      this.handleSwipe()
    },

    updateIsPlayed (bool) {
      if (bool === false) {
        const buttons = document.querySelectorAll('.button-play')

        for (let i = 0; i < buttons.length; i++) {
          buttons[i].firstElementChild.src = '/static/images/icon-play.svg'
        }
      }
    },

    updateIfSidebarHidden (bool) {
      this.sidebarHidden = bool
    }
  }
}
</script>
