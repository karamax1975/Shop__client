import React from 'react';
import { Link } from 'react-router-dom';
import './adminTopHeader.css';

export default function AdminTopHeader() {
  return (
    <div className='top-header-admin'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='top-header-admin__wrapper'>
              <div className='top-header-admin__helpInfo'>
                <p>Need some help? Call now: <a href='tel:'>020 8891 5321</a></p>
                <div className="helpInfo__icon"></div>
              </div>
              <div className='top-header-admin__nav'>
                <button>
                  <Link to='/'>Site</Link>
                </button>
                <button>
                  <Link to='/admin'>Admin Page</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}