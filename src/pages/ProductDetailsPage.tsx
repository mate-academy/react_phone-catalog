/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  useLocation,
  useParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { ProductDetails } from '../types/ProductDetails';
import { Loader } from '../components/Loader/Loader';
import { AddToFav } from '../components/Buttons/AddToFav';
import { AddToCartButton } from '../components/Buttons/AddToCartButton';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { SuggestedProducts } from '../components/SuggestedProducts/SuggestedProducts';
import { colors } from '../types/colors';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

export const ProductDetailsPage = () => {
  const { pathname } = useLocation();
  const { itemId } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [currentCapacity, setCurrentCapacity] = useState('');
  const [currentColor, setCurrentColor] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  const getItemInfo = async (id: string | undefined) => {
    const fetchJson = await fetch(`${BASE_URL}/products/${id}.json`);
    const data = await fetchJson.json();

    return data;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [itemId]);

  useEffect(() => {
    setLoading(true);
    getItemInfo(itemId)
      .then(productInfo => {
        setProduct(productInfo);
        setCurrentImage(productInfo.images[0]);
      })
      .finally(() => setLoading(false));
  }, [itemId]);

  useEffect(() => {
    const splitedItemId = itemId?.split('-');

    setCurrentCapacity(splitedItemId?.slice(-2, -1).toString().toUpperCase() || '');
    setCurrentColor(splitedItemId?.slice(-1).toString() || '');
  }, [itemId]);

  const path = pathname.slice(1, 2).toUpperCase() + pathname.slice(2);
  const slashIndex = path.indexOf('/');
  const pathLink = path.slice(0, slashIndex);

  const rout = `/${pathLink.toLocaleLowerCase()}/${itemId?.split('-').slice(0, -2).join('-')}`;

  return (
    <div className="container">
      <Breadcrumbs pathname={pathLink} name={product?.name || ''} />

      {loading && <Loader />}

      {!loading && product && (
        <div className="details">
          <Link to=".." className="details__back" data-cy="backButton">
            <span className="arrow arrow--left-disabled" />
            <span className="details__back--span">Back</span>
          </Link>
          <h1 className="details__title">{product?.name}</h1>

          <div className="details__container">
            <div className="details__top">
              <div className="details__photoBlock">
                <div className="details__photo-list">
                  {product?.images.map(img => (
                    <button
                      type="button"
                      className="details__photo"
                      key={img}
                      onClick={() => setCurrentImage(img)}
                    >
                      <img
                        src={`../_new/${img}`}
                        alt={product.name}
                        className="details__photo--img"
                      />
                    </button>
                  ))}
                </div>

                <div className="details__mainPhoto">
                  <img
                    src={`../_new/${currentImage}`}
                    alt={product?.name}
                    className="details__mainPhoto--photo"
                  />
                </div>
              </div>

              <div className="details__baseInfoBlock">
                <div className="details__colors">
                  <p className="details__colors-title">Available colors</p>
                  <ul className="details__colors-list">
                    {product?.colorsAvailable.map(color => (
                      <Link
                        to={`${rout}-${currentCapacity.toLowerCase()}-${color}`}
                        key={color}
                        style={{ backgroundColor: colors[color] }}
                        className={classNames('details__colors-item', {
                          'details__colors-item--active': color === currentColor,
                        })}
                      />
                    ))}
                  </ul>
                </div>

                <div className="details__capacity">
                  <p className="details__capacity-title">Select capacity</p>
                  <ul className="details__capacity-list">
                    {Array.isArray(product?.capacityAvailable) ? (
                      product?.capacityAvailable.map(capacity => (
                        <NavLink
                          key={capacity}
                          to={`${rout}-${capacity.toLowerCase()}-${currentColor}`}
                          className={classNames('details__capacity-item', {
                            'details__capacity-item--active': capacity === currentCapacity,
                          })}
                        >
                          {capacity}
                        </NavLink>
                      ))
                    ) : (
                      product?.capacity
                    )}
                  </ul>

                </div>

                <div className="details__price">
                  <h2 className="details__price--discount">{`$${product?.priceDiscount}`}</h2>
                  <h3 className="details__price--regular">{`$${product?.priceRegular}`}</h3>
                </div>

                <div className="details__buttons">
                  <AddToCartButton prodId={product.id} />
                  <AddToFav />
                </div>

                <div className="details__description" data-cy="productDescription">
                  <div className="details__description--line">
                    <p className="details__description--key">Screen</p>
                    <p className="details__description--val">{product?.screen}</p>
                  </div>

                  <div className="details__description--line">
                    <p className="details__description--key">Resolution</p>
                    <p className="details__description--val">{product?.resolution}</p>
                  </div>

                  <div className="details__description--line">
                    <p className="details__description--key">Processor</p>
                    <p className="details__description--val">{product?.processor}</p>
                  </div>

                  <div className="details__description--line">
                    <p className="details__description--key">RAM</p>
                    <p className="details__description--val">{product?.ram}</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="details__bottom">
              <div className="details__aboutBlock">
                <h3 className="details__subtitle">About</h3>
                {product?.description.map(desc => (
                  <div className="details__aboutInfo" key={desc.title}>
                    <h4 className="details__aboutInfo--subtitle">{desc.title}</h4>
                    <p className="details__aboutInfo--text">{desc.text}</p>
                  </div>
                ))}
              </div>

              <div className="details__tech">
                <h3 className="details__subtitle">Tech specs</h3>
                <div className="details__description details__description--tech">
                  <div className="details__description--line">
                    <p className="details__description--tech-key">Screen</p>
                    <p className="details__description--tech-val">{product?.screen}</p>
                  </div>

                  <div className="details__description--line">
                    <p className="details__description--key">Resolution</p>
                    <p className="details__description--val">{product?.resolution}</p>
                  </div>

                  <div className="details__description--line">
                    <p className="details__description--key">Processor</p>
                    <p className="details__description--val">{product?.processor}</p>
                  </div>

                  <div className="details__description--line">
                    <p className="details__description--key">RAM</p>
                    <p className="details__description--val">{product?.ram}</p>
                  </div>

                  <div className="details__description--line">
                    <p className="details__description--key">Built in memory</p>
                    <p className="details__description--val">{product?.capacity}</p>
                  </div>

                  <div className="details__description--line">
                    <p className="details__description--key">Camera</p>
                    <p className="details__description--val">{product?.camera}</p>
                  </div>

                  <div className="details__description--line">
                    <p className="details__description--key">Zoom</p>
                    <p className="details__description--val">{product?.zoom}</p>
                  </div>

                  <div className="details__description--line">
                    <p className="details__description--key">Cell</p>
                    <p className="details__description--val">{product?.cell}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <SuggestedProducts />
        </div>
      )}
    </div>
  );
};
