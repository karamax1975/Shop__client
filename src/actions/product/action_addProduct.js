import {
  // ----------------------------------- create product
  ADD_PRODUCT__PRODUCT_CREATE,
  ADD_PRODUCT__CONFIRM_FORM,
  // ---------------------------------- edit
  EDIT_PRODUCT__LOAD_PRODUCT,
  EDIT_PRODUCT__EDIT,
  EDIT_PRODUCT__PRELOADER_IMG,
  // 
  EDIT_PRODUCT__LOAD_LIST_CATEGORY,
  EDIT_PRODUCT__TOGGLE_LIST_CATEGORY,
  // 
  EDIT_PRODUCT__ADD_NEW_IMG_GALERY_PREVIEW,
  EDIT_PRODUCT__GALERY_DELETE_IMG,
  EDIT_PRODUCT__ADD_DETAIL,
  EDIT_PRODUCT__ADD_NEW_DETAIL,
  EDIT_PRODUCT__EDIT_DETAIL,
  EDIT_PRODUCT__DELETE_DETAIL,
  EDIT_PRODUCT__ADD_NEW_PROMO,
  EDIT_PRODUCT__PROMO_SET_DISCOUNT,
  EDIT_PRODUCT__DEL_ITEM_PROMO,
  EDIT_PRODUCT__CANCEL_EDIT,
  EDIT_PRODUCT__UPDATE_PRODUCT,
  EDIT_PRODUCT__ADD_PREVIEW_IMG,
  EDIT_PRODUCT__OPEN_ITEM_CATEGORY,
  EDIT_PRODUCT__SELECTED_ITEM_CATEGORY

} from '../../reducers/Types';

import { UPDATE_PRODUCT, DELETE_IMG, UPLOAD_IMG, CREATE_PRODUCT, GET_LIST_CATALOG_ITEM } from '../../api/endpoint';
import API from '../../api/api'

export function _selectedItemCategory(id, name) {
  return { type: EDIT_PRODUCT__SELECTED_ITEM_CATEGORY, payload: { id, name } }
}

export function _openItemCategory(id) {
  return { type: EDIT_PRODUCT__OPEN_ITEM_CATEGORY, payload: id }
}

export function _toggleListCategory() {
  return { type: EDIT_PRODUCT__TOGGLE_LIST_CATEGORY }
}

export function _loadListCategories() {
  return async dispatch => {
    const response = await API.fetch(GET_LIST_CATALOG_ITEM);
    if (response.status)
      dispatch({ type: EDIT_PRODUCT__LOAD_LIST_CATEGORY, payload: response.result })
  }
}


export function _flagProductCreate(flag) {
  return {
    type: ADD_PRODUCT__PRODUCT_CREATE,
    payload: flag
  }
}

export function _createProduct(obj, callback) {
  return async dispatch => {
    const response = await API.fetch(CREATE_PRODUCT, obj);
    if (response.status) {
      callback(response.newProduct)
      dispatch({ type: ADD_PRODUCT__CONFIRM_FORM, payload: response.newProduct })
    }
  }
}

// -----------------------------------------------------------

export function _addPreviewImg(obj) {
  return async dispatch => {
    const { oldImg, newImg } = obj
    //включаю прелоадер
    dispatch({ type: EDIT_PRODUCT__PRELOADER_IMG, payload: true })
    const response = await API.fetch(UPLOAD_IMG, newImg);
    if (response.status) {
      dispatch({
        type: EDIT_PRODUCT__ADD_PREVIEW_IMG, payload: {
          oldImg,
          newImg: response.file
        }
      })
      dispatch({ type: EDIT_PRODUCT__PRELOADER_IMG, payload: false })
    }
  }
}

export function _updateProduct(data, callback) {
  return async dispatch => {
    const response = await API.fetch(UPDATE_PRODUCT, data)
    if (response.status) {
      callback(response.result)
      dispatch({ type: EDIT_PRODUCT__UPDATE_PRODUCT, payload: true })
    }
    else dispatch({ type: EDIT_PRODUCT__UPDATE_PRODUCT, payload: false })
  }

}

export function _cancelEdit(arrImg) {
  return async dispatch => {
    if (arrImg.length > 0) {
      const response = await API.fetch(DELETE_IMG, arrImg);
    }
    dispatch({ type: EDIT_PRODUCT__CANCEL_EDIT })
  }
}

export function _delItemPromo(name) {
  return { type: EDIT_PRODUCT__DEL_ITEM_PROMO, payload: name }
}

export function _promo_SetDiscount(number) {
  const itsNumber = parseInt(number)
  if (itsNumber !== NaN && Number.isInteger(itsNumber))
    return { type: EDIT_PRODUCT__PROMO_SET_DISCOUNT, payload: number }
}

export function _addNewPromo(promoObj) {
  return { type: EDIT_PRODUCT__ADD_NEW_PROMO, payload: promoObj }
}


export function _deleteDetail(id) {
  return { type: EDIT_PRODUCT__DELETE_DETAIL, payload: id }
}

export function _editDetail(id, obj) {
  return { type: EDIT_PRODUCT__EDIT_DETAIL, payload: { id, obj } }
}

export function _addNewDetail(obj) {
  return {
    type: EDIT_PRODUCT__ADD_NEW_DETAIL,
    payload: obj
  }
}

export function _deleteImgInGalery(name) {
  return async dispatch => {
    dispatch({ type: EDIT_PRODUCT__GALERY_DELETE_IMG, payload: name })
  }

}

export function _addDetail() {
  return {
    type: EDIT_PRODUCT__ADD_DETAIL
  }
}

export function _addNewImgGaleryPreviews(newImg) {
  const arrayImg = []
  return async dispatch => {
    const response = await API.fetch(UPLOAD_IMG, newImg);
    if (response.status) {
      arrayImg.push(response.file);
      dispatch({ type: EDIT_PRODUCT__ADD_NEW_IMG_GALERY_PREVIEW, payload: arrayImg })
    }
  }
}




export function _editProduct(key, value) {
  return dispatch => {
    dispatch({
      type: EDIT_PRODUCT__EDIT,
      payload: {
        key,
        value
      }
    })
  }
}

export function _loadProduct(obj) {
  return dispatch => {
    dispatch({ type: EDIT_PRODUCT__LOAD_PRODUCT, payload: obj })
  }
}

