import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import styles from './PhotosSlider.module.scss';
import { ThemeContext } from '../../../../store/ThemeProvider';

type Props = {
  photos: string[];
  alt: string;
};

export const PhotosSlider: React.FC<Props> = ({ photos, alt }) => {
  const { isThemeDark } = useContext(ThemeContext);
  const [selectedPhoto, setSelectedPhoto] = useState(photos[0]);

  return (
    <div className={styles.PhotosSlider}>
      <div className={styles.PhotosSlider__content}>
        <div className={styles.PhotosSlider__mainPhoto}>
          <img src={selectedPhoto} alt={alt} />
        </div>

        <div className={styles.PhotosSlider__allPhotos}>
          {photos.map(photo => (
            <div
              key={photo}
              className={classNames(styles.PhotosSlider__btnPhoto, {
                [styles.PhotosSlider__btnPhoto_active]: photo === selectedPhoto,
                [styles.PhotosSlider__btnPhoto_darkTheme]: isThemeDark,
                [styles.PhotosSlider__btnPhoto_active_darkTheme]:
                  isThemeDark && photo === selectedPhoto,
              })}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img src={photo} alt="photo" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
