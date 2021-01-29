import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormRegistration from '../Components/Desktop/Forms/formRegistration';
import { useCookies } from 'react-cookie';

export default function Registration() {

  const history = useHistory();
  const [feedback, setFeedBack] = useState('');
  const [cookies, setCookie] = useCookies(['userData']);


  async function onsubmit(ID, password, confirmation) {

    if (ID && password && password === confirmation) {
      const user = {
        ID,
        password
      }
      const responce = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      if (responce.status === 200) {
        const rezult = await responce.json();
        const { statusUser, token } = rezult;
        if (!cookies) {
          history.push(`/${statusUser}`);
        }
        setCookie('name', token, { samesite: true })
        history.push(`/${statusUser}`);
      }
      setFeedBack(responce.status)
    }
  }


  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-4'>
          <h1>Регистрация</h1>
          <FormRegistration
            action={onsubmit}
            feedback={feedback}
          />
        </div>
      </div>
    </div>
  )
}