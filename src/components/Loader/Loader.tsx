import classes from './Loader.module.scss';

export const Loader = () => (
  <div className={classes.Loader} data-cy="loader">
    <div className={classes.Loader__content} />
  </div>
);
