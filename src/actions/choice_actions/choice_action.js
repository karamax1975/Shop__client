import { CHOICE__LOAD_LIST_CHOICE } from '../../reducers/Types';

import API from '../../api/api'
import { GET_CHOICE } from '../../api/endpoint';

export function _loadListChoice() {
  return async dispatch => {
    const response = await API.fetch(GET_CHOICE)
    if (response) dispatch({ type: CHOICE__LOAD_LIST_CHOICE, payload: response })
  }
}