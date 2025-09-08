import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import * as actionsCart from '../../../../app/store/slices/cartSlice';
import * as actionsfavourites from '../../../../app/store/slices/favouritesSlice';

import heart from '../../../../assets/icons/favourites-heart.svg';
import heartLike from '../../../../assets/icons/heart-like.svg';

import styles from './CustomButton.module.scss';

type Props = {
  className: string;
  isActive: boolean;
  id: number;
  isBig?: boolean;
};

export const CustomButton = ({className, isBig, isActive, id}: Props) => {
  const products = useAppSelector(state => state.product.items);
  const dispatch = useAppDispatch();

  const handleToggleProduct = (id: number) => {
    const currentProduct = products.find(item => item.id === id);
    // fix this
    if(!currentProduct) {
      return null;
    }

    if (className === 'addCart') {
      //rename fuction
      dispatch(actionsCart.addToCart({
        id: currentProduct.id,
        category: currentProduct.category,
        image: currentProduct.image,
        price: currentProduct.price,
        itemId: currentProduct.itemId,
        name: currentProduct.name,
        quantity: 1,
      }))
    } else {
      dispatch(actionsfavourites.addToFavourites(currentProduct));
    }
  };

  return (
    <button className={styles[className]} data-big={isBig} data-active={isActive} onClick={() => handleToggleProduct(id)}>
      {className === 'addCart' ? (isActive ? 'Added' : 'Add to cart') : (
        <img src={isActive ? heartLike : heart} alt="Favorite Heart" />
      )}
    </button>
  );
};
