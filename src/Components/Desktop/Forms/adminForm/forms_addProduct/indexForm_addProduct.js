import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BigButton from '../../../Buttons/bigButton'

import FormProduct from './formProduct';
import {
  _setForm_Name,
  _setForm_Brand,
  _setForm_Preview,
  _setForm_shortDescription,
  _setForm_Price,
  _setForm_Previews,
  _setForm_Category,
  _setForm_Description,
  _setForm_Detals,
  _setForm_Promo,
  _clearProduct,
  _productCreate,
  _setInfoCreatedProduct
} from '../../../../../actions/product/action_addProduct'

export default function IndexForm_AddProduct({ close }) {

  const dispatch = useDispatch();
  const page_addProd = useSelector(state => state.page_addProd);
  const { id } = useSelector(state => state.userStore)
  const { name, brand, shortDescription, prise, category, description, preview, previews, details } = page_addProd.templateData;


  function setValue_NameProduct(name) {
    if (name) dispatch(_setForm_Name(name))
  }

  function setValue_BRAND(brand) {
    if (brand) dispatch(_setForm_Brand(brand))
  }
  function setValue_Preview(nameFile) {
    if (nameFile) dispatch(_setForm_Preview(nameFile))
  }
  function setValue_ShortDescription(description) {
    if (description) dispatch(_setForm_shortDescription(description))
  }
  function setValue_Price(price) {
    if (price) dispatch(_setForm_Price(price))
  }
  function setValue_Category(category) {
    if (category) dispatch(_setForm_Category(category))
  }
  function setValue_Description(description) {
    if (description) dispatch(_setForm_Description(description))
  }
  function setValue_Previews(arrNameImg) {
    if (arrNameImg.length > 0) dispatch(_setForm_Previews(arrNameImg))
  }
  function setValue_Detals(arrDetals) {
    if (arrDetals) dispatch(_setForm_Detals(arrDetals))
  }

  function setValue_Promotions(obj) {
    if (obj) dispatch(_setForm_Promo(obj))
  }



  async function createProduct() {
    const ac = new AbortController();
    const { nameProduct, brand, shortDescription, preview, price, category, previews, description, details, promo } = page_addProd;
    // объект продукта
    const product = {
      name: nameProduct,
      shortDescription,
      description,
      prise: price,
      brand,
      activity: true,
      category,
      preview,
      previews,
      details,
      promotion: promo,
      autor: id
    }

    if (nameProduct && brand && shortDescription && price && preview && category && description) {
      const response = await fetch('api/createProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product),
        signal: ac.signal
      })
      try {
        const rezult = await response.json();
        dispatch(_setInfoCreatedProduct(rezult.name, rezult.id))
        dispatch(_clearProduct())
        close(false)
        dispatch(_productCreate(true))
      }
      catch {
        ac.abort()
      }
    }

  }

  function clearForm() {
    close(false)
    dispatch(_clearProduct())
  }


  return (
    <div>
      <h5 className='fill-description'><b>*</b> Required to fill</h5>
      <div className='row'>
        <div className='col-lg-6'>
          <FormProduct
            templateData={name}
            type='textarea'
            titleForm='Name'
            action={setValue_NameProduct}
            fill={true}
          />
          <FormProduct
            templateData={shortDescription}
            type='shortDescription'
            titleForm='Short description'
            action={setValue_ShortDescription}
            fill={true}
          />
        </div>
        <div className='col-lg-6'>
          <FormProduct
            templateData={brand}
            type='input'
            titleForm='Brand'
            action={setValue_BRAND}
            fill={true}
          />
          <FormProduct
            templateData={preview}
            type='image'
            titleForm='Title image'
            action={setValue_Preview}
            fill={true}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-6'>
          <FormProduct
            templateData={prise}
            type='inputPrice'
            titleForm='Price'
            action={setValue_Price}
            fill={true}
          />
          <FormProduct
            templateData={category}
            type='select'
            titleForm='Category'
            fill={true}
            action={setValue_Category}
          />
        </div>
        <div className='col-lg-6'>
          <FormProduct
            templateData={previews}
            type='previews_img'
            titleForm='Preview images '
            action={setValue_Previews}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <FormProduct
            templateData={description}
            type='description'
            titleForm='Description'
            action={setValue_Description}
            fill={true}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <FormProduct
            templateData={details}
            type='details'
            titleForm='Details'
            action={setValue_Detals}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <FormProduct
            type='promo'
            titleForm='Promotions'
            action={setValue_Promotions}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='row-button'>
            <BigButton action={createProduct} style='sea-big-button' text='Create' />
            <BigButton action={clearForm} style='white-big-button' text='Cancel' />
          </div>
        </div>
      </div>
    </div>
  )
}
