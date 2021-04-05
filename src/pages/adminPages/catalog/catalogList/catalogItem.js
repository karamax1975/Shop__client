import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  _subDir,
  _createSubDir,
  _setNameDir,
  _createCatalogItem,
  _getSubDir,
  _eventRemoveAddItem,
  _selectedItem,
  _cancelEditItem,
  _setValueEditableItem,
  _renameItem
} from '../../../../actions/catalog/catalog_action';
import InputUniversal from '../../../../Components/Desktop/Inputs/inputUniversal';
import SmallButton from '../../../../Components/Desktop/Buttons/smallButton';
import './catalogItem.css'

export default function CatalogItem({ data, padding }) {
  const dispatch = useDispatch();
  const { name, editName } = useSelector(state => state.catalogStore);
  const catalogStore = useSelector(state => state.catalogStore);
  const [alert, setAlert] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    if (data.edit) {
      inputRef.current.focus();
    }
  }, [data.edit])

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
        <div className='title-icon' onClick={() => dispatch(_subDir(data._id))}>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" >
            <path d="M14.79 1.60529L7.99997 8.39502L1.21023 1.60529" stroke="#31CED8" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        {
          data.edit
            ? <div className="CatalogItem_rename">
              <input type='text' placeholder={data.name} value={editName} onChange={(e) => dispatch(_setValueEditableItem(e.target.value))} ref={inputRef} />
              <button type="button" className="btn-rename-reset"
                onClick={() => dispatch(_cancelEditItem(data._id))}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" >
                  <path d="M1.46484 1.52631L8.53591 8.59737" />
                  <path d="M1.46484 8.59735L8.53591 1.52628" />
                </svg>
              </button>
              <button type="button"
                onClick={() => dispatch(_renameItem(data._id, editName))}
              >Ok</button>
            </div>
            : <span
              onClick={() => dispatch(_subDir(data._id))}
            >
              {data.name}
            </span>
        }

      </div>
      {
        data.addNewItem
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
      {
        data.selected && catalogStore[data._id]
          ? <ul className='sub'>
            {catalogStore[data._id].map(item => <CatalogItem
              key={item._id}
              data={item}
              padding={padding + 10}
            />)}
          </ul>
          : null
      }
    </li >
  )
}