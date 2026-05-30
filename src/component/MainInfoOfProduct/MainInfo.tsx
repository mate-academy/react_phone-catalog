import './MainInfo.scss';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ProductInformation } from '../types/MainInformationOfProduct';
import classNames from 'classnames';
import { ProductItem } from '../types/Phone';
import { SimilarProduct } from '../SimilarProduct';
import { isProductInStorage } from '../Services/isProductInStorage';
import { toggleItemStorage } from '../Services/toogleFavorite';
import { BackButton } from '../BackButton/Back';

interface Props {
  typeOfProduct: string;
}

export const MainInfo: React.FC<Props> = ({ typeOfProduct }) => {
  const { phoneId } = useParams<{ phoneId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductInformation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageId, setImageId] = useState(0);
  const [productCapacity, setProductCapacity] = useState<string | null>(null);
  const [similarProduct, setSimilarProduct] = useState<ProductItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem('favorite');

    return stored ? JSON.parse(stored) : [];
  });
  const [addToBuy, setAddToBuy] = useState<string[]>(() => {
    const stored = localStorage.getItem('cartForBuying');

    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    fetch(`/api/${typeOfProduct}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Помилка при завантаженні даних');
        }

        return response.json();
      })
      .then((data: ProductInformation[]) => {
        const found = data.find(p => p.id === phoneId);

        if (found) {
          setProduct(found);
          const capacity = found.id.split('-').slice(-2, -1)[0].toLowerCase();

          setProductCapacity(capacity);
        }

        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, [phoneId, typeOfProduct]);

  useEffect(() => {
    if (!product?.priceDiscount) {
      return;
    }

    fetch('/api/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Помилка при завантаженні даних');
        }

        return response.json();
      })
      .then((data: ProductItem[]) => {
        const sorted = data
          .filter(item => item.category === typeOfProduct)
          .sort(
            (a, b) =>
              Math.abs(a.price - product.priceDiscount) -
              Math.abs(b.price - product.priceDiscount),
          );

        setSimilarProduct(sorted);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, [product, typeOfProduct]);

  const updateProductVariant = (key: 'color' | 'capacity', value: string) => {
    if (!product) {
      return;
    }

    const parts = product.id.split('-');

    parts[key === 'color' ? parts.length - 1 : parts.length - 2] =
      key === 'capacity' ? value.toLowerCase() : value;

    navigate(`/${typeOfProduct}/${parts.join('-')}`);
  };

  const renderCharacteristic = (label: string, value: string | string[]) => (
    <div className="block-characteristic characteristic-value">
      <span className="text-name__characteristic">{label}</span>
      <span className="value">
        {Array.isArray(value) ? value.join(', ') : value}
      </span>
    </div>
  );

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  if (hasError) {
    return <div>Сталася помилка при завантаженні продукту.</div>;
  }

  if (!product) {
    return <div className="product__not-found"></div>;
  }

  return (
    <div className="allInPage">
      <BackButton />

      <div className="main">
        <h2 className="name-of-product">{product.name}</h2>

        <section className="first__section">
          <div className="block-of__images">
            {product.images.map((img, i) => (
              <div
                key={i}
                className="phone__image"
                onClick={() => setImageId(i)}
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
          </div>
          <div
            className="main__image"
            style={{ backgroundImage: `url(${product.images[imageId]})` }}
          />
        </section>

        <section className="second__section">
          <div className="available-color">
            <span className="available-color__text">Available colors</span>
            <div className="buttons__colors">
              {product.colorsAvailable.map((c, i) => (
                <button
                  key={i}
                  className="colors"
                  onClick={() => updateProductVariant('color', c)}
                  style={{ background: c, boxShadow: `0 0 1px 1px ${c}` }}
                />
              ))}
            </div>
          </div>

          <div className="box-select-capacity">
            <span className="select-capacity__text">Select capacity</span>
            <div className="block-of-capacity">
              {product.capacityAvailable.map((cap, i) => (
                <button
                  key={i}
                  className={classNames(
                    'capacity__button',
                    productCapacity?.toUpperCase() === cap &&
                      'active__capacity',
                  )}
                  onClick={() => updateProductVariant('capacity', cap)}
                >
                  {cap.replace(/(\d+)(GB)/i, '$1 $2')}
                </button>
              ))}
            </div>
          </div>

          <div className="price-block">
            <p className="current__price price">${product.priceDiscount}</p>
            <p className="regular__price price">${product.priceRegular}</p>
          </div>

          <div className="buttons__block">
            <button
              className={classNames('button-add', 'page__product-add', {
                'button-selected': isProductInStorage(product.id, addToBuy),
              })}
              onClick={e =>
                toggleItemStorage('cartForBuying', product.id, setAddToBuy, e)
              }
            >
              {isProductInStorage(product.id, addToBuy)
                ? 'Selected'
                : 'Add to cart'}
            </button>

            <button
              className={classNames(
                'page__product-add__favorite',
                isProductInStorage(product.id, favorites)
                  ? 'favorite-delete'
                  : 'favorite-add',
              )}
              onClick={e =>
                toggleItemStorage('favorite', product.id, setFavorites, e)
              }
            >
              <div
                className={classNames('favorite-img', {
                  'red-hurt': isProductInStorage(product.id, favorites),
                })}
              ></div>
            </button>
          </div>

          <div className="characteristic page-product__characteristic">
            {renderCharacteristic('Screen', product.screen)}
            {renderCharacteristic('Resolution', product.resolution)}
            {renderCharacteristic('Processor', product.processor)}
            {renderCharacteristic('RAM', product.ram)}
          </div>
        </section>

        <section className="thead__section">
          <div className="block__about">
            <h2 className="about__text">About</h2>
          </div>

          {product.description.map((desc, i) => (
            <article key={i} className="description">
              <span className="description__title">{desc.title}</span>
              <p className="description__text">{desc.text}</p>
            </article>
          ))}
        </section>
        <section className="fourth__section">
          <div className="tech-specs">
            <h2 className="tech-specs__title">Tech specs</h2>
          </div>

          <div className="all-characteristics">
            {product.screen && renderCharacteristic('Screen', product.screen)}
            {product.resolution &&
              renderCharacteristic('Resolution', product.resolution)}
            {product.processor &&
              renderCharacteristic('Processor', product.processor)}
            {product.ram && renderCharacteristic('RAM', product.ram)}
            {product.capacity &&
              renderCharacteristic('Built in memory', product.capacity)}
            {product.camera && renderCharacteristic('Camera', product.camera)}
            {product.zoom && renderCharacteristic('Zoom', product.zoom)}
            {product.cell && renderCharacteristic('Cell', product.cell)}
          </div>
        </section>

        <SimilarProduct products={similarProduct} title={'You may also like'} />
      </div>
    </div>
  );
};
