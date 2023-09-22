import { useState } from 'react';
import { BASE_URL } from '../../utils/BASE_URL';

type Props = {
  images: string[];
};

export const ProductImages: React.FC<Props> = ({ images }) => {
  const [selected, setSelected] = useState(0);

  return (
    <>
      <div className="details__main--photos">
        {images.map((image, index) => (
          <button
            type="button"
            key={image}
            className="details__main--photos--buttons"
            onClick={() => setSelected(index)}
          >
            <img
              src={`${BASE_URL}/_new/${image}`}
              alt="side_photo"
              className="details__main--photos--sidePhoto"
            />
          </button>
        ))}
      </div>
      <div className="details__main--photo">
        <img
          className="details__main--photo--img"
          src={`${BASE_URL}/_new/${images[selected]}`}
          alt="main_photo"
        />
      </div>
    </>
  );
};
