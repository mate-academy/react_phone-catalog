import { FC, useState } from 'react';

type Props = {
  images: string[];
};

export const Slider: FC<Props> = ({ images }) => {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div className="slider">
      <div className="slider__col">
        {images.map((img) => (
          <button
            key={img}
            aria-label="img"
            type="button"
            className="slider__button"
            style={{ backgroundImage: `url(../${img})` }}
            onClick={() => setSelected(img)}
          />
        ))}
      </div>
      <div className="slider__main">
        <img src={`../${selected}`} alt="img" />
      </div>
    </div>
  );
};
