import { RENDER_FORM__CREATE_CATEGORY, FORM_CATEGORY__SET_NAME_CATEGORY } from '../reducers/Types';

const initialStore = {
  renderFormCreateCategory: false,
  nameCategory: ''
}

export default function categoryStore(state = initialStore, action) {
  switch (action.type) {
    case RENDER_FORM__CREATE_CATEGORY:
      return { ...state, renderFormCreateCategory: action.payload }
    case FORM_CATEGORY__SET_NAME_CATEGORY:
      return { ...state, nameCategory: action.payload }
    default:
      return state
  }
}