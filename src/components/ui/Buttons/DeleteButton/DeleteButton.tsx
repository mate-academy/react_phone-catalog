import { useShopContext } from '../../../../context/ShopContext/ShopContext';
import { Item } from '../../../../types/Item';
import { Product } from '../../../../types/Producst';
import s from './DeleteButton.module.scss';

type Props = {
  product: Product | Item;
};

export const DeleteButton: React.FC<Props> = ({ product }) => {
  const { deleteItem } = useShopContext();

  return (
    <button
      className={s.deleteButton}
      onClick={() => {
        deleteItem(product, 'inCart');
      }}
    >
      <img src="/img/icons/delete.svg" alt="delete" />
    </button>
  );
};
