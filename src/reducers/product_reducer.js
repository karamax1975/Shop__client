import {
  RENDER_FORM,
  PRODUCT_CREATED,
  PRODUCT_CREATE_ALERT,
  SET_PRODUCT_CATEGORY,
  SET_NAME_PRODUCT,
  FORM_PRODUCT__SET_PREVIEW_URL
}
  from './Types';


const initialStore = {
  productName: null,
  renderForm: false,
  productCreate: null,
  productCreateAlert: null,
  categoryID: null,
  previewImgUrl: null
}

export default function productStore(state = initialStore, action) {
  switch (action.type) {
    case RENDER_FORM:
      return { ...state, renderForm: action.payload };
    case SET_NAME_PRODUCT:
      return { ...state, productName: action.payload }
    case PRODUCT_CREATED:
      return { ...state, productCreate: action.payload }
    case PRODUCT_CREATE_ALERT:
      return { ...state, productCreateAlert: action.payload }
    case SET_PRODUCT_CATEGORY:
      return { ...state, categoryID: action.payload }
    case FORM_PRODUCT__SET_PREVIEW_URL:
      return { ...state, previewImgUrl: action.payload }
    default:
      return state;
  }

}