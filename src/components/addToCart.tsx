import React from 'react';
import { useCart } from './CartContext';
import { ProductDetails } from './ProductDetailsPage';
import './addToCart.scss';

export interface ProductSummary {
  id?: number | string;
  itemId?: string;
  name: string;
  price: number;
  image: string;
  fullPrice?: number;
}

interface AddToCartButtonProps {
  productSummary: ProductSummary | null;
  productDetails: ProductDetails | null | undefined;
  selectedImage?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productSummary,
  productDetails,
  selectedImage,
  className = '',
  onClick,
}) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const isInCart = Boolean(
    productDetails?.id && cart.some(item => item.id === productDetails.id),
  );

  const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }

    if (!productSummary || !productDetails) {
      return;
    }

    if (isInCart) {
      removeFromCart(productDetails.id);
    } else {
      addToCart({
        id: productDetails.id,
        name: productSummary.name,
        price: productSummary.price,
        image: selectedImage || productSummary.image,
        quantity: 1,
      });
    }
  };

  return (
    <button
      type="button"
      className={`product-page__add-to-cart ${
        isInCart ? 'product-page__add-to-cart--selected' : ''
      } ${className}`.trim()}
      onClick={handleCartClick}
      disabled={!productSummary || !productDetails}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
