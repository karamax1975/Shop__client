import React from 'react';


import './form_layout.css'
export default function FormLayout({ children, alertText = '', title, alertFlag = true, condition = false, style = '' }) {
  return (
    <div className={`formLayout ${!alertFlag ? ' alert ' : ''}${style}`}>
      {alertFlag
        ? <h3 className='formLayout__title'>{title} {condition ? <b>*</b> : ''}</h3>
        : <p style={{ color: 'var(--rubin)' }}>{alertText}</p>
      }

      {children}
    </div>
  )
}

