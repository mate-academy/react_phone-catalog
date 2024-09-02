import classNames from 'classnames';
import { ProductType } from '../../types/ProductType';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { ProductTypeExtended } from '../../types/ProductTypeExtended';

type Props = {
  className?: string;
  product: ProductType | ProductTypeExtended;
};

export const AddToCart: React.FC<Props> = ({ className = '', product }) => {
  const { products, cartItems, addItem } = useContext(AppContext);

  const isProductExtended = (
    prod: ProductType | ProductTypeExtended,
  ): prod is ProductTypeExtended => {
    return (prod as ProductTypeExtended).priceRegular !== undefined;
  };

  const productToAdd: ProductType = isProductExtended(product)
    ? (products.find(p => p.itemId === product.id) as ProductType)
    : (product as ProductType);

  const isExistingInCart = cartItems.find(item => item.id === productToAdd.id);

  return (
    <button
      className={classNames(`${className} button add-to-cart`, {
        'add-to-cart--added': isExistingInCart,
      }).trim()}
      type="button"
      onClick={() => addItem(productToAdd, 'cart')}
      disabled={isExistingInCart && true}
    >
      {isExistingInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
