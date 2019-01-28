<template>
  <div
    class="share-screen"
  >
    <div class="share-screen__close">
      <img
        src="/static/images/icon-close.svg"
        alt=""
      >
    </div>
    <div class="d-flex flex-wrap justify-content-center align-items-center h-100">
      <div class="share-screen__container">
        <div class="share-screen__title">Scan this code to get an <br>app on your device.</div>
        <div class="share-screen__code-container">
          <img
            src="/static/images/share-code.jpg"
            alt=""
            class="share-screen__code"
          >
        </div>
        <div class="share-screen__password">
          You’l be asked to input a <br>password which is <span>Knowyouruser</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShareScreen'
}
</script>
