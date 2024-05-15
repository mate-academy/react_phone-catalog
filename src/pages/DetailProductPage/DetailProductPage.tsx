import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import './DetailProductPage.scss';
import { useEffect, useState } from 'react';
import { getDetailProducts, getProducts } from '../../utils/api';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { capitalize, correctColor, scrollOnTop } from '../../utils';
import { ProductExtended } from '../../types/ProductExtended';
import { CarouselProductCards } from '../../components/CarouselProductCards';
import { useSwipe } from '../../hooks/useSwipe';
// import { ProductNotFound } from '../../components/ProductNotFound';
import { Loader } from '../../components/Loader';

export const DetailProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  const [currentProduct, setCurrentProduct] = useState<ProductExtended | null>(
    null,
  );

  const [productImages, setProductImages] = useState<string[]>([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  const currentCategory = pathname.split('/')[1];

  useEffect(() => {
    scrollOnTop();
  }, [productId]);

  useEffect(() => {
    getDetailProducts(currentCategory).then(result => {
      const product = result.find(p => p.id === productId);

      setCurrentProduct(product || null);
      if (product) {
        setProductImages(product.images);
        setSelectedColor(product.color);
        setSelectedCapacity(product.capacity);
      }
    });
  }, [productId, currentCategory]);

  useEffect(() => {
    const lowPointPrice = (currentProduct?.priceRegular || 1000) - 300;
    const highPointPrice = (currentProduct?.priceRegular || 1000) + 300;

    getProducts()
      .then(result =>
        result
          .filter(p => p.price < highPointPrice && p.price > lowPointPrice)
          .filter(p => p.category === currentCategory)
          .slice(0, 10),
      )
      .then(setRecommendedProducts);
  }, [currentProduct, currentCategory]);

  const handleChangePhoneColor = (currentColor: string) => {
    if (productId) {
      const path = pathname.split('-');

      path[path.length - 1] = currentColor;

      navigate(path.join('-'));
    } else {
      return;
    }
  };

  const handleChangePhoneCapacity = (currentCapacity: string) => {
    if (productId) {
      const path = pathname.split('-');

      path[path.length - 2] = currentCapacity.toLowerCase();

      navigate(path.join('-'));
    }
  };

  const handleMoveSlidesLeft = () => {
    setSelectedPhotoIndex(prevIndex =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1,
    );
  };

  const handleMoveSlidesRight = () => {
    setSelectedPhotoIndex(prevIndex =>
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const elementRef = useSwipe(handleMoveSlidesLeft, handleMoveSlidesRight);

  return !currentProduct ? (
    // <ProductNotFound />
    <Loader />
  ) : (
    <>
      <div className="history-path">
        <Link to="/">
          <div className="history-path__icon history-path__icon--home" />
        </Link>
        <div className="history-path__icon history-path__icon--arrow" />
        <Link to={`/${currentCategory}`} className="history-path__page-name">
          {capitalize(currentCategory)}
        </Link>
        <div className="history-path__icon history-path__icon--arrow" />
        <Link
          className="history-path__page-name"
          to={`/${currentCategory}/${currentProduct?.id}`}
        >
          {currentProduct?.name}
        </Link>
      </div>

      <div className="history-path">
        <div className="history-path__icon history-path__icon--arrow--back" />
        <Link
          to={state ? `${state.pathname}?${state.search}` : '..'}
          className="history-path__page-name"
        >
          Back
        </Link>
      </div>

      <h1 className="product__title">{currentProduct?.name}</h1>

      <div className="product__main-content">
        <div className="main-content__gallery" ref={elementRef}>
          <div className="gallery__title-photo">
            {productImages.map((image, index) => (
              <img
                className={classNames('title-photo', {
                  'title-photo--selected': index === selectedPhotoIndex,
                })}
                key={image}
                src={image}
              />
            ))}
          </div>

          <div className="gallery__photos-list">
            {productImages.map((image, index) => (
              <img
                className={classNames('photos-list__photo', {
                  'photos-list__photo--selected': index === selectedPhotoIndex,
                })}
                src={image}
                key={image}
                onClick={() => setSelectedPhotoIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="main-content__detail-card detail-card">
          <div className="detail-card__available-color">
            <div className="available-color__text">Available colors</div>
            <div className="available-color__color-buttons">
              {currentProduct?.colorsAvailable.map(color => (
                <button
                  key={color}
                  className={classNames('color-buttons__button', {
                    'color-buttons__button--selected': selectedColor === color,
                  })}
                  onClick={() => handleChangePhoneColor(color)}
                >
                  <div
                    className="button__internal-color"
                    style={{ backgroundColor: correctColor(color) }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="detail-card__select-capacity">
            <div className="select-capacity__text">Select capacity</div>

            <div className="select-capacity__buttons">
              {currentProduct?.capacityAvailable.map(cap => (
                <button
                  key={cap}
                  className={classNames('select-capacity__button', {
                    'select-capacity__button--selected':
                      selectedCapacity === cap,
                  })}
                  onClick={() => handleChangePhoneCapacity(cap)}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>

          <div className="detail-card__to-order">
            <div className="to-order__price">
              <div className="price__new">{`$${currentProduct?.priceDiscount}`}</div>
              <div className="price__old">{`$${currentProduct?.priceRegular}`}</div>
            </div>

            <div className="to-order__buttons">
              <button className="buttons__button--add">Add to card</button>
              <button className="buttons__button--favourite" />
            </div>
          </div>

          <div className="detail-card__characteristic">
            <div className="characteristic">
              <span className="characteristic__title">Screen</span>
              <span className="characteristic__value">
                {currentProduct?.screen}
              </span>
            </div>

            <div className="characteristic">
              <span className="characteristic__title">Resolution</span>
              <span className="characteristic__value">
                {currentProduct?.resolution}
              </span>
            </div>

            <div className="characteristic">
              <span className="characteristic__title">Processor</span>
              <span className="characteristic__value">
                {currentProduct?.processor}
              </span>
            </div>

            <div className="characteristic">
              <span className="characteristic__title">RAM</span>
              <span className="characteristic__value">
                {currentProduct?.ram}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="product__secondary-content">
        <div className="secondary-content__about">
          <div className="about__title">About</div>
          {currentProduct?.description.map(theme => (
            <div key={theme.title} className="about__theme">
              <div className="theme__title">{theme.title}</div>
              <div className="theme__text">
                {theme.text.map(paragraph => (
                  <p key={paragraph} className="theme__paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="secondary-content__tech-specs">
          <div className="tech-specs__title">Tech specs</div>
          <div className="tech-specs__characteristic">
            <div className="characteristic">
              <span className="characteristic__title">Screen</span>
              <span className="characteristic__value">
                {currentProduct?.screen}
              </span>
            </div>

            <div className="characteristic">
              <span className="characteristic__title">Resolution</span>
              <span className="characteristic__value">
                {currentProduct?.resolution}
              </span>
            </div>

            <div className="characteristic">
              <span className="characteristic__title">Processor</span>
              <span className="characteristic__value">
                {currentProduct?.processor}
              </span>
            </div>

            <div className="characteristic">
              <span className="characteristic__title">RAM</span>
              <span className="characteristic__value">
                {currentProduct?.ram}
              </span>
            </div>

            <div className="characteristic">
              <span className="characteristic__title">Capacity</span>
              <span className="characteristic__value">
                {currentProduct?.capacity}
              </span>
            </div>

            <div className="characteristic">
              <span className="characteristic__title">Camera</span>
              <span className="characteristic__value">
                {currentProduct?.camera}
              </span>
            </div>

            <div className="characteristic">
              <span className="characteristic__title">Screen</span>
              <span className="characteristic__value">
                {currentProduct?.screen}
              </span>
            </div>

            <div className="characteristic">
              <span className="characteristic__title">Zoom</span>
              <span className="characteristic__value">
                {currentProduct?.zoom}
              </span>
            </div>

            <div className="characteristic">
              <span className="characteristic__title">Cell</span>
              <span className="characteristic__value">
                {currentProduct?.cell.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <CarouselProductCards
        title={'You may also like'}
        products={recommendedProducts}
        isDiscount
      />
    </>
  );
};
