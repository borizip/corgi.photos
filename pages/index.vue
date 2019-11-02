<template>
  <div class="page">
    <div class="section section-header">
      <div class="container">
        <h1 class="title">Corgi Ipsum</h1>
      </div>
    </div>
    <div class="section section-description">
      <div class="container">
        <input type="text" class="link" v-model="inputLink1" />
      </div>
    </div>
    <div class="section section-images">
      <div class="container">
        <div class="image" v-for="i in 8" :key="i"><img :src="`${link1}?rand=${i}`" /></div>
      </div>
    </div>
    <div class="section section-description">
      <div class="container">
        <input type="text" class="link" v-model="inputLink2" />
      </div>
    </div>
    <div class="section section-images">
      <div class="container">
        <div class="image" v-for="i in 8" :key="i"><img :src="`${link2}?rand=${i}`" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  data() {
    return {
      inputLink1: 'https://corgi.photos/200/200',
      link1: 'https://corgi.photos/200/200',
      inputLink2: 'https://corgi.photos/g/200/200',
      link2: 'https://corgi.photos/g/200/200',
    }
  },
  watch: {
    inputLink1: debounce(function (link1) {
      this.link1 = link1
    }, 500),
    inputLink2: debounce(function (link2) {
      this.link2 = link2
    }, 500),
  },
}
</script>
