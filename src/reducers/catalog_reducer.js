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
  // 
  CATALOG__CREATE_PRODUCT,
  CATALOG__EDIT_PRODUCT
} from './Types';


const initialStore = {
  allCategories: [],
  rootCatalog: [],
  name: '',
  createSubDir: false,
  selectedID: 'root',
  rootAddItem: false,
  editName: '',
  event_CreateProduct: false,
  event_EditProduct: false
}

export default function catalogStore(state = initialStore, action) {
  let { rootCatalog, allCategories } = state;
  switch (action.type) {
    case CATALOG__EDIT_PRODUCT:
      return { ...state, event_EditProduct: action.payload }
    // -----------------------------------------------------------
    case CATALOG__CREATE_PRODUCT:
      return { ...state, event_CreateProduct: action.payload }
    // -----------------------------------------------------------
    //rename editable Item
    case CATALOG__RENAME_EDIT_ITEM:
      let editableParent = null;
      const arrEditableAll = allCategories.map(item => {
        if (item._id === action.payload.id) {
          item.name = action.payload.newName;
          if (item.parent) {
            editableParent = item.parent.id
          }
        }
        return item
      })
      /// если редактируемая директория не корневая
      if (!editableParent) {
        const newRootDir = rootCatalog.map(item => {
          if (item._id === action.payload.id) {
            item.name = action.payload.newName;
          }
          return item
        })
        return { ...state, rootCatalog: newRootDir, allCategories: arrEditableAll }
      }
      else {
        return { ...state, allCategories: arrEditableAll }
      }
    // усли директория, которую переименовывают, корневая

    // -----------------------------------------------------------
    //enter new name Category Item
    case CATALOG__NEW_NAME__EDIT_ITEM:
      return { ...state, editName: action.payload }
    //------------------------------------------------------------
    // cancel Edit Item 
    // clear newName Category Item
    case CATALOG__CANCEL_EDIT_ITEM:
      allCategories.forEach(item => {
        if (item._id === action.payload) {
          item.edit = false;
        }
      })
      return { ...state, editName: '' }

    // -----------------------------------------------------------
    // add flag "Edit" in select object
    case CATALOG__EDIT_ITEM:
      const arrEdit = allCategories.map(item => {
        if (item._id === action.payload) {
          item.edit = true;
          return item
        }
        else {
          item.edit = false
          return item
        }
      })
      return { ...state, allCategories: arrEdit }
    //----------------------------------------------------- 
    case CATALOG__DEL_ITEM:
      let parent = null
      const newArrAllCategories = allCategories.filter(item => {
        if (item._id !== action.payload) return item;
        else if (item.parent) parent = item.parent.id;
      });
      const newRoot = newArrAllCategories.filter(item => !item.parent);
      // если удаленная директория была поддиректорией
      if (parent) {
        const newArrSelectedDir = state[parent].filter(item => item._id !== action.payload)
        return { ...state, selectedID: 'root', allCategories: newArrAllCategories, [parent]: newArrSelectedDir }
      }
      else return { ...state, selectedID: 'root', allCategories: newArrAllCategories, rootCatalog: newRoot }
    // ----------------------------------------------------
    case CATALOG__SELECTED_ITEM:
      let selectedItemFlag = false
      const newArrSelected = allCategories.map(item => {
        if (item._id === action.payload) {
          item.active = !item.active
          if (!item.active) selectedItemFlag = false
          else selectedItemFlag = true
        }
        else item.active = false
        return item
      })
      return { ...state, allCategories: newArrSelected, selectedID: !selectedItemFlag ? 'root' : state.selectedID }
    // -----------------------------
    case CATALOG__GET_SUB_ITEM:
      const subList = allCategories.filter(item => {
        if (item.parent) {
          return item.parent.id === action.payload
        }
        else return false
      });
      return { ...state, [action.payload]: subList, selectedID: action.payload }
    // -----------------------------
    case CATALOG__CREATE_SUB_DIR:
      return { ...state, createSubDir: action.payload }
    // -----------------------------
    case CATALOG__SUB_DIR:
      const mutationCategory = allCategories.map(item => {
        if (item._id === action.payload) {
          item.selected = !item.selected
        }
        return item
      })
      const newRootArr = mutationCategory.filter(item => !item.parent);
      const subDir = mutationCategory.filter(item => { if (item.parent) return item.parent.id === action.payload });
      return { ...state, allCategories: mutationCategory, rootCatalog: newRootArr, [action.payload]: subDir }

    case CATALOG__EVENT_ADD_ITEM:
      // Создается корневая директория
      if (action.payload.id === 'root') {
        return { ...state, rootAddItem: true }
      }
      // иначе создается субдиректория
      const newArr = allCategories.map(item => {
        if (item._id === state.selectedID) {
          item.addNewItem = true;
        }
        else {
          item.addNewItem = false
        }
        return item
      })
      return { ...state, allCategories: newArr }

    case CATALOG__REMOVE_ADD_ITEM:
      // отмена создания корневой директории и очистка name
      if (action.payload.id === 'root') {
        return { ...state, rootAddItem: action.payload.status, name: '' }
      }
      // отмена создания субдиректории
      else {
        // удаляется флаг создания новой субдиректории
        const newArrRemoveAddItem = allCategories.map(item => {
          if (item._id === action.payload.id) {
            item.addNewItem = action.payload.status;
          }
          else item.addNewItem = false
          return item
        });
        return { ...state, allCategories: newArrRemoveAddItem }
      }

    case CATALOG__GET_LIST_ITEM:
      action.payload.forEach((item) => item.selected = false);
      const allCatalog = action.payload
      let list = action.payload.filter(item => !item.parent)
      return { ...state, rootCatalog: list, allCategories: allCatalog }

    case CATALOG__CREATE_ITEM:
      // создание новой "Категории"
      const newItem = action.payload.response;
      newItem.active = false;
      newItem.addNewItem = false;
      newItem.selected = false;
      // если создается не корневая директория (в объекте есть parent )
      if (action.payload.parent) {
        const { id } = action.payload.parent;
        return { ...state, [id]: [...state[id], newItem], allCategories: [...allCategories, newItem] }
      }
      else {
        return { ...state, rootCatalog: [...rootCatalog, newItem], allCategories: [...allCategories, newItem] }
      }



    case CATALOG__SET_NAME_DIR:
      return { ...state, name: action.payload }
    default:
      return state
  }
}