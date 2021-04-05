import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { _openItemCategory, _selectedItemCategory } from '../../../../../../actions/product/action_addProduct';
import './catalogItem.css';

export default function CategoryItem({ data, margin }) {
  const dispatch = useDispatch();
  const productStore = useSelector(state => state.productStore);
  return (
    <li className='category-item__wrapper' >
      <div className={`category-item ${data.select ? 'selected' : ''}`} onClick={() => dispatch(_openItemCategory(data._id))}>
        <div style={{ display: 'flex', marginLeft: margin }} className={`category-item__title`}>
          <div className={`title-toggle ${data.open ? 'active' : ''}`}>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" >
              <path d="M14.79 1.60529L7.99997 8.39502L1.21023 1.60529" stroke="#31CED8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span
            onClick={() => dispatch(_selectedItemCategory(data._id, data.name))}>
            {data.name}
          </span>
        </div>
      </div>
      {data.open && productStore[data._id]
        ? <ul className='sub'>
          {productStore[data._id].map(item => <CategoryItem
            key={item._id}
            data={item}
            margin={margin + 15}
          />)}
        </ul>
        : null
      }
    </li>
  )
}