import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { _getListCatalogItem, _getSubDir, _createProduct, _editProduct } from '../../actions/catalog/catalog_action';
import { _getListProducts, _addNewProduct, _updateListProduct } from '../../actions/listProduct_action';
import CatalogList from './catalog/catalogList/catalogList';
import H2Title from '../../Components/Desktop/Titles/h2_title';
import ProductsList from './catalog/productsList/productList';
import AddProduct from '../../Components/Desktop/Forms/adminForm/form_listProducts/addProduct/addProduct';
import EditProduct from '../../Components/Desktop/Forms/adminForm/form_listProducts/editProduct/editProduct';

export default function Catalog() {

  const { rootCatalog, event_CreateProduct, event_EditProduct } = useSelector(state => state.catalogStore);
  const { selectProductObj } = useSelector(state => state.listProductsStore);
  const dispatch = useDispatch();

  const { product } = useSelector(state => state.productStore);
  useEffect(() => {
    dispatch(_getListCatalogItem())
    dispatch(_getListProducts())
    // очищаю выбранный (если выбран) пункт меню
    return () => dispatch(_getSubDir('root'))
  }, [])
  return (
    <div>
      {
        !event_CreateProduct && !event_EditProduct
          ? <div className='row'>
            <H2Title text='Catalog' />
            <div className='row'>
              <div className='col-lg-5'>
                <CatalogList
                  data={rootCatalog}
                />
              </div>
              <div className='col-lg-7'>
                <ProductsList />
              </div>
            </div>
          </div>
          : event_CreateProduct
            ? <AddProduct
              data={product}
              close={() => dispatch(_createProduct(false))}
              create={(newProduct) => {
                dispatch(_addNewProduct(newProduct))
              }

              }
            />
            : event_EditProduct
              ? <EditProduct
                data={selectProductObj}
                update={(newProduct) => dispatch(_updateListProduct(newProduct))}
                close={() => {
                  dispatch(_editProduct(false))
                }}
              />
              : null

      }
    </div>



  )
}