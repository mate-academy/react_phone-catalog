import { NavButton } from '../../modules/shared/components/NavButton';
import styles from './BackToTopButton.module.scss';

export const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.backToTop} onClick={scrollToTop}>
      Back to top
      <NavButton
        onClick={scrollToTop}
        childrenValue={'./img/image/Icons/VectorUp.svg'}
      />
    </div>
  );
};
