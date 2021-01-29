import React from 'react';
import './smallButton.css';

export default function SmallButton({ type, style, name, iconType, action }) {



  const reset = <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2.17139 2.17157L7.82824 7.82842" strokeLinecap="round" />
    <path d="M2.17139 7.82843L7.82824 2.17158" strokeLinecap="round" />
  </svg>

  const add = <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M1.60986 7H12.3901" strokeLinecap="round" />
    <path d="M7 1.60986L7 12.3901" strokeLinecap="round" />
  </svg>

  const list = <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
    <path d="M1.53809 1.26172L7.01468 6.73828L12.4912 1.26172" strokeLinecap="round" />
  </svg>

  let iconImg = '';

  switch (iconType) {
    case 'reset':
      iconImg = reset
      break;
    case 'add':
      iconImg = add
      break;
    case 'list':
      iconImg = list
      break;
    default:
      iconImg = ''
      break;
  }

  if (iconType === 'reset') {
    iconImg = reset
  }

  let content = <span>{name}</span>;
  let icon = <div className='btn-small__icon'>{iconImg}</div>
  if (!name) content = ''

  function onClickAction(e) {
    e.preventDefault()
    action()
  }

  return (
    <button type={type} className={`btn-small ${style}`} onClick={(e) => onClickAction(e)}>{icon}{content}</button>
  )
}