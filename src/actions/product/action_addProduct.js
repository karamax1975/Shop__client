import {
  ADD_PRODUCT__SHOW_PANEL,
  ADD_PRODUCT__SET_TEMPLATE_DATA,
  ADD_PRODUCT__SET_FORM_NAME,
  ADD_PRODUCT__SET_FORM_BRAND,
  ADD_PRODUCT__SET_FORM_PREVIEW,
  ADD_PRODUCT__SET_FORM_SHORTDESCRIPTION,
  ADD_PRODUCT__SET_FORM_PRICE,
  ADD_PRODUCT__SET_FORM_PREVIEWS,
  ADD_PRODUCT__SET_FORM_CATEGORY,
  ADD_PRODUCT__SET_FORM_DESCRIPTION,
  ADD_PRODUCT__SET_FORM_DETALS,
  ADD_PRODUCT__SET_FORM_PROMOTIONS,
  ADD_PRODUCT__CLEAR_STATE,
  ADD_PRODUCT__PRODUCT_CREATE,
  ADD_PRODUCT__INFO_CREATED_PRODUCT
} from '../../reducers/Types';

export function _setInfoCreatedProduct(name, id) {
  return {
    type: ADD_PRODUCT__INFO_CREATED_PRODUCT,
    payload: {
      name,
      id
    }
  }
}
export function _productCreate(flag) {
  return {
    type: ADD_PRODUCT__PRODUCT_CREATE,
    payload: flag
  }
}

export function _clearProduct() {
  return {
    type: ADD_PRODUCT__CLEAR_STATE
  }
}

export function _renderForm(status) {
  return {
    type: ADD_PRODUCT__SHOW_PANEL,
    payload: status
  }
}
export function _setTemplateData(data) {
  return {
    type: ADD_PRODUCT__SET_TEMPLATE_DATA,
    payload: data
  }
}

export function _setForm_Name(value) {
  return {
    type: ADD_PRODUCT__SET_FORM_NAME,
    payload: value
  }
}
export function _setForm_Brand(value) {
  return {
    type: ADD_PRODUCT__SET_FORM_BRAND,
    payload: value
  }
}
export function _setForm_Preview(value) {
  return {
    type: ADD_PRODUCT__SET_FORM_PREVIEW,
    payload: value
  }
}
export function _setForm_shortDescription(value) {
  return {
    type: ADD_PRODUCT__SET_FORM_SHORTDESCRIPTION,
    payload: value
  }
}
export function _setForm_Price(value) {
  return {
    type: ADD_PRODUCT__SET_FORM_PRICE,
    payload: value
  }
}
export function _setForm_Previews(array) {
  return {
    type: ADD_PRODUCT__SET_FORM_PREVIEWS,
    payload: array
  }
}
export function _setForm_Category(value) {
  return {
    type: ADD_PRODUCT__SET_FORM_CATEGORY,
    payload: value
  }
}
export function _setForm_Description(value) {
  return {
    type: ADD_PRODUCT__SET_FORM_DESCRIPTION,
    payload: value
  }
}
export function _setForm_Detals(value) {
  return {
    type: ADD_PRODUCT__SET_FORM_DETALS,
    payload: value
  }
}
export function _setForm_Promo(value) {
  return {
    type: ADD_PRODUCT__SET_FORM_PROMOTIONS,
    payload: value
  }
}
