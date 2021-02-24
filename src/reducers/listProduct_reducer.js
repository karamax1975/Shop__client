import moment from 'moment';
import {
  LIST_PRODUCTS__GET_LIST,
  LIST_PRODUCTS__RENDER_MODAL_ALERT,
  LIST_PRODUCTS__DEL_PRODUCT,
  LIST_PRODUCTS__CHANGE_ACTIVITY,
  // -----------------------
  LIST_PRODUCTS__SET_NAME_FILTER,
  LIST_PRODUCTS__FIND_PRODUCT
} from './Types'

const initialStore = {
  listProducts: [],
  modalAlert: false,
  idDelProduct: null,
  editProduct: false,
  //------------filter


}
export default function listProductsStore(state = initialStore, action) {
  let { listProducts } = state
  switch (action.type) {
    //----------------------------------------------------------
    case LIST_PRODUCTS__FIND_PRODUCT:
      if (action.payload !== '')
        listProducts = listProducts.sort((a, b) => {
          return a['name'].toLowerCase().indexOf(action.payload) > b['name'].toLowerCase().indexOf(action.payload) ? -1 : 1
        })
      else listProducts = listProducts.sort((a, b) => a['name'].toLowerCase().localeCompare(b['name'].toLowerCase()))
      return { ...state, listProducts }
    // ---------------------------------------------------------
    case LIST_PRODUCTS__SET_NAME_FILTER:
      // сортирую listProducts[action.payload] по алфавиту
      // action.payload - имя поля, которое нужно отсортировать
      if (action.payload === 'category') {
        listProducts = listProducts.sort((a, b) => a[action.payload][0].name.toLowerCase().localeCompare(b[action.payload][0].name.toLowerCase()))
      }
      if (action.payload === 'brand' || action.payload === 'name') {
        listProducts = listProducts.sort((a, b) => a[action.payload].toLowerCase().localeCompare(b[action.payload].toLowerCase()))
      }
      if (action.payload === 'activity') {
        listProducts = listProducts.sort((a, b) => a[action.payload] > b[action.payload] ? -1 : 1)
      }
      if (action.payload === 'price') {
        listProducts = listProducts.sort((a, b) => Number(a[action.payload]) > Number(b[action.payload]) ? -1 : 1)
      }
      if (action.payload === 'date') {
        listProducts = listProducts.sort((a, b) => {
          a = moment().valueOf(a[action.payload]);
          b = moment().valueOf(b[action.payload])
          return a > b ? 1 : -1

        })
      }
      return {
        ...state, listProducts
      }
    // -----------------------------------------------

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