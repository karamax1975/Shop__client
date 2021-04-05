import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './categorys.css';

import SmallButton from '../../../../Buttons/smallButton';
import {
  _loadListCategories,
  _toggleListCategory
} from '../../../../../../actions/product/action_addProduct';
import { _loadListChoice } from '../../../../../../actions/choice_actions/choice_action'
import CategoryItem from './categoryItem';

export default function Categorys({ data }) {
  const { rootCatalog, flagToggleCatalog } = useSelector(state => state.productStore);
  const dispatch = useDispatch();

  const margin = 0;

  const dropRef = useRef();


  useEffect(() => {
    dispatch(_loadListChoice())
    dispatch(_loadListCategories())
  }, [])


  return (
    <div className='product_category'>
      <div className={`product_category__select fullsize ${data.name ? 'selected' : ''}`}>
        <div className="title">
          <h5 className='placeholder category'>{data.name ? data.name : 'Selected category:'}</h5>
        </div>
        <SmallButton
          iconType='list'
          style={`sea list-button ${flagToggleCatalog ? 'active' : ''}`}
          action={() => dispatch(_toggleListCategory())}
        />
      </div>

      {flagToggleCatalog
        ? <ul className='product_category__drop' ref={dropRef}>
          {rootCatalog.map(item => {
            return (
              <CategoryItem
                key={item._id}
                data={item}
                margin={margin}
              />
            )
          })}
        </ul>
        : null
      }
    </div>
  )
}