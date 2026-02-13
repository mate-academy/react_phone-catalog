import { ArrowIcon } from '@shared/icons';
import styles from './footerButton.module.scss';

const goToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const FooterButton = () => {
  return (
    <div className={styles.button}>
      <span>Back to top</span>
      <button aria-label="Go to page top" onClick={() => goToTop()}>
        <ArrowIcon />
      </button>
    </div>
  );
};
