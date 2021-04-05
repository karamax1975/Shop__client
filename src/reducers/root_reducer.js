import { combineReducers } from 'redux';

import adminPage from './r__adminPage';

import productStore from './product_reducer';
import userStore from './user_reducer';
import listProductsStore from './listProduct_reducer';
import catalogStore from './catalog_reducer';
import choiceStore from './choice_reducer';

export default combineReducers({
  adminPage,
  productStore,
  userStore,
  listProductsStore,
  choiceStore,
  catalogStore
})