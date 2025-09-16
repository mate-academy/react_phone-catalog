import scss from './BackToTheTop.module.scss';

export const BackToTheTop = () => {
  return (
    <div className={scss.backToTheTop}>
      <span className={scss.backToTheTop__text}>Back to the top</span>
      <button
        className={scss.backToTheTop__button}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className={scss.backToTheTop__icon}>
          <use href="/icons/icons.svg#arrow"></use>
        </svg>
      </button>
    </div>
  );
};
