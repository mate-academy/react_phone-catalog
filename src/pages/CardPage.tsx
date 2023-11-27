import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import classNames from 'classnames';
import { getDescription } from '../api/getData';

import { Product } from '../types/Product';
import { ProductInfo } from '../types/ProductInfo';
import { customColors } from '../helpers/customColors';

import { ProductsSlider } from '../components/ProductsSlider';
import { Navigation } from '../components/Navigation';
import { HistoryBackButton } from '../components/HistoryBackButton';
import { FavoriteButton } from '../components/FavoriteButton';
import { AddToCartButton } from '../components/AddToCartButton';

const fullProductProps = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'capacity',
  'camera',
  'zoom',
  'cell',
];

const shortProductProps = [
  'screen',
  'resolution',
  'processor',
  'ram',
];

const propsTitle = (prop: string) => {
  return prop === 'ram'
    ? prop.toUpperCase()
    : prop.slice(0, 1).toUpperCase() + prop.slice(1);
};

export const CardPage: React.FC = () => {
  const params = useParams();
  const [currentId, setCurrentId] = useState<string>('');
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [properties, setProperties] = useState<Product[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [currColor, setCurrColor] = useState<string>('');
  const [capacity, setCapacity] = useState<string[]>([]);
  const [currCapacity, setCurrCapacity] = useState<string>('');
  const [description, setDescription] = useState<ProductInfo | null>(null);
  const [currentImage, setCurrentImage] = useState<string>('');
  const catalog: Product[] = JSON.parse(localStorage.getItem('fullList') || '');

  const url = (image: string) => `new/${image}`;

  const getData = async (id: string) => {
    try {
      setDescription(null);

      const responseForDescription = await getDescription(id);
      const getCurrentProduct = catalog
        .find(product => product.itemId === id);

      setCurrentId(getCurrentProduct?.id || id);
      setDescription(responseForDescription);
      setCurrentProduct(getCurrentProduct);
      setCurrColor(getCurrentProduct?.color || '');
      setCurrCapacity(getCurrentProduct?.capacity || '');
      setCurrentImage(url(getCurrentProduct?.image || ''));
    } catch {
      throw new Error('Didn\'t catch data');
    } finally {
      const productName = id.split('-').slice(0, -2).join('-');
      const prop = (catalog.filter(product => {
        return productName === product.itemId.split('-').slice(0, -2).join('-');
      }));

      setProperties(prop);
      setColors(prop
        .map(item => item.color)
        .filter((value, index, self) => self.indexOf(value) === index));
      setCapacity(prop
        .map(item => item.capacity)
        .filter((value, index, self) => self.indexOf(value) === index));
    }
  };

  useEffect(() => {
    if (params.id) {
      getData(params.id);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [params.id]);

  const handleImageClick = (event: React.MouseEvent) => {
    const newImg = event.currentTarget.getAttribute('src');

    setCurrentImage(newImg || '');
  };

  return (
    <div>
      <Navigation />
      {(currentProduct && description) ? (
        <main className="page cardPage">
          <section className="cardPage__title">
            <HistoryBackButton />
            <div className="cardPage__title__zone">
              <h1>{currentProduct.name}</h1>
              <p className="cardPage__title__id text__small">
                {`ID: ${currentProduct.id}`}
              </p>
            </div>
          </section>
          <section className="cardPage__props">
            <div className="cardPage__props__images">
              <div className="cardPage__props__images__small">
                {description.images.map(image => (
                  <div
                    className={classNames('cardPage__props__image--cover', {
                      active: url(image) === currentImage,
                    })}
                    key={image}
                  >
                    <img
                      src={url(image)}
                      alt={image}
                      role="presentation"
                      className="cardPage__props__image--small"
                      onClick={handleImageClick}
                    />
                  </div>
                ))}
              </div>

              <div className="cardPage__props__images__big">
                <img
                  src={currentImage}
                  alt={currentProduct.itemId}
                  className="cardPage__props__image--big"
                />
              </div>
            </div>

            <div className="cardPage__props__info">
              <div className="cardPage__props__info__sections">
                <div className="cardPage__props__info__section">
                  <p className="text__small">Available colors</p>
                  <div className="cardPage__props__info__circles">
                    {colors.map(color => (
                      <Link
                        key={color}
                        to={`/phones/${properties.filter(
                          prop => prop.color === color
                            && prop.capacity === currCapacity,
                        )[0].itemId}`}
                        className={classNames('cardPage__props__info__circle', {
                          active: currColor === color,
                        })}
                      >
                        <div
                          className="cardPage__props__info__circle--inner"
                          style={{ backgroundColor: customColors[color] }}
                        />
                      </Link>
                    ))}
                  </div>
                </div>

                <p className="cardPage__details__title-line" />

                <div className="cardPage__props__info__section">
                  <p className="text__small">Select capacity</p>
                  <div className="cardPage__props__info__capacities">
                    {capacity.map(value => (
                      <Link
                        key={value}
                        to={`/phones/${properties.filter(
                          prop => prop.capacity === value
                            && prop.color === currColor,
                        )[0].itemId}`}
                        className={classNames(
                          'text__body',
                          'slider-button__paggination',
                          'cardPage__props__info__capacity', {
                            active: currCapacity === value,
                          },
                        )}
                      >
                        {value}
                      </Link>
                    ))}
                  </div>
                </div>

                <p className="cardPage__details__title-line" />

                <div className="cardPage__props__info__price-section">
                  <div className="cardPage__props__info__price">
                    <h1 className="card__price__new">
                      {`$${currentProduct.price}`}
                    </h1>
                    <h2 className="cardPage__props__info__price--old">
                      {`$${currentProduct.fullPrice}`}
                    </h2>
                  </div>

                  <div className="cardPage__props__info__buttons">
                    <AddToCartButton id={currentId} bigButton />
                    <FavoriteButton id={currentId} bigButton />
                  </div>
                </div>
                <div className="cardPage__props__info__details text__body">
                  {shortProductProps.map(prop => (
                    <div className="cardPage__props__info__item" key={prop}>
                      <p className="cardPage__props__info__title">
                        {propsTitle(prop)}
                      </p>
                      <p>{description[prop]}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="cardPage__props__info__id text__small">
                {`ID: ${currentProduct.id}`}
              </p>
            </div>
          </section>
          <section className="cardPage__details">
            <div className="cardPage__details__left">
              <div className="cardPage__details__left__block">
                <h2>About</h2>
                <p className="cardPage__details__title-line" />
              </div>

              {description.description.map(info => (
                <div
                  className="cardPage__details__left__block"
                  key={info.title}
                >
                  <h3>{info.title}</h3>
                  {info.text.map(text => (
                    <p
                      key={text}
                      className="text__body cardPage__details__gray-text"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <div className="cardPage__details__right">
              <div className="cardPage__details__left__block">
                <h2>Tech specs</h2>
                <p className="cardPage__details__title-line" />
              </div>

              <div className="cardPage__details__right__block">
                {fullProductProps.map(prop => (
                  <div className="cardPage__details__right__element" key={prop}>
                    <p className="text__body cardPage__details__gray-text">
                      {propsTitle(prop)}
                    </p>
                    <p className="text__body cardPage__details__info">
                      {prop === 'cell'
                        ? description.cell.join(', ')
                        : description[prop]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <ProductsSlider
            title="You may also like"
            itemsList={properties.filter(item => item.id !== currentProduct.id)}
            isLoading={false}
          />
          <section />
        </main>
      ) : (
        <div className="page__loading">
          <h3>Please, wait, the page is loading...</h3>
          <FadeLoader color="gray" />
        </div>
      )}
    </div>
  );
};
