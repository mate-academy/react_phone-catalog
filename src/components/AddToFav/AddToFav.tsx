import classNames from 'classnames';
import { ProductType } from '../../types/ProductType';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { Icon } from '../Icon';
import { ProductTypeExtended } from '../../types/ProductTypeExtended';

type Props = {
  className?: string;
  product: ProductType | ProductTypeExtended;
};

export const AddToFav: React.FC<Props> = ({ className = '', product }) => {
  const { products, favItems, addItem } = useContext(AppContext);

  const isProductExtended = (
    prod: ProductType | ProductTypeExtended,
  ): prod is ProductTypeExtended => {
    return (prod as ProductTypeExtended).priceRegular !== undefined;
  };

  const productToAdd: ProductType = isProductExtended(product)
    ? (products.find(p => p.itemId === product.id) as ProductType)
    : (product as ProductType);

  const isExistingInFav = favItems.find(item => item.id === productToAdd.id);

  return (
    <button
      className={classNames(`${className} add-to-fav`.trim(), {
        'add-to-fav--added': isExistingInFav,
      })}
      type="button"
      onClick={() => addItem(productToAdd, 'fav')}
    >
      <Icon iconName={isExistingInFav ? 'icon-heart-filled' : 'icon-heart'} />
    </button>
  );
};
