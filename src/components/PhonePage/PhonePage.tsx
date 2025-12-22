import React from 'react';
import phones from '../../../public/api/phones.json';
import { useNavigate, useParams } from 'react-router-dom';
import { NotFoundProduct } from '../NotFoundProduct/NotFoundProduct';
import styles from './PhonePage.module.scss';
import HomeIcon from '../../icons/home_icon.png';
import RightArrow from '../../icons/arrows/Disabled_right.png';
import BackArrow from '../../icons/arrows/Active_left.png';

export const PhonePage: React.FC = () => {
  const navigate = useNavigate();

  const { phoneId } = useParams<{ phoneId: string }>();
  const phone = phones.find(p => p.id === phoneId);

  if (!phone) {
    return <NotFoundProduct />
  }
  return (
    <div className={styles.phone_page__container}>
      <div className={styles.phone_page__path}>
        <img src={HomeIcon} alt="Home page" className={styles.phone_page__path__icon} />
        <img src={RightArrow} alt="Next" className={styles.phone_page__path__arrow} />
        <p className={styles.phone_page__path__text}>Phones</p>
        <img src={RightArrow} alt="Next" className={styles.phone_page__path__arrow} />
        <p className={styles.phone_page__path__name}>{phone.name}</p>
      </div>

      <div className={styles.phone_page__back} onClick={() => navigate(-1)}>
        <img src={BackArrow} alt="Back" className={styles.phone_page__back__icon} />
        <p className={styles.phone_page__back__text}>Back</p>
      </div>

      <h2 className={styles.phone_page__title}>{phone.name}</h2>
    </div>
  );
}
