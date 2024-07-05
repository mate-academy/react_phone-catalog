import React, { useContext, useState } from 'react';
import { Good } from '../../../types/Good';
import './GoodCard.scss';
import { ProductContext } from '../Context/Context';
import { Product } from '../../../types/Product';
import { AddButtons } from '../AddButtons';
import { CardItems } from '../CardItems/CardItems';
import { ProductsSlider } from '../ProductsSlider';
import classNames from 'classnames';
import { colors } from '../../../utils/colors';
import { Link } from 'react-router-dom';

type Props = {
  good: Good;
  category: string;
};

export const GoodCard: React.FC<Props> = ({ good, category }) => {
  const { products } = useContext(ProductContext);
  const {
    id,
    name,
    screen,
    ram,
    resolution,
    processor,
    camera,
    zoom,
    cell,
    capacity,
    images,
    colorsAvailable,
    capacityAvailable,
    priceRegular,
    priceDiscount,
    description,
    color,
    namespaceId,
  } = good;

  const [image, setImage] = useState(images[0]);

  const product = products.find((item: Product) => item.itemID === good?.id);
  const goods = products.filter(item => item.category === category);

  const getSuggestedProducts = () => {
    const start = Math.round(Math.random() * (goods.length - 11));

    return goods.slice(start, start + 10);
  };

  return (
    <div className="card">
      <h1 className="card__good-name">{name}</h1>
      <div className="card__top">
        <div className="card__slider">
          <img src={image} alt="good" className="card__main-picture" />

          <div className="card__pictures">
            {images.map(item => (
              <img
                key={item}
                src={item}
                alt="good"
                className={classNames('card__picture', {
                  'card__picture--active': image === item,
                })}
                onClick={() => setImage(item)}
              />
            ))}
          </div>
        </div>
        <div className="card__brief">
          <div className="card__names">
            <h4 className="card__value">Available colors</h4>
            <span className="card__id">ID: 802390</span>
          </div>
          <div className="card__brief-wrapper">
            <div className="card__colors card__line">
              {colorsAvailable.map(item => {
                const capacityLink =
                  capacity.slice(0, capacity.length - 2) +
                  capacity[capacity.length - 2].toLowerCase() +
                  capacity[capacity.length - 1].toLowerCase();

                return (
                  <Link
                    to={`/${category}/${namespaceId}-${capacityLink}-${item}`}
                    key={item}
                    className={classNames('card__color', {
                      'card__color--active': color === item,
                    })}
                    style={{ backgroundColor: colors[item] }}
                  ></Link>
                );
              })}
            </div>
            <h4 className="card__value">Select capacity</h4>
            <div className="card__capacities card__line">
              {capacityAvailable.map(item => {
                const capacityLink =
                  item.slice(0, item.length - 2) +
                  item[item.length - 2].toLowerCase() +
                  item[item.length - 1].toLowerCase();

                return (
                  <Link
                    to={`/${category}/${namespaceId}-${capacityLink}-${color}`}
                    key={item}
                    className={classNames('card__capacity', {
                      'card__capacity--active': capacity === item,
                    })}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
            <p className="card__price">
              ${priceDiscount}
              <span className="card__discount">${priceRegular}</span>
            </p>
            {product && (
              <div className="card__buttons">
                <AddButtons product={product} />
              </div>
            )}
            <CardItems
              screen={screen}
              resolution={resolution}
              processor={processor}
              ram={ram}
            />
          </div>
          <span className="card__id">ID: 802390</span>
        </div>
      </div>

      <div className="card__bottom">
        <div className="card__about">
          <h2 className="card__title">About</h2>
          {description.map(item => (
            <article className="card__description" key={id}>
              <p className="card__text">{item.text}</p>
            </article>
          ))}
        </div>
        <div className="card__tech-specs">
          <h2 className="card__title card__title--tech-specs">Tech specs</h2>
          <CardItems
            screen={screen}
            resolution={resolution}
            processor={processor}
            ram={ram}
            memory={capacity}
            camera={camera}
            zoom={zoom}
            cell={cell}
          />
        </div>
      </div>

      <ProductsSlider
        title="You may also like"
        products={getSuggestedProducts()}
        isDiscount={true}
      />
    </div>
  );
};
