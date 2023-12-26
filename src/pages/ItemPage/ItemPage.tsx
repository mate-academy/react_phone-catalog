/* eslint-disable max-len */
import classNames from 'classnames';
import {
  ReactChild, ReactFragment, ReactPortal, useContext, useEffect, useState,
} from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { GoBackButton } from '../../components/GoBackButton';
import { ItemGallery } from '../../components/ItemGallery/ItemGallery';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ProductContext } from '../../helpers/ProductsContext';
import { getProductDetails, getSuggestedProducts } from '../../helpers/productsServise';
import { ItemDetails, Product } from '../../helpers/types';

import './ItemPage.scss';

export function ItemPage() {
  const { itemId } = useParams();

  const {
    addTofavoritesHandler, addToCartHandler, addedToCart, favorites,
  } = useContext(ProductContext);

  const [itemDetails, setItemDetails] = useState<ItemDetails>();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [chosenColor, setChosenColor] = useState('');
  const [chosenCapacity, setChosenCapacuty] = useState('');

  const location = useLocation();
  const { state } = useLocation();

  const isAddedToCart = addedToCart
    .find(item => item.phoneId === itemId);
  const isAddedToFav = favorites
    .find(item => item.phoneId === itemId);

  useEffect(() => {
    setIsLoading(true);
    getProductDetails(itemId)
      .then(setItemDetails)
      .finally(() => setIsLoading(false));

    getSuggestedProducts().then(setSuggestedProducts);
  }, [itemId]);

  useEffect(() => {
    if (itemDetails) {
      setChosenColor(itemDetails.color);
      setChosenCapacuty(itemDetails.capacity);
    }
  }, [itemDetails]);

  const getPathname = (prop: string, value: string) => {
    const pathArray = location.pathname.split('-');

    switch (prop) {
      case 'color':
        pathArray.splice(-1, 1, value);
        break;

      case 'capacity':
        pathArray.splice(-2, 1, value.toLowerCase());
        break;

      default:
        break;
    }

    return pathArray.join('-');
  };

  return (
    isLoading
      ? <Loader />
      : (
        <div
          className="item-page"
        >
          <Breadcrumbs />

          <GoBackButton />

          {itemDetails ? (
            <>
              <section className="item-page__section">
                <h1 className="item-page__title">
                  {itemDetails.name}
                </h1>

                <div className="item-page__flex-container">
                  <ItemGallery images={itemDetails.images} />

                  <div className="item-page__main-info">
                    <div className="item-page__info-container">
                      <div className="item-page__specifications">
                        <div className="item-page__info-block">
                          <p className="item-page__caption">
                            Available colors
                          </p>
                          <ul className="item-page__spec-container">
                            {itemDetails.colorsAvailable.map(color => {
                              const bgc = color === 'rosegold' ? '#ffe5e4' : color;

                              return (
                                <li key={color}>
                                  <Link
                                    to={getPathname('color', color)}
                                    state={{ search: state?.search }}
                                    className={classNames(
                                      'item-page__color',
                                      { 'item-page__color--active': chosenColor === color },
                                    )}
                                    title={color}
                                    style={{ backgroundColor: bgc }}
                                    onClick={() => setChosenColor(color)}
                                  />
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        <div className="item-page__separator" />

                        <div className="item-page__info-block">
                          <p className="item-page__caption">
                            Select capacity
                          </p>
                          <ul className="item-page__spec-container">
                            {itemDetails.capacityAvailable.map(capacity => (
                              <li key={capacity}>
                                <Link
                                  to={getPathname('capacity', capacity)}
                                  state={{ search: state?.search }}
                                  className={classNames(
                                    'item-page__capacity',
                                    { 'item-page__capacity--active': chosenCapacity === capacity },
                                  )}
                                  onClick={() => setChosenCapacuty(capacity)}
                                >
                                  {capacity}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="item-page__separator" />
                      </div>

                      <p className="item-page__price">
                        {`$${itemDetails.priceDiscount}`}
                        <span className="item-page__price--old">{`$${itemDetails.priceRegular}`}</span>
                      </p>

                      <div className="item-page__add-to-cart">
                        <button
                          type="button"
                          aria-label="Add to cart"
                          className={classNames(
                            'wide-button wide-button--high',
                            {
                              'wide-button--active': isAddedToCart,
                            },
                          )}
                          onClick={() => addToCartHandler(itemDetails.id)}
                        >
                          {isAddedToCart
                            ? 'Added to Cart'
                            : 'Add to cart'}
                        </button>
                        <button
                          type="button"
                          aria-label="Add to favorites"
                          className={classNames(
                            'button button--fav button--fav--big',
                            {
                              'button--fav--chosen': isAddedToFav,
                            },
                          )}
                          onClick={() => addTofavoritesHandler(itemDetails.id)}
                          data-cy="addToFavorite"
                        />
                      </div>

                      <ul className="item-page__props-list">
                        <li className="item-page__prop-li">
                          <p>Screen</p>
                          <p className="item-page__prop-value">{itemDetails.screen}</p>
                        </li>
                        <li className="item-page__prop-li">
                          <p>Resolution</p>
                          <p className="item-page__prop-value">{itemDetails.resolution}</p>
                        </li>
                        <li className="item-page__prop-li">
                          <p>Processor</p>
                          <p className="item-page__prop-value">{itemDetails.processor}</p>
                        </li>
                        <li className="item-page__prop-li">
                          <p>RAM</p>
                          <p className="item-page__prop-value">{itemDetails.ram}</p>
                        </li>
                      </ul>
                    </div>

                    <p className="item-page__id">ID: 802390</p>
                  </div>

                </div>
              </section>

              <div className="item-page__flex-container">
                <section className="item-page__section">
                  <div className="item-page__about" data-cy="productDescription">
                    <div>
                      <h2 className="item-page__section-title">
                        About
                      </h2>
                      <div className="item-page__separator" />
                    </div>
                    {itemDetails.description.map(desc => (
                      <article className="item-page__about-article">
                        <h3 className="item-page__article-title">{desc.title}</h3>
                        {desc.text.map((p: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined) => (
                          <p className="item-page__article-p">{p}</p>
                        ))}
                      </article>
                    ))}
                  </div>
                </section>

                <section className="item-page__section">
                  <div>
                    <h2 className="item-page__section-title">
                      Tech specs
                    </h2>
                    <div className="item-page__separator" />
                  </div>
                  <ul className="item-page__tech-specs">
                    <li className="item-page__tech-spec">
                      Screen
                      <span className="item-page__tech-spec--value">{itemDetails.screen}</span>
                    </li>
                    <li className="item-page__tech-spec">
                      Resolution
                      <span className="item-page__tech-spec--value">{itemDetails.resolution}</span>
                    </li>
                    <li className="item-page__tech-spec">
                      Processor
                      <span className="item-page__tech-spec--value">{itemDetails.processor}</span>
                    </li>
                    <li className="item-page__tech-spec">
                      RAM
                      <span className="item-page__tech-spec--value">{itemDetails.ram}</span>
                    </li>
                    <li className="item-page__tech-spec">
                      Built in memory
                      <span className="item-page__tech-spec--value">{itemDetails.capacity}</span>
                    </li>
                    <li className="item-page__tech-spec">
                      Camera
                      <span className="item-page__tech-spec--value">{itemDetails.camera}</span>
                    </li>
                    <li className="item-page__tech-spec">
                      Zoom
                      <span className="item-page__tech-spec--value">{itemDetails.zoom}</span>
                    </li>
                    <li className="item-page__tech-spec">
                      Cell
                      <span className="item-page__tech-spec--value">{itemDetails.cell.join(', ')}</span>
                    </li>
                  </ul>
                </section>
              </div>
            </>
          )
            : <p className="item-page__not-found">No products found...</p>}

          <ProductsSlider title="You may also like" products={suggestedProducts} />
        </div>
      )
  );
}
