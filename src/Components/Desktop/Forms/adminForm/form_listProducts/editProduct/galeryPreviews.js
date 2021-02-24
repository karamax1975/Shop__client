import React from 'react';

import InputGallery from '../../../../Inputs/inputGallery';
import './galeryPreviews.css';
import { _deleteImgInGalery } from '../../../../../../actions/product/action_addProduct';
import { useDispatch } from 'react-redux';

export default function GaleryPreviews({ data, action }) {

  const dispatch = useDispatch();

  if (!data) data = []
  const list = data.map((item, index) => {
    return <InputGallery
      key={index}
      style='galery-previews_item'
      value={item}
      galeryMode='true'
      action={(img) => dispatch(_deleteImgInGalery(img))}
    />
  })



  return (
    <div className='galery-previews'>
      <p>Image load: {data.length}</p>
      <div className='galery-previews__wrapper'>
        <InputGallery
          value={false}
          style='galery-previews_item'
          action={(img) => action(img)}
        />
        <div className='preview-scroll'>
          <div className='preview-scroll_list'>{list}</div>
        </div>
      </div>

    </div>
  )
}