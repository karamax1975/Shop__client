import React from 'react';
import './InputUniversal.css'

export default function InputUniversal({ value, action }) {

  return (
    <input className='InputUniversal'
      value={value}
      onChange={(e) => action(e.target.value)}
    />
  )
}