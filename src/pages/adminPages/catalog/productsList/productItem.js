import React from 'react';
import './productItem.css';
import { config } from '../../../../config';
import { _selectProduct } from '../../../../actions/listProduct_action';
import { useDispatch } from 'react-redux';

export default function ProductItem({ data }) {

  const dispatch = useDispatch();
  return (
    <div
      className={`ProductList__product-item ${data.selected ? 'selected' : null}`}
      onClick={() => dispatch(_selectProduct(data._id))}
    >
      <div>
        <h5>{data.name}</h5>
        <p>{data.brand}</p>
      </div>
      <div>
        <span>{config._CURRENCY_SIGN}</span>
        <span>{data.price}</span>
      </div>
    </div>
  )
}