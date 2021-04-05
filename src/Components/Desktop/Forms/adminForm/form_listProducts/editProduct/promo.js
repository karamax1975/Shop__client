import React, { useEffect, useState } from 'react';

import './promo.css';
import Checkbox from '../../../../Inputs/checkbox'
import InputUniversal from '../../../../Inputs/inputUniversal'
import { _delItemPromo, _addNewPromo, _promo_SetDiscount } from '../../../../../../actions/product/action_addProduct'
import { useDispatch, useSelector } from 'react-redux';
import SelectList from '../../../../Lists/selectList'

export default function Promo({ value }) {


  const [checkboxDiscount, setCheckboxDiscount] = useState(value.discount ?? false);
  const [checkboxPromo, setCheckboxPromo] = useState(value.promo && value.promo.length ? true : false);
  const { listPromo } = useSelector(state => state.productStore);
  const { listChoice } = useSelector(state => state.choiceStore)
  let { promo, discount } = value;
  const [userSelectPromo, setUserSelectPromo] = useState([])

  const dispatch = useDispatch()

  // console.log('///-----------------', listChoice);

  function initUserPromo(listPromo, userPromo) {
    const select = [];
    listPromo.forEach((item) => {
      for (let i = 0; i < userPromo.length; i++) {
        if (item._id === userPromo[i]) select.push(item.name)
      }
    })

    return select
  }
  useEffect(() => {
    if (promo && listPromo)
      setUserSelectPromo(initUserPromo(listPromo, promo))
  }, [listPromo])



  return (
    <div className='Promo'>
      <label className='Promo_label'>
        <Checkbox
          check={checkboxDiscount}
          action={setCheckboxDiscount}
          style='checkbox-sea hidden'
        />
        <h5>Discounts:</h5>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <InputUniversal
            value={discount = discount ?? ''}
            action={(number) => {
              dispatch(_promo_SetDiscount(number))

            }}
          />
          <div className='icon-element'>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path d="M5 14L15 4" strokeLinecap="round" />
              <circle cx="4.5" cy="4.5" r="3.5" />
              <circle cx="14.5" cy="14.5" r="3.5" />
            </svg>
          </div>
        </div>
      </label>

      <label className='Promo_label'>
        <Checkbox
          check={checkboxPromo}
          action={setCheckboxPromo}
          style='checkbox-sea hidden'
        />
        <div className='Promo_label__userSelect'>
          <p>Selected:</p>
          {promo.map(item => {
            return (
              <p className='userSelect__item'
                key={item._id}
                onClick={() => dispatch(_delItemPromo(item._id))}>{item.name}</p>
            )
          })}
        </div>
        <SelectList
          userData={userSelectPromo}
          title='Add choice:'
          list={listChoice}
          action={(obj) => dispatch(_addNewPromo(obj))}
          externalSignal={(signal, name) => {
            setCheckboxPromo(signal)
            let arr = userSelectPromo;
            arr.push(name)
            arr = Array.from(new Set(arr))
            setUserSelectPromo(arr)
          }}
        />
      </label>
    </div>
  )
}
