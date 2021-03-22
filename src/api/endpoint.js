export const LIST_PRODUCT = 'LIST_PRODUCT';
export const DEL_PRODUCT = 'DEL_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const GET_CHOICE = 'GET_CHOICE';
export const GET_CATEGORY = 'GET_CATEGORY';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const DELETE_IMG = 'DELETE_IMG';
export const UPLOAD_IMG = 'UPLOAD_IMG';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const CREATE_CATALOG_ITEM = 'CREATE_CATALOG_ITEM';
export const GET_LIST_CATALOG_ITEM = 'GET_LIST_CATALOG_ITEM';
export const DEL_CATALOG_ITEM = 'DEL_CATALOG_ITEM'

const ENDPOINTS = {
  [GET_LIST_CATALOG_ITEM]: {
    uri: '/getCatalogList',
    method: 'GET'
  },
  [CREATE_CATALOG_ITEM]: {
    uri: '/createCatalogItem',
    method: 'POST'
  },
  [LIST_PRODUCT]: {
    uri: '/getListAllProducts',
    method: 'GET'
  },
  [DEL_PRODUCT]: {
    uri: '/deleteProduct',
    method: 'DELETE'
  },
  [UPDATE_PRODUCT]: {
    uri: '/updateProduct',
    method: "PUT"
  },
  [GET_CHOICE]: {
    uri: '/getChoice',
    method: 'GET'
  },
  [GET_CATEGORY]: {
    uri: '/getCategory',
    method: 'GET'
  },
  [ADD_CATEGORY]: {
    uri: '/addCategory',
    method: 'POST'
  },
  [DELETE_IMG]: {
    uri: '/deleteImg',
    method: 'POST'
  },
  [UPLOAD_IMG]: {
    uri: '/uploadPreview',
    method: 'POST'
  },
  [CREATE_PRODUCT]: {
    uri: '/createProduct',
    method: 'POST'
  },
  [DEL_CATALOG_ITEM]: {
    uri: '/delCatalogItem',
    method: 'POST'
  }
};
export default ENDPOINTS;