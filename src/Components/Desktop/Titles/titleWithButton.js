import React from 'react';
import { ActionButton } from '../Buttons/actionButton'
import './titleWithButton.css'

import HTitle from './h2_title';

export default function TitleWithButton({ title, name, icon, action, style }) {

  return (
    <div className={`title-with-button`}>
      <HTitle text={title} />
      <ActionButton
        name={name}
        icon={icon}
        action={action}
        style={style}
      />
    </div>
  )
}