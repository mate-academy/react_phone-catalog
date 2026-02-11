import classNames from 'classnames';
import { UseHooks } from '../../AppHooks';
import styles from './Gallery.module.scss';
import { DetailsHooks } from '../../modules/DeviceDetails/DetailsHook';

export const Gallery = () => {
  const { currentDevice } = UseHooks();
  const { slide, setSlide } = DetailsHooks();

  const carouselStyle = {
    transform: `translateX(-${slide * 100}%)`,
  };

  return (
    <>
      <div className={styles.carousel}>
        <div className={styles.carousel__images} style={carouselStyle}>
          {currentDevice &&
            currentDevice.images.map(image => (
              <img
                key={currentDevice.id}
                src={image}
                className={styles.carousel__image}
              />
            ))}
        </div>
      </div>
      <div className={styles.images}>
        {currentDevice &&
          currentDevice.images.map((image, index) => (
            <img
              key={currentDevice.id}
              src={image}
              className={classNames(styles.images__image, {
                [styles['images__image--active']]: slide === index,
              })}
              onClick={() => setSlide(index)}
            />
          ))}
      </div>
    </>
  );
};
