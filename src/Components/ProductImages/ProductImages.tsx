import { useState } from 'react';
import { BASE_URL } from '../../utils/BASE_URL';
import './productImages.scss';

type Props = {
  images: string[];
};

export const ProductImages: React.FC<Props> = ({ images }) => {
  const [selected, setSelected] = useState(0);

  return (
    <>
      <div className="photos">
        <div className="photos__side">
          {images.map((image, index) => (
            <button
              type="button"
              key={image}
              className="photos__buttons"
              onClick={() => setSelected(index)}
            >
              <img
                src={`${BASE_URL}/_new/${image}`}
                alt="side_photo"
                className="photos__sidePhoto"
              />
            </button>
          ))}
        </div>
        <div className="photos__main">
          <img
            className="photos__main__img"
            src={`${BASE_URL}/_new/${images[selected]}`}
            alt="main_photo"
          />
        </div>
      </div>
    </>
  );
};
