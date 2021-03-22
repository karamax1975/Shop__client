import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './adminToolsNavbar.css';

import { _selectSection } from '../../../actions/adminPage/action_adminPage'

export default function AdminToolsNavbar() {

  const arrayPages = ['Products', 'Catalog']
  const [selectItem, setSelectItem] = useState(null)
  const dispatch = useDispatch();


  const list = arrayPages.map((item, index) => {
    return (
      <li className={selectItem === index ? 'active' : ''} key={index} onClick={() => {
        setSelectItem(index);
        dispatch(_selectSection(item))
      }}>
        <span>{item}</span>
      </li>
    )
  })



  return (

    <ul className='adminToolsNavbar'>
      {list}
    </ul>
  )
}