import React, { useEffect, useRef, useState } from 'react';


import './formProduct.css'
import FormTitle from '../../../Titles/FormTitle';
import config from '../../../../../config';
import SelectCategory from './formSelectCategory';
import FormImgGalery from './formImgGalery';
import FormDetails from './FormDetails';
import FormPromo from './formPromo';

export default function FormNameProduct({ templateData, type, titleForm, action, fill = false }) {


  const [activity, setActivity] = useState(false);
  const [formError, setFormError] = useState(false);
  const [styleForm, setStyleForm] = useState('');
  const [title, setTitle] = useState(titleForm);
  const [form_Value, setForm_Value] = useState('');
  // ----------------------file
  const [form_File, setForm_File] = useState(null);
  const [loader, setLoader] = useState(false)
  // -------------------------array files----------


  const render = () => {
    switch (type) {
      case 'textarea':
        return (
          <>
            {activity || form_Value
              ? ''
              : <p className='form-nameProduct_placeholder'>
                {templateData}
              </p>}
            <textarea spellCheck='false' className='form-nameProduct__name-textArea'
              onChange={(e) => setForm_Value(e.target.value)}
              value={form_Value} />
          </>
        )
      case 'shortDescription':
        return (
          <>
            {
              activity || form_Value
                ? ''
                : <p className='form-nameProduct_placeholder-description'>{templateData}</p>
            }
            <textarea spellCheck='false'
              className='form-nameProduct__description'
              onChange={(e) => setForm_Value(e.target.value)}
              value={form_Value} />
          </>
        )
      case 'input':
        return (
          <>
            {activity || form_Value
              ? ''
              : <p className='form-nameProduct_input-placeholder'>{templateData}</p>
            }
            <input className='form-nameProduct__input'
              onChange={(e) => setForm_Value(e.target.value)} value={form_Value} />
          </>
        )
      case 'image':
        const loaderDiv = <div>Loader</div>
        return (
          <>
            <label className='form-nameProduct__uploadPreview'>
              {
                loader
                  ? loaderDiv
                  : !form_Value
                    ? <img src={`/img/${templateData}`} alt="preview" />
                    : <img className='uploadPreview-img' src={`/upload/${form_Value}`} alt="preview" />
              }
              <input type='file'
                onChange={(e) => setForm_File(e.target.files[0])}
              />
            </label>
          </>
        )
      case 'inputPrice':
        let currencyURL = '';
        if (config._CURRENCY === 'Euro') {
          currencyURL = 'icon_euro.svg'
        }
        return (
          <>
            {activity || form_Value
              ? ''
              : <p className='form-nameProduct_input-placeholder price'>{templateData}</p>
            }
            <img className='iconCurrency' src={`/img/${currencyURL}`} alt='iconCurrency' />
            <input className='form-nameProduct__input input-price'
              onChange={(e) => setForm_Value(e.target.value)} value={form_Value} />
          </>
        )
      case 'select':
        return (
          <SelectCategory action={(data) => {
            setForm_Value(data)
            action(data)
          }} />
        )
      case 'description':
        return (
          <>
            {
              activity || form_Value
                ? ''
                : <p className='form-nameProduct_placeholder-description-text'>{templateData}</p>
            }
            <textarea spellCheck='false'
              className='form-nameProduct__description-text'
              onChange={(e) => setForm_Value(e.target.value)}
              value={form_Value} />
          </>
        )
      case 'previews_img':

        return (
          <FormImgGalery
            action={(data) => {
              setForm_Value(data)
              action(data)
            }}
            templateNameImg={templateData}
          />
        )
      case 'details':
        return (
          <FormDetails
            templateData={templateData}
            action={(data) => {
              setForm_Value(data)
              action(data)
            }}
          />
        )
      case 'promo':
        return (
          <FormPromo
            action={(data) => {
              setForm_Value(data)
              action(data)
            }}
          />
        )
      default:
        return '';
    }
  }



  useEffect(() => {
    !activity && !form_Value
      ? setFormError(true)
      : setFormError(false)
  }, [activity, form_Value])




  useEffect(() => {
    if (formError) {
      setTitle('Form is not completed')
      setStyleForm('alert')
    }
    else {
      setTitle(titleForm)
      setStyleForm('')
    }
  }, [formError])


  useEffect(() => {
    setFormError(false)
  }, [])


  useEffect(() => {
    async function uploadFile(obj) {
      const formData = new FormData();
      formData.append('previewUrl', obj, obj.name);
      const response = await fetch('/api/uploadPreview', {
        method: 'POST',
        body: formData
      })
      if (response.status === 200) {
        const rezult = await response.json();
        return rezult.file;
      }

    }

    if (form_File) {
      setLoader(true)
      uploadFile(form_File)
        .then(nameFile => {
          setForm_Value(nameFile)
          action(nameFile)
          setLoader(false)

        })
    }
  }, [form_File])

  return (
    <form className={`addProduct__form-nameProduct ${styleForm}`}
      onFocus={() => {
        setActivity(true);
        setStyleForm('active')
      }}
      onBlur={(e) => {
        setActivity(false);
        action(form_Value)
        setStyleForm('')
      }}
    >
      <FormTitle title={title} style={styleForm} fill={fill} />
      {activity
        ? <img className='form-nameProduct__imgEdit' src='/img/icon_edit.svg' alt='iconEdit' />
        : ''}
      {render()}
    </form>
  )
}