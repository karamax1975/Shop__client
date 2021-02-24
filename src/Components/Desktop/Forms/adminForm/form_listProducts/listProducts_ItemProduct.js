import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux'


import './listProductsItemProduct.css';
import Checkbox from '../../../Inputs/checkbox';
import EditProduct from './editProduct/editProduct';
import { _warningDelete, _changeActivity } from '../../../../../actions/listProduct_action';
import { _loadProduct } from '../../../../../actions/product/action_addProduct'

export default function ListProductsItemProduct({ data }) {
  const { date, _id, activity } = data

  const dispatch = useDispatch()
  const [focusProduct, setFocusProduct] = useState(false);
  const [flagEditProduct, setFlagEditProduct] = useState(false)

  const itemProductRef = useRef();

  function edit() {
    setFlagEditProduct(true)
    dispatch(_loadProduct(data))
  }


  useEffect(() => {
    function onBlur(e) {
      if (itemProductRef.current !== null && !itemProductRef.current.contains(e.target)) {
        setFocusProduct(false);
      }
    }
    document.body.addEventListener('click', onBlur)
    return () => {
      document.body.removeEventListener('click', onBlur);
    }
  }, [])


  return (
    <div className={`listProducts__itemProduct ${focusProduct ? 'active' : ''}`}
      onClick={() => setFocusProduct(true)}
      ref={itemProductRef}
    >
      {
        !flagEditProduct ?
          <div className={`itemProduct__wrapper ${!data.activity ? 'disabled' : ''}`}>
            <div className='itemProduct__activity'>
              <Checkbox
                style='checkbox-sea'
                action={() => dispatch(_changeActivity(data))}
                check={activity}
              />
            </div>
            <div className="itemProduct__preview">
              <img src={`/upload/${data.preview}`} alt={data.name} />
            </div>
            <div className="itemProduct__name">
              <p>{data.name}</p>
            </div>
            <div className="itemProduct__brand"><p>{data.brand}</p></div>
            <div className="itemProduct__category">{data.category.map(item => <p key={item._id}>{item.name}</p>)}</div>
            <div className="itemProduct__prise"><p>{`€`} {data.price}</p></div>
            <div className="itemProduct__date">
              <span>{`${date.slice(0, 10)}`}</span>
              <span>{`${date.slice(11, 16)}`}</span>
            </div>
            {focusProduct
              ? <div className={`itemProduct__focus`}>
                <button type='button' className='focus__editProduct'
                  onClick={edit}
                >
                  <img src="img/icon_edit.svg" alt='icon_edit' />
                  <span>Edit</span>
                </button>
                <button className='focus__delProduct'
                  onClick={() => dispatch(_warningDelete(true, _id))}>
                  <img src='img/icon_trash.svg' alt='icon_trash' />
                  <span>Delete</span>
                </button>
              </div>
              : ''
            }
          </div>
          : <EditProduct
            close={(status) => setFlagEditProduct(status)}
          />
      }
    </div>
  )
}