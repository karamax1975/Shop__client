import React from 'react';
import './bigButton.css'

export default function BigButton({ text, action, style }) {

  return (
    <button type='button' className={`BigButton ${style}`} onClick={action}>{text}</button>
  )
}