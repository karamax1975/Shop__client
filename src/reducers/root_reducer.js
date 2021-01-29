import { combineReducers } from 'redux';

import adminPage from './r__adminPage';
import page_addProd from './r__page_addProduct';

import productStore from './product_reducer';
import userStore from './user_reducer';
import categoryStore from './category_reducer';

export default combineReducers({
  adminPage,
  page_addProd,
  productStore,
  userStore,
  categoryStore
})