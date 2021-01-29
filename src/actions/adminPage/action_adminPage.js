import { ADMIN__RENDER_SECTION } from '../../reducers/Types';

export function _selectSection(section) {
  return {
    type: ADMIN__RENDER_SECTION,
    payload: section
  }
}