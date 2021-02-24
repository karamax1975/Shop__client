import React, { useState, useRef, useEffect, useMemo } from 'react';
import InputUniversal from '../../../Inputs/inputUniversal';
import './findProduct.css';
import { _findProduct } from '../../../../../actions/listProduct_action';
import SmallButton from '../../../Buttons/smallButton'
import { useDispatch } from 'react-redux';

export default function FindProduct() {

  const dispatch = useDispatch()
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('')
  const findRef = useRef(null)

  const externalClick = useMemo(() => (e) => {
    if (findRef.current !== null && !findRef.current.contains(e.target)) {
      setActive(false)
    }
  }, [findRef])

  useEffect(() => {
    document.addEventListener('click', (e) => externalClick(e))
    return () => document.removeEventListener('click', (e) => externalClick(e))
  }, [])

  return (
    <div className={`FindProduct ${active ? 'active' : ''}`} onClick={() => setActive(true)} ref={findRef}>
      {!active && !value
        ? <div className='FindProduct__preview'>
          <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
            <circle cx="7.97266" cy="8.00964" r="6.72266" />
            <path d="M13.2041 13.0584L18.1097 17.963" />
          </svg>
          <span>Find product</span>
        </div>
        : ''
      }
      <InputUniversal
        value={value}
        action={(value) => {
          setValue(value)
          dispatch(_findProduct(value))
        }
        } />
      <SmallButton
        iconType='reset'
        style='white'
        action={() => {
          dispatch(_findProduct(''))
          setValue('')
        }}
      />
    </div>
  )
}


