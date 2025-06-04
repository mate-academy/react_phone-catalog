import { useSearchParams } from 'react-router-dom';
import s from './Item.module.scss';
import phones from '../../../public/api/phones.json';
import { useState } from 'react';
import classNames from 'classnames';

export const Item = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  const product = phones.find(phone => phone.id === productId);
  const [currentImg, setCurrentImg] = useState(0);

  return (
    <div className={`${s.item} ${s.container}`}>
      <h1 className={s.item__name}>{product?.name}</h1>

      <div className={s.item__container}>
        <section className={s.pictures}>
          <ul className={s.pictures__list}>
            {product?.images.map((image, index) => (
              <li
                key={image}
                className={classNames(s.pictures__thumbnail, {
                  [s.pictures__thumbnail__active]: index === currentImg,
                })}
                onClick={() => setCurrentImg(index)}
              >
                <img
                  className={s.pictures__thumbnail_fill}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                />
              </li>
            ))}
          </ul>

          <div className={s.pictures__main}>
            {product?.images[currentImg] && (
              <img
                src={product.images[currentImg]}
                alt={`Main view of ${product.name}`}
                className={s.pictures__main_fill}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
