import { useEffect, useState } from 'react';
import { ProductDetail } from '../../pages/ProductDetails/ProductDetails';
import cn from 'classnames';

import './detailsPreview.scss';

interface Props {
  product: ProductDetail;
}

export const DetailsPreview: React.FC<Props> = ({ product }) => {
  const [selectImg, setSelectImg] = useState(product.images[0]);

  useEffect(() => {
    setSelectImg(product.images[0]);
  }, [product]);

  const hadleSelect = (selectedImg: string) => {
    setSelectImg(selectedImg);
  };

  return (
    <div className="details-preview details-preview--margin">
      <ul
        className="preview-list
            preview-list--margin"
      >
        {product.images.map(img => (
          <li
            key={img}
            className="preview-list__item"
            onClick={() => hadleSelect(img)}
          >
            <img
              className={cn('preview-list__img', {
                'preview-list__img--active': img === selectImg,
              })}
              src={img}
              alt="product-img"
            />
          </li>
        ))}
      </ul>

      <div className="details-preview__main-img">
        <img
          className="details-preview__img"
          src={selectImg}
          alt="details-preview__img"
        />
      </div>
    </div>
  );
};
