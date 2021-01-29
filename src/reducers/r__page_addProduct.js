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
} from '../reducers/Types';

const initialStore = {
  showPanel: false,
  productCreate: false,
  infoCreatedProduct: {
    name: null,
    id: null
  },
  form_NameValue: null,
  nameProduct: null,
  templateData: {},
  brand: null,
  preview: null,
  shortDescription: null,
  price: null,
  previews: null,
  category: null,
  description: null,
  details: null,
  promo: null


}

export default function page_addProd(state = initialStore, action) {

  switch (action.type) {
    case ADD_PRODUCT__INFO_CREATED_PRODUCT:
      return {
        ...state,
        infoCreatedProduct: {
          name: action.payload.name,
          id: action.payload.id
        }
      }
    case ADD_PRODUCT__PRODUCT_CREATE:
      return { ...state, productCreate: action.payload }
    case ADD_PRODUCT__CLEAR_STATE:
      return {
        ...state,
        form_NameValue: null,
        nameProduct: null,
        brand: null,
        preview: null,
        shortDescription: null,
        price: null,
        previews: null,
        category: null,
        description: null,
        details: null,
        promo: null
      }

    case ADD_PRODUCT__SHOW_PANEL:
      return { ...state, showPanel: action.payload }
    case ADD_PRODUCT__SET_TEMPLATE_DATA:
      return { ...state, templateData: action.payload }
    case ADD_PRODUCT__SET_FORM_NAME:
      return { ...state, nameProduct: action.payload }
    case ADD_PRODUCT__SET_FORM_BRAND:
      return { ...state, brand: action.payload }
    case ADD_PRODUCT__SET_FORM_PREVIEW:
      return { ...state, preview: action.payload }
    case ADD_PRODUCT__SET_FORM_SHORTDESCRIPTION:
      return { ...state, shortDescription: action.payload }
    case ADD_PRODUCT__SET_FORM_PRICE:
      return { ...state, price: action.payload }
    case ADD_PRODUCT__SET_FORM_PREVIEWS:
      return { ...state, previews: action.payload }
    case ADD_PRODUCT__SET_FORM_CATEGORY:
      return { ...state, category: action.payload }
    case ADD_PRODUCT__SET_FORM_DESCRIPTION:
      return { ...state, description: action.payload }
    case ADD_PRODUCT__SET_FORM_DETALS:
      return { ...state, details: action.payload }
    case ADD_PRODUCT__SET_FORM_PROMOTIONS:
      return { ...state, promo: action.payload }
    default:
      return state;

  }
}