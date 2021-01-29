import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Header from '../Components/Desktop/Template/header/header';
import Footer from '../Components/Desktop/Template/footer/footer';
import FormAuth from '../Components/Desktop/Forms/formAuth';
import './auth.css';

export default function Auth() {

  const history = useHistory();
  const [feedback, setFeedBack] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['userData']);

  async function onsubmit(ID, password) {
    const user = {
      ID,
      password
    }
    const responce = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    if (responce.status === 200) {
      setFeedBack(responce.status)
      const rezult = await responce.json();
      const { token, statusUser } = rezult;
      // console.log(token, statusUser);
      if (!cookies.name && token) {
        setCookie('name', token, { samesite: true })
      }
      history.push(`/${statusUser}`)
    }
    else setFeedBack(responce.status)
  }

  useEffect(() => {
    // ---- temp fix bag
    if (cookies.name === 'undefined') {
      removeCookie('name');
    }
  }, [])

  return (
    <>
      <Header />
      <div className='container auth-page'>
        <div className='row'>
          <h1>Please sign in</h1>
          <div className='col-lg-4'>
            <FormAuth action={onsubmit} feedbackForm={feedback} />
            <div className='user-link'>
              <Link to='/registration'>
                <span>Don't have ID? Create one now.</span>
              </Link>
              <Link to='/'>
                <span>Forgot you ID or password?</span>
              </Link>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='auth-help'>
              <h3>Need some help? Call now <a href='tel:020 8891 5321'>020 8891 5321</a></h3>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}