/* eslint-disable max-len */
/* eslint-disable padded-blocks */
/* eslint-disable no-console */
import classNames from 'classnames';
import { Product } from '../../types/Products';
import { useSearchContext } from '../Context/Context';
import './ButtonAddCard.scss';

interface Props {
  product: Product;
}

export const ButtonAddCard: React.FC<Props> = ({ product }) => {
  const { handleAddToBasket, getBasket } = useSearchContext();

  const isProductAdd = getBasket.find(item => item.id === product.id);

  return (
    <button
      className={classNames('card__button-add',
        { 'card__button-added': isProductAdd })}
      type="button"
      onClick={(e) => {
        e.preventDefault();
        handleAddToBasket(product);
      }}
    >
      {isProductAdd ? 'Added' : 'Add to card'}
    </button>
  );
};
