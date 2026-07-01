import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import { AppDispatch, RootState } from '../../app/store/store';
import { fetchProducts } from '../../app/reducers/products';
import { ProductDetails } from './ProductDetails/ProductDetails';
import { ProductNotFound } from './ProductNotFound';

export const ProductDetailsRoute: React.FC = () => {
  const { itemId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { items, status } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'start') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === 'start' || status === 'loading') {
    return (
      <section className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '20vh 0',
          }}
        >
          <BounceLoader size={150} color="#313237" />
        </div>
      </section>
    );
  }

  const product = items.find(item => item.itemId === itemId);

  if (!product || status === 'failed') {
    return <ProductNotFound />;
  }

  return <ProductDetails category={product.category} />;
};
