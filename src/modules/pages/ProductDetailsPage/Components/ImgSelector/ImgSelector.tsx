import { useEffect, useState } from 'react';
import styles from './ImgSelector.module.scss';
import classNames from 'classnames';
import { Phone } from '../../../../../types/phone';
import { Tablet } from '../../../../../types/tablet';
import { Accessorie } from '../../../../../types/accessorie';
import { useIsMobile } from '../../../../../hooks/useIsMobile';

type Props = {
  item: Phone | Tablet | Accessorie;
};

export const ImgSelector: React.FC<Props> = ({ item }) => {
  const images = item.images;
  const [activeImg, setActiveImg] = useState('');
  const isMobile = useIsMobile();

  useEffect(() => {
    setActiveImg(images[0]);
  }, [images]);

  return (
    <>
      {isMobile && (
        <img className={styles.mainImg} src={activeImg} alt="mainIMG" />
      )}
      <div className={styles.imgList}>
        {images.map((src, index) => (
          <div key={index} className={styles.imgList__wrapper}>
            <img
              src={src}
              alt={`Photo #${index}`}
              className={classNames(styles.imgList__item, {
                [styles['imgList__item--active']]: src === activeImg,
              })}
              onClick={() => setActiveImg(src)}
            />
          </div>
        ))}
      </div>
      {!isMobile && (
        <img className={styles.mainImg} src={activeImg} alt="mainIMG" />
      )}
    </>
  );
};

export default ImgSelector;
