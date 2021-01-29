import React, { useEffect, useState } from 'react';
import InputText from '../../Desktop/Inputs/inputText'
import Button from '../Buttons/button';


export default function FormAuth({ action, feedbackForm }) {

  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null)
  const [validId, setValidId] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [feedbackText, setFeedBackText] = useState(null);
  const [clearForm, setClearForm] = useState(false);


  useEffect(() => {
    if (feedbackForm === 401 || feedbackForm === 400) {
      setValidId(false)
      setValidPassword(false)
      setFeedBackText('Invalid ID')
      setClearForm(false)
    }
    if (feedbackForm === 200) {
      setClearForm(true)
      setValidId(true)
      setValidPassword(true)
    }

  }, [feedbackForm])

  function getLogin(id) {
    setId(id)
  }

  function getPassword(pas) {
    setPassword(pas)
  }

  function getData(e) {
    e.preventDefault();
    action(id, password);
  }

  return (
    <form className='formAuth' onSubmit={(e) => getData(e)}>
      {feedbackForm
        ? <div className='formAuth__alert'>{feedbackText}</div>
        : ''
      }
      <InputText
        type='email'
        placeholder='Enter your ID'
        important={true}
        alert={''}
        state={validId}
        action={getLogin}
        clearValue={clearForm}
      />
      <InputText
        type='password'
        placeholder='Password'
        important={true}
        alert={''}
        state={validPassword}
        action={getPassword}
        clearValue={clearForm}
      />
      <p className='formAuth-infoText'>Your ID is your email address with which you registered in the system.</p>
      <Button
        type='submit'
        text='Sign in'
        object={null}
        style='sea'
      />
    </form>
  )
}