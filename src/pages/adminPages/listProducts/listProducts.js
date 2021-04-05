import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import List from '../../../Components/Desktop/Forms/adminForm/form_listProducts/listProducts';
import AddProduct from '../../../Components/Desktop/Forms/adminForm/form_listProducts/addProduct/addProduct'
import { _getListProducts, _warningDelete, _delProduct, _createProduct, _addNewProduct } from '../../../actions/listProduct_action';
import './listProducts.css';
import TitleComposite from '../../../Components/Desktop/Titles/titleComposite';
import Button from '../../../Components/Desktop/Buttons/button';
import { ActionButton } from '../../../Components/Desktop/Buttons/actionButton';


export default function ListProducts() {

  const dispatch = useDispatch();
  const { listProducts, modalAlert, idDelProduct, flagCreateProduct } = useSelector(state => state.listProductsStore);
  const { product } = useSelector(state => state.productStore);
  const { id } = useSelector(state => state.userStore);

  useEffect(() => {
    dispatch(_getListProducts())
  }, [])


  async function delProduct() {
    await dispatch(_delProduct(idDelProduct, id))
    dispatch(_warningDelete(false, null))
  }

  return (
    <>
      <TitleComposite title='List products'>
        <ActionButton
          action={() => dispatch(_createProduct(true))}
          icon='icon_addProduct.svg'
          name='Add product'
          style={flagCreateProduct ? 'disable' : 'sea'}
        />
      </TitleComposite>
      <div>
        {flagCreateProduct
          ? <AddProduct
            data={product}
            close={() => dispatch(_createProduct(false))}
            create={(newProduct) => dispatch(_addNewProduct(newProduct))} />
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