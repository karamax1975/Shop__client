import { ADMIN__RENDER_SECTION, ADMIN__MODAL_WINDOW } from '../../reducers/Types';

export function _modalWindow(status) {
  return { type: ADMIN__MODAL_WINDOW, payload: status }
}

export function _selectSection(typeString) {
  return {
    type: ADMIN__RENDER_SECTION,
    payload: typeString
  }
}