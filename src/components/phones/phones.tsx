import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhones } from '../../features/phones';
import styles from './phones.module.scss';
import classNames from 'classnames';

export const Phones: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const phones = useSelector((state: RootState) => state.phones.items);

  const status = useSelector((state: RootState) => state.phones.status);

  useEffect(() => {
    dispatch(fetchPhones());
  }, [dispatch]);

  return (
    <section className={classNames(styles.phones, 'container')}>
      <nav className={styles.phones_nav}>
        <a href="/" className={styles.phones_home}></a>
        <a href="/">Phones</a>
      </nav>

      <h2 className={styles.phones_title}>Mobile phones</h2>
      <p className={styles.phones_models}>{phones.length} models</p>
      <ul className={styles.phones_list}>
        {phones.map(phone => {
          return (
            <li className={styles.phones_cart} key={phone.id}>
              <img
                src={phone.images[0]}
                alt="phone"
                className={styles.phones_img}
              />
              <p>{phone.name}</p>
              <div className={classNames(styles.phones_priceC, 'flex')}>
                <p className={styles.phones_priceD}>${phone.priceDiscount}</p>
                <p className={styles.phones_priceR}>${phone.priceRegular}</p>
              </div>

              <p className={styles.phones_screen}>
                Screen <span>{phone.screen}</span>
              </p>
              <p className={styles.phones_capacity}>
                Capacity <span>{phone.capacity}</span>
              </p>
              <p className={styles.phones_ram}>
                RAM <span>{phone.ram}</span>
              </p>
              <div className={styles.phones_buttonDiv}>
                <button className={styles.phones_buttonBuy}>Add to cart</button>
                <button className={styles.phones_favor}>
                  <span className={styles.phones_favor_icon}></span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
