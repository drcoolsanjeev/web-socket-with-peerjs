import React, { useState } from "react";
import Peer from "peerjs";

const CreatePeer = ({ peerId, setPeerId, socket }) => {
  const [isCreated, setIsCreated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
  const onCreatePeer = () => {
    // const requestOptions = {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    //   // body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    // };
    // fetch("http://localhost:4001", requestOptions).then((response) =>
    //   console.log(response)
    // );
    const peer = new Peer(undefined, {
      debug: 2,
    });
    peer.on("open", (id) => {
      if (id === null) {
        console.log("Received null id from peer open");
        id = peerId;
      } else {
        setPeerId(id);
      }
      if (id) {
        setIsCreated(true);
      }
      socket.emit("created-peer", {
        username: username,
        password: password,
        peerId: id,
      });
    });
    console.log(username, atob(password), peerId);
  };
  return !isCreated ? (
    <>
      Username: <input type="text" value={username} onChange={onNameChange} />
      Password:{" "}
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
      />{" "}
      <button type="button" onClick={onCreatePeer}>
        Create Peer ID
      </button>
    </>
  ) : (
    <></>
  );
};

export { CreatePeer };
