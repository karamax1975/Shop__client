import React, { useState } from 'react'

import './filtersListProducts.css';
import { _setNameFilter } from '../../../../../actions/listProduct_action'
import { useDispatch, useSelector } from 'react-redux';


export default function FiltersListProducts() {
  const filters = ['Activity', 'Preview', 'Name', 'Brand', 'Category', 'Price', "Date"]
  const [active, setActive] = useState(null)
  const dispatch = useDispatch()

  const { nameFilter } = useSelector(state => state.listProductsStore)

  function activeFilter(name, index) {
    setActive(index);
    dispatch(_setNameFilter(name))
  }

  return (
    <ul className='filtersListProducts'>
      {filters.map((item, index) =>
        <li key={index} className={`filter ${item} ${active === index ? 'active' : ''}`} onClick={() => activeFilter(item, index)}>
          <span>{item}</span>
        </li>
      )}
    </ul>
  )
}