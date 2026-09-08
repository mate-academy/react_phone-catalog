import { Link, NavLink, useParams } from 'react-router-dom';
import './ProductDetailsPage.scss';
import '../../HomePage/components/SliderCards/SliderCards.scss';
import { ItemCard, Product, colorMap } from '../../../constants/common';
import productList from '../../../../public/api/products.json';
import { SliderCards } from '../../HomePage/components/SliderCards';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { toggleFavorite } from '../../../redux/favoritesSlice';
import { Breadcrumbs } from '../../../components/Breadcrumbs/Breadcrumbs';
import { fetchProducts } from '../../../utils/fetchProducts';
import { mapToFavoriteItem } from '../../../utils/helpers';
import { toggleCartItem } from '../../../redux/cartSlice';
import { withMinDelay } from '../../../utils/delay';
import { Loader } from '../../../components/Loader';

export const ProductDetailsPage = () => {
  const { category, product } = useParams();
  const [photo, setPhoto] = useState(0);
  const [currentProduct, setCurrentProduct] = useState<ItemCard | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (category && product) {
      setIsLoading(true);
      setHasError(false);

      withMinDelay(fetchProducts(category, product), 300)
        .then(data => {
          if (!data || Array.isArray(data)) {
            setHasError(true);

            return;
          }

          setCurrentProduct(data);
          setPhoto(0);
        })
        .catch(() => {
          setHasError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });

      fetchProducts(category).then(products => {
        if (product) {
          setSimilarProducts(
            (products as Product[]).filter(
              (p: Product) => p.id !== Number(product),
            ),
          );
        }
      });
    }

    window.scrollTo(0, 0);
  }, [category, product]);

  const productFromList = productList.find(
    item => item.itemId === currentProduct?.id,
  );

  const productId = productFromList ? productFromList.itemId : 'Unknown ID';
  const id = productFromList ? productFromList.id : 'Unknown ID';
  const isAdded = cart.some(fav => fav.id === productId);

  const activePhotoRef = useRef(0);

  const handlePhotoClick = (index: number) => {
    activePhotoRef.current = index;
    setPhoto(index);
  };

  const handleFavoriteClick = (prod: Product | ItemCard) => {
    const item = mapToFavoriteItem(prod);

    dispatch(toggleFavorite(item));
  };

  const handleCartClick = (prod: Product | ItemCard) => {
    const item = mapToFavoriteItem(prod);

    dispatch(toggleCartItem(item));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div className="card__container">
        <p className="error-message">Oops! Product was not found 😥</p>
        <Link to={`../${category}`} className="button-back">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="card__container">
      <Breadcrumbs />
      <Link to={`/${category}`} className="back">
        <span className="back__icon"></span>
        Back
      </Link>
      <div className="card__content">
        <h3 className="card__title">{currentProduct?.name}</h3>
        <div className="card__main-info">
          <div className="card__images-container images">
            <div className="images-small-box">
              {currentProduct?.images?.map((img, index) => (
                <div className="image-small" key={index}>
                  <img
                    key={index}
                    src={`./${img}`}
                    alt={`Thumbnail ${index}`}
                    className={`img-small ${photo === index ? 'active' : ''}`}
                    onClick={() => handlePhotoClick(index)}
                  />
                </div>
              ))}
            </div>
            <div className="images-big-box">
              <img
                src={`./${currentProduct?.images[photo]}`}
                alt={currentProduct?.name}
                className="img-big"
              />
            </div>
          </div>

          <div className="card__details-container">
            <div className="card__details">
              <div className="color-and-id">
                <div className="info-block info-block--colors">
                  <p className="info-block__title">Available colors</p>
                  <div className="info-block__list">
                    {currentProduct?.colorsAvailable.map((color, index) => {
                      if (!product) {
                        return null;
                      }

                      const currentColor = currentProduct.colorsAvailable.find(
                        col => product.includes(col.replace(/\s/g, '-')),
                      );

                      const newProductUrl = product.replace(
                        currentColor?.replace(/\s/g, '-') || '',
                        color.replace(/\s/g, '-'),
                      );

                      return (
                        <NavLink
                          to={`/${category}/${newProductUrl}`}
                          key={index}
                          className={({ isActive }) =>
                            isActive
                              ? 'info-block__item info-block__item--clr active'
                              : 'info-block__item info-block__item--clr'
                          }
                          style={{
                            backgroundColor:
                              colorMap[
                                color.toLowerCase().replace(/\s/g, '')
                              ] || color,
                          }}
                        ></NavLink>
                      );
                    })}
                  </div>
                </div>
                <span className="id-temp">ID: {id}</span>
              </div>
              <div className="info-block info-block--capacity">
                <p className="info-block__title">Select capacity</p>
                <div className="info-block__list">
                  {currentProduct?.capacityAvailable?.map((capacity, index) => {
                    if (!product) {
                      return null;
                    }

                    const currentCapacity =
                      currentProduct.capacityAvailable.find(cap =>
                        product.includes(cap.toLowerCase()),
                      );

                    const newProductUrl = product.replace(
                      currentCapacity?.toLowerCase() || '',
                      capacity.toLowerCase(),
                    );

                    return (
                      <NavLink
                        to={`/${category}/${newProductUrl}`}
                        key={index}
                        className={({ isActive }) =>
                          isActive
                            ? 'info-block__item info-block__item--cpcty active'
                            : 'info-block__item info-block__item--cpcty'
                        }
                      >
                        {capacity}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
              <div className="price">
                <p>${currentProduct?.priceDiscount}</p>
                <span className="old-price">
                  ${currentProduct?.priceRegular}
                </span>
              </div>
              <div className="actions">
                <button
                  className={isAdded ? 'add-to-cart--added' : 'add-to-cart'}
                  onClick={() =>
                    currentProduct && handleCartClick(currentProduct)
                  }
                >
                  {isAdded ? 'Added to card' : 'Add to card'}
                </button>
                {currentProduct && (
                  <button
                    className="add-to-favorite"
                    onClick={() => handleFavoriteClick(currentProduct)}
                  >
                    <img
                      src={
                        favorites.some(fav => fav.id === currentProduct.id)
                          ? './img/icons/remove-from-fovourites.webp'
                          : './img/icons/add-to-fovourites.svg'
                      }
                      alt=""
                    />
                  </button>
                )}
              </div>

              <div className="card__info">
                <div className="card__info-item">
                  <p className="card__info-label">Screen</p>
                  <p className="card__info-value">{currentProduct?.screen}</p>
                </div>
                <div className="card__info-item">
                  <p className="card__info-label">Capacity</p>
                  <p className="card__info-value">{currentProduct?.capacity}</p>
                </div>
                <div className="card__info-item">
                  <p className="card__info-label">Processor</p>
                  <p className="card__info-value">
                    {currentProduct?.processor}
                  </p>
                </div>
                <div className="card__info-item">
                  <p className="card__info-label">RAM</p>
                  <p className="card__info-value">{currentProduct?.ram}</p>
                </div>
              </div>
            </div>
            <div className="id">
              <p>ID: {id}</p>
            </div>
          </div>
        </div>
        <div className="card__description">
          <section className="about-block">
            <h3 className="block-title">About</h3>
            {currentProduct?.description.map((info, index) => (
              <div className="about-block__info" key={index}>
                <h4 className="about-block__title">{info.title}</h4>
                <p className="about-block__text">{info.text}</p>
              </div>
            ))}
          </section>
          <section className="tech-specs-block">
            <h3 className="block-title">Tech specs</h3>
            <ul className="tech-specs-block__list">
              <li className="tech-specs-block__info">
                <p className="tech-specs-block__info-label">Screen</p>
                <p className="tech-specs-block__info-value">
                  {currentProduct?.screen}
                </p>
              </li>
              <li className="tech-specs-block__info">
                <p className="tech-specs-block__info-label">Resolution</p>
                <p className="tech-specs-block__info-value">
                  {currentProduct?.resolution}
                </p>
              </li>
              <li className="tech-specs-block__info">
                <p className="tech-specs-block__info-label">Processor</p>
                <p className="tech-specs-block__info-value">
                  {currentProduct?.processor}
                </p>
              </li>
              <li className="tech-specs-block__info">
                <p className="tech-specs-block__info-label">RAM</p>
                <p className="tech-specs-block__info-value">
                  {currentProduct?.ram}
                </p>
              </li>
              {(category === 'phones' || category === 'tablets') && (
                <>
                  <li className="tech-specs-block__info">
                    <p className="tech-specs-block__info-label">
                      Built in memory
                    </p>
                    <p className="tech-specs-block__info-value">
                      {currentProduct?.capacity}
                    </p>
                  </li>
                  <li className="tech-specs-block__info">
                    <p className="tech-specs-block__info-label">Camera</p>
                    <p className="tech-specs-block__info-value">
                      {currentProduct?.camera}
                    </p>
                  </li>
                  <li className="tech-specs-block__info">
                    <p className="tech-specs-block__info-label">Zoom</p>
                    <p className="tech-specs-block__info-value">
                      {currentProduct?.zoom}
                    </p>
                  </li>
                </>
              )}
              <li className="tech-specs-block__info">
                <p className="tech-specs-block__info-label">Cell</p>
                <p className="tech-specs-block__info-value">
                  {currentProduct?.cell.join(', ')}
                </p>
              </li>
            </ul>
          </section>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <SliderCards products={similarProducts} title="You may also like" />
      )}
    </div>
  );
};
