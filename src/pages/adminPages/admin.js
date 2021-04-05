import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { connect, useDispatch, useSelector } from 'react-redux';

import { _getUserId } from '../../actions/user/user_actions';
import AdminHeader from '../../Components/Desktop/adminTemplate/header/header';
import AdminToolsNavbar from '../../Components/Desktop/adminTemplate/adminToolsNavbar'
import ListProducts from '../../pages/adminPages/listProducts/listProducts';
import Catalog from './catalog';
import ModalWindow from '../../Components/Desktop/control/modalWindow'



function Admin() {

  const dispatch = useDispatch();

  const history = useHistory();

  const [cookies, removeCookie] = useCookies(['userData']);
  const { renderSection, modalWindow } = useSelector(state => state.adminPage);

  async function auth(controller, cookies) {
    const response = await fetch('api/login', {
      method: 'POST',
      Authorization: `Bearer ${cookies.name}`,
      signal: controller.signal
    })
    if (response.ok) {
      return await response.json();
    }
    else return false

  }

  useEffect(() => {
    const ac = new AbortController();
    auth(ac, cookies).then(data => {
      if (data) {
        dispatch(_getUserId(data.id, data.status))
      }
      else if (cookies.name) {
        removeCookie('name')
        history.push('/auth')
      }
      else history.push('/auth');
    })
    return () => {
      ac.abort()
    }
  }, [])






  function UIRender() {
    switch (renderSection) {
      case 'Catalog':
        return <Catalog />
      case 'Products':
        return <ListProducts />
      default:
        return '';
    }

  }


  return (
    cookies.name
      ?
      <div className='root-content' style={{ position: 'relative' }}>
        <AdminHeader />
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3'>
              <AdminToolsNavbar />
            </div>
            <div className='col-lg-9'>
              {UIRender()}
            </div>
          </div>
        </div>
        {modalWindow
          ? <ModalWindow
            type={modalWindow}
          />
          : null
        }
      </div>
      : <Redirect to='/' />

  )
}


const mapStateToProps = (store) => {
  const { userStore } = store;
  return { userStore }
}

export default connect(mapStateToProps, null)(Admin)