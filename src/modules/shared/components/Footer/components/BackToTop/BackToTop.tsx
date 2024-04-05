import style from './BackToTop.module.scss';

export const BackToTop = () => {
  function goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={style.backToTopBlock}>
      <span className={style.text}>Back to top</span>
      <button type="button" className={style.button} onClick={goToTop}>
        <img src="/img/icons/arrow-top.svg" alt="arrow-top" />
      </button>
    </div>
  );
};
