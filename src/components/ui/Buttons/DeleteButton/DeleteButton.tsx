import { useShopContext } from '../../../../context/ShopContext/ShopContext';
import { CartProduct } from '../../../../types/CartProduct';
import s from './DeleteButton.module.scss';

type Props = {
  product: CartProduct;
};

export const DeleteButton: React.FC<Props> = ({ product }) => {
  const { deleteItem } = useShopContext();

  return (
    <button
      className={s.deleteButton}
      onClick={() => {
        deleteItem(product);
      }}
    >
      <img src="img/icons/delete.svg" alt="delete" />
    </button>
  );
};
