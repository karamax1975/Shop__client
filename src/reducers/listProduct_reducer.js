import {
  LIST_PRODUCTS__GET_LIST,
  LIST_PRODUCTS__RENDER_MODAL_ALERT,
  LIST_PRODUCTS__DEL_PRODUCT,
  LIST_PRODUCTS__CHANGE_ACTIVITY
} from './Types'

const initialStore = {
  listProducts: [],
  modalAlert: false,
  idDelProduct: null,
  editProduct: false

}

export default function listProductsStore(state = initialStore, action) {
  switch (action.type) {
    case LIST_PRODUCTS__GET_LIST:
      return {
        ...state, listProducts: action.payload
      }
    case LIST_PRODUCTS__RENDER_MODAL_ALERT:
      return {
        ...state, modalAlert: action.payload.status, idDelProduct: action.payload.id
      }
    case LIST_PRODUCTS__DEL_PRODUCT:
      return {
        ...state, modalAlert: false, idDelProduct: null
      }
    case LIST_PRODUCTS__CHANGE_ACTIVITY:
      const changeArray = state.listProducts.filter(item => {
        if (item._id === action.payload.id) { item.activity = !item.activity }
        return item
      })
      return { ...state, listProducts: changeArray }
    default:
      return state
  }
}