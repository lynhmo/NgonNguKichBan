import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import FooterComponent from '../Footer/FooterComponent'

const DefaultComponent = ({ children }) => {
  return (
    // LAYOUT
    <div>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </div>
  )
}

export default DefaultComponent