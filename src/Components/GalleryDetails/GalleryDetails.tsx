import { useEffect, useState } from 'react';
import './GalleryDetails.scss';

type Props = {
  productDescription: string[];
};

export const GalleryDetails: React.FC<Props> = ({ productDescription }) => {
  const [imgShown, setImgShown] = useState(productDescription[0]);

  useEffect(() => {
    setImgShown(productDescription[0]);
  }, [productDescription]);

  return (
    <div className="GalleryDetails">
      <div className="GalleryDetails__left">
        {
          productDescription
            .filter((_, index) => index < 5)
            .map(el => {
              return (
                <button
                  key={el}
                  type="button"
                  className="GalleryDetails__btn"
                  onClick={() => {
                    setImgShown(el);
                  }}
                >
                  <img
                    className="GalleryDetails__pics"
                    src={el}
                    alt="thumbnail"
                  />
                </button>
              );
            })
        }
      </div>
      <div className="GalleryDetails__rigth">
        <img
          src={imgShown}
          alt="Poster"
          className="GalleryDetails__mainImg"
        />
      </div>
    </div>
  );
};
