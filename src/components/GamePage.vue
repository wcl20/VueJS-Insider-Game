<template>
  <div class="game-page">

    <button v-on:click="endGame">Quit</button>

    <div class="main-container">
        <PlayerList :players="players" :votable="true" />
        <div class="secondary-container">
            <h1 class="role">Role: {{ role }} </h1>
            <Timer ref="timer"/>
            <TextInput :answer="answer" :role="role"/>
        </div>
    </div>
  </div>
</template>

<script>
import PlayerList from './PlayerList.vue'
import TextInput from './TextInput.vue';
import Timer from './Timer.vue';

export default {
  // Component Name
  name: 'GamePage',

  components: {
      PlayerList,
      TextInput,
      Timer
  },

  props: {
      players: Object,
      role: String,
      answer: String
  },

  watch: {
      // Check answer props update
      answer: function() {
          this.$refs.timer.countDown();
      }
  },

  // Component methods
  methods: {
      endGame() {
          this.$socket.emit("end");
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.main-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.secondary-container {
    flex: 1;
}

.role {
    text-align: center;
    margin: 0;
}

@media only screen and (max-width: 600px) {
  .main-container {
      flex-direction: column-reverse;
  }
}

</style>
