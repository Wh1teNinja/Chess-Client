import InputWithEditBtn from "./InputWithEditBtn";
import { useState } from "react";

function Menu(props) {
  const [popUp, setPopUp] = useState(false);
  const [roomId, setRoomId] = useState("");

  const switchJoinRoomPopUp = () => {
    setPopUp(!popUp);
  };

  const onChangeRoomIdHandler = (e) => {
    if (/^\d*$/.test(e.target.value))
      setRoomId(e.target.value);
  };

  return (
    <div className='Menu flex align-center'>
      <header className='welcome-header flex align-center'>
        <h2>
          Hello,
          <InputWithEditBtn
            className='username-input'
            value={props.username}
            valueName='username'
            changeValue={props.changeUsername}
            placeholder='Username'
            autoScale={false}
            size={20}
            style={{
              fontSize: 1 / (1 + Math.ceil(props.username.length / 2) / 15) + "em",
            }}
          />
        </h2>
        <span className='line'></span>
      </header>
      <main className='menu-buttons-wrapper'>
        <button className='menu-button' onClick={props.createRoom}>
          Create Room
        </button>
        <button className='menu-button' onClick={switchJoinRoomPopUp}>
          Join Room
        </button>
      </main>
      {popUp && (
        <div className='pop-up flex align-center'>
          <h2>Join Room</h2>
          <div className="pop-up-room-id-input">
            <label>ID:</label>
            <input
              type='text'
              onChange={onChangeRoomIdHandler}
              placeholder='room id e.g. 123456'
              maxLength={6}
              value={roomId}
            />
          </div>
          <span className='error-msg'>{props.errorMsg}</span>
          <div className="pop-up-buttons flex">
            <button onClick={switchJoinRoomPopUp}>Cancel</button>
            <button onClick={() => props.joinRoom(roomId)}>Join</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
