import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { connect, useDispatch, useSelector } from 'react-redux';


import { _authorization } from '../../actions/user/user_actions';
import AddProduct from '../../pages/adminPages/addProduct/addProd'
import AdminHeader from '../../Components/Desktop/adminTemplate/header/header';
import AdminToolsNavbar from '../../Components/Desktop/adminTemplate/adminToolsNavbar'



function Admin() {

  const dispatch = useDispatch();

  const history = useHistory();

  const [cookies, removeCookie] = useCookies(['userData']);
  const { renderSection } = useSelector(state => state.adminPage);

  async function confirmationUser(cookie) {
    const response = await fetch('/api/login', {
      method: 'POST',
      Authorization: `Bearer ${cookie}`
    })
    if (response.status === 200) {
      const rez = await response.json();
      return rez.userID;

    }
    else history.push('/')
  }


  useEffect(() => {
    // проверка авторизации -- временно отключенно!!!!!
    async function confirm(cookie) {
      if (cookie.name) {
        const userID = await confirmationUser(cookie.name);
        if (userID) {
          dispatch(_authorization(true, userID));
        }
        else {
          // -------------------------- надо удалить куку---------------------------------------------------
          removeCookie('name')
          history.push('/auth')
        }

      } else {
        history.push('/auth');
      };

    }
    confirm(cookies)
    // ---------------------------------------
  }, [])



  const AdminGUI = () => {

    function render() {
      switch (renderSection) {
        case 'add_Product':
          return <AddProduct />

        default:
          return '';
      }

    }

    return (
      <>
        <AdminHeader />
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3'>
              <AdminToolsNavbar />
            </div>
            <div className='col-lg-9'>
              {render()}
            </div>
          </div>
        </div>
      </>


    )
  }


  return (
    cookies.name
      ? <AdminGUI />
      : <Redirect to='/' />

  )
}

// const mapDispatchToProps = {
//   _authorization
// }

const mapStateToProps = (store) => {
  const { userStore } = store;
  return { userStore }
}

export default connect(mapStateToProps, null)(Admin)