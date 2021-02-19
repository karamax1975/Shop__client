import React from 'react';
import './InputUniversal.css'

export default function InputUniversal({ value, action, template = '' }) {

  return (
    <input className='InputUniversal'
      value={value}
      placeholder={template}
      onChange={(e) => action(e.target.value)}
    />
  )
}