<template>
  <div>
    <h3>当前最新的count值为：{{count}}</h3>
    <div><button @click="addup">+1</button></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  methods: {
    addup () {
      this.$store.commit('addup')
    }
  },
  computed: {
    ...mapState(['count'])
  }
}
</script>

<style scope>
</style>
