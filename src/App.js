import "./App.css";
import Menu from "./Menu";
import Room from "./Room";
import { apiUrl } from "./configs.json";
import { useState, useEffect } from "react";

function App() {
  const [username, setUsername] = useState("Player");
  const [enteredRoom, setEnteredRoom] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    fetch(apiUrl, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.roomId) joinRoom(data.roomId);
        setUsername(data.username);
      });
  }, []);

  const changeUsername = (username) => {
    setUsername(username);
  };

  const createRoom = () => {
    fetch(apiUrl + "/create-room", {
      method: "POST",
      mode: "cors",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setEnteredRoom(data.accessGranted);
      });
  };

  const joinRoom = (roomId) => {
    fetch(apiUrl + "/join-room/" + roomId, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setEnteredRoom(data.accessGranted);
        if (data.errorMsg) setErrorMsg(data.errorMsg);
      });
  };

  let content;
  if (enteredRoom)
    content = (
      <Room
        username={username}
        changeUsername={changeUsername}
        setEnteredRoom={setEnteredRoom}
      />
    );
  else
    content = (
      <Menu
        createRoom={createRoom}
        joinRoom={joinRoom}
        username={username}
        changeUsername={changeUsername}
        errorMsg={errorMsg}
      />
    );

  return (
    <div className='App flex align-center'>
      {content}
      <div className='background'>
        <span className='orange-circle background-circle'></span>
        <span className='cyan-circle background-circle'></span>
        <span className='yellow-circle background-circle'></span>
      </div>
    </div>
  );
}

export default App;
