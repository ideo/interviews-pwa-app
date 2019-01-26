<template>
  <div class="d-flex flex-wrap h-100">
    <Sidebar />
    <div class="content is-users">
      <div class="content__wrapper">
        <div class="card">
          <div class="card__hero">
            <div class="card__featured">
              <img
                class="card__featured-image"
                src="/static/demo/users-demo-featured-1.jpg"
                alt=""
              >
              <div class="card__featured-meta">
                <button class="play-button">
                  <img
                    class="d-block"
                    src="/static/images/icon-play.svg"
                    alt=""
                  >
                </button>
                <div class="card__featured-meta-title">
                  My day starts with a search <br>for a new meanings
                </div>
              </div>
            </div>
          </div>
          <div class="card__content">
            <div class="card__content-meta">
              <div class="card__content-meta-info">
                <div class="card__content-meta-title">Matt</div>
                32, Minneapolis
              </div>
              <div class="card__content-meta-description">
                Matt loves his work, cats and athletic past. He listens to Metallica on the max volume and plays with his kinds while secretly listening to podcasts (and feeling quite guilty about it). He shared some thoughts on how to enjoy your music preferences, do proper tailgating before the show and dont lose the sense of humour meanwhile.
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card__hero">
            <div class="card__featured">
              <img
                class="card__featured-image"
                src="/static/demo/users-demo-featured-2.jpg"
                alt=""
              >
              <div class="card__featured-meta">
                <button class="play-button">
                  <img
                    class="d-block"
                    src="/static/images/icon-play.svg"
                    alt=""
                  >
                </button>
                <div class="card__featured-meta-title">
                  My day starts with a search <br>for a new meanings
                </div>
              </div>
            </div>
          </div>
          <div class="card__content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Users'
}
</script>
