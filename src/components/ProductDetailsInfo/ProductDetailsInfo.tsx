// eslint-disable-next-line max-len
import { useEffect } from 'react';
import { Product } from '../../types/Product';
// eslint-disable-next-line max-len
import { ProductDetailsCarousel } from '../ProductDetailsCarousel/ProductDetailsCarousel';
import { ProductDetailsMain } from '../ProductDetailsMain/ProductDetailsMain';

type Props = {
  title: string;
  prodId: Product;
};

export const ProductDetailsInfo: React.FC<Props> = ({ title, prodId }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="productDetailsInfo">
      <h2>{title}</h2>
      <div className="productDetailsInfo__box">
        <div className="productDetailsInfo__carousel">
          <ProductDetailsCarousel />
        </div>
        <div className="productDetailsInfo__main">
          <ProductDetailsMain prodId={prodId} />
        </div>
      </div>
    </section>
  );
};
