import { useEffect, useState } from 'react';
import './ProductInfo.scss';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductInfo as ProductInfoType } from '../../types/ProductInfo';
import { BASE_URL } from '../../api/api';
import { getLinkFromColor } from '../../helpers/getLinkFromColor';
import { getLinkFromRAM } from '../../helpers/getLinkFromRAM';
import { ActionsBlock } from '../ActionsBlock';

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
    cpu,
    ram,
    description,
    camera,
    zoom,
    cell,
  } = product;

  const handleSelectedImg = (img: string) => {
    setSelectedImg(img);
  };

  const normalizeImgPath = (str: string) => {
    return `${BASE_URL}/${str}`;
  };

  const characteristics = [
    ['Screen', screen],
    ['Resolution', resolution],
    ['Processor', cpu],
    ['RAM', ram],
  ];

  const specs = [
    ['Screen', screen],
    ['Resolution', resolution],
    ['Processor', cpu],
    ['RAM', ram],
    ['Built in memory', capacity],
    ['Camera', camera],
    ['Zoom', zoom],
    ['Cell', cell.join(', ')],
  ];

  return (
    <div className="product-info">
      <h1 className="tittle product-info__title">{name}</h1>

      <div className="product-info__main">
        <div className="product-info__top">
          <div className="product-info__images">
            <div className="product-info__small-imgs">
              {images.map(image => (
                <button
                  key={image}
                  className="product-info__button-img"
                  onClick={() => handleSelectedImg(normalizeImgPath(image))}
                  type="button"
                  aria-label="change-img"
                >
                  <img
                    src={normalizeImgPath(image)}
                    alt=" "
                    key={image}
                    className={classNames('product-info__small-img', {
                      'product-info__small-img--active':
                        selectedImg === normalizeImgPath(image),
                    })}
                  />
                </button>
              ))}
            </div>

            <img src={selectedImg} alt=" " className="product-info__big-img" />
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
                      replace
                    >
                      <div
                        className={classNames('product-info__color-gap', {
                          'product-info__color-gap--active':
                            color === colorInPr,
                        })}
                      >
                        <button
                          style={{ backgroundColor: color }}
                          className={classNames(
                            'product-info__color',
                            `product-info__color--${color}`,
                          )}
                          aria-label="change-color"
                          type="button"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="product-info__capacity">
                <p className="product-info__info-main--text">Select capacity</p>

                <div className="product-info__capacity-container">
                  {capacityAvailable.map(cap => (
                    <Link
                      to={getLinkFromRAM(id, cap, pathname)}
                      key={cap}
                      replace
                    >
                      <div
                        className={classNames('product-info__capacity-text', {
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
                    <ActionsBlock product={productSelected} paddingFav="15px" />
                  )}
                </div>
              </div>

              <div className="characteristics product-info__characteristics">
                {characteristics.map(char => (
                  <div className="characteristics__container" key={char[0]}>
                    <p className="characteristics__name">{char[0]}</p>
                    <p className="characteristics__about">{char[1]}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="product-info__id">{`ID: ${productSelected?.id}`}</p>
            </div>
          </div>
        </div>

        <div className="product-info__bottom">
          <div className="about" data-cy="productDescription">
            <p className="about__title">About</p>

            <div className="about__main">
              {description.map(desc => (
                <div key={desc.title}>
                  <p className="about__description">{desc.title}</p>

                  <div className="about__container-text">
                    {desc.text.map(txt => (
                      <p className="about__text" key={txt}>
                        {txt}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="specs">
            <p className="specs__title">Specifications</p>

            <div className="specs__main">
              {specs.map(spec => (
                <div className="specs__container" key={spec[0]}>
                  <p className="specs__name">{spec[0]}</p>

                  <p className="specs__about">{spec[1]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
