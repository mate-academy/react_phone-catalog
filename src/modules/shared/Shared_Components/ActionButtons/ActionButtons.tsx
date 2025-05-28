import classNames from 'classnames';
import React, { useContext } from 'react';
import { FavouritesContext } from '../../../../Store/FavouritesStore';
import { UpdatedProduct } from '../../Types/types';
import { isAddedToList, newListOfSavedItems } from './utils/utilsFunctions';
import { CartStoreContext } from '../../../../Store/CartStore';
import { PrimaryButton } from './PrimaryButton';
import { DarkModeContext } from '../../../../Store/StoreThemeMode';

interface Props {
  item: UpdatedProduct;
}

export const ActionButtons: React.FC<Props> = ({ item }) => {
  const { favourites, setFavourites } = useContext(FavouritesContext);
  const { cartList, setCartList } = useContext(CartStoreContext);
  const { isDark } = useContext(DarkModeContext);

  const buttonText = isAddedToList(item, cartList)
    ? 'Added to cart'
    : 'Add to cart';

  const onClickHandler = () => {
    setCartList(newListOfSavedItems(item, cartList));
  };

  const isAdded = isAddedToList(item, favourites);

  return (
    <div className="buttons">
      <PrimaryButton
        title={buttonText}
        onClickHandler={onClickHandler}
        isDisabled={isAddedToList(item, cartList)}
      />

      <button
        onClick={() => setFavourites(newListOfSavedItems(item, favourites))}
        className={classNames('buttons__button-favorites', {
          'buttons__button-favorites--is-added': isAdded,
          'buttons__button-favorites--is-Dark': isDark,
          'buttons__button-favorites--is-Dark-Added': isDark && isAdded,
        })}
      />
    </div>
  );
};
