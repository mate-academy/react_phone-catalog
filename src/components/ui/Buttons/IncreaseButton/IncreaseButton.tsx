import { useShopContext } from '../../../../context/ShopContext/ShopContext';
import { Product } from '../../../../types/Producst';
import s from './IncreaseButton.module.scss';
interface CartProduct extends Product {
  quantity: number;
}

type Props = {
  item: CartProduct;
};

export const IncreaseButton: React.FC<Props> = ({ item }) => {
  const { changeQuantity } = useShopContext();

  return (
    <button
      className={s.increaseButton}
      onClick={() => changeQuantity(item, 'increase')}
    >
      <img src="img/icons/Plus.png" alt="increase" />
    </button>
  );
};
