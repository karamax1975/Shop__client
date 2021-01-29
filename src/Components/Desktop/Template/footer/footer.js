import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';


export default function Footer() {

  return (
    <footer>
      <div className='container'>
        <div className="row">
          <div className='col'>
            <div className="footer-wrapper">
              <div className="footer__brandName">
                <Link to='/'>
                  <h3>BrandName</h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}