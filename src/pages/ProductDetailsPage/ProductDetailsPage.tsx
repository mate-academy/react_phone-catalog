import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Home from '../../images/Home.svg';
import Vec_light_right from '../../images/homePage/Vec_light_right.svg';
import Arrow_Left from '../../images/homePage/Arrow_Left.svg';

export const ProductDetails = () => {
  const params = useParams();
  const current = params.productId;

  const goBack = () => {

  }
  
  return (
    <div className='details'>
      <div className='details__container'>
        <div className="details__breadcrumbs">
          <NavLink to="/" className="details__home-link">
            <img 
              src={Home} 
              alt="home" 
              className="details__home" 
            />
          </NavLink>
          <img
            src={Vec_light_right}
            alt="Vector_light_right"
            className="details__arrow-right"
          />
          <div>{current}</div>
          <div className="details__name"></div>
        </div>
        <div>
          <button onClick={() => goBack()}>
            <img 
              src={Arrow_Left} 
              alt="back" 
              className=''
            />
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
