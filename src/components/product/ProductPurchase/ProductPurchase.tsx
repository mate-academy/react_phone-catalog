import './ProductPurchase.scss';
import { ProductActions } from '../ProductActions';
import { ProductPrice } from '../ProductPrice/ProductPrice';
import React from 'react';
import { ProductDetails } from '@/types/Product';
import { useAppContext } from '@hooks/useAppContext';

type Props = {
  product: ProductDetails;
  priceRegular: number;
  priceDiscount: number;
};

export const ProductPurchase: React.FC<Props> = ({
  product,
  priceRegular,
  priceDiscount,
}) => {
  const { toggleCart, isInCart, toggleFavorite, isFavorite } = useAppContext();

  const stringId = String(product.id);
  const inCart = isInCart(product);
  const favorite = isFavorite(stringId);

  return (
    <div className="purchase">
      <div className="purchase-price">
        <ProductPrice
          currentPrice={priceDiscount}
          fullPrice={priceRegular}
        />
      </div>

      <div className="purchase__buttons">
        <ProductActions
          handleToggleCart={() => toggleCart(product)}
          onToggleFavorite={() => toggleFavorite(product)}
          isInCart={inCart}
          isFavorite={favorite}
        />
      </div>
    </div>
  );
};
