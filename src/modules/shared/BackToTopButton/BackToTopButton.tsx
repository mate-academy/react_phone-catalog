import { BASE_URL } from '../../../utils/variables/base';
import s from './BackToTopButton.module.scss';

export const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={s.buttonWrapper}>
      <span>Back to top</span>
      <button type="button" className={s.button} onClick={scrollToTop}>
        <img
          src={`${BASE_URL}icons/arrow-up.svg`}
          alt="back-to-top"
          className={s.buttonImg}
        />
      </button>
    </div>
  );
};
