import { useEffect, useState } from "react";
import type { DetailsProps } from "../../../shared/types/ProductDetails";

import styles from "./DetailsGallery.module.scss";


type GalleryProps = DetailsProps<'images'>;

export const DetailsGallery = ({images}: GalleryProps) => {
  const [mainImage, setMainImage] = useState<string>(images[0]);

  useEffect(() => {
    setMainImage(images[0]);
  }, [images])

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryMainContainer}>
        <img src={mainImage} alt={`${mainImage} - main view 1`} />
      </div>
      <div className={styles.galleryPreviewList}>
        {images.map((img, i) => (
          <div
            className={styles.galleryPreviewItem}
            data-selected={img === mainImage}
            key={img}
            onClick={() => setMainImage(img)}
          >
            <img src={img} alt={`${img} - preview ${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
