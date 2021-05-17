import GameScreen from "./GameScreen";
import Lobby from "./Lobby";
import { apiUrl } from "./configs.json";
import { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

function Room(props) {
  // User information, spectator's color sets perspective on board
  const [userData, setUserData] = useState({
    status: "guest",
    role: "spectator",
    color: "white",
  });
  // both players stored here for faster access
  const [players, setPlayers] = useState([]);
  // Room Information
  const [room, setRoom] = useState({
    id: "",
    name: "Room",
    users: [],
  });
  // Game settings
  const [settings, setSettings] = useState({});
  // Stores chat messages
  const [chat, setChat] = useState([]);
  // Player ready status to start game or new round
  const [ready, setReady] = useState(false);
  const [board, setBoard] = useState({});
  const [startGame, setStartGame] = useState(false);

  const setRoomName = (newName) => {
    setRoom({
      id: room.id,
      name: newName,
      users: room.users,
    });
  };

  const updateSettings = (newSettings) => {
    socket.emit("set-settings", newSettings);
  };
  
  useEffect(() => {
    if (socket)
      socket.emit("get-user-data");
  }, [room.users])
  
  const returnToLobby = () => {
    setBoard({});
  };
  
  useEffect(() => {
    let mounted = true;

    socket = io(apiUrl, {
      withCredentials: true,
    });

    socket.on("data", (id, name, users) => {
      if (!mounted) return;
      setRoom({
        id: id,
        name: name,
        users: users,
      });
      setPlayers([
        users?.find((user) => user.role === "player1"),
        users?.find((user) => user.role === "player2"),
      ]);
    });

    socket.on("settings", (settings) => {
      if (!mounted) return;

      setSettings(settings);
    });

    socket.on("user-data", (status, role, color) => {
      if (!mounted) return;
      setUserData({
        status: status,
        role: role,
        color: color,
      });
    });

    socket.on("server-msg", (msg) => {
      if (!mounted) return;
      setChat((prevChatState) =>
        prevChatState.concat(
          <div key={prevChatState.length} className='server-msg'>
            {msg}
          </div>
        )
      );
    });

    socket.on("msg", (username, msg) => {
      if (!mounted) return;
      setChat((prevChatState) =>
        prevChatState.concat(
          <div key={prevChatState.length} className='msg'>
            <span className='msg-username-span'>{username}:</span><p>{msg}</p>
          </div>
        )
      );
    });

    socket.on("start-game", (board) => {
      if (!mounted) return;
      setChat([]);
      setStartGame(true);
      setReady(false);
      setTimeout(() => {
        setBoard(board);
      }, 700);
      setTimeout(() => {
        setStartGame(false);
      }, 2000);
      socket.emit("get-user-data");
    });

    socket.on("start-round", (board) => {
      if (!mounted) return;
      setBoard(board);
      setReady(false);
      socket.emit("get-user-data");
    });

    socket.on("board-data", (board) => {
      if (!mounted) return;
      setBoard(board);
    });

    socket.emit("enter-room");

    return () => {
      mounted = false;
      socket.off();
      socket.disconnect();
    };
  }, []);

  const leaveRoom = () => {
    socket.emit("leave-room");
    props.setEnteredRoom(false);
  };

  const sendMsg = (msg) => {
    socket.emit("msg", msg);
  };

  const sendMove = (origin, destination) => {
    socket.emit("move", origin, destination);
  };

  useEffect(() => {
    socket.emit("ready-status", ready);
  }, [ready]);

  const content = board?.content ? (
    <GameScreen
      chat={chat}
      sendMsg={sendMsg}
      users={room.users}
      sendMove={sendMove}
      userData={userData}
      board={board}
      returnToLobby={returnToLobby}
      leaveRoom={leaveRoom}
      players={players}
      ready={ready}
      setReady={setReady}
      settings={settings}
    />
  ) : (
    <Lobby
      username={props.username}
      changeUsername={props.changeUsername}
      userData={userData}
      players={players}
      room={room}
      socket={socket}
      setReady={setReady}
      ready={ready}
      setRoomName={setRoomName}
      leaveRoom={leaveRoom}
      chat={chat}
      sendMsg={sendMsg}
      settings={settings}
      setSettings={updateSettings}
    />
  );

  return (
    <div
      className={
        "Room flex align-center " +
        (startGame ? "start-game" : "") +
        (board?.content ? "-board" : "-lobby")
      }
    >
      {content}
    </div>
  );
}

export default Room;
