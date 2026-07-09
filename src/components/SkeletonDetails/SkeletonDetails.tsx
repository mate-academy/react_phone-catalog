import classNames from 'classnames';
import style from './SkeletonDetails.module.scss';

export const SkeletonDetails = () => {
  return (
    <ul
      className={classNames(
        style['o-vertical-spacing'],
        style['o-vertical-spacing--l'],
      )}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <li
          key={index}
          className={classNames(style['blog-post'], style['o-media'])}
        >
          <div className={style['o-media__figure']}>
            <span
              className={style['skeleton-box']}
              style={{ width: '100px', height: '80px' }}
            ></span>
          </div>
          <div className={style['o-media__body']}>
            <div className={style['o-vertical-spacing']}>
              <h3 className={style['blog-post__headline']}>
                <span
                  className={style['skeleton-box']}
                  style={{ width: '55%' }}
                ></span>
              </h3>
              <p>
                <span
                  className={style['skeleton-box']}
                  style={{ width: '80%' }}
                ></span>
                <span
                  className={style['skeleton-box']}
                  style={{ width: '90%' }}
                ></span>
                <span
                  className={style['skeleton-box']}
                  style={{ width: '83%' }}
                ></span>
                <span
                  className={style['skeleton-box']}
                  style={{ width: '80%' }}
                ></span>
              </p>
              <div className={style['blog-post__meta']}>
                <span
                  className={style['skeleton-box']}
                  style={{ width: '70px' }}
                ></span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
