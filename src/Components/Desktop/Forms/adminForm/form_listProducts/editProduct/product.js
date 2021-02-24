import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { config } from '../../../../../../config'
import TextArea from '../../../../Inputs/textArea'
import FormLayout from '../../form_layout';
import InputPreview from '../../../../Inputs/inputPreview';
import InputUniversal from '../../../../Inputs/inputUniversal';
import GaleryPreviews from './galeryPreviews';
import MultiInputs from '../../../../Inputs/multiInput';
import Promo from './promo';
import Categorys from './categorys';
import { _editProduct, _addNewImgGaleryPreviews, _addPreviewImg } from '../../../../../../actions/product/action_addProduct';
import './product.css';

export default function ItemProduct({ data, feedback }) {

  const { template, product } = useSelector(state => state.productStore)
  const dispatch = useDispatch()
  return (
    <div className='product'>
      <div className='product-col-lg-6'>
        <FormLayout title='Name product'
          condition={true}
          alertFlag={feedback.name}
          alertText='The field is not filled'
        >
          <TextArea
            style='textArea-name'
            value={data.name}
            action={(value) => dispatch(_editProduct('name', value))}
            template={template.name}
          />
        </FormLayout>
        {/* ----------------------------------------------------------------- */}
        <FormLayout title='Short description'
          condition={true}
          alertFlag={feedback.shortDescription}
          alertText='The field is not filled'
        >
          <TextArea
            style='textArea-shortDescription'
            value={data.shortDescription}
            action={(value) => dispatch(_editProduct('shortDescription', value))}
            template={template.shortDescription}
          />
        </FormLayout>
        {/* -------------------------------------------------------------------------------- */}
        <FormLayout title='Price'
          condition={true}
          alertFlag={feedback.price}
          style='FormLayout__Price'
          alertText='The field is not filled'
        >
          <div className='product_price'>
            <h5>{config._CURRENCY_SIGN}</h5>
            <InputUniversal
              value={data.price}
              action={(number) => dispatch(_editProduct('price', number))}
              template={template.price}
            />
          </div>
        </FormLayout>
        {/* --------------------------------------------------------------------------------------- */}
        <FormLayout title='Category'
          condition={true}
          alertFlag={feedback.category}
          style='FormLayout_Category'
          alertText='The field is not filled'
        >
          <Categorys
            data={data.category}
          />
        </FormLayout>
        {/* -------------------------------------------------------------------------------------------------------------- */}
      </div>
      <div className='product-col-lg-6'>
        <FormLayout title='Brand'
          condition={true}
          alertFlag={feedback.brand}
          alertText='The field is not filled'
        >
          <TextArea
            style='textArea-brend'
            value={data.brand}
            action={(value) => dispatch(_editProduct('brand', value))}
            template={template.brand}
          />
        </FormLayout>
        {/* ---------------------------------------------------------------------------------------------- */}
        <FormLayout title='Title preview'
          condition={true}
          alertFlag={feedback.preview}
          alertText='The field is not filled'
        >
          <InputPreview
            value={data.preview}
            style='product-preview'
            action={(obj) => dispatch(_addPreviewImg(obj))}
          />
        </FormLayout>
        {/* ---------------------------------------------------------------------------------------------- */}
        <FormLayout title='Gallery previews' alertFlag={true}>
          <GaleryPreviews
            data={data.previews}
            action={(img) => dispatch(_addNewImgGaleryPreviews(img))}
          />
        </FormLayout>
        {/* ---------------------------------------------------------------------------------------------- */}
      </div>
      <FormLayout title='Description'
        condition={true}
        alertFlag={feedback.description}
        alertText='The field is not filled'
      >
        <TextArea
          style='textArea-description'
          value={data.description}
          action={(value) => dispatch(_editProduct('description', value))}
          template={template.description}
        />
      </FormLayout>
      {/* -------------------------------------------------------------------------------------------------------------- */}
      <FormLayout title='Details' alertFlag={true}>
        <MultiInputs
          value={data.details}
        />
      </FormLayout>
      {/* ---------------------------------------------------------------------- +1 */}
      <FormLayout title='Promotions' alertFlag={true}>
        <Promo
          value={data.promotion}
        />
      </FormLayout>
      {/* ----------------------------------------------------------------------- */}
    </div>
  )
}