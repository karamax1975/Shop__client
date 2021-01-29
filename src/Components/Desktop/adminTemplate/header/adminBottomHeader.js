import React from 'react'
import { Link } from 'react-router-dom';
import './adminBottomHeader.css'

export default function AdminBottomHeader() {

  return (
    <div className='bottom-header-admin'>
      <div className='container '>
        <div className='row'>
          <div className='col bottom-header-admin_wrapper'>
            <div className='col-lg-3'>
              <div className='bottom-header-admin__brandName'>
                <Link to='/admin'>BrandName</Link>

              </div>
            </div>
            <div className="col-lg-9">
              <div className='bottom-header-admin__tools'>
                <div className='bottom-header-admin__bread-crumbs'>bread crumbs</div>
                <div className='bottom-header-admin__user-nav'>user nav</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}