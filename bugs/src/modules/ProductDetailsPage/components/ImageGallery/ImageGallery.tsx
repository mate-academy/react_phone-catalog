import styles from './ImageGallery.module.scss';

export const ImageGallery: React.FC = () => {
  return (
    <div className={styles.imageGallery}>
      <div className={styles.thumbnailContainerTablet}>
          <img
            src="https://placehold.co/380x380.png"
            className={styles.thumbnail}
          />
      </div>

      <div className={styles.mainImageContainer}>
          <img
            src="https://placehold.co/380x380.png"
          />
      </div>

      <div className={styles.thumbnailContainerMobile}>
          <img
            src="https://placehold.co/380x380.png"
            className={styles.selectedThumbnail}
          />
      </div>
    </div>
  );
};
