const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Game States
let players = {};
let master = null;
let joker = null;
let inGame = false;

// Colors
let colors = ["#E74C3C", "#9B59B6", "#3498DB", "#27AE60", "#F1C40F", "#7F8C8D", "#E67E22"];

io.sockets.on('connection', (socket) => {

  console.log(`${socket.id} has joined`);

  // Join game room
  socket.join("game");
  socket.join("citizen");

  // Create player
  let player = { name: "Player", vote: "", votes: [], color: colors[0] };
  // Update color list
  colors.splice(0, 1);
  // Add player to list of players
  players[socket.id] = player;
  // Update player list
  io.in("game").emit("updatePlayers", players);

  socket.on('rename', (name) => {
      // Update player name
      players[socket.id].name = name;
      // Update player list
      io.in("game").emit("updatePlayers", players);
  })

  socket.on("start", () => {

      if (!inGame) {

        // Update game state
        io.in("game").emit("updateGameState", true);

        // Reset votes
        for (const player in players) {
            players[player].vote = "";
            players[player].votes = [];
        }
        // Update player list
        io.in("game").emit("updatePlayers", players);

        // Assign roles
        let ids = Object.keys(players);
        ids = ids.sort(() => Math.random() - 0.5);

        master = ids[0];
        joker = ids[1];

        if (io.sockets.connected[master]) {
            io.sockets.connected[master].leave("citizen");
        }
        if (io.sockets.connected[joker]) {
            io.sockets.connected[joker].leave("citizen");
        }

        io.to(master).emit("updateRole", "Master");
        io.to(joker).emit("updateRole", "Joker");
        io.in("citizen").emit("updateRole", "Citizen");

        inGame = true;
      }


  });

  socket.on("end", () => {

      // Update game state
      io.in("game").emit("updateGameState", false);
      io.in("game").emit("updateAnswer", "");

      // Reveal joker
      if (players[joker]) {
        io.in("game").emit("updateJoker", players[joker].name);
      } else {
        io.in("game").emit("updateJoker", "");
      }

      // Reset roles
      if (io.sockets.connected[master]) {
          io.sockets.connected[master].join("citizen");
      }

      if (io.sockets.connected[joker]) {
          io.sockets.connected[joker].join("citizen");
      }
      master = null;
      joker = null;

      inGame = false
  })

  socket.on("answer", text => {
      // Check text is from master
      if (socket.id === master) {
          answer = text;
          // Update answer to signal start timer
          io.to(master).emit("updateAnswer", answer);
          io.to(joker).emit("updateAnswer", answer);
          io.in("citizen").emit("updateAnswer", "START_TIMER");
      }
  });

  socket.on("vote", id => {
      let voterID = socket.id;
      let voterColor = players[voterID].color;

      // Get previous vote
      let prev = players[voterID].vote;
      if (prev) {
          players[voterID].vote = "";
          // Remove this voter from previous target vote list
          if (players[prev]) {
              players[prev].votes.splice(players[prev].votes.indexOf(voterColor), 1);
          }
      }

      // Update vote
      if (prev !== id) {
          // Update vote
          players[voterID].vote = id;
          if (players[id]) {
              players[id].votes.push(voterColor);
          }
      }

      // Update players
      io.in("game").emit("updatePlayers", players);
  });

  socket.on('disconnect', () => {
      // Restore color
      colors.push(players[socket.id].color);
      // Remove player
      delete players[socket.id];

      // If everyone disconnected
      if (Object.entries(players).length === 0) {
          inGame = false;
          joker = null;
          master = null;
      }
      // Update player list
      io.in("game").emit("updatePlayers", players);
  });

});

app.get("/", (req, res) => {
    res.sendFile('/index.html', { root: __dirname });
})

server.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
});
