import React, { useState } from 'react'
import './textArea.css'

export default function TextArea({ value, action, style, template }) {
  const [focus, setFocus] = useState(false)

  const styleTemplate = {
    pointerEvents: "none",
    position: "absolute",
    left: "15px",
    top: "45px",
    color: "var(--gray)",
    width: "calc(100% - 30px)",
  }

  return (
    <>
      {value || focus ? '' : <p className='template' style={styleTemplate}>{template}</p>}
      <textarea className={`textArea ${style}`}
        value={value}
        onChange={(e) => { action(e.target.value) }}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        spellCheck='false' />
    </>
  )
}