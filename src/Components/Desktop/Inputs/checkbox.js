import React, { useCallback, useState } from 'react';
import './checkbox.css';

export default function Checkbox({ action, check, style }) {

  return (
    <label className={`checkbox ${style}`}>
      <input type='checkbox' checked={check} onChange={(e) => action(e.target.checked)} />
      <span></span>
    </label>

  )
}