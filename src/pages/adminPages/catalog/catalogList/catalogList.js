import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './catalogList.css';
import { _eventAddItem, _setNameDir, _eventRemoveAddItem, _createCatalogItem } from '../../../../actions/catalog/catalog_action';
import { _modalWindow } from '../../../../actions/adminPage/action_adminPage';
import InputUniversal from '../../../../Components/Desktop/Inputs/inputUniversal';
import CatalogItem from './catalogItem';
import SmallButton from '../../../../Components/Desktop/Buttons/smallButton'

export default function CatalogList({ data }) {
  const dispatch = useDispatch();
  let padding = 0;
  const { rootAddItem, name, selectedID } = useSelector(state => state.catalogStore)
  const [alert, setAlert] = useState(false);

  const list = data.map(item => {
    return (
      <CatalogItem
        data={item}
        key={item._id}
        padding={padding}
      />
    )
  })

  return (
    <ul className='CatalogList'>
      <div className='CatalogList__header'>
        <h5>Sections</h5>
        <div className='CatalogList__header__control'>
          <button type='button' onClick={() => dispatch(_eventAddItem(selectedID, !rootAddItem))}>
            <svg width="22" height="24" viewBox="0 0 22 24" fill="none" >
              <path d="M15.5508 13.0618L15.5508 23.0618" />
              <path d="M10.5508 18.0618L20.5508 18.0618" />
              <path d="M6.46875 18.093H0.96875L0.969137 1.57002H7.46914L9.46914 3.45238H15.49V8.95189" />
              <path d="M0.993164 6.92287H15.49" />
            </svg>
          </button>
          {/* <button type='button' onClick={() => dispatch(_delItem(selectedID))}> */}
          <button type='button' onClick={() => {
            if (selectedID !== 'root')
              dispatch(_modalWindow('DEL_CATALOG_ITEM'))
          }}
          >
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M5.38477 3.60843V1.73853H13.3344V3.60843" />
              <rect x="1.55371" y="3.83424" width="15.6111" height="3.52119" />
              <path d="M3.8584 7.60712L3.85851 18.235H6.49369M14.8618 7.60712V14.8119" />
              <path d="M9.86133 18.2615L19.8613 18.2615" />
            </svg>

          </button>
        </div>
      </div>
      {rootAddItem && selectedID === 'root'
        ? <div className={`CatalogItem_input ${alert ? 'alert' : ''}`}>
          <InputUniversal
            value={name}
            action={(name) => dispatch(_setNameDir(name))}
          />
          <SmallButton
            iconType='reset'
            style='white'
            action={() => dispatch(_eventRemoveAddItem('root', false))}
          />
          <SmallButton
            iconType='add'
            style='sea'
            action={() => {
              if (name) {
                setAlert(false)
                dispatch(_createCatalogItem({ name, parent: null }))
                dispatch(_eventRemoveAddItem('root', false))
              }
              else setAlert(true)

            }}
          />
        </div>
        : null
      }
      {list}
    </ul>
  )
}