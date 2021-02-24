import React from 'react';
import './listProducts.css';

import FiltersListProducts from './filtersListProduct'
import ListProductsItemProduct from './listProducts_ItemProduct';
import FindProduct from './findProduct'

export default function ListProducts({ data }) {


  const render = data.map(item => {
    return (
      <ListProductsItemProduct key={item._id} data={item} />
    )
  })

  return (
    <div className='listProducts'>
      <FindProduct />
      <FiltersListProducts />
      {data.length > 0
        ? render
        : <div>Preloader</div>
      }
    </div>
  )
}