import { NavButton } from '../../modules/shared/components/NavButton';
import { scrollToTop } from '../../modules/shared/navigate/ToTop';
import styles from './BackToTopButton.module.scss';

export const BackToTopButton = () => {
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
