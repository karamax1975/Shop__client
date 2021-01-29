import React, { useCallback, useState } from 'react';
import SmallButton from '../Buttons/smallButton';
import './drop-downList.css';

export default function DropDownList({ data, title, action }) {

  const [active, setActive] = useState(false);
  const [style, setStyle] = useState('');
  const [listTitle, setListTitle] = useState(title)


  const activeList = useCallback((active) => {
    setActive(!active)
    active
      ? setStyle('')
      : setStyle('active')
  }, [active])


  function select(item) {
    setListTitle(item.name)
    action(item)
    setActive(false)
  }

  const renderList = data.map(item => {
    return (
      <li key={item._id} onClick={() => select(item)}><span>{item.name}</span></li>
    )
  })


  return (
    <div className={`DropDownList ${style}`}>
      <div className='DropDownList__title' onClick={() => activeList(active)}>
        <p className='title-placeholder'>{listTitle}</p>
        <SmallButton
          action={() => activeList(active)}
          iconType="list"
          style="sea"
        />
      </div>
      {active
        ? <ul className='DropDownList__drop-down'>{renderList}</ul>
        : ''
      }
    </div>
  )
}