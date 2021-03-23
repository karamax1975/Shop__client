import {
  ADMIN__RENDER_SECTION,
  ADMIN__MODAL_WINDOW
} from '../reducers/Types';
const initialStore = {
  renderSection: null,
  modalWindow: null
}

export default function adminPage(state = initialStore, action) {

  switch (action.type) {
    case ADMIN__MODAL_WINDOW:
      return { ...state, modalWindow: action.payload }
    case ADMIN__RENDER_SECTION:
      return {
        ...state, renderSection: action.payload
      }
    default:
      return state;
  }
}