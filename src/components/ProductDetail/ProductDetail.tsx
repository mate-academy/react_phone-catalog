/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FC, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import './ProductDetail.scss';
import {
  convertToHexFormat,
  formatter,
} from '../../helper';
import { Buttons } from '../Buttons';
import { ProductsSlider } from '../Home';
import { BASE_URL_PHOTO } from '../../helper/BASE_URL';
import { IProduct, IProductDetail } from '../../types';

type Props = {
  items: IProduct[],
  item: IProductDetail | null,
};

export const ProductDetail: FC<Props> = ({ items, item }) => {
  const [image, setImage] = useState(item?.images[0] || null);
  const [searchParams] = useSearchParams();
  const {
    category,
    namespaceId,
    capacity,
    images,
    colorsAvailable,
    color,
    screen,
    resolution,
    processor,
    priceDiscount,
    priceRegular,
    camera,
    capacityAvailable,
    cell,
    zoom,
    ram,
    description,
  } = item as IProductDetail;

  const selectedName = item?.name.split(' ').slice(2, 3);

  const youMayAlsoLIke = items.filter(
    (anyItem) => anyItem.name.includes(selectedName?.toString() || ''),
  );

  const techSpecs = [
    { label: 'Screen', value: screen },
    { label: 'Resolution', value: resolution },
    { label: 'Processor', value: processor },
    { label: 'RAM', value: ram },
    { label: 'Built-in Memory', value: capacity },
    { label: 'Camera', value: camera || 'none' },
    { label: 'Zoom', value: zoom || 'none' },
    { label: 'Cell', value: cell.join(', ') },
  ];

  const findProduct = items.find((anyItem) => anyItem.itemId === item?.id || '');

  const getColor = (value: string) => {
    return `/${category}/${namespaceId}-${capacity.toLowerCase()}-${value.replaceAll(' ', '-')}`;
  };

  const getCapacity = (value: string) => {
    return `/${category}/${namespaceId}-${value.toLowerCase()}-${color.replaceAll(' ', '-')}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      {item && (
        <>
          <div className="productDetail" data-cy="cardsContainer">
            <h2 className="productDetail__title">{`${item.name} (iMT9G2FS/A)`}</h2>
            <div className="productDetail__top top">
              <section className="top__photo">
                <div>
                  <ul className="photo__slider">
                    {images.map((img) => (
                      <li
                        onClick={() => setImage(img)}
                        onKeyDown={() => {}}
                        key={img}
                        className={cn(
                          'photo__img',
                          { photo__active: img === image },
                        )}
                      >
                        <img src={`${BASE_URL_PHOTO}/${img}`} alt="Phone" />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="photo__current">
                  <img src={`${BASE_URL_PHOTO}/${image || item.images[0]}`} alt="Current" />
                </div>
              </section>

              <section className="top__parameters parameters">
                <div className="parameters__block">
                  <p className="parameters__description">Available colors</p>
                  <ul className="parameters__avaible-colors">
                    {colorsAvailable.map((currentColor) => (
                      <li
                        key={currentColor}
                        className={cn(
                          'parameters__avaible-color',
                          { active__color: color === currentColor },
                        )}
                        style={{
                          backgroundColor: convertToHexFormat(currentColor.replaceAll(' ', '')),
                        }}
                      >
                        <Link
                          className="parameters__link"
                          to={getColor(currentColor)}
                          state={{ search: searchParams.toString() }}
                        >
                          {' '}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <p className="parameters__description">Select capacity</p>
                  <ul className="parameters__capacity">
                    {capacityAvailable.map((cpct) => (
                      <li
                        key={cpct}
                      >
                        <Link
                          to={getCapacity(cpct)}
                          className={cn(
                            'parameters__cpct-link',
                            { active__cpct: capacity === cpct },
                          )}
                          state={{ search: searchParams.toString() }}
                        >
                          {cpct}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="parameters__prices">
                    <p className="parameters__price">
                      {formatter.format(priceDiscount)}
                    </p>
                    <p className="parameters__full-price">
                      {formatter.format(priceRegular)}
                    </p>
                  </div>

                  <div className="parameters__buttons">
                    <Buttons
                      widthAddButton={276}
                      heightAddButton={48}
                      widthSelectedButton={48}
                      heightSelectedButton={48}
                      productID={item.id}
                      product={findProduct}
                    />
                  </div>

                  <div className="parameters__technical-data">
                    <p className="parameters__technical-item">
                      Screen
                      <span>{screen}</span>
                    </p>
                    <p className="parameters__technical-item">
                      Resolution
                      <span>{resolution}</span>
                    </p>
                    <p className="parameters__technical-item">
                      Processor
                      <span>{processor}</span>
                    </p>
                    <p className="parameters__technical-item">
                      RAM
                      <span>{ram}</span>
                    </p>
                  </div>
                </div>
                <div className="parameters__id">ID: 802390</div>
              </section>
            </div>

            <div className="productDetail__bottom" data-cy="productDescription">
              <section className="about">
                <h2 className="about__title">About</h2>
                <div className="about__info">
                  {description.map(({ text, title }) => (
                    <div className="about__info-item" key={title}>
                      <h3 className="about__info-title">{title}</h3>
                      <span
                        className="about__info-text"
                      >
                        {text[0]}
                      </span>
                      <span
                        className="about__info-text about__info-text--one"
                      >
                        {text[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="tech-specs">
                <h2 className="tech-specs__title">Tech specs</h2>
                <div className="tech-specs__wrapper">
                  {techSpecs.map((spec) => (
                    <p className="tech-specs__item" key={spec.label}>
                      {spec.label}
                      <span>{spec.value}</span>
                    </p>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <ProductsSlider
            title="You may also like"
            newProducts={youMayAlsoLIke}
          />
        </>
      )}
    </>
  );
};
