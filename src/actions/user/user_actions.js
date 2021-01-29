
import { AUTHORIZATION } from '../../reducers/Types'

export function _authorization(status, userID) {
  return {
    type: AUTHORIZATION,
    status,
    userID
  }
}
