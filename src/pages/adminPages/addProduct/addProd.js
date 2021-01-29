import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


import { _renderForm, _setTemplateData, _productCreate, _setInfoCreatedProduct } from "../../../actions/product/action_addProduct";
import './addProd.css';
import TitleWithButton from '../../../Components/Desktop/Titles/titleWithButton';
import IndexFormAddProduct from '../../../Components/Desktop/Forms/adminForm/forms_addProduct/indexForm_addProduct'



export default function AddProd() {

  const { showPanel, productCreate, infoCreatedProduct } = useSelector(store => store.page_addProd);
  const { id } = useSelector(store => store.userStore);
  const dispatch = useDispatch();
  // const [template, setTemplate] = useState(false);

  async function fitchDataTemplate(id, controller) {
    const response = await fetch('/api/findTemplate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id }),
      signal: controller.signal
    })
    if (response.ok) {
      const rezult = await response.json()
      return rezult.template
    }

  }
  useEffect(() => {
    const ac = new AbortController();
    fitchDataTemplate(id, ac)
      .then(data => {
        dispatch(_setTemplateData(data.find))
      })
    return () => {
      dispatch(_renderForm(false))
      ac.abort()
      dispatch(_productCreate(false))
      dispatch(_setInfoCreatedProduct(null, null))
    }
  }, [])

  useEffect(() => {
    if (showPanel) dispatch(_productCreate(false))
  }, [showPanel])
  return (
    <>
      <TitleWithButton
        title='Add product'
        icon='icon_addProduct.svg'
        name='Add product'
        action={() => dispatch(_renderForm(true))}
        style={showPanel ? 'disable' : 'sea'}
      />
      {showPanel
        ? <IndexFormAddProduct
          close={() => dispatch(_renderForm(false))}
        />
        : ''
      }
      {productCreate
        ? <h4>Product <Link to={`/product:${infoCreatedProduct.id}`}>{infoCreatedProduct.name}</Link>  Create</h4>
        : ''
      }

    </>
  )
}