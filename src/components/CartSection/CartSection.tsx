import React from 'react';
import { NavLink } from 'react-router-dom'


export const CartSection = () => {
  return (
  <>
      <div className="customer-section__item">
        <NavLink to="" className="customer-section__link customer-section__link--fav" />
      </div>
      <div className="customer-section__item">
        <NavLink to="" className="customer-section__link customer-section__link--cart" />
      </div>
    </>
  )
}

