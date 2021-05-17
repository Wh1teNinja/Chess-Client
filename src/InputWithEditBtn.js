import { useState, useEffect, useRef } from "react";
import { apiUrl } from "./configs.json";

function InputWithEditBtn(props) {
  const [edit, setEdit] = useState(false);
  const [width, setWidth] = useState(0);
  const span = useRef();

  const inputRef = useRef();

  useEffect(() => {
    if (props.autoScale)
      setWidth(span.current.offsetWidth + 5)
  }, [props.value, props.autoScale]);

  const onclickEditHandler = (e) => {
    if (edit) onSubmitHandler();
    setEdit(!edit);
  };

  const onKeyUpHandler = (e) => {
    if (e.keyCode === 13) {
      setEdit(false);
      onSubmitHandler()
    }
  }

  const onSubmitHandler = () => {
    let body = {};
    body[props.valueName] = props.value;
    fetch(apiUrl + "/submit-" + props.valueName, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errorMsg) {
          if (data[props.valueName]) props.changeValue(data[props.valueName]);
          console.log(data.errorMsg);
        }
        if (props.onConfirmCallback) props.onConfirmCallback();
      });
  };

  useEffect(() => {
    if (edit) inputRef.current.focus();
  }, [edit]);

  const onChangeHandler = (e) => {
    props.changeValue(e.target.value);
  };

  return (
    <div className='InputWithEditBtn flex'>
      {props.autoScale && <span className="hide" ref={span}>{props.value}</span>}
      <input
        onKeyUp={onKeyUpHandler}
        type='text'
        ref={inputRef}
        className={props.className}
        onChange={onChangeHandler}
        readOnly={!edit}
        value={props.value}
        placeholder={props.placeholder}
        maxLength={props.size}
        style={Object.assign(props.autoScale && {width}, props.style)}
      />
      <button className='username-edit-button' onClick={onclickEditHandler}>
        {edit ? <i className='fas fa-check'></i> : <i className='fas fa-pen'></i>}
      </button>
    </div>
  );
}

export default InputWithEditBtn;
