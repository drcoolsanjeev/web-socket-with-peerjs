import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { CreatePeer } from "./CreatePeer";
import { JoinPeer } from "./JoinPeer";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState("");
  const [peerId, setPeerId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  let [socket, setSocket] = useState();
  useEffect(() => {
    const skt = socketIOClient(ENDPOINT);
    if (skt) {
      setSocket(skt);
    }
  }, []);
  const onCheckboxChange = (event) => {
    const val = event.target.value;
    setIsAdmin(val);
  };
  return (
    <p>
      <input type="checkbox" value={isAdmin} onChange={onCheckboxChange} />
      Is Admin
      <br />
      {isAdmin ? (
        <CreatePeer peerId={peerId} setPeerId={setPeerId} socket={socket} />
      ) : (
        <JoinPeer socket={socket} />
      )}
      <h1>{peerId}</h1>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default App;
