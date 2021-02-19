import React, { useEffect, useState } from 'react';

import './promo.css';
import Checkbox from '../../../../Inputs/checkbox'
import InputUniversal from '../../../../Inputs/inputUniversal'
import { _promo_addNewDiscount, _promo_SetDiscount, _selectPromo, _delItemPromo } from '../../../../../../actions/product/action_addProduct'
import { useDispatch, useSelector } from 'react-redux';
import SelectList from '../../../../Lists/selectList'
import uniqid from 'uniqid';

export default function Promo({ value }) {


  const [checkboxDiscount, setCheckboxDiscount] = useState(value.discount ?? false);
  const [checkboxPromo, setCheckboxPromo] = useState(value.promo && value.promo.length ? true : false);
  const { listPromo } = useSelector(state => state.productStore)
  const { promo } = value;
  const [userSelectPromo, setUserSelectPromo] = useState([])

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
    setUserSelectPromo(initUserPromo(listPromo, promo))
  }, [])

  const dispatch = useDispatch()

  useEffect(() => {

  }, [])


  useEffect(() => {
    dispatch(_promo_addNewDiscount('discount', checkboxDiscount))
  }, [])

  useEffect(() => {
    dispatch(_promo_addNewDiscount('promo', checkboxPromo))
  }, [])

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
            value={value.discount = value.discount ?? ''}
            action={(number) => {
              if (number) {
                setCheckboxDiscount(true)
                dispatch(_promo_SetDiscount(number))
              }
              else setCheckboxDiscount(false)

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
          {userSelectPromo.map((item, index) => {
            return (
              <p className='userSelect__item'
                key={uniqid()}
                onClick={(e) => {
                  e.preventDefault();
                  setUserSelectPromo((userSelectPromo) => {
                    return userSelectPromo.filter(elem => elem !== item);
                  })
                  dispatch(_delItemPromo(item))
                  if (!index > 0)
                    setCheckboxPromo(false)

                }}
              >
                {item}
              </p>
            )
          })}
        </div>
        <SelectList
          userData={userSelectPromo}
          title='Add choice:'
          list={listPromo}
          action={(id) => dispatch(_selectPromo(id))}
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
