import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../../../Buttons/button';
import './editProduct.css'
import ComponentProduct from './product';
import { _cancelEdit, _updateProduct, _loadProduct } from '../../../../../../actions/product/action_addProduct'


export default function EditProduct({ close, data, update }) {

  const dispatch = useDispatch();
  const { product, uploadImg, arrDelImage } = useSelector(state => state.productStore)

  const refForm = useRef()

  // индикация заполнения полей
  const [feedback, setFeedback] = useState({});

  // при запуске компонента формирую объект состояния валидации форм и заполняю его неактивным статусом
  const initCheck = useCallback(() => {
    const arrKey = Object.keys(data);
    arrKey.forEach(item => {
      setFeedback({ ...feedback }, feedback[item] = true)
    })
  }, [])


  useEffect(() => {
    dispatch(_loadProduct(data))
    initCheck()
    // document.body.addEventListener('click', onBlur)
  }, [])


  function checkInputs(state, funFeedback) {
    // проверяю, заполнены ли поля в существующих инпутах
    // если они не активны (null) то в объекте состояния не активирую  
    for (let item in feedback) {
      if (state[item] || state[item] === null) {
        funFeedback({ ...feedback }, feedback[item] = true)
      }
      else funFeedback({ ...feedback }, feedback[item] = false)
    }

  }

  function checkForm(obj) {
    let rezult = null;
    for (let key in obj) {
      if (key !== '__v')
        if (obj[key]) {
          rezult = true
        }
        else {
          return false
        }
    }
    return rezult
  }


  return (
    <form ref={refForm}>
      <div>
        <ComponentProduct data={product} feedback={feedback} />
      </div>
      <div className="button-row">
        <Button
          text='Change'
          style='sea'
          action={async () => {
            checkInputs(product, setFeedback)
            if (checkForm(feedback)) {
              await dispatch(_updateProduct(product, update))
              dispatch(_cancelEdit(arrDelImage))
              close(false)
            }
            else console.log('--------------------');
          }
          }
          type='button'
        />
        <Button
          text='Cancel'
          style='gray'
          action={() => {
            dispatch(_cancelEdit(uploadImg))
            close(false)
          }}
          type='button'
        />
      </div>
    </form>
  )
}