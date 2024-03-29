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
  CATALOG__DEL_ITEM,
  CATALOG__EDIT_ITEM,
  CATALOG__CANCEL_EDIT_ITEM,
  CATALOG__NEW_NAME__EDIT_ITEM,
  CATALOG__RENAME_EDIT_ITEM,
  CATALOG__CREATE_PRODUCT,
  CATALOG__EDIT_PRODUCT
} from '../../reducers/Types'
import { CREATE_CATALOG_ITEM, GET_LIST_CATALOG_ITEM, DEL_CATALOG_ITEM, RENAME_CATALOG_ITEM } from '../../api/endpoint';
import API from '../../api/api'

export function _editProduct(idProduct) {
  return { type: CATALOG__EDIT_PRODUCT, payload: idProduct }
}

export function _createProduct(idCategory) {
  return { type: CATALOG__CREATE_PRODUCT, payload: idCategory }
}

export function _renameItem(id, newName) {
  return async dispatch => {
    const response = await API.fetch(RENAME_CATALOG_ITEM, { id, newName })
    if (response.status) {
      dispatch({ type: CATALOG__RENAME_EDIT_ITEM, payload: { id, newName } })
      dispatch({ type: CATALOG__CANCEL_EDIT_ITEM, payload: id })
    }
  }
}

export function _setValueEditableItem(value) {
  return { type: CATALOG__NEW_NAME__EDIT_ITEM, payload: value }
}

export function _cancelEditItem(id) {
  return { type: CATALOG__CANCEL_EDIT_ITEM, payload: id }
}

export function _editItem(id) {
  return { type: CATALOG__EDIT_ITEM, payload: id }
}

export function _delItem(id) {
  return async dispatch => {
    const response = await API.fetch(DEL_CATALOG_ITEM, { id });
    if (response.status)
      dispatch({ type: CATALOG__DEL_ITEM, payload: id })
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
export function _subDir(id) {
  return { type: CATALOG__SUB_DIR, payload: id }
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
      // открываю директорию, в которой создается субдиректория
      // если директория, в которой создается, не корневая
      if (parent)
        dispatch({ type: CATALOG__SUB_DIR, payload: { id: parent.id, status: true } })

    }

  }
}

export function _setNameDir(name) {
  return { type: CATALOG__SET_NAME_DIR, payload: name }
}