import { ADMIN__RENDER_SECTION } from '../reducers/Types';
const initialStore = {
  renderSection: null
}

export default function adminPage(state = initialStore, action) {

  switch (action.type) {
    case ADMIN__RENDER_SECTION:
      return {
        ...state, renderSection: action.payload
      }
    default:
      return state;
  }
}