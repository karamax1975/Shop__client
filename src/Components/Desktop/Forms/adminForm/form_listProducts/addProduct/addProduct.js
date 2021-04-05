import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { _flagProductCreate } from '../../../../../../actions/product/action_addProduct';

import Button from '../../../../Buttons/button'
import Product from '../editProduct/product'
import './addProduct.css';
import { _cancelEdit, _createProduct } from '../../../../../../actions/product/action_addProduct';

export default function AddProduct({ data, close, create }) {
  const dispatch = useDispatch()
  const [feedback, setFeedback] = useState({});
  const { uploadImg, arrDelImage } = useSelector(state => state.productStore)
  const { id } = useSelector(state => state.userStore)

  const initCheck = useCallback(() => {
    const arrKey = Object.keys(data);
    arrKey.forEach(item => { setFeedback({ ...feedback }, feedback[item] = true) })
  }, [])



  useEffect(() => {
    initCheck();
  }, [])


  function checkInputs(product, funFeedback) {
    // проверяю, заполнены ли поля в существующих инпутах
    // если они не активны (null) то в объекте состояния не активирую  
    for (let item in feedback) {
      if (product[item]) {
        funFeedback({ ...feedback }, feedback[item] = true)
      }
      else funFeedback({ ...feedback }, feedback[item] = false)
    }

  }
  function checkForm(obj) {
    let rezult = null;
    for (let key in obj) {
      if (obj[key] && obj[key] !== '') {
        rezult = true
      }
      else {
        return false
      }
    }
    return rezult
  }

  async function createProduct() {
    checkInputs(data, setFeedback);
    if (checkForm(feedback)) {
      // добавляю автора в модель продукта
      data.autor = id
      await dispatch(_createProduct(data, create));
      dispatch(_cancelEdit(arrDelImage))
      close()
    }
  }
  function cancel() {
    dispatch(_cancelEdit(uploadImg))
    close()
  }



  return (
    <div className='addProduct'>
      <h5 className='fill-description'><b>*</b> Required to fill</h5>
      <Product data={data} feedback={feedback} />
      <div className='button-row'>
        <Button
          text='Create'
          style='sea'
          action={createProduct} />
        <Button
          text='Cancel'
          style='gray'
          action={cancel} />
      </div>
    </div>
  )
}