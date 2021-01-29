import { RENDER_FORM__CREATE_CATEGORY, FORM_CATEGORY__SET_NAME_CATEGORY } from '../../reducers/Types';

export function _renderForm__category(status) {
  return {
    type: RENDER_FORM__CREATE_CATEGORY,
    payload: status
  }
}
export function _setCategoryName(value) {
  return {
    type: FORM_CATEGORY__SET_NAME_CATEGORY,
    payload: value
  }
}
