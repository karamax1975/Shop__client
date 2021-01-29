import { AUTHORIZATION } from './Types';
const initialStore = {
  authorization: false,
  id: null
}

export default function userStore(state = initialStore, action) {
  switch (action.type) {
    case AUTHORIZATION:
      return {
        ...state,
        authorization: action.status,
        id: action.userID
      }
    default:
      return state;
  }

}