import React from 'react';
import './listProducts.css';

import ListProductsItemProduct from './listProducts_ItemProduct'

export default function ListProducts({ data }) {

  const render = data.map(item => {
    return (
      <ListProductsItemProduct key={item._id} data={item} />
    )
  })

  return (
    <div className='listProducts'>
      {data.length > 0
        ? render
        : <div>Preloader</div>
      }
    </div>
  )
}