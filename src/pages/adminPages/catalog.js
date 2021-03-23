import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { _createCatalogItem, _getListCatalogItem } from '../../actions/catalog/catalog_action';
import CatalogList from './catalog/catalogList/catalogList';
import H2Title from '../../Components/Desktop/Titles/h2_title';

export default function Catalog() {

  const { name, rootCatalog } = useSelector(state => state.catalogStore)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_getListCatalogItem())
  }, [])

  return (
    <div>
      <H2Title text='Catalog' />
      <CatalogList
        data={rootCatalog}
      />
    </div>


  )
}