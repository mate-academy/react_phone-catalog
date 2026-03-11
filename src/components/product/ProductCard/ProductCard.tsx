import './ProductCard.scss';
import { ProductPrice } from '../ProductPrice/ProductPrice';
import { ProductFeatures } from '../ProductFeatures/ProductFeatures';
import { ProductActions } from '../ProductActions/ProductActions';
import { Product, ProductDetails } from '@/types/Product';
import React from 'react';
import { useAppContext } from '@hooks/useAppContext';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
interface Props {
  product?: Product | ProductDetails;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { toggleCart, isInCart, toggleFavorite, isFavorite } = useAppContext();

  if (!product) return null;

  const productId = 'itemId' in product ? product.itemId : product.id;
  const stringId = String(productId);

  const currentPrice =
    product.priceDiscount ?? ('price' in product ? product.price : 0);
  const fullPrice =
    product.priceRegular ?? ('fullPrice' in product ? product.fullPrice : 0);

  const imagePath =
    'images' in product ?
      Array.isArray(product.images) ?
        product.images[0]
      : product.images
    : 'image' in product ? product.image
    : '';
  const imageUrl = imagePath ? `/${imagePath}` : '';

  const idString = stringId.toLowerCase();
  let category = 'phones';
  if (idString.includes('ipad')) category = 'tablets';
  else if (idString.includes('watch')) category = 'accessories';
  else if ('category' in product && product.category)
    category = product.category;

  return (
    <div className="card">
      <div className="card__container">
        <Link
          to={`/${category}/${productId}`}
          className="card__link"
        >
          <div className="card__img-container">
            {imageUrl && (
              <motion.img
                className="card__image"
                src={imageUrl}
                alt={product.name}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
          <div className="card__title-wrapper">
            <h2 className="card__title">{product.name}</h2>
          </div>
        </Link>
        <ProductPrice
          currentPrice={currentPrice}
          fullPrice={fullPrice}
        />
        <ProductFeatures
          screen={product.screen}
          capacity={product.capacity}
          ram={product.ram}
        />
        <ProductActions
          handleToggleCart={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleCart(product as Product);
          }}
          onToggleFavorite={() => {
            toggleFavorite(product as Product);
          }}
          isFavorite={isFavorite(stringId)}
          isInCart={isInCart(product as Product)}
        />
      </div>
    </div>
  );
};
