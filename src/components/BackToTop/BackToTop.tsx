import styles from './BackToTop.module.scss';

import arrowUpIcon from '/img/icons/arrows/arrow-up-icon.svg';

type Props = {};

const BackToTop: React.FC<Props> = () => {
  return (
    <div className={styles.backToTop}>
      <p>Back To Top</p>
      <div
        className={styles.backToTop__icon}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img src={arrowUpIcon} alt="BackToTop" />
      </div>
    </div>
  );
};

export default BackToTop;
