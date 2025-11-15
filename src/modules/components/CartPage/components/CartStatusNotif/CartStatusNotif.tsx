import React from 'react';
import './CartStatusNotif.scss';
import { ImageData } from '../../../../shared/types/Image';
import classNames from 'classnames';

type CartStatusNotifProps = {
  cartType?: 'cartFilled' | 'cartEmpty';
  image: ImageData;
  message: string;
};

export const CartStatusNotif: React.FC<CartStatusNotifProps> = ({
  cartType,
  image,
  message,
}) => {
  return (
    <div
      className={classNames('image-notif', {
        'image-notif--cart-is-filled': cartType === 'cartFilled',
        'image-notif--products-page': !cartType,
      })}
    >
      <span className="image-notif__title">{message}</span>
      <img className="image-notif__image" src={image.src} alt={image.alt} />
    </div>
  );
};
