import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { _selectSection } from '../../../actions/adminPage/action_adminPage'

export default function AdminToolsNavbar() {

  const dispatch = useDispatch();


  return (

    <ul className='adminToolsNavbar'>
      <li onClick={() => dispatch(_selectSection('add_Product'))}>Add product</li>
    </ul>
  )
}