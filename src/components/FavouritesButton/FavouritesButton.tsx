// import { useState } from "react";
import { FavouritesIcon } from '../Icons/FavouritesIcon';

import styles from './FavouritesButton.module.scss';

export const FavouritesButton = () => {
  // const [imgButton, setImgButton] = useState('');

  // const handleButtonFavorite = () => {
  //   setImgButton(
  //     isLiked ? 'img/icons/favourite.svg' : 'img/icons/fillHeart.svg',
  //   );
  // };

  return (
    <div className={styles.favouriteButton}>
      <FavouritesIcon />
    </div>
  );
};
