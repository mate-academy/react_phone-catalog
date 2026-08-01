import React from 'react';
import styles from './FooterSlider.module.scss';
import { PrimaryButton } from '../PrimaryButton';
import { ButtonFavourite } from '../ButtonFavourite';

type Props = {
  isDetail?: boolean;
  cartPage: boolean;
  onClick: () => void;
  onClickFavourites: () => void;
  title: string;
  isInCart: boolean;
  image: string;
};

export const FooterSlider = ({
  isDetail,
  onClick,
  onClickFavourites,
  title,
  isInCart,
  image,
}: Props) => {
  return (
    <div className={styles.footerSlider}>
      <PrimaryButton
        text={title}
        cardPage={false}
        onClick={onClick}
        disabled={isInCart}
      />
      <ButtonFavourite
        isDetail={isDetail}
        onClick={onClickFavourites}
        image={image}
      />
    </div>
  );
};
