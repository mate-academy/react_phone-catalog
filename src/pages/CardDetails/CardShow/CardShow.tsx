import cn from 'classnames';
import { useEffect, useState } from 'react';
import './CardShow.scss';

const classes = (img: string, currImg: string) => cn(
  'card-show__button',
  { active: img === currImg },
);

type Props = {
  images: string[];
};

const CardShow: React.FC<Props> = ({ images }) => {
  const [mainImg, setMainImg] = useState<string | null>(null);

  useEffect(() => {
    setMainImg(images[0]);
  }, [images]);

  if (!mainImg) {
    return null;
  }

  return (
    <div className="card-show">
      <ul className="card-show__list">
        {images.map(img => (
          <li key={img} className="card-show__item">
            <button
              type="button"
              className={classes(mainImg, img)}
              onClick={() => setMainImg(img)}
            >
              <img className="card-show__img" src={img} alt="product" />
            </button>
          </li>
        ))}
      </ul>

      <img className="card-show__main" src={mainImg} alt="product" />
    </div>
  );
};

export default CardShow;
