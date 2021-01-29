import React from 'react';
import './checkbox.css';

export default function Checkbox({ action, check, style }) {

  return (
    <label className={`checkbox ${style}`}>
      <input type='checkbox' onChange={() => action(!check)} />
      <span></span>
    </label>

  )
}