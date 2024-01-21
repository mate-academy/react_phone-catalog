import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import './ProductInfo.scss';
import { BASE_URL } from '../../api/api';
import { ProductInfo as ProductInfoType } from '../../types/ProductInfo';
import { ActionsBlock } from '../ActionsBlock';
import { getLinkFromRAM } from '../../helpers/getLinkFromRAM';
import { getLinkFromColor } from '../../helpers/getLinkFromColor';
import { Product } from '../../types/Product';

type Props = {
  product: ProductInfoType;
  productSelected: Product;
};

export const ProductInfo: React.FC<Props> = ({ product, productSelected }) => {
  const [selectedImg, setSelectedImg] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    setSelectedImg(`${BASE_URL}/${product?.images[0]}`);
  }, [product]);

  const {
    id,
    name,
    images,
    colorsAvailable,
    color: colorInPr,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    ram,
    description,
    camera,
    zoom,
    cell,
  } = product;

  const handleSelectImage = (img: string) => {
    setSelectedImg(img);
  };

  const normalizeImgPath = (str: string) => {
    return `${BASE_URL}/${str}`;
  };

  const characteristics = [
    ['Screen', screen],
    ['Resolution', resolution],
    ['Processor', processor],
    ['RAM', ram],
  ];

  const techSpecs = [
    ['Screen', screen],
    ['Resolution', resolution],
    ['Processor', processor],
    ['RAM', ram],
    ['Built in memory', capacity],
    ['Camera', camera],
    ['Zoom', zoom],
    ['Cell', cell.join(', ')],
  ];

  return (
    <div className="product-info">
      <h1 className="title product-info__title">{name}</h1>

      <div className="product-info__main">
        <div className="product-info__top">
          <div className="product-info__images">
            <div className="product-info__small-imgs">
              {images.map(image => (
                <button
                  key={image}
                  className="product-info__button-img"
                  onClick={
                    () => handleSelectImage(normalizeImgPath(image))
                  }
                  type="button"
                  aria-label="change-img"
                >
                  <img
                    src={normalizeImgPath(image)}
                    alt=" "
                    key={image}
                    className={cn('product-info__small-img', {
                      'product-info__small-img--active':
                        selectedImg === normalizeImgPath(image),
                    })}
                  />
                </button>

              ))}
            </div>
            <img
              src={selectedImg}
              alt=" "
              className="product-info__big-img"
            />
          </div>

          <div className="product-info__info">
            <div className="product-info__info-main">
              <div className="product-info__colors">
                <p className="product-info__info-main--text">
                  Available colors
                </p>

                <div className="product-info__color-container">
                  {colorsAvailable.map(color => (
                    <Link
                      to={getLinkFromColor(id, color, pathname)}
                      key={color}
                      title={color}
                    >
                      <div
                        className={cn('product-info__color-gap', {
                          'product-info__color-gap--active':
                          color === colorInPr,
                        })}
                      >
                        <button
                          style={{ backgroundColor: color }}
                          className={cn('product-info__color',
                            `product-info__color--${color}`)}
                          aria-label="change-color"
                          type="button"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="product-info__capacity">
                <p className="product-info__info-main--text">
                  Select capacity
                </p>

                <div className="product-info__capacity-container">
                  {capacityAvailable.map(cap => (
                    <Link
                      to={getLinkFromRAM(id, cap, pathname)}
                      key={cap}
                    >
                      <div
                        className={cn('product-info__capacity-text', {
                          'product-info__capacity-text--active':
                          capacity === cap,
                        })}
                      >
                        {cap}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="product-info__business">
                <div className="product-info__price">
                  <p className="title">{`$${priceDiscount}`}</p>
                  <p className="product-info__discount">{`$${priceRegular}`}</p>
                </div>

                <div className="product-info__actions">
                  {productSelected && (
                    <ActionsBlock
                      product={productSelected}
                      paddingFav="15px"
                    />
                  )}
                </div>
              </div>

              <div
                className="
                  characteristics
                  product-info__characteristics
                "
              >
                {characteristics.map(char => (
                  <div
                    className="characteristics__container"
                    key={char[0]}
                  >
                    <p className="characteristics__name">{char[0]}</p>
                    <p className="characteristics__about">{char[1]}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="product-info__id">
                {`ID: ${productSelected?.id}`}
              </p>
            </div>
          </div>
        </div>

        <div className="product-info__bottom">
          <div className="about">
            <p className="about__title">
              About
            </p>

            <div className="about__main">
              {description.map(desc => (
                <div
                  key={desc.title}
                >
                  <p
                    className="about__description"
                  >
                    {desc.title}
                  </p>

                  <div className="about__container-text">
                    {desc.text.map(txt => (
                      <p
                        className="about__text"
                        key={txt}
                      >
                        {txt}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tech-specs">
            <p className="tech-specs__title">
              Tech specs
            </p>

            <div className="tech-specs__main">
              {techSpecs.map(tech => (
                <div
                  className="tech-specs__container"
                  key={tech[0]}
                >
                  <p className="tech-specs__name">
                    {tech[0]}
                  </p>
                  <p className="tech-specs__about">
                    {tech[1]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
