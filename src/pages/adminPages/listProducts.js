import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import List from '../../Components/Desktop/Forms/adminForm/form_listProducts/listProducts';
import AddProduct from '../../Components/Desktop/Forms/adminForm/form_listProducts/addProduct/addProduct'
import { _getListProducts, _warningDelete, _delProduct } from '../../actions/listProduct_action';
import { _productCreate } from '../../actions/product/action_addProduct';
import './listProducts.css';
import TitleComposite from '../../Components/Desktop/Titles/titleComposite';
import Button from '../../Components/Desktop/Buttons/button';
import { ActionButton } from '../../Components/Desktop/Buttons/actionButton';


export default function ListProducts() {

  const dispatch = useDispatch();
  const { listProducts, modalAlert, idDelProduct } = useSelector(state => state.listProductsStore);
  const { productCreate } = useSelector(state => state.productStore)
  const { id } = useSelector(state => state.userStore);


  useEffect(() => {
    dispatch(_getListProducts())
  }, [dispatch])

  function delProduct() {
    dispatch(_delProduct(idDelProduct, id))
    dispatch(_warningDelete(false, null))
    dispatch(_getListProducts())
  }

  return (
    <>
      <TitleComposite title='List products'>
        <ActionButton
          action={() => dispatch(_productCreate(true))}
          icon='icon_addProduct.svg'
          name='Add product'
          style={productCreate ? 'disable' : 'sea'}
        />
      </TitleComposite>
      <div>
        {productCreate
          ? <AddProduct />
          : ''
        }
        <List data={listProducts} />
      </div>
      {modalAlert
        ? <div className='modalAlert'>
          <div className='modalAlert__confirm'>
            <h3>Are you sure you want to delete?</h3>
            <div className='button-row'>
              <Button
                text='Confirm'
                style='sea'
                action={delProduct}
              />
              <Button
                text='Cancel'
                style='gray'
                action={() => dispatch(_warningDelete(false, null))}
              />
            </div>
          </div>
        </div>
        : ''
      }

    </>
  )
}