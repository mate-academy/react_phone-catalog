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
      <div className="main">
        <img
          className="main__img"
          src={`${BASE_URL}/_new/${images[selected]}`}
          alt="main_photo"
        />
      </div>
    </>
  );
};
