import { AUTHORIZATION } from './Types';
const initialStore = {
  // authorization: false,
  id: null,
  role: null
}

export default function userStore(state = initialStore, action) {
  switch (action.type) {
    // case AUTHORIZATION:
    //   return {
    //     ...state,
    //     authorization: action.status,
    //     id: action.userID
    //   }
    case AUTHORIZATION:
      return {
        ...state, id: action.payload.id, role: action.payload.role
      }
    default:
      return state;
  }

}
