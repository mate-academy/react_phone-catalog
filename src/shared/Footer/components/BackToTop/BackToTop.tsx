import { icons } from '../../../global/Icons';
import styles from './BackToTop.module.scss';
import { RoundedArrow } from '../../../../components/RondedArrowBtn';
import { scrollToTop } from '../../../../helpers/scrollToTop';

export const BackToTop = () => {
  return (
    <button className={styles.toTopBtn} onClick={scrollToTop}>
      <p>Back to top</p>
      <RoundedArrow icon={icons.arrowTop} />
    </button>
  );
};
