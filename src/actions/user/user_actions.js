
import { AUTHORIZATION } from '../../reducers/Types'

export function _getUserId(id, role) {
  return {
    type: AUTHORIZATION,
    payload: {
      id,
      role
    }

  }
}


