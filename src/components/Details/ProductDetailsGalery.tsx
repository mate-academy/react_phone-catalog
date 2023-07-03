/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';

type Props = {
  images : string[]
};

export const ProductDetailsGalery:React.FC<Props> = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  useEffect(() => setMainImage(images[0]), [images]);

  return (
    <section className="details__galery">
      <ul className="details__galery--small">
        {images.map(image => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            className={`details__galery--small--item ${mainImage === image && 'active-border'}`}
            onClick={() => setMainImage(image)}
          >
            <img src={`/_new/${image}`} alt="foto" />
          </li>

        ))}
      </ul>

      <div className="details__galery--large">
        <img src={`/_new/${mainImage}`} alt="main-foto" />
      </div>
    </section>
  );
};
