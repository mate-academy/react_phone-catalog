import classNames from 'classnames';
import style from './Skeleton.module.scss';

export const Skeleton = () => {
  return (
    <div className={style.skeleton}>
      {Array.from({ length: 12 }, (_, index) => (
        <div className={style.skeleton__container} key={index}>
          <div
            className={classNames(
              style['skeleton__col-sm-6'],
              style['skeleton__col-md-3'],
            )}
          >
            <div className={style['skeleton__movie--isloading']}>
              <div className={style['skeleton__loading-image']}></div>
              <div className={style['skeleton__loading-content']}>
                <div className={style['skeleton__loading-text-container']}>
                  <div className={style['skeleton__loading-main-text']}></div>
                  <div className={style['skeleton__loading-sub-text']}></div>
                </div>
                <div className={style['skeleton__loading-btn']}></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
