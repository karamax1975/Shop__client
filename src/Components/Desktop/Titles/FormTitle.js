import React from 'react';
import './formTitle.css'

export default function formTitle({ title, style, fill }) {

  return (
    <h5 className={`formTitle ${style}`}>{title} {fill ? <b>*</b> : ''} </h5>
  )
}