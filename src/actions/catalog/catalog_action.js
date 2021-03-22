import {
  CATALOG__SET_NAME_DIR,
  CATALOG__CREATE_ITEM,
  CATALOG__GET_LIST_ITEM,
  CATALOG__EVENT_ADD_ITEM,
  CATALOG__REMOVE_ADD_ITEM,
  CATALOG__SUB_DIR,
  CATALOG__CREATE_SUB_DIR,
  CATALOG__GET_SUB_ITEM,
  CATALOG__SELECTED_ITEM,
  CATALOG__DEL_ITEM
} from '../../reducers/Types'
import { CREATE_CATALOG_ITEM, GET_LIST_CATALOG_ITEM, DEL_CATALOG_ITEM } from '../../api/endpoint';
import API from '../../api/api'

export function _delItem(id) {
  return async dispatch => {
    if (id !== 'root') {
      const response = await API.fetch(DEL_CATALOG_ITEM, { id });
      if (response.status)
        dispatch({ type: CATALOG__DEL_ITEM, payload: response.result })
    }
  }
}

export function _selectedItem(id) {
  return { type: CATALOG__SELECTED_ITEM, payload: id }
}

export function _getSubDir(id) {
  return { type: CATALOG__GET_SUB_ITEM, payload: id }
}

export function _createSubDir(status) {
  return { type: CATALOG__CREATE_SUB_DIR, payload: status }
}

export function _eventAddItem(id, status) {
  return { type: CATALOG__EVENT_ADD_ITEM, payload: { id, status } }
}
export function _eventRemoveAddItem(id, status) {
  return { type: CATALOG__REMOVE_ADD_ITEM, payload: { id, status } }
}
export function _subDir({ id, status }) {
  return { type: CATALOG__SUB_DIR, payload: { id, status } }
}

export function _getListCatalogItem() {
  return async dispatch => {
    const response = await API.fetch(GET_LIST_CATALOG_ITEM);
    if (response.status)
      dispatch({ type: CATALOG__GET_LIST_ITEM, payload: response.result })
  }
}

export function _createCatalogItem(obj) {
  let { name, parent } = obj;
  return async dispatch => {
    const response = await API.fetch(CREATE_CATALOG_ITEM, { name, parent });
    if (response.status) {
      dispatch({ type: CATALOG__CREATE_ITEM, payload: { response: response.result, parent } })
      // очищаю введенное юзером имя раздела
      dispatch({ type: CATALOG__SET_NAME_DIR, payload: '' })
    }

  }
}

export function _setNameDir(name) {
  return { type: CATALOG__SET_NAME_DIR, payload: name }
}