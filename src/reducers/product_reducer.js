import {
  // 
  ADD_PRODUCT__PRODUCT_CREATE,
  ADD_PRODUCT__CONFIRM_FORM,
  // 
  EDIT_PRODUCT__LOAD_PRODUCT,
  EDIT_PRODUCT__EDIT,
  EDIT_PRODUCT__PRELOADER_IMG,
  EDIT_PRODUCT__FLAG_CATEGORY,
  EDIT_PRODUCT__LOAD_CATEGORY,
  EDIT_PRODUCT__CATEGORY_DROP,
  EDIT_PRODUCT__ADD_NAME_NEW_CATEGORY,
  EDIT_PRODUCT__ADD_NEW_CATEGORY,
  EDIT_PRODUCT__ADD_NEW_IMG_GALERY_PREVIEW,
  EDIT_PRODUCT__GALERY_DELETE_IMG,
  EDIT_PRODUCT__ADD_DETAIL,
  EDIT_PRODUCT__ADD_NEW_DETAIL,
  EDIT_PRODUCT__EDIT_DETAIL,
  EDIT_PRODUCT__DELETE_DETAIL,
  EDIT_PRODUCT__ADD_NEW_PROMO,
  EDIT_PRODUCT__PROMO_SET_DISCOUNT,
  EDIT_PRODUCT__LOAD_LIST_PROMO,
  EDIT_PRODUCT__SELECT_PROMO,
  EDIT_PRODUCT__DEL_ITEM_PROMO,
  EDIT_PRODUCT__CANCEL_EDIT,
  EDIT_PRODUCT__UPDATE_PRODUCT,
  EDIT_PRODUCT__ADD_PREVIEW_IMG
}
  from './Types';

import { modelProduct, template } from '../config';


const initialStore = {
  productName: null,
  renderForm: false,
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
  flagCategory: false,
  listCategory: [],
  uploadImg: [],
  categoryDrop: false,
  nameNewCategory: '',
  arrDelImage: [],
  newDetails: { name: '', description: '' },
  listPromo: []
}



export default function productStore(state = initialStore, action) {
  const { product } = state;
  switch (action.type) {
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
      return { ...state, updateProduct: true }
    // ----------------------------------------------------
    // очищаю стейт при нажатии на кнопку Cancel
    case EDIT_PRODUCT__CANCEL_EDIT:
      return {
        ...state,
        product: new modelProduct(),
        listCategory: [],
        nameNewCategory: '',
        arrDelImage: [],
        newDetails: { name: '', description: '' },
        listPromo: [],
        uploadImg: [],
        updateProduct: false
      }
    // --------------------------------------------------------
    //удаляет выбранный юзером елемент массива product.promotion.promo
    case EDIT_PRODUCT__DEL_ITEM_PROMO:
      product.promotion.promo = product.promotion.promo.filter(item => item.name === action.payload)
      return { ...state, product }
    // ----------------------------------------------
    case EDIT_PRODUCT__SELECT_PROMO:
      // добавляю в массив product.promotion.promo выбранные элементы
      // если объект пустой
      product.promotion.promo = product.promotion.promo ?? []
      product.promotion.promo.push(action.payload)
      product.promotion.promo = Array.from(new Set(product.promotion.promo))
      return { ...state, product }
    // -----------------------------------------
    case EDIT_PRODUCT__LOAD_LIST_PROMO:
      // загружаю из базы массив promo
      return { ...state, listPromo: action.payload }
    // ------------------------------------------
    case EDIT_PRODUCT__PROMO_SET_DISCOUNT:
      /// ввод из поля discount раздела promo
      product.promotion.discount = action.payload
      return { ...state, product }
    // ----------------------------------------
    // на вход получаем имя элемента и его статус
    case EDIT_PRODUCT__ADD_NEW_PROMO:
      if (!action.payload.status) {
        if (product.promotion[action.payload.name]) {
          // product.promotion.promo - массив 
          if (action.payload.name === 'promo') {
            product.promotion.promo = []
          }
          else delete product.promotion[action.payload.name]
        }
      }
      return { ...state, product }
    // -----------------------------------
    case EDIT_PRODUCT__DELETE_DETAIL:
      // в массиве detalis находится по индексу элемент который нужно удалить, и удаляется из массива
      product.details = product.details.filter((_, index) => index !== action.payload)
      return { ...state, product }
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
    // -------------------------------------------------
    //стейт имени новой категории в блоке category
    case EDIT_PRODUCT__ADD_NAME_NEW_CATEGORY:
      return { ...state, nameNewCategory: action.payload }
    // ------------------------------------------------------------------------ 
    // пушит в массив category приходящий из базы объект новой категории
    case EDIT_PRODUCT__ADD_NEW_CATEGORY:
      product.category = [action.payload]
      return { ...state, listCategory: state.listCategory.concat(action.payload), product }
    // ------------------------------------------------------------------------ 
    // закрывает/открывает выпадающий список в блоке category
    case EDIT_PRODUCT__CATEGORY_DROP:
      const drop = !state.categoryDrop;
      return { ...state, categoryDrop: drop }
    // ------------------------------------------------------------------------ 
    // загружает из API список категорий 
    case EDIT_PRODUCT__LOAD_CATEGORY:
      return { ...state, listCategory: action.payload }
    // ------------------------------------------------------------------------ 
    // переключение режимов работы блока category "список категорий/добавление новой категории"
    case EDIT_PRODUCT__FLAG_CATEGORY:
      return { ...state, flagCategory: action.payload }
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
      return { ...state }
    //--------------------------------------------------
    // case RENDER_FORM:
    //   return { ...state, renderForm: action.payload };
    default:
      return state;
  }

}