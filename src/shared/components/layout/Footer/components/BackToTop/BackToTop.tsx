import arrowBack from 'assets/img/icons/arrow-back-white.svg';

import style from './BackToTop.module.scss';

export const BackToTop: React.FC = () => {
  function goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={style.backToTopBlock}>
      <span className={style.text}>Back to top</span>
      <button className={style.button} type="button" onClick={goToTop}>
        <img alt="arrow-top" src={arrowBack} />
      </button>
    </div>
  );
};
