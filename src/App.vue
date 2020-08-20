<template>
  <div id="app">
    <HomePage v-if="!inGame" :players="players" :joker="joker"/>
    <GamePage v-else :role="role" :players="players" :answer="answer"/>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'
import GamePage from './components/GamePage.vue'

export default {
  name: 'App',

  components: {
    HomePage,
    GamePage
  },

  data() {
      return {
          // Game State
          inGame: false,
          // Player Role
          role: "",
          // Connected Players
          players: {},
          // Answer
          answer: "",
          // Joker
          joker: ""
      }
  },

  mounted() {
      this.$socket.on('updateGameState', inGame => {
          this.inGame = inGame
      });

      this.$socket.on('updateRole', role => {
          this.role = role;
      })

      this.$socket.on('updatePlayers', players => {
          this.players = players;
      })

      this.$socket.on("updateAnswer", answer => {
          this.answer = answer;
      })

      this.$socket.on("updateJoker", joker => {
          this.joker = joker;
      })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
