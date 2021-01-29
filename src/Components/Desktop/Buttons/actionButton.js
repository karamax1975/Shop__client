import React from 'react';
import './actionButton.css';

export function ActionButton({ name, action, style, icon }) {

  let img = <img src={`/img/${icon}`}></img>

  if (!icon) {
    img = ''
  }
  return (
    <button className={`btn-round ${style}`}
      onClick={action}
      type='button'>
      <div className='btn-round__icon'>
        {img}
      </div>
      <span>{name}</span>

    </button>
  )
}