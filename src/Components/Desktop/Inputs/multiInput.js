import React, { useState } from 'react';
import uniqid from 'uniqid'

import './multiInput.css'
import InputUniversal from '../Inputs/inputUniversal'
import SmallButton from '../Buttons/smallButton'
import { _addDetail, _addNewDetail, _editDetail, _deleteDetail } from '../../../actions/product/action_addProduct'
import { useDispatch } from 'react-redux';


export default function MultiInputs({ value }) {
  value = value ?? []
  const dispath = useDispatch()
  const [valueInput, setValueInput] = useState({ name: '', description: '' })

  const userDetals = value.map((item, index) => {
    return <div className='MultiInputs_row' key={index}>
      <InputUniversal
        value={item.name}
        action={(name) => dispath(_editDetail(index, { ...item, name }))}

      />
      <InputUniversal
        value={item.description}
        action={(description) => dispath(_editDetail(index, { ...item, description }))}

      />
      <SmallButton
        iconType='reset'
        style='selector-button white'
        action={() => dispath(_deleteDetail(index))}
      />
    </div>
  })

  return (
    <div>
      <div className='MultiInputs__userData'>{userDetals}</div>
      <div className='MultiInputs_row'>
        <InputUniversal
          value={valueInput.name}
          placeholder='Add name:'
          action={(name) => {
            setValueInput((valueInput) => {
              return { ...valueInput, name }
            })
            dispath(_addNewDetail(valueInput))
          }
          }
        />
        <InputUniversal
          value={valueInput.description}
          placeholder='Add value:'
          action={(description) => {
            setValueInput((valueInput) => {
              return { ...valueInput, description }
            })
            dispath(_addNewDetail(valueInput))
          }
          }
        />
        <div className='cap'></div>
      </div>

      <SmallButton
        iconType='add'
        style='sea add-detail'
        action={() => {
          dispath(_addDetail())
          setValueInput({ name: '', description: '' })
        }}
      />
    </div>

  )
}