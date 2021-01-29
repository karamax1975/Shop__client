import React from 'react';
import './header.css'

import AdminTopHeader from './adminTopHeader';
import AdminBottomHeader from './adminBottomHeader'

export default function headerAdmin() {

  return (
    <header>
      <AdminTopHeader />
      <AdminBottomHeader />
    </header>
  )
}