import {
  // 
  ADD_PRODUCT__PRODUCT_CREATE,
  ADD_PRODUCT__CONFIRM_FORM,
  // 
  EDIT_PRODUCT__LOAD_PRODUCT,
  EDIT_PRODUCT__EDIT,
  EDIT_PRODUCT__PRELOADER_IMG,
  EDIT_PRODUCT__LOAD_CATEGORY,
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
  EDIT_PRODUCT__LOAD_LIST_CATEGORY,
  EDIT_PRODUCT__TOGGLE_LIST_CATEGORY,
  EDIT_PRODUCT__OPEN_ITEM_CATEGORY,
  EDIT_PRODUCT__SELECTED_ITEM_CATEGORY
}
  from './Types';

import { modelProduct, template } from '../config';


const initialStore = {
  productCreateAlert: null,
  categoryID: null,
  previewImgUrl: null,
  // ------------create
  productCreate: false,
  template,
  // ------------edit
  updateProduct: false,
  product: new modelProduct(),
  preloader: false,
  uploadImg: [],
  arrDelImage: [],
  newDetails: { name: '', description: '' },
  // 
  listCatalog: [],
  rootCatalog: [],
  flagToggleCatalog: false,
  newProduct: null
}



export default function productStore(state = initialStore, action) {
  const { product, listCatalog } = state;
  const { promo } = product.promotion;
  switch (action.type) {
    //----------------------------------------------------
    case EDIT_PRODUCT__SELECTED_ITEM_CATEGORY:
      let selectName = null;
      let selectID = null;
      const selectedCategory = listCatalog.map(item => {
        if (item._id === action.payload.id) {
          item.select = !item.select;
          selectName = item.select ? action.payload.name : null;
          selectID = item.select ? action.payload.id : null;
        }
        else item.select = false
        return item
      })
      product.category.name = selectName;
      product.category.id = selectID;
      const rootSelected = selectedCategory.filter(item => !item.parent);
      return { ...state, rootCatalog: rootSelected, listCatalog: selectedCategory, product }
    // ---------------------------------------------------
    case EDIT_PRODUCT__OPEN_ITEM_CATEGORY:
      const newListCatalog_open = listCatalog.map(item => {
        if (item._id === action.payload) {
          item.open = !item.open;
        }
        return item
      })
      const newRoot = newListCatalog_open.filter(item => !item.parent);
      const subDir = newListCatalog_open.filter(item => { if (item.parent) return item.parent.id === action.payload });
      return { ...state, rootCatalog: newRoot, listCatalog: newListCatalog_open, [action.payload]: subDir }
    //----------------------------------------------------
    case EDIT_PRODUCT__TOGGLE_LIST_CATEGORY:
      return { ...state, flagToggleCatalog: !state.flagToggleCatalog }
    // ---------------------------------------------------
    case EDIT_PRODUCT__LOAD_LIST_CATEGORY:
      const root = action.payload.filter(item => !item.parent)
      return { ...state, listCatalog: action.payload, rootCatalog: root }
    // ----------------------------------------------------
    case EDIT_PRODUCT__ADD_PREVIEW_IMG:
      const { oldImg, newImg } = action.payload;
      let arrDelImg = [];
      let upload = []
      if (oldImg) {
        upload = state.uploadImg.concat(newImg);
        upload = Array.from(new Set(upload))
        arrDelImg = state.arrDelImage.concat(oldImg)
        arrDelImg = Array.from(new Set(arrDelImg))
      }
      product.preview = newImg
      return { ...state, arrDelImage: arrDelImg, product, uploadImg: upload }
    //----------------------------------------------------- 
    case EDIT_PRODUCT__UPDATE_PRODUCT:
      return { ...state, updateProduct: action.payload }
    // ----------------------------------------------------
    // очищаю стейт при нажатии на кнопку Cancel
    case EDIT_PRODUCT__CANCEL_EDIT:
      return {
        ...state,
        product: new modelProduct(),
        listCatalog: [],
        rootCatalog: [],
        flagToggleCatalog: false,
        nameNewCategory: '',
        arrDelImage: [],
        newDetails: { name: '', description: '' },
        uploadImg: [],
        updateProduct: false,
      }
    // --------------------------------------------------------
    //удаляет выбранный юзером елемент массива product.promotion.promo
    case EDIT_PRODUCT__DEL_ITEM_PROMO:
      return {
        ...state,
        product: {
          ...product,
          promotion: {
            promo: promo.filter(item => item._id !== action.payload),
            discount: product.promotion.discount
          },
        }
      }

    // ------------------------------------------
    case EDIT_PRODUCT__PROMO_SET_DISCOUNT:
      /// ввод из поля discount раздела promo
      return { ...state, product: { ...product, promotion: { discount: action.payload, promo: product.promotion.promo } } }
    // ----------------------------------------
    // добавляю в массив product.promotion.promo выбранные элементы
    //============================================================================
    case EDIT_PRODUCT__ADD_NEW_PROMO:
      let newArrPromo = [...promo, action.payload];
      newArrPromo = newArrPromo.filter((item, index, arr) => arr.findIndex((obj) => obj._id === item._id) === index);
      return {
        ...state,
        product: {
          ...product,
          promotion: {
            promo: newArrPromo,
            discount: product.promotion.discount
          }
        }
      }

    // -----------------------------------
    case EDIT_PRODUCT__DELETE_DETAIL:
      // в массиве detalis находится по индексу элемент который нужно удалить, и удаляется из массива
      return {
        ...state,
        product: { ...product, details: product.details.filter((_, index) => index !== action.payload) }
      }
    // ---------------------------------------
    case EDIT_PRODUCT__EDIT_DETAIL:
      // в массиве detalis находится по индексу объект, который нужно отредактировать и перезаписывается новым объектом, переданным из action
      product.details[action.payload.id] = action.payload.obj
      return { ...state, product }
    // --------------------------------
    case EDIT_PRODUCT__ADD_NEW_DETAIL:
      //поля добавления нового продукта сохраняются во временный стейт
      return { ...state, newDetails: action.payload }
    // ----------------------------------------
    case EDIT_PRODUCT__ADD_DETAIL:
      // если product.details==null
      product.details = product.details ?? []
      product.details.push(state.newDetails)
      // после добавления в product очищаю временный стейт
      state.newDetails = {}
      return { ...state, product }
    // ----------------------------------------
    case EDIT_PRODUCT__ADD_NEW_IMG_GALERY_PREVIEW:
      // если product.previews==null
      product.previews = product.previews ?? []
      product.previews.unshift(action.payload[0]);
      state.uploadImg.push(action.payload[0])
      return { ...state, product }
    // --------------------
    case EDIT_PRODUCT__GALERY_DELETE_IMG:
      // ищет в массиве product.previews выбранную картинку и возращает массив без картинки 
      product.previews = state.product.previews.filter(item => item !== action.payload);
      // добавляю в массив arrDelImage стертые картинки для удаления их на сервере при записи продукта в базу
      return { ...state, product, arrDelImage: state.arrDelImage.concat(action.payload) }
    // ------------------------------------------------------------------------ 
    // загружает из API список категорий 
    case EDIT_PRODUCT__LOAD_CATEGORY:
      return { ...state, listCategory: action.payload }
    // ------------------------------------------------------------------------ 
    // показывает прелоадер при загрузке картинок
    case EDIT_PRODUCT__PRELOADER_IMG:
      return { ...state, preloader: action.payload }

    // ------------------------------------------------------------------------
    // универасльная фукция редактирования объекта product
    // по переданному ключу перетерает значение 
    case EDIT_PRODUCT__EDIT:
      const { key, value } = action.payload;
      product[key] = value;
      return { ...state, product }
    // ------------------------------------------------------------------------ 
    // получаю из базы весь список продуктов
    case EDIT_PRODUCT__LOAD_PRODUCT:
      return { ...state, product: action.payload }
    // ------------------------------------------------------------------------
    //================================================================================= Create Prod
    case ADD_PRODUCT__PRODUCT_CREATE:
      return { ...state, productCreate: action.payload }
    // ----------------------------------------------------
    case ADD_PRODUCT__CONFIRM_FORM:
      return { ...state, newProduct: action.payload }
    //--------------------------------------------------
    default:
      return state;
  }

}