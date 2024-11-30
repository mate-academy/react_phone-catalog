import classNames from 'classnames';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../types/product';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

import '../../styles/main.scss';

type Props = {
  itemData?: Product;
  itemId: string;
};

export const AddToCart: React.FC<Props> = ({ itemData, itemId }) => {
  const { handleCartAction, isInCart } = useCart();

  const productsList = useSelector((state: RootState) => state.products.items);

  // Function to retrieve the current product based on the itemId
  // This is needed when itemData is not passed and we have to find the product in the list
  const getCurrentProduct = (): Product | undefined => {
    return productsList.find(product => product.itemId === itemId);
  };

  const getItemInfo = () => {
    return itemData || getCurrentProduct()!;
  };

  return (
    <button
      className={classNames('buttons-text card-button', {
        active: isInCart(getItemInfo().id),
      })}
      onClick={() => handleCartAction(getItemInfo())}
    >
      {isInCart(getItemInfo().id) ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
