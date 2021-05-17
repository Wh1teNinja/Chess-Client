function GameSettings(props) {
  const setRounds = (e) => {
    if (e.target.value > 15) return;

    let newSettings = {
      rounds: Number.parseInt(e.target.value),
      timerEnabled: props.settings.timerEnabled,
      timerLength: props.settings.timerLength,
      timerBonus: props.settings.timerBonus,
    };
    props.setSettings(newSettings);
  };

  const setTimerEnabled = (e) => {
    let newSettings = {
      rounds: props.settings.rounds,
      timerEnabled: e.target.checked,
      timerLength: props.settings.timerLength,
      timerBonus: props.settings.timerBonus,
    };
    props.setSettings(newSettings);
  };

  const setTimerLength = (e) => {
    if (e.target.value > 99) return;

    let newSettings = {
      rounds: props.settings.rounds,
      timerEnabled: props.settings.timerEnabled,
      timerBonus: props.settings.timerBonus,
    };
    if (e.target.id === "timer-minutes") {
      newSettings.timerLength =
        (e.target.value * 60 +
          (Math.floor(props.settings.timerLength / 1000) % 60)) *
        1000;
    } else {
      newSettings.timerLength =
        (Math.floor(props.settings.timerLength / 1000 / 60) * 60 +
          Number.parseInt(e.target.value)) *
        1000;
    }
    props.setSettings(newSettings);
  };

  const setTimerBonus = (e) => {
    let newSettings = {
      rounds: props.settings.rounds,
      timerEnabled: props.settings.timerEnabled,
      timerLength: props.settings.timerLength,
      timerBonus: e.target.value * 1000,
    };
    props.setSettings(newSettings);
  };

  return (
    <div
      className='game-settings flex align-center'
      style={props.protected ? { border: "none" } : {}}
    >
      {props.protected && (
        <div className='protected' style={{ borderRadius: "5px" }}></div>
      )}
      <div className='game-settings-group flex'>
        <label>Rounds: </label>
        <input
          type='number'
          onChange={setRounds}
          maxLength={2}
          min={1}
          max={15}
          className='rounds-input'
          value={props.settings.rounds || 1}
        />
      </div>
      <div className='game-settings-group flex'>
        <label>Timer: </label>
        <input
          type='checkbox'
          onChange={setTimerEnabled}
          className='timer-enabled-checkbox'
          checked={props.settings.timerEnabled || false}
        />
      </div>
      <div className='game-settings-group flex'>
        <label>Timer Length: </label>
        <div>
          <input
            type='number'
            onChange={setTimerLength}
            maxLength={2}
            min={1}
            max={99}
            className='timer-length-minutes-input'
            id='timer-minutes'
            value={(
              "00" + Math.floor((props.settings.timerLength || 0) / 1000 / 60)
            ).slice(-2)}
            disabled={!props.settings.timerEnabled}
          />
          :
          <input
            type='number'
            onChange={setTimerLength}
            maxLength={2}
            min={0}
            max={60}
            className='timer-length-seconds-input'
            id='timer-seconds'
            value={(
              "00" + Math.floor(((props.settings.timerLength || 0) / 1000) % 60)
            ).slice(-2)}
            disabled={!props.settings.timerEnabled}
          />
        </div>
      </div>
      <div className='game-settings-group flex'>
        <label>Bonus Time: </label>
        <input
          type='number'
          onChange={setTimerBonus}
          maxLength={2}
          min={1}
          max={60}
          className='timer-bonus-input'
          value={Math.floor((props.settings.timerBonus || 0) / 1000)}
          disabled={!props.settings.timerEnabled}
        />
      </div>
    </div>
  );
}

export default GameSettings;
