import React, { useEffect, useState } from 'react';
import './formPromo.css';
import InputUniversal from '../../../Inputs/inputUniversal';
import Checkbox from '../../../Inputs/checkbox';
import DropDownList from '../../../Lists/drop-downList';


export default function FormPromo({ action }) {

  const [checkboxDiscount, setCheckboxDiscount] = useState(false);
  const [checkboxChoice, setCheckboxChoice] = useState(false);
  const [valueDiscont, setValueDiscont] = useState('');
  const [returnObj, setReturnObj] = useState({
    discount: null,
    promo: []
  })
  const [arrayChoice, setArrayChoice] = useState([])



  useEffect(() => {
    const ac = new AbortController();
    async function getChoice(controller) {
      const response = await fetch('api/getChoice', { signal: controller.signal });
      if (response.status === 200) {
        const rezult = await response.json();
        return rezult
      }
    }
    getChoice(ac).then(choiceList => setArrayChoice(choiceList));
    return () => {
      ac.abort()
    }
  }, [])

  function getChoice(item) {
    let set = new Set(returnObj.promo.concat(item._id));
    if (checkboxChoice)
      setReturnObj((returnObj) => {
        return {
          ...returnObj,
          promo: Array.from(set)
        }
      })

  }


  useEffect(() => {
    if (checkboxDiscount && returnObj.discount || checkboxChoice && returnObj.promo.length > 0) {
      action(returnObj)
    }
  }, [returnObj, checkboxDiscount, checkboxChoice])


  useEffect(() => {
    if (checkboxDiscount && valueDiscont) {
      const numberDiscount = parseInt(valueDiscont)
      if (numberDiscount) {
        setReturnObj((returnObj) => {
          return {
            ...returnObj, discount: numberDiscount
          }
        })
      }
    };
  }, [checkboxDiscount, valueDiscont])

  return (
    <div className='FormPromo'>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='FormPromo__discount'>
            <div className='FormPromo__checkbox-wrapper'>
              <Checkbox
                action={setCheckboxDiscount}
                check={checkboxDiscount}
                style='checkbox-sea'
              />
              <h5>Discounts</h5>
            </div>
            <div className='FormPromo__input-wrapper'>
              <InputUniversal
                value={valueDiscont}
                action={setValueDiscont}
              />
              <div className='admin-icon__percent'>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                  <path d="M5 14L15 4" strokeLinecap="round" />
                  <circle cx="4.5" cy="4.5" r="3.5" />
                  <circle cx="14.5" cy="14.5" r="3.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='FormPromo__choice'>
            <Checkbox
              action={setCheckboxChoice}
              check={checkboxChoice}
              style='checkbox-sea'
            />
            <DropDownList
              data={arrayChoice}
              title='Add choice:'
              action={getChoice}
            />
          </div>

        </div>
      </div>
    </div>
  )
}


// Если чекбокс включен, выводится из стейта, отмеченного чекбокса
// если нет, выводится null