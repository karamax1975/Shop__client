
import {
  LIST_PRODUCTS__GET_LIST,
  LIST_PRODUCTS__RENDER_MODAL_ALERT,
  LIST_PRODUCTS__DEL_PRODUCT,
  LIST_PRODUCTS__CHANGE_ACTIVITY,
  // 
  LIST_PRODUCTS__SET_NAME_FILTER,
  LIST_PRODUCTS__FIND_PRODUCT
  // 
} from '../reducers/Types';
import API from '../api/api'
import { LIST_PRODUCT, DEL_PRODUCT, UPDATE_PRODUCT } from '../api/endpoint'

export function _findProduct(name) {
  return { type: LIST_PRODUCTS__FIND_PRODUCT, payload: name.toLowerCase() }
}

export function _setNameFilter(name) {
  return { type: LIST_PRODUCTS__SET_NAME_FILTER, payload: name.toLowerCase() }
}

export function _getListProducts() {
  return async dispatch => {
    const response = await API.fetch(LIST_PRODUCT);
    if (response) dispatch({ type: LIST_PRODUCTS__GET_LIST, payload: response.data })
  }
}



export function _warningDelete(status, id) {
  return {
    type: LIST_PRODUCTS__RENDER_MODAL_ALERT,
    payload: {
      id, status
    }
  }
}

export function _delProduct(id, user) {
  return async dispatch => {
    const data = { id, user }
    const response = await API.fetch(DEL_PRODUCT, data);
    if (response.status) dispatch({ type: LIST_PRODUCTS__DEL_PRODUCT })
  }
}

export function _changeActivity(data) {
  return async dispatch => {
    dispatch({ type: LIST_PRODUCTS__CHANGE_ACTIVITY, payload: { id: data._id } })
    const response = await API.fetch(UPDATE_PRODUCT, data);
  }
}

