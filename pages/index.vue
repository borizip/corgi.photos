<template>
  <div class="page">
    <div class="section section-header">
      <div class="container">
        <h1 class="title">Corgi Ipsum</h1>
      </div>
    </div>
    <div class="section section-description">
      <div class="container">
        <div class="description">
          다음 URL을 복사해서 사용하세요.
        </div>
        <div class="link">https://corgi.photos/200/200</div>
      </div>
    </div>
    <div class="section section-images">
      <div class="container">
        <div class="image" v-for="i in 12" :key="i"><img :src="`https://corgi.photos/200/200?${i}`" /></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  }
}
</script>
