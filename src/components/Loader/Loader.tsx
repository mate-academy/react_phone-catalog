import classNames from 'classnames';
import loaderStyles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={classNames(loaderStyles.loader)}>
      <div className={loaderStyles.loader__content}>
        {/* <div className={loaderStyles.loader__square} />
        <div className={loaderStyles.loader__square} />
        <div className={loaderStyles.loader__square} />
        <div className={loaderStyles.loader__square} />
        <div className={loaderStyles.loader__square} />
        <div className={loaderStyles.loader__square} />
        <div className={loaderStyles.loader__square} />
        <div className={loaderStyles.loader__square} />
        <div className={loaderStyles.loader__square} /> */}
      </div>
    </div>
  );
};
