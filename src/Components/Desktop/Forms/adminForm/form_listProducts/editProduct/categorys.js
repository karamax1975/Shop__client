import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SmallButton from '../../../../Buttons/smallButton';
import InputUniversal from '../../../../Inputs/inputUniversal';
import { _flagCategory, _categoryDrop, _editProduct, _addCategory, _addNameNewCategory, _loadCategory, _loadListPromo } from '../../../../../../actions/product/action_addProduct'

export default function Categorys({ data }) {
  const { listCategory, flagCategory, categoryDrop, nameNewCategory } = useSelector(state => state.productStore);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_loadCategory())
    dispatch(_loadListPromo())
  }, [])

  return (
    <div className='product_category'>
      {!flagCategory
        ? <div className='product_category__select' style={{ width: "calc(100% + 16px)", marginLeft: "-15px", border: "none" }}>
          <SmallButton
            iconType='add'
            style='selector-button white'
            action={() => dispatch(_flagCategory(true))} />
          <SmallButton
            iconType='list'
            style={`sea list-button ${categoryDrop ? 'active' : ''}`}
            action={() => dispatch(_categoryDrop())}
          />
          <div className='title'>
            <h5>{!nameNewCategory ? data[0].name : nameNewCategory}{!data[0].name ? 'Select category:' : ''}</h5>
          </div>
          {categoryDrop ?
            <ul className='select__drop' style={{ width: "calc(100% + 16px)" }}>
              {listCategory.map(item =>
                <li key={item._id}
                  onClick={() => {
                    dispatch(_editProduct('category', [{ id: item._id, name: item.name }]))
                    dispatch(_categoryDrop())
                  }}
                >
                  <span
                  >{item.name}</span>
                </li>)}
            </ul>
            : ''
          }
        </div>
        : <div className='product_category__input'>
          <SmallButton
            action={() => dispatch(_flagCategory(false))}
            iconType='reset'
            style='selector-button white'
          />
          <SmallButton
            style='sea input'
            name='OK'
            action={() =>
              dispatch(_addCategory(nameNewCategory))
            }
          />
          <InputUniversal placeholder='Add new category' action={(name) => dispatch(_addNameNewCategory(name))} />
        </div>}
    </div>
  )
}