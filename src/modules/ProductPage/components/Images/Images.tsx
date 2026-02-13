import { useState } from 'react';
import styles from './Images.module.scss';
import classNames from 'classnames';

type Props = {
  imgList: string[];
};

export const Images: React.FC<Props> = ({ imgList }) => {
  const [imgId, setImgId] = useState(0);

  return (
    <div className={classNames(styles.images)}>
      <div className={classNames(styles.images__slider)}>
        <ul className={classNames(styles.images__list)}>
          {imgList.map((img, i) => (
            <li
              key={i}
              className={classNames(styles.images__item, {
                [styles['images__item--active']]: i === imgId,
              })}
              onClick={() => setImgId(i)}
            >
              <img
                src={`${import.meta.env.BASE_URL}/${img}`}
                alt={`image-${i}`}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={classNames(styles.images__chosen)}>
        <img
          src={`${import.meta.env.BASE_URL}/${imgList[imgId]}`}
          alt={`image-${imgId}`}
        />
      </div>
    </div>
  );
};
