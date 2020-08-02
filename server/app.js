const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const userPeers = [];
const app = express();
app.use(cors);

app.get("/", (req, res) => {
  console.log("JVjfSHJ")
  res.send({ response: "I am alive" }).status(200);
});

app.post("/user", (req, res) => {
  console.log(req.body);
  const body = req.body;
  if (body.username !== "") {
    if (body.isAdmin === true) {
      const peers = userPeers.filter((peer) => peer.username === body.username);
      if (peers && peers.length > 0) {
        res.send({ peerId: peers[0].peerId, success: false });
      } else {
        res.send({ success: true });
      }
    } else {
      if (body.peerId !== "") {
        res.send({ success: false });
      } else {
        const peers = userPeers.filter((peer) => peer.peerId === body.peerId);
        res.send({ success: true, peerId: peers[0].peerId });
      }
    }
  }
});

const server = http.Server(app);

const io = socketIo(server);

let interval;

const appendUserPeer = (userPeer) => {
  const ups = userPeers.filter(
    (p) => p.username === userPeer.usrename && p.peerId === userPeer.peerId
  );
  if (ups && ups.length > 0) {
    return;
  } else {
    userPeers.push(userPeer);
  }
};

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("connect", () => {});
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
  socket.on("created-peer", function (data) {
    appendUserPeer(data);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
