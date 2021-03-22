import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { _subDir, _createSubDir, _setNameDir, _createCatalogItem, _getSubDir, _eventRemoveAddItem, _selectedItem } from '../../../../actions/catalog/catalog_action';
import InputUniversal from '../../../../Components/Desktop/Inputs/inputUniversal';
import SmallButton from '../../../../Components/Desktop/Buttons/smallButton';
import './catalogItem.css'

export default function CatalogItem({ data, padding }) {
  const dispatch = useDispatch();
  const { name } = useSelector(state => state.catalogStore);
  const catalogStore = useSelector(state => state.catalogStore);
  const [alert, setAlert] = useState(false);





  return (
    <li>
      <div className={`CatalogItem__title ${data.selected ? 'active' : ''} ${data.active ? 'selected' : ''}`}
        style={{ paddingLeft: `${padding}px` }}
        onClick={() => {
          dispatch(_getSubDir(data._id))
          dispatch(_selectedItem(data._id))
          dispatch(_createSubDir(true))
        }}
      >
        <div className='title-icon'
          onClick={() => {
            !data.addNewItem
              ? dispatch(_subDir({ id: data._id, status: true }))
              : dispatch(_subDir({ id: data._id, status: false }));
          }}
        >
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" >
            <path d="M14.79 1.60529L7.99997 8.39502L1.21023 1.60529" stroke="#31CED8" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span>{data.name}</span>
      </div>
      {data.addNewItem
        ? <div className={`CatalogItem_input ${alert ? 'alert' : ''}`} >
          <InputUniversal
            value={name}
            action={(name) => dispatch(_setNameDir(name))}

          />
          <SmallButton
            iconType='reset'
            style='white'
            action={() => {
              dispatch(_eventRemoveAddItem(data._id, false))
              dispatch(_setNameDir(''))
            }}
          />
          <SmallButton
            iconType='add'
            style='sea'
            action={() => {
              if (name) {
                setAlert(false)
                dispatch(_createCatalogItem({ name, parent: { id: data._id, name: data.name } }))
                dispatch(_eventRemoveAddItem(data._id, false))
              }
              else setAlert(true)

            }}
          />
        </div>
        : ''
      }
      {data.selected && catalogStore[data._id]
        ? <ul className='sub'>
          {catalogStore[data._id].map(item => <CatalogItem
            key={item._id}
            data={item}
            padding={padding + 10}
          />)}
        </ul>
        : null
      }
    </li>
  )
}