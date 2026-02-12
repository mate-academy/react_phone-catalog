import s from './AddButton.module.scss';
import { useShopContext } from '../../../../context/ShopContext/ShopContext';
import { Product } from '../../../../types/Producst';

type Props = {
  size?: 'medium';
  product: Product;
};

export const AddButton: React.FC<Props> = ({ size, product }) => {
  const { inCart, addItems, deleteItem } = useShopContext();
  const isAdded = inCart.find(item => item.id === product.id);
  const title = isAdded ? 'Added to cart' : 'Add to cart';
  const addedProduct = {
    ...product,
    quantity: 1,
  };

  return (
    <button
      className={`${s['add-button']}  ${s[`add-button--${size}`]} ${isAdded ? s[`add-button--disabled`] : null}`}
      onClick={() => (isAdded ? deleteItem(isAdded) : addItems(addedProduct))}
    >
      {title}
    </button>
  );
};
