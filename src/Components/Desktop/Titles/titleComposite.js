import React from 'react'
import HTitle from './h2_title';
export default function TitleComposite({ children, title }) {

  return (
    <div className={`title-with-button`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <HTitle text={title} />
      {children}
    </div>
  )
}