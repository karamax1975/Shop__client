import React, { useCallback, useEffect, useState } from 'react';

import SmallButton from '../Buttons/smallButton';
import './selectList.css'

export default function SelectList({ title, userData, list, action, externalSignal }) {

  const [selectTitle, setSelectTitle] = useState(title)
  const [flagDrop, setFlagDrop] = useState(false);


  const firstUserPromo = useCallback((array, data) => {
    let find = null;
    array.forEach(item => {
      if (typeof (data) === 'object') {
        if (item._id === data[0]) {
          find = item.name;
        }
      }
      else {
        if (item._id === data) find = item.name;
      }
    })
    return find
  })

  useEffect(() => {
    const first = firstUserPromo(list, userData)
    if (first)
      setSelectTitle(first)
  }, [])



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
                action(item._id)
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