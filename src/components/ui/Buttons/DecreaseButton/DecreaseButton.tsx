import { useShopContext } from '../../../../context/ShopContext/ShopContext';
import { CartProduct } from '../../../../types/CartProduct';
import s from './DecreaseButton.module.scss';

type Props = {
  item: CartProduct;
};

export const DecreaseButton: React.FC<Props> = ({ item }) => {
  const { changeQuantity, deleteItem } = useShopContext();

  return (
    <button
      className={s.decreaseButton}
      onClick={() =>
        item.quantity === 1
          ? deleteItem(item)
          : changeQuantity(item, 'decrease')
      }
    >
      <img src="img/icons/minus.png" alt="descrease" />
    </button>
  );
};
