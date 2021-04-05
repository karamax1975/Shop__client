import React, { useCallback, useEffect, useState } from 'react';

import SmallButton from '../Buttons/smallButton';
import './selectList.css'

export default function SelectList({ title, userData, list, action, externalSignal }) {

  const [selectTitle, setSelectTitle] = useState(title)
  const [flagDrop, setFlagDrop] = useState(false);

  return (
    // для того, чтобы клик по объекту не вызывал отмену чекбокса вешаю на него e.preventDefault()
    <div className='product_category__select' onClick={(e) => e.preventDefault()}>
      <div className='title' onClick={() => {
        setFlagDrop((flagDrop) => { return !flagDrop })
      }}>
        <h5 className='placeholder'
          style={(userData && typeof (userData) === 'string') || (userData.length) ? { color: 'var(--black)' } : { color: 'var(--gray)' }}
        >
          {!userData.length > 0 ? title : userData[userData.length - 1]}
        </h5>
      </div>
      <SmallButton
        iconType='list'
        style={`sea list-button ${flagDrop ? 'active' : ''}`}
        action={() => setFlagDrop((flagDrop) => { return !flagDrop })}
      />
      {flagDrop ?
        <ul className='select__drop'>
          {list.map(item =>
            <li key={item._id}
              onClick={() => {
                action(item)
                setSelectTitle(item.name)
                setFlagDrop(false)
                externalSignal(true, item.name)
              }}
            >
              <span
              >{item.name}</span>
            </li>)}
        </ul>
        : ''
      }
    </div >
  )
}