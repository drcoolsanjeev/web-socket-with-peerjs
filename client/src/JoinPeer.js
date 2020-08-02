import React, { useState, useEffect } from "react";
import Peer from "peerjs";

const JoinPeer = ({ socket }) => {
  const [connectedTo, setConnectedTo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputPeerId, setInputPeerId] = useState("");
  const [peerId, setPeerId] = useState("");
  const [peer, setPeer] = useState(null);
  useEffect(() => {
    let p = new Peer(undefined, {
      debug: 2,
    });
    setPeer(p);
    p.on("open", (id) => {
      if (id === null) {
        console.log("Received null id from peer open");
        id = peerId;
      } else {
        setPeerId(id);
      }
    });
  }, []);

  const onNameChange = (event) => {
    const name = event.target.value;
    if (name) {
      setUsername(name);
    }
  };

  const onPasswordChange = (event) => {
    const pwd = event.target.value;
    if (pwd) {
      setPassword(pwd);
    }
  };

  const onPeerIdChange = (event) => {
    const pId = event.target.value;
    if (pId) {
      setInputPeerId(pId);
    }
  };

  const onJoinPeer = () => {
    if (peer) {
      const conn = peer.connect(inputPeerId, {
        reliable: true,
      });
      conn.on("open", () => {
        setConnectedTo(conn.peer);
      });
    }
    console.log(peer);
  };
  return (
    <>
      {connectedTo === "" ? (
        <>
          Username:{" "}
          <input type="text" value={username} onChange={onNameChange} />
          <br />
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={onPasswordChange}
          />{" "}
          <br />
          PeerID:{" "}
          <input type="text" value={inputPeerId} onChange={onPeerIdChange} />
          <button type="button" onClick={onJoinPeer}>
            Join Peer ID
          </button>
        </>
      ) : (
        <>
          Host PeerId :{peerId}
          Connected To: <b>{connectedTo}</b>
        </>
      )}
    </>
  );
};
export { JoinPeer };
