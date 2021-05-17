import { useState, useEffect, useRef } from "react";

function Chat(props) {
  const [displayMode, setDisplayMode] = useState("chat");
  const [message, setMessage] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const chatRef = useRef();

  useEffect(() => {
    if (displayMode === "chat")
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [displayMode]);

  const onChangeMsgHandler = (e) => {
    setMessage(e.target.value);
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13) sendMsg();
  };

  const sendMsg = () => {
    props.sendMsg(message);
    setMessage("");
  };

  const onScrollChat = (e) => {
    setAutoScroll(
      !(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          e.currentTarget.offsetHeight >
        1
      )
    );
  };

  useEffect(() => {
    if (autoScroll && chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [props.chat, autoScroll]);

  let main;
  if (displayMode === "chat") {
    main = (
      <main className='chat-area'>
        <div className='chat' ref={chatRef} onScroll={onScrollChat}>
          {props.chat}
        </div>
        <textarea
          onKeyUp={onEnterPress}
          onChange={onChangeMsgHandler}
          className='chat-message-input'
          placeholder='message'
          value={message}
        />
        <button className='send-msg-button' onClick={sendMsg}>
          Send
        </button>
      </main>
    );
  } else {
    main = (
      <main className='users-area'>
        <ul className='users-list'>
          {props.users.map((user, index) => {
            return (
              <li key={index} className='list-user'>
                <span className='list-user-username'>{user.username}</span>
                <span className='user-role'>{user.role}</span>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }

  return (
    <div className='Chat'>
      <div className='chat-top-panel'>
        <button
          style={displayMode === "chat" ? { backgroundColor: "#4fd4d4" } : {}}
          onClick={() => setDisplayMode("chat")}
        >
          Chat
        </button>
        <button
          style={displayMode === "users" ? { backgroundColor: "#ff5100" } : {}}
          onClick={() => setDisplayMode("users")}
        >
          Users
        </button>
      </div>
      {main}
    </div>
  );
}

export default Chat;
