<template>

  <h1 class="timer"> {{ new Date(time * 1000).toISOString().substring(14, 19) }} </h1>

</template>

<script>
export default {

  // Component Name
  name: 'Timer',

  props: {
  },

  data() {
      return {
          time: 180,
      }
  },

  // Component methods
  methods: {
      countDown() {
          if (this.time > 0) {
              setTimeout(() => {
                  this.time -= 1;
                  this.countDown();
              }, 1000);
          }
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.timer {
  text-align: center;
}

</style>
