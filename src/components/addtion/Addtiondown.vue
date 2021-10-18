<template>
  <div>
    <h3>当前最新的count值为：{{this.$store.state.count}}</h3>
    <div><button @click="adddown">-1</button></div>
  </div>
</template>

<script>
export default {
  methods: {
    adddown () {
      this.$store.commit('adddown')
    }
  }
}
</script>

<style scope>
</style>
