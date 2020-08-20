<template>

  <ul class="player-list">
    <li v-for="(player, id) in players"
        :key="id"
        :data-id="id"
        v-on:click="vote"
        :style="{'color': player.color}">

      {{ player.name }}

      <span class="votes">
        <span v-for="vote in player.votes"
              :key="vote"
              class="dot"
              :style="{'background': vote}">
        </span>
      </span>

    </li>
  </ul>

</template>

<script>
export default {

  // Component Name
  name: 'PlayerList',

  props: {
      players: Object,
      votable: Boolean
  },

  // Component methods
  methods: {
      vote(event) {
          if (this.votable) {
              let id = event.target.getAttribute('data-id');
              this.$socket.emit("vote", id);
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player-list {
    width: 40%;
    padding: 0;
    /* border: 1px solid black; */
    /* margin: 0; */
}

.player-list li {
    list-style: none;
    text-align: left;

    /* border: 1px solid black; */
    border-radius: 10px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0,0.3);

    padding: 10px;
    margin: 20px;
    font-size: 25px;
    font-weight: bold;
    /* background-color: #DDD; */

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.player-list li:hover {
    cursor: pointer;
}

.votes {
    display: flex;
    align-items: center;
}

.votes .dot {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    display: inline-block;
    background-color: #000;
    margin: 0 5px;
}

</style>
