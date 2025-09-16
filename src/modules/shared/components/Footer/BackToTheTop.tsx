import scss from './BackToTheTop.module.scss';

export const BackToTheTop = () => {
  return (
    <div className={scss.backToTheTop}>
      <a
        href="#top"
        className={scss.backToTheTop__button}
        aria-label="Back to the top"
      >
        <span className={scss.backToTheTop__text}>Back to the top</span>
        <div className={scss.backToTheTop__iconContainer}>
          <svg
            aria-hidden="true"
            focusable="false"
            className={scss.backToTheTop__icon}
          >
            <use href="/icons/icons.svg#arrow"></use>
          </svg>
        </div>
      </a>
    </div>
  );
};
