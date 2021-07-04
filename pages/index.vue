<template>
  <div>
    <div class="py-8">
      <div class="container mx-auto">
        <h1 class="text-2xl text-center">Corgi Ipsum</h1>
      </div>
    </div>
    <div class="bg-blue-200 py-12">
      <div class="container mx-auto flex justify-center">
        <input type="text" class="px-4 py-2 max-w-xs w-full focus:ring-0" v-model="inputLink1" />
      </div>
    </div>
    <div class="py-12">
      <div class="container mx-auto flex flex-wrap gap-4 justify-center">
        <div v-for="i in 8" :key="i"><img :src="`${link1}?rand=${i}`" /></div>
      </div>
    </div>
    <div class="bg-blue-200 py-12">
      <div class="container mx-auto flex justify-center">
        <input type="text" class="px-4 py-2 max-w-xs w-full focus:ring-0" v-model="inputLink2" />
      </div>
    </div>
    <div class="py-12">
      <div class="container mx-auto flex flex-wrap gap-4 justify-center">
        <div v-for="i in 8" :key="i"><img :src="`${link2}?rand=${i}`" /></div>
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
