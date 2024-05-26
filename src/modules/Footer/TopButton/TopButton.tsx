import { scrollTop } from '../../../helpers/helpers';
import TopArrow from './../../../images/icons/slider_top.svg';
import styles from './Top.module.scss';

export const TopButton = () => {
  return (
    <div className={styles.footer__top}>
      <button onClick={scrollTop} className={styles.footer__btn}>
        Back to top <img src={TopArrow} alt="Arrow top button" />
      </button>
    </div>
  );
};
