import './Category.scss';
import Mobile from '../../../images/Category/Mobile.svg';
import Tablets from '../../../images/Category/Tablets.svg';
import Accessories from '../../../images/Category/Accessories.svg';
import React from 'react';

export const Category = () => {
  return (
    <div className='category'>
      <div className='category__top'>
        <h1 className='category__header'>Shop by category</h1>
      </div>
      <div className='category__container'>
        <div className='category__block'>
          <img 
            src={Mobile}
            alt='Mobile'
            className='category__img category__mobile'
          />
          <p className='category__name'>
            Mobile phones
          </p>
          <div className='category__quantity'>
            models
          </div>
        </div>
        <div className='category__block'>
          <img 
            src={Tablets}
            alt='Tablets'
            className='category__img category__tablets'
          />
          <p className='category__name'>
            Tablets
          </p>
          <div className='category__quantity'>
            models
          </div>
        </div>
        <div className='category__block'>
          <img 
            src={Accessories}
            alt='Accessories'
            className='category__img category__accessories'
          />
          <p className='category__name'>
            Accessories
          </p>
          <div className='category__quantity'>
            models
          </div>
        </div>
      </div>
    </div>
  )
}
