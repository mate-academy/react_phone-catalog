import classNames from 'classnames';
import styles from './Pictures.module.scss';

type Props = {
  images: string[];
  mainImg: string;
  onMainImgChange: (newImg: string) => void;
};

export const Pictures: React.FC<Props> = ({
  images,
  mainImg,
  onMainImgChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.mainImg} hover--scale`}
        style={{ backgroundImage: `url(${mainImg})` }}
      ></div>
      <div className={styles.container}>
        {images.map(img => {
          return (
            <div
              className={classNames(`${styles.item} hover--scale`, {
                [styles.item__active]: img === mainImg,
                border: img != mainImg,
              })}
              key={img}
            >
              <div
                className={styles.link}
                style={{ backgroundImage: `url(${img})` }}
                onClick={() => onMainImgChange(img)}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
