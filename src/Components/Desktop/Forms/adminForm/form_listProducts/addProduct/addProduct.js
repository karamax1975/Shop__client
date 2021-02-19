import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { _productCreate } from '../../../../../../actions/product/action_addProduct';

import Button from '../../../../Buttons/button'
import Product from '../editProduct/product'
import './addProduct.css';
import { _cancelEdit, _confirmCreateProduct } from '../../../../../../actions/product/action_addProduct';
import { _getListProducts } from '../../../../../../actions/listProduct_action'

export default function AddProduct() {
  const dispatch = useDispatch()
  const [feedback, setFeedback] = useState({});
  const { product, uploadImg, arrDelImage } = useSelector(state => state.productStore)
  const { id } = useSelector(state => state.userStore)

  const initCheck = useCallback(() => {
    const arrKey = Object.keys(product);
    arrKey.forEach(item => { setFeedback({ ...feedback }, feedback[item] = true) })
  }, [])

  useEffect(() => {
    initCheck();
    return () => {
      // при закрытии компонента обновляю список продуктов
      dispatch(_getListProducts())
    }
  }, [])

  function checkInputs(product, funFeedback) {
    // проверяю, заполнены ли поля в существующих инпутах
    // если они не активны (null) то в объекте состояния не активирую  
    for (let item in feedback) {
      if (product[item]) {
        if (item === 'category' && product[item][0].name) {

        }
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

  function createProduct() {
    checkInputs(product, setFeedback);
    if (checkForm(feedback)) {
      // добавляю автора в модель продукта
      product.autor = id
      dispatch(_confirmCreateProduct(product))
      dispatch(_cancelEdit(arrDelImage))
      dispatch(_productCreate(false))
    }

  }

  function cancel() {
    dispatch(_cancelEdit(uploadImg))
    dispatch(_productCreate(false))
  }



  return (
    <div className='addProduct'>
      <h5 className='fill-description'><b>*</b> Required to fill</h5>
      <Product data={product} feedback={feedback} />
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