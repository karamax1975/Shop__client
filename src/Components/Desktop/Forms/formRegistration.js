import React, { useEffect, useState } from 'react';
import InputText from '../Inputs/inputText';
import Button from '../Buttons/button';
import './formRegistration.css';

export default function FormRegistration({ action, feedback }) {



  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [validId, setValidId] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [idTextAlert, setIdTextAlert] = useState('');
  const [passwordTextAlert, setPasswordTextAlert] = useState('');
  const [confirmation, setConfirmation] = useState('')
  const [clearForm, setClearForm] = useState(false);

  useEffect(() => {
    if (feedback === 401) {
      setValidPassword(false);
      setValidId(false);
      setPasswordTextAlert('Ошибка заполнения формы');
      setIdTextAlert('Ошибка заполнения формы')
    }
    if (feedback === 200) {
      setClearForm(true)
      setValidPassword(true);
      setValidId(true)
    }
  }, [feedback])


  function getLogin(id) {
    setId(id)
  }
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function getPassword(password) {
    setPassword(password)

  }
  function ConfirmationPassword(password) {
    setConfirmation(password)
  }

  function confirm(e) {
    e.preventDefault();
    if (password.length < 6) {
      setValidPassword(false);
      setPasswordTextAlert('Пароль должен содержать не менее 7 символов');
    }
    else if (password.length > 0 && password.length > 6) {
      setValidPassword(true);
      setPasswordTextAlert('');
    }
    if (!validateEmail(id)) {
      setValidId(false)
      setIdTextAlert('Неправильный email адрес')
    }
    else {
      setValidId(true)
      setIdTextAlert('');
      action(id, password, confirmation)
    }


  }

  return (
    <form onSubmit={(e) => confirm(e)} className='formAuth'>
      <InputText
        type='email'
        placeholder='Введите Ваш ID'
        important={true}
        alert={idTextAlert}
        state={validId}
        action={getLogin}
        clearValue={clearForm}
      />
      <InputText
        type='password'
        placeholder='Пароль'
        important={true}
        alert={passwordTextAlert}
        state={validPassword}
        action={getPassword}
        clearValue={clearForm}
      />
      <InputText
        type='password'
        placeholder='Подтверждение пароля'
        important={true}
        alert={passwordTextAlert}
        state={validPassword}
        action={ConfirmationPassword}
        clearValue={clearForm}
      />
      <p className='formAuth-infoText'>Ваш ID - это адрес Вашей электронной почты, c которым Вы будете зарегистрированны в системе.</p>
      <Button
        type='submit'
        text='Подтвердить'
        object={null}
        style='sea'
      />
    </form>
  )
}