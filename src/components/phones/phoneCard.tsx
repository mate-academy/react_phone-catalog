import React from 'react';
import styles from './phones.module.scss';

interface PhoneCardProps {
  id: number;
  image: string;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
  onClick: () => void;
}

export const PhoneCard: React.FC<PhoneCardProps> = ({
  id,
  image,
  name,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
  onClick,
}) => {
  return (
    <li className={styles.phones_cart} key={id} onClick={onClick}>
      <img src={image} alt="phone" className={styles.phones_img} />
      <p className={styles.phones_name}>{name}</p>
      <div className={`${styles.phones_priceC} flex`}>
        <p className={styles.phones_priceD}>${price}</p>
        <p className={styles.phones_priceR}>${fullPrice}</p>
      </div>

      <p className={styles.phones_screen}>
        Screen <span>{screen.split(' ').slice(0, 2).join(' ')}</span>
      </p>
      <p className={styles.phones_capacity}>
        Capacity <span>{capacity}</span>
      </p>
      <p className={styles.phones_ram}>
        RAM <span>{ram}</span>
      </p>
      <div className={styles.phones_buttonDiv}>
        <button className={styles.phones_buttonBuy}>Add to cart</button>
        <button className={styles.phones_favor}>
          <span className={styles.phones_favor_icon}></span>
        </button>
      </div>
    </li>
  );
};
