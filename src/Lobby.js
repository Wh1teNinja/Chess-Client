import InputWithEditBtn from "./InputWithEditBtn";
import GameSettings from "./GameSettings";
import Chat from "./Chat";

function Lobby(props) {
  const onClickReady = () => {
    props.setReady(!props.ready);
  };

  return (
    <div className='Lobby'>
      <header className='lobby-header flex'>
        <InputWithEditBtn
          className='room-name-input'
          value={props.room.name}
          changeValue={props.setRoomName}
          placeholder='Room Name'
          valueName='room-name'
          size={30}
          autoScale={true}
          onConfirmCallback={() => {
            if (props.socket) props.socket.emit("change-room-name", props.room.name);
          }}
          style={{ minWidth: "3em" }}
        />
        <h2>
          ID: <span className='room-id'>{props.room.id}</span>
        </h2>
        <InputWithEditBtn
          className='username-input'
          value={props.username}
          valueName='username'
          changeValue={props.changeUsername}
          placeholder='Username'
          autoScale={true}
          size={20}
          style={{ minWidth: "5em" }}
          onConfirmCallback={() => {
            if (props.socket) props.socket.emit("changed-username", props.username);
            props.socket.emit("reload-session");
          }}
        />
        <button onClick={props.leaveRoom} className='leave-room-button'>
          Leave
        </button>
      </header>
      <main>
        <GameSettings protected={props.userData.status === "guest"} settings={props.settings} setSettings={props.setSettings} />
        <div className='players-header flex align-center'>
          <h2>Players</h2>
          <span className='line'></span>
        </div>
        <div className='players flex align-center'>
          <div className='player-card flex player-one'>
            {props.players[0]?.username}
          </div>
          <span className='vs-players-span'>VS</span>
          <div className='player-card flex player-two'>
            {props.players[1]?.username}
          </div>
        </div>
        <div className='ready-button-wrapper'>
          {props.userData.role === "spectator" && <div className="protected"></div>}
          <button onClick={onClickReady}>{props.ready ? "Cancel" : "Ready"}</button>
        </div>
      </main>
      <Chat chat={props.chat} sendMsg={props.sendMsg} users={props.room.users} />
    </div>
  );
}

export default Lobby;
