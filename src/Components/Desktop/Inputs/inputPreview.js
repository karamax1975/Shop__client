import React from 'react';
import { useSelector } from 'react-redux';
import './inputPreview.css'

export default function InputPreview({ style, value, action }) {

  const { preloader } = useSelector(state => state.productStore)


  return (
    <div className={`preview ${style}`}>
      <label>
        <input type='file' onChange={(e) => action({ oldImg: value, newImg: e.target.files[0] })} />
        {preloader
          ? <div>Preloader</div>
          : <>
            {value
              ? <img className='preview__previewImg' src={`upload/${value}`} />
              : <img src="/img/previewImg.svg" alt="icon-preview" />
            }
          </>
        }

      </label>
    </div>
  )
}