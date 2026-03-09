import React from 'react';
import { ProductsType } from '../../../types/ProductsType';
import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { useCurrentPath } from '../../../components/context/PathContext';
import { AddAndFavouritesButton } from '../AddAndFavouritesButton';

type Props = {
  product: ProductsType;
  showDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, showDiscount }) => {
  const { search } = useCurrentPath();

  const screen = product.screen.split(' ').slice(0, 2).join(' ');
  const capacity = product.capacity.replace(/(\d)([A-Za-z])/g, '$1 $2');
  const titleModelPhoto = product.image;
  const modelName = product.name;
  const modelId = product.itemId;
  const category = product.category;
  const id = product.id;
  const priceRegular = `$${product.fullPrice}`;
  const priceDiscount = `$${product.price}`;

  let ram = product.ram;

  if (ram.startsWith('0')) {
    const match = ram.match(/^([\d.]+)([A-Za-z]+)$/);

    if (match) {
      ram = `${Math.round(parseFloat(match[1]) * 1024)}MB`;
    }
  }

  return (
    <div className="productCard productCard__container" key={modelId}>
      <Link
        to={`/${category}/${modelId}`}
        state={{ search }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="productCard__link"
      >
        <div className="product__photo">
          <img src={titleModelPhoto} alt="Device Photo" className="photo" />
        </div>
        <div className="product__name">
          <div className="name">{modelName}</div>
        </div>
      </Link>

      <div className="productCard__price">
        {showDiscount ? (
          <>
            <div className="price">{priceDiscount}</div>
            <div className="price-old">{priceRegular}</div>
          </>
        ) : (
          <div className="price">{priceRegular}</div>
        )}
      </div>
      <div className="line"></div>
      <div className="product__info">
        <div className="product__info--screen">
          <div className="product__info--name">Screen</div>
          <div className="product__info--value">{screen}</div>
        </div>
        <div className="product__info--capacity">
          <div className="product__info--name">Capacity</div>
          <div className="product__info--value">{capacity}</div>
        </div>
        <div className="product__info--ram">
          <div className="product__info--name">RAM</div>
          <div className="product__info--value">{ram}</div>
        </div>
      </div>

      <AddAndFavouritesButton productId={id} />
    </div>
  );
};
