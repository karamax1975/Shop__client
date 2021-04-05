import { CHOICE__LOAD_LIST_CHOICE } from './Types'

const initialStore = {
  listChoice: []
}


export default function choiceStore(state = initialStore, action) {
  switch (action.type) {
    case CHOICE__LOAD_LIST_CHOICE:
      return { ...state, listChoice: action.payload }
    default:
      return state
  }

}