import classNames from 'classnames';
import { ProductType } from '../../types/ProductType';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { Icon } from '../Icon';

type Props = {
  className?: string;
  product: ProductType;
};

export const AddToFav: React.FC<Props> = ({ className = '', product }) => {
  const { favItems, addItem } = useContext(AppContext);
  const isExistingInFav = favItems.find(item => item.id === product.id);

  return (
    <button
      className={classNames(`${className} add-to-fav`.trim(), {
        'add-to-fav--added': isExistingInFav,
      })}
      type="button"
      onClick={() => addItem(product, 'fav')}
    >
      <Icon iconName={isExistingInFav ? 'icon-heart-filled' : 'icon-heart'} />
    </button>
  );
};
