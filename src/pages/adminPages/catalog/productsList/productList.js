import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './productList.css';
import { _getProductsInCategory } from '../../../../actions/listProduct_action';
import { _createProduct, _editProduct } from '../../../../actions/catalog/catalog_action';
import ProductItem from './productItem';
import { _modalWindow } from '../../../../actions/adminPage/action_adminPage'

export default function ProductList() {
  const { selectedID } = useSelector(state => state.catalogStore);
  const { selectedProducts, selectedProductID } = useSelector(state => state.listProductsStore);
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(_getProductsInCategory(selectedID))
  }, [selectedID])

  return (
    <div className='ProductList'>
      <div className='CatalogList__header'>
        <h5>Products List</h5>
        <div className='CatalogList__header__control'>
          <button type='button' onClick={() => dispatch(_editProduct(selectedProductID))}>
            <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
              <path d="M18.332 4.73984L15.8721 2.27994C15.6768 2.08468 15.3603 2.08468 15.165 2.27995L6.9243 10.5206L10.0913 13.6876L18.332 5.44695C18.5273 5.25168 18.5273 4.9351 18.332 4.73984Z" />
              <path d="M6.58012 10.519L6.57955 13.9798L10.1248 13.9798" />
              <path d="M9.53139 3.45238L7.53139 1.57002L1.37148 1.57002L1.37109 18.093H16.0621V13.0001" />
            </svg>
          </button>
          <button type='button' onClick={() => dispatch(_createProduct(selectedID))}>
            <svg width="22" height="24" viewBox="0 0 22 24" fill="none">
              <path d="M7.05127 18.0145H1.05859L1.05908 1.57002H10.5513L15.5513 6.36632V9.06183" />
              <path d="M10.5508 2.06183V7.0515H15.5508" />
              <path d="M15.5508 13.0618L15.5508 23.0618" />
              <path d="M10.5508 18.0618L20.5508 18.0618" />
            </svg>
          </button>
          <button type='button'
            onClick={() => {
              if (selectedProductID && selectedID !== 'root')
                dispatch(_modalWindow('DEL_PRODUCT_ITEM'))
            }}
          >
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M5.38477 3.60843V1.73853H13.3344V3.60843" />
              <rect x="1.55371" y="3.83424" width="15.6111" height="3.52119" />
              <path d="M3.8584 7.60712L3.85851 18.235H6.49369M14.8618 7.60712V14.8119" />
              <path d="M9.86133 18.2615L19.8613 18.2615" />
            </svg>

          </button>
        </div>
      </div>
      <div>
        {selectedProducts.map(item => {
          return (
            <ProductItem
              data={item}
              key={item._id}
            />
          )
        })}
      </div>
    </div>
  )
}