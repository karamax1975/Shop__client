import React from 'react';
import './button.css'
export default function Button({ type = 'submit', text = 'Click', object = null, action, style = '' }) {



  const Include = ({ object }) => {

    if (object == null)
      return (
        <>{text}</>
      )
  }
  return (
    <button className={`btn ${style}`}
      type={type}
      onClick={action}
    >
      <Include />
    </button>
  )
}