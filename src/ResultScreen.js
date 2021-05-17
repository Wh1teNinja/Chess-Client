import { useState } from "react";


function ResultScreen(props) {
  const [displayStats, setDisplayStats] = useState(false);

  const openStats = () => {
    setDisplayStats(true);
  };

  const onClickReady = () => {
    props.setReady(!props.ready);
  };

  const generateStatsList = () => {
    let timeInMs =
      new Date(props.board.stats.endTime) - new Date(props.board.stats.startTime);
    let timeInString =
      ("0" + Math.floor(timeInMs / (3600 * 1000))).slice(-2) +
      ":" +
      ("0" + Math.floor(timeInMs / (60 * 1000))).slice(-2) +
      ":" +
      ("0" + Math.floor(timeInMs / 1000)).slice(-2);

    return (
      <div className='stats-list flex align-center'>
        <h2>Game Statistics:</h2>
        <ul>
          <div className='stats-group'>
            <li>
              Moves <span>{props.board.stats.moves}</span>
            </li>
          </div>
          <div className='stats-group'>
            <li>
              {props.board.player1.username}'s pieces killed{" "}
              <span>{props.board.stats.player1PiecesKilled}</span>
            </li>
            <li>
              {props.board.player2.username}'s pieces killed{" "}
              <span>{props.board.stats.player2PiecesKilled}</span>
            </li>
            <li>
              Total pieces killed{" "}
              <span>
                {props.board.stats.player1PiecesKilled +
                  props.board.stats.player2PiecesKilled}
              </span>
            </li>
          </div>
          <div className='stats-group'>
            <li>
              Game Time <span>{timeInString}</span>
            </li>
          </div>
        </ul>
      </div>
    );
  };

  let resultScreenContent;
  if (props.board.winner && !displayStats) {
    resultScreenContent = (
      <div className='result-screen flex align-center'>
        <div className='winner'>
          <h1>{props.board.winner === "draw" ? "Draw!" : props.board.winner?.username + " Wins!"}</h1>
        </div>
        <div className='result-screen-buttons flex'>
          <button onClick={openStats}>Stats Screen</button>
          <button onClick={props.leaveRoom}>Leave</button>
        </div>
      </div>
    );
  } else if (props.board.winner && displayStats)
    resultScreenContent = (
      <div className='stats-screen flex align-center'>
        <div className='stats'>
          <div className='stats-players'>
            <div className='stats-player'>{props.board.player1.username}</div>
            <span className='score'>{props.board.score.player1}</span>
            <span>VS</span>
            <span className='score'>{props.board.score.player2}</span>
            <div className='stats-player'>{props.board.player2.username}</div>
          </div>
          {generateStatsList()}
          <div className='stats-rounds-history flex align-center'>
            <h2>Rounds:</h2>
            <ul>
              {props.board.roundsHistory.map((round, index) => {
                return (
                  <li key={index}>
                    <span
                      className={
                        round.winner === "player1"
                          ? `round-winner round-color-${round.color}`
                          : `round-color-${
                              round.color === "white" ? "black" : "white"
                            }`
                      }
                    >
                      {props.board.player1.username}
                    </span>
                    VS
                    <span
                      className={
                        round.winner === "player2"
                          ? `round-winner round-color-${round.color}`
                          : `round-color-${
                              round.color === "white" ? "black" : "white"
                            }`
                      }
                    >
                      {props.board.player2.username}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='stats-return-to-lobby'>
            <button onClick={props.returnToLobby}>Return to Lobby</button>
          </div>
        </div>
      </div>
    );
  else if (props.board.roundsHistory.length === props.board.currentRound)
    resultScreenContent = (
      <div className='result-screen flex align-center'>
        <div className='winner'>
          <h1>
            {props.board[props.board.roundsHistory.slice(-1)[0].winner].username}{" "}
            won round {props.board.currentRound}!
          </h1>
        </div>
        <div className='result-screen-buttons flex'>
          <button id='result-screen-ready-button' onClick={onClickReady}>
            {props.ready ? "Cancel" : "Ready"}
          </button>
        </div>
      </div>
    );

  return <div className='ResultScreen'>{resultScreenContent}</div>;
}

export default ResultScreen;
