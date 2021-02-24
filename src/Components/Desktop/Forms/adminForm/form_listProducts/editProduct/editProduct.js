import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../../../Buttons/button';
import './editProduct.css'
import ComponentProduct from './product';
import { _cancelEdit, _updateProduct } from '../../../../../../actions/product/action_addProduct'
import { _getListProducts } from '../../../../../../actions/listProduct_action';


export default function EditProduct({ close }) {

  const dispatch = useDispatch();

  const { product, uploadImg, arrDelImage } = useSelector(state => state.productStore)

  const refForm = useRef()

  // индикация заполнения полей
  const [feedback, setFeedback] = useState({});

  // при запуске компонента формирую объект состояния валидации форм и заполняю его неактивным статусом
  const initCheck = useCallback(() => {
    const arrKey = Object.keys(product);
    arrKey.forEach(item => { setFeedback({ ...feedback }, feedback[item] = true) })
  }, [])


  function onBlur(e) {
    if (refForm.current !== null && !refForm.current.contains(e.target)) {
      closeEdit()
    }
  }


  useEffect(() => {
    initCheck()
    // document.body.addEventListener('click', onBlur)
    return () => {
      // при закрытии компонента обновляю список продуктов
      // document.body.removeEventListener('click', onBlur);
      dispatch(_getListProducts())
    }
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
      if (obj[key]) {
        rezult = true
      }
      else {
        return false
      }
    }
    return rezult
  }

  function closeEdit() {
    dispatch(_cancelEdit(uploadImg))
    close(false)
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
          action={() => {
            checkInputs(product, setFeedback)
            if (checkForm(feedback)) {
              dispatch(_updateProduct(product))
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
          action={closeEdit}
          type='button'
        />
      </div>
    </form>
  )
}