import { useState } from 'react';
import './ProductPicturesBlock.scss';

type Props = {
  product: any,
};

export const ProductPicturesBlock:React.FC<Props> = ({ product }) => {
  const [mainPicture, setMainPicture] = useState(0);
  const isSelected = (pictureNumber: number) => pictureNumber === mainPicture;

  return (
    <div className="pictures-block">
      <ul className="pictures-block__list">
        {product.images.map((one: any, index: number) => {
          return (
            <li
              key={one}
              className={`pictures-block__item ${isSelected(index) && 'selected-picture'}`}
              onClick={() => {
                return setMainPicture(index);
              }}
              aria-hidden="true"
            >
              <img
                src={`/_new/${one}`}
                alt="phone"
                className="pictures-block__image"
              />
            </li>
          );
        })}
      </ul>
      <img
        src={`/_new/${product.images[mainPicture]}`}
        alt="main"
        className="pictures-block__main"
      />
    </div>
  );
};
