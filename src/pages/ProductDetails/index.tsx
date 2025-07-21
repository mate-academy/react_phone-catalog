import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductDetails } from '../../features/productDetailsSlice';
import { Category } from '../../types';

export const ProductDetailsPage: React.FC = () => {
  const { productDetails } = useAppSelector(state => state.productDetails);
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const { pathname } = useLocation();
  const category = pathname.split('/')[1] as Category;

  useEffect(() => {
    dispatch(fetchProductDetails({ category, productId }));
  }, [category, dispatch, productId, pathname]);

  if (!productDetails) {
    return <h1>No product details!</h1>;
  }

  return (
    <div className="product-details">
      <h1 className="product-details__title">{productDetails.name}</h1>

      <div className="product-details__image"></div>

      <section className="product-details__about about">
        <h3 className="after:content-[''] after:block after:h-[1px] after:bg-elements">
          About
        </h3>

        {productDetails.description.map(part => (
          <div key={part.title}>
            <h4 className="text-primary">{part.title}</h4>
            <p className="body-text text-secondary">{part.text}</p>
          </div>
        ))}
      </section>

      <section className="product-details__tech-specs tech-specs">
        <h3 className="tech-specs__title">Tech specs</h3>

        <ul>
          <li>Screen - {}</li>
          <li>Resolution</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </section>
    </div>
  );
};
