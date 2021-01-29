import React, { useEffect, useState } from 'react';
import './formDetals.css';
import SmallButton from '../../../Buttons/smallButton';

export default function FormDetails({ action }) {

  // const [arrayTemplate, setArrayTemplate] = useState([]);


  const [arrayDetals, setArrayDetals] = useState([]);
  const [valueInput, setValueInput] = useState({ name: '', description: '' })
  const [style, setStyle] = useState('col-input')



  useEffect(() => {
    if (arrayDetals.length > 0) action(arrayDetals)
  }, [arrayDetals])

  useEffect(() => {
    if (valueInput.name && valueInput.description || arrayDetals.length > 0) action([...arrayDetals, valueInput])
  }, [valueInput])


  const renderList = arrayDetals.map((item, index) => {
    return (
      <div className='FormDetails__item row' key={index}>
        <div className='col-lg-6'>
          <div className='position'>
            <p>{item.name}</p>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='position'>
            <p>{item.description}</p>
          </div>
        </div>
      </div>
    )
  })

  function addDetals() {
    if (valueInput.name && valueInput.description) {
      setArrayDetals([...arrayDetals, valueInput]);
      setValueInput({ name: '', description: '' })
    }

  }



  return (
    <div className='FormDetails'>
      <div className='FormDetails__list'>
        {arrayDetals.length > 0
          ? renderList
          : ''
        }
      </div>

      <div className='FormDetails__row-inputs'>
        <div className='col-input'>
          <input type='text'
            value={valueInput.name}
            placeholder='Name:'
            onChange={(e) =>
              setValueInput((valueInput) => { return { ...valueInput, name: e.target.value } })}
          />
        </div>
        <div className='col-input'>
          <input type='text'
            value={valueInput.description}
            placeholder='Description:'
            onChange={(e) =>
              setValueInput((valueInput) => { return { ...valueInput, description: e.target.value } })}
          />
        </div>
      </div>
      <br />
      <SmallButton
        action={addDetals}
        type='button'
        style='white outline-sea'
        iconType="add"
      />
    </div>
  )
}