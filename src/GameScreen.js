import ChessBoard from "./ChessBoard";
import Chat from "./Chat";
import ResultScreen from "./ResultScreen";
import { useState, useEffect, useCallback, useRef } from "react";

function msToTime(timeInMs) {
  if (timeInMs < 1000) return "00:00";

  return (
    ("0" + Math.floor(timeInMs / 1000 / 60)).slice(-2) +
    ":" +
    ("0" + (Math.floor(timeInMs / 1000) % 60)).slice(-2)
  );
}

function GameScreen(props) {
  const [displayChat, setDisplayChat] = useState(false);
  const [lastChatLength, setLastChatLength] = useState(0);

  const chatDisplayHandler = () => {
    setLastChatLength(props.chat.length);
    setDisplayChat(!displayChat);
  };

  useEffect(() => {
    if (displayChat) setLastChatLength(props.chat.length);
  }, [props.chat, displayChat]);

  const [topPlayer, bottomPlayer] =
    props.userData.color === props.board.player1.color
      ? [props.board.player2, props.board.player1]
      : [props.board.player1, props.board.player2];
  const [topTime, setTopTime] = useState(topPlayer.remainTime);
  const [bottomTime, setBottomTime] = useState(bottomPlayer.remainTime);
  const timer = useRef();
  const topBonusShow = useRef(false);
  const bottomBonusShow = useRef(false);

  const setTime = useCallback(
    (time) => {
      if (
        time > 1000 &&
        !props.board.winner &&
        props.board.roundsHistory !== props.board.currentRound
      )
        return time - 1000;

      return time;
    },
    [props.board.winner, props.board.currentRound, props.board.roundsHistory]
  );

  useEffect(() => {
    if (topPlayer.color === props.board.currentColor)
      setTopTime(
        topPlayer.remainTime - (new Date() - new Date(topPlayer.startTime))
      );
    else {
      setTopTime(topPlayer.remainTime);
      topBonusShow.current = true;
      setTimeout(() => (topBonusShow.current = false), 1500);
    }
    if (bottomPlayer.color === props.board.currentColor)
      setBottomTime(
        bottomPlayer.remainTime - (new Date() - new Date(bottomPlayer.startTime))
      );
    else {
      setBottomTime(bottomPlayer.remainTime);
      bottomBonusShow.current = true;
      setTimeout(() => (bottomBonusShow.current = false), 1500);
    }
  }, [topPlayer, bottomPlayer, props.board.currentColor]);

  const runTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current);

    if (topPlayer.color === props.board.currentColor)
      timer.current = setInterval(() => setTopTime((time) => setTime(time)), 1000);
    else
      timer.current = setInterval(
        () => setBottomTime((time) => setTime(time)),
        1000
      );
  }, [props.board.currentColor, topPlayer, setTime]);

  useEffect(() => {
    runTimer();
  }, [runTimer]);

  return (
    <div className='GameScreen flex align-center'>
      <aside className={"chat-aside" + (displayChat ? " show-chat" : " hide-chat")}>
        <div className='wrapper'>
          <Chat chat={props.chat} sendMsg={props.sendMsg} users={props.users} />
          <button
            className={
              "chat-hide-button" +
              (lastChatLength < props.chat.length ? " new-message" : "")
            }
            onClick={chatDisplayHandler}
          >
            {displayChat ? (
              <i className='fas fa-chevron-left'></i>
            ) : (
              <i className='fas fa-chevron-right'></i>
            )}
          </button>
        </div>
      </aside>
      <main>
        <div className='player-info-on-board'>
          <h2>{topPlayer.username}</h2>
          <span className='timer'>
            {props.settings.timerEnabled ? msToTime(topTime) : "--:--"}
          </span>
          {props.settings.timerEnabled && (
            <span className={topBonusShow.current ? "bonus-time" : "hide"}>
              +{props.settings.timerBonus / 1000} s
            </span>
          )}
        </div>
        <ChessBoard
          board={props.board}
          sendMove={props.sendMove}
          userData={props.userData}
        />
        <div className='player-info-on-board'>
          <h2>{bottomPlayer.username}</h2>
          <span className='timer'>
            {props.settings.timerEnabled ? msToTime(bottomTime) : "--:--"}
          </span>
          {props.settings.timerEnabled && (
            <span className={bottomBonusShow.current ? "bonus-time" : "hide"}>
              +{props.settings.timerBonus / 1000} s
            </span>
          )}
        </div>
      </main>
      {(props.board.winner ||
        props.board.roundsHistory.length === props.board.currentRound) && (
        <ResultScreen
          board={props.board}
          players={props.players}
          leaveRoom={props.leaveRoom}
          returnToLobby={props.returnToLobby}
          setReady={props.setReady}
          ready={props.ready}
        />
      )}
    </div>
  );
}

export default GameScreen;
