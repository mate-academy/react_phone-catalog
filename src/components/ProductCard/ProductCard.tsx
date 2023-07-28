import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContextProvider';
import { Product } from '../../types/Product';
import { ProductPrice } from '../ProductPrice/ProductPrice';
import { PropertyList } from '../PropertyList/PropertyList';
import { ButtonAddToCart } from '../ButtonAddToCart/ButtonAddToCart';
import './productCard.scss';

export type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    favorites,
    isProductSelected,
    cart,
  } = useContext(AppContext);

  const isProductSelectedinFav = isProductSelected(product.itemId, favorites);
  const isProductSelectedinCart = isProductSelected(product.itemId, cart);

  const { screen, capacity, ram } = product;

  const properties = { screen, capacity, ram };

  return (
    <div className="card">
      <Link className="card__link" to={`/${product.category}/${product.itemId}`}>
        <img
          className="card__image"
          alt={product.name}
          src={product.image}
        />
      </Link>
      <h1 className="card__title">{product.name}</h1>
      <div className="card__price">
        <ProductPrice
          regularPrice={product.fullPrice}
          discountPrice={product.price}
        />
      </div>
      <PropertyList properties={properties} />
      <ButtonAddToCart
        product={product}
        isProductInFav={isProductSelectedinFav}
        isProductInCart={isProductSelectedinCart}
      />
    </div>
  );
};
