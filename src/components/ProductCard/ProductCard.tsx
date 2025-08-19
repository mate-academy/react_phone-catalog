import React from 'react';
import './ProductCard.scss';
import { Product } from '../../utils/Product';
import { useNavigate } from 'react-router-dom';
import { CharacteristicsTable } from '../CharactiristicsTable';
import { Buttons } from '../Buttons';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const getImageSrc = (src: string) => (src.startsWith('/') ? src : '/' + src);

  const navigate = useNavigate();

  return (
    <div className="product" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="product__characteristics">
        <img
          className="product__image"
          src={getImageSrc(product.images[0])}
          alt="product image"
        />

        <p className="product__description">{product.name}</p>

        <div className="product__price-with-discount">
          <p className="product__price product__price--discount">
            ${product.priceDiscount}
          </p>
          <p className="product__price product__price--regular">
            ${product.priceRegular}
          </p>
        </div>
      </div>

      <CharacteristicsTable
        characteristics={[
          { name: 'Screen', value: product?.screen },
          { name: 'Capacity', value: product?.capacity },
          { name: 'RAM', value: product?.ram },
        ]}
      />

      <Buttons product={product} />
    </div>
  );
};
