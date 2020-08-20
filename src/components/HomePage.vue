<template>
  <div class="home-page">

      <form class="name-input" @submit.prevent="rename">
        <input type="text" placeholder="Name" v-model="name" />
        <button type="submit">Rename</button>
      </form>

      <h2 class="joker" v-if="joker">{{ joker }} was the Joker</h2>

      <PlayerList :players="players" :votable="false"/>

    <button class="start-button" v-on:click="startGame">Start</button>

  </div>
</template>

<script>
import PlayerList from './PlayerList.vue'

export default {
  // Component Name
  name: 'HomePage',

  components: {
      PlayerList
  },

  props: {
      players: Object,
      joker: String
  },

  // Component Data
  data() {
      return {
          name: "Player"
      }
  },

  // Component methods
  methods: {
      rename() {
          if (this.name) {
              this.$socket.emit("rename", this.name);
          }
      },
      startGame() {
          this.$socket.emit("start");
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.home-page {
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
}

.name-input {
    width: 40%;
    display: flex;
}

.name-input button {
    width: 80px;
    border: 1px solid #AAA;
    border-radius: 0 5px 5px 0;
}

.name-input input {
    flex: 1;
    min-width: 30px;
    font-size: 20px;
    padding: 5px;
    border-radius: 5px 0 0 5px;
    border: 1px solid #AAA;
    outline: 0;
}

.name-input input:focus {
    outline: 0;
}

.joker {
    margin-bottom: 0;
}

.start-button {
    padding: 10px 30px;
    width: 40%;
    text-transform: uppercase;
}

</style>
