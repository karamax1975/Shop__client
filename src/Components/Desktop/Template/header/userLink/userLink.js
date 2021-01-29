import React from 'react';
import { Link } from 'react-router-dom';
import './userLink.css'

export default function UserLink({ nameLink, linkUrl, iconUrl }) {

  return (
    <Link to={`/${linkUrl}`} className='header__userLink'>
      <img src={`/img/${iconUrl}`}></img>
      <span>{nameLink}</span>
    </Link>
  )
} 