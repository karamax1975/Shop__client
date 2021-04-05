import React from 'react';
import { _delItem } from '../../../actions/catalog/catalog_action';
import { _modalWindow } from '../../../actions/adminPage/action_adminPage';
import { _delProduct, _delProductInList } from '../../../actions/listProduct_action';
import { useDispatch, useSelector } from 'react-redux';

export default function ModalWindow({ type }) {
  let action = null;
  let text = null;
  const { selectedID } = useSelector(state => state.catalogStore);
  const { selectedProductID } = useSelector(state => state.listProductsStore);
  const { id } = useSelector(state => state.userStore)
  const dispatch = useDispatch();


  switch (type) {

    case 'DEL_CATALOG_ITEM':
      action = async () => {
        const result = await dispatch(_delItem(selectedID))
        dispatch(_modalWindow(null))
      }
      text = 'Are you sure you want to delete?'
    // eslint-disable-next-line no-fallthrough
    case 'DEL_PRODUCT_ITEM':
      action = () => {
        dispatch(_delProduct(selectedProductID, id))
        dispatch(_delProductInList(selectedProductID))
        dispatch(_modalWindow(null))
      }
      text = 'Are you sure you want to delete?';
    // eslint-disable-next-line no-fallthrough
    default: break

  }
  return (
    <div className='modalAlert' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', background: 'rgba(51, 51, 51, 0.8)' }}>
      <div className="modalAlert__confirm">
        <h3>{text}</h3>
        <div className='button-row'>
          <button className='btn sea' onClick={action}>Confirm</button>
          <button className='btn gray' onClick={() => dispatch(_modalWindow(null))}>Cancel</button>
        </div>
      </div>
    </div>
  )
}