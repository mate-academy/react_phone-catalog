import './Phones.style.scss';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loadProducts } from '../../../features/ProductsSlice/ProductsSlice';

import { Product } from '../../../types/Product';

import { ProductCard } from '../../shared/ProductCard/ProductCard';

export const Phones = () => {
  const dispatch = useAppDispatch();
  const phonesList = useAppSelector(state => state.products.products).filter(product => product.category === 'phones');

  useEffect(()=> {
    dispatch(loadProducts());
  },[]);

  return (
    <div className='phone-catalog'>
      {phonesList.length > 0 &&
        phonesList.map((phone: Product) => {
          return <ProductCard key={phone.id} product={phone} />;
        })}
    </ div>
  );
};
