import React, { useEffect, useState } from 'react';
import './inputText.css';
export default function InputText({ type = 'text', placeholder = '', important = false, alert = 'Alert', action, state = true, clearValue }) {

  const [value, setValue] = useState('');
  const [focus, setFocus] = useState('')

  function getValue(value) {
    setValue(value)
    action(value);
  }
  useEffect(() => {
    if (clearValue) {
      setValue('')
      setFocus('')
    }
  }, [clearValue])




  useEffect(() => {
    if (value) setFocus(' focus')
    else setFocus('');
  }, [value])

  let classNameInput = state ? "inputText" : "inputText alert"

  const b = important ? "<b> *</b>" : '';
  return (
    <div className={classNameInput + focus}>
      <input type={type} onChange={(e) => getValue(e.target.value)} value={value} />
      <span className="textInput-placeholder">
        {placeholder}
        <span className="" dangerouslySetInnerHTML={{ __html: b }} ></span>
      </span>

      {state
        ? ''
        : <div className="inputText-alert">
          <span>{alert}</span>
        </div>
      }
    </div>
  )
}