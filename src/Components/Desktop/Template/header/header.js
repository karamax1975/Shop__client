import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import UserLink from '../header/userLink/userLink';
import { useSelector } from 'react-redux';
import AdminHeader from '../../adminTemplate/header/adminTopHeader';

export default function Header() {

  const userStore = useSelector((state) => state.userStore);
  const { authorization } = userStore;

  return (
    <header>
      {authorization
        ? <AdminHeader />
        : ''}
      <div className='top-header'>
        <div className="container">
          <div className='row'>
            <div className='col'>
              <div className="top-header-wrapper">
                <div className="top-header__welcome">
                  <h5>Welcome to the online store of children's goods</h5>
                </div>
                <nav className="top-header__nav">
                  <Link to="/">Home</Link>
                  <Link to="/">About</Link>
                  <Link to="/">Delivery</Link>
                  <Link to="/">Warranty</Link>
                  <Link to="/">Contact</Link>
                </nav>
                <div className="top-header__contacts">
                  <a href="tel:">Call: 020 8891 5321</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='header-wrapper'>
              <div className='header__brandName'>
                <Link to="/">
                  <h4>Brand<b>Name</b></h4>
                </Link>
              </div>
              <nav>
                <UserLink
                  nameLink='LogIn'
                  linkUrl='auth'
                  iconUrl='icon_logIn.svg'
                />
              </nav>
            </div>
          </div>
        </div>
      </div>

    </header>
  )
}