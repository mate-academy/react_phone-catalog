import React from 'react';
import './Category.scss';
import { NavLink } from 'react-router-dom';
export const Category = ({ name, quantity, position }) => {
  return (

    <div className="category">
      <NavLink to={name}>
        <div className={`category__image-wrapper category__image-wrapper_${position}`}>
          <img src={require(`../../../public/img/category-photo-${position}.svg`)}
            alt={name}
            className={`category__img category__img-${position}`}></img>
        </div>
      </NavLink>
      <h3 className="category__title">{name}</h3>
      <a href="#" className="category__items">{quantity} models</a>
    </div>


  )
}