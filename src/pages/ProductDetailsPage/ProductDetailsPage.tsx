import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { PRODUCTS_COLORS } from '../../utils/colors';
import './ProductDetailsPage.scss';
import { YouMayAlsoLike } from '../../components/Blocks/YouMayAlsoLike';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { startLoadingProduct } from '../../features/productInfoSlice';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumds';
import classNames from 'classnames';
import { Button } from '../../components/Button/Button';
import { BackButtonImg } from '../../components/BackButtonImg/backButtonImg';
import { Category } from '../../types/category';

type Props = {
  categoryId?: Category;
};

export const ProductDetails: React.FC<Props> = ({ categoryId }) => {
  const dispatch = useAppDispatch();
  const { product, loading } = useAppSelector(state => state.selectedProduct);

  const { productId } = useParams();

  const theme = useAppSelector(state => state.themeSwitcher.theme);
  const location = useLocation();
  const paths = location.pathname.split('/').filter(path => path);
  const x = location.pathname.split('-');

  const itemColor = x[x.length - 1];
  const itemCapacity = x[x.length - 2];

  const [currentImage, setCurrentImage] = useState<string>('');
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    if (product?.id === productId) {
      return;
    }

    /* eslint-disable-next-line */
    dispatch(startLoadingProduct({ categoryId, productId: productId! }));
  }, [productId, categoryId, product?.id, dispatch]);

  const handleCurrentImg = (image: string) => {
    setCurrentImage(image);
  };

  const handleNextImg = () => {
    const index = product?.images.indexOf(currentImage);

    if (index === undefined) {
      return;
    }

    if (!product?.images.length) {
      setImageError('No photo yet');
    } else if (!currentImage) {
      setCurrentImage(product.images[1]);
    } else if (index === product.images.length - 1) {
      setCurrentImage(product.images[0]);
    } else {
      setCurrentImage(product.images[index + 1]);
    }
  };

  const capacityModify = (item: string) => {
    return item.toLocaleLowerCase();
  };

  const itemToUpperCase = (item: string) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  };

  function goBack() {
    window.history.back();
  }

  const buttonClick = `details__buttonBack__click theme-${theme}`;
  const buttonName = `details__buttonBack__name themeDetails-${theme}`;
  const availableColors = `details__product__itemHead themeDetails-${theme}`;
  const lineDetails = `details__product__line theme-${theme}`;
  const detailsColor = `details__product__colorOption theme-${theme}`;
  const detailsCapacity = `details__product__capacityOption theme-${theme}`;
  const productPrice = `details__product__price theme-${theme}`;
  const priceNoDiscount = `details__product__priceNoDiscount theme-${theme}`;
  const descriptionItem = `details__description__item theme-${theme}`;
  const descriptionModels = `details__description__model theme-${theme}`;
  const sectionAboutHead = `details__section__head theme-${theme}`;
  const detailsLine = `details__section__line theme-${theme}`;
  const detailsMain = `details__section__aboutMain theme-${theme}`;
  const detaisParagraph = `details__section__paragraph theme-${theme}`;
  const sectionName = `details__section__name theme-${theme}`;
  const sectionModel = `details__section__model theme-${theme}`;
  const notFound = `details__notFound theme-${theme}`;

  const colorLight = (color: string) => {
    return color === product?.color
      ? `details__product__colorOption--choosen theme-${theme}`
      : '';
  };

  const capacityLight = (capacity: string) => {
    return capacity === product?.capacity
      ? `details__product__capacityOption--choosen theme-${theme}`
      : '';
  };

  const detailsPage = true;

  return (
    <>
      {loading ? (
        <Loader />
      ) : !!product ? (
        <div className="details">
          <div className="details__center">
            <div className="details__container">
              <Breadcrumbs
                title={product.name}
                paths={itemToUpperCase(paths[0])}
                details={true}
              />
              <div className="details__buttonBack">
                <button onClick={goBack} className={buttonClick}>
                  <BackButtonImg classname="details__buttonBack__img" />
                  <div className={buttonName}>Back</div>
                </button>
              </div>
            </div>

            <div className="details__product grid grid--tablet">
              <h1
                className={`details__product__name
                    grid__item--tablet-1-9
                    grid__item--desktop-1-19
                    theme-${theme}`}
              >
                {product?.name}
              </h1>
              <div
                className="details__product__mainImg
                  grid__item--tablet-2-5
                  grid__item--desktop-3-12"
              >
                <img
                  src={currentImage ? currentImage : product.images[0]}
                  alt={product?.category}
                  className="details__product__img"
                  onClick={handleNextImg}
                />
              </div>
              <div
                className="details__product__selectImg
                    grid__item--tablet-1-1
                    grid__item--desktop-1-2"
              >
                {product.images
                  ? product.images.map((image: string, index: number) => {
                      return (
                        <div key={index}>
                          <img
                            src={image}
                            alt={product?.category}
                            className="details__product__image"
                            onClick={() => handleCurrentImg(image)}
                          />
                        </div>
                      );
                    })
                  : imageError}
              </div>
              <div
                className="details__product__options 
                  grid__item--tablet-7-12
                  grid__item--desktop-14-20"
              >
                <div className="details__product__colorsContainer">
                  <div className={availableColors}>Avaliable colors</div>
                  <ul className="details__product__colorsVariants">
                    {product?.colorsAvailable.map((color: string, index) => {
                      return (
                        <Link
                          to={`/${paths[0]}/${product.namespaceId}-${itemCapacity}-${color}`}
                          key={index}
                          style={{ backgroundColor: PRODUCTS_COLORS[color] }}
                          className={classNames(
                            `${detailsColor}`,
                            colorLight(color),
                          )}
                        ></Link>
                      );
                    })}
                  </ul>
                  <div className={lineDetails}></div>
                </div>
                <div className="details__product__capacityContainer">
                  <div className={availableColors}>Select capacity</div>
                  <ul className="details__product__capacityVariants">
                    {product?.capacityAvailable.map(
                      (capacity: string, index) => {
                        return (
                          <Link
                            to={`/${paths[0]}/${product.namespaceId}-${capacityModify(capacity)}-${itemColor}`}
                            key={index}
                            className={classNames(
                              `${detailsCapacity}`,
                              capacityLight(capacity),
                            )}
                          >
                            {capacity}
                          </Link>
                        );
                      },
                    )}
                  </ul>
                  <div className={lineDetails}></div>
                </div>
                <div className="details__product__priceContainer">
                  <div className="details__product__priceBlock">
                    <div className={productPrice}>${product?.priceRegular}</div>
                    <div className={priceNoDiscount}>
                      ${product?.priceDiscount}
                    </div>
                  </div>
                  <div className="details__product__buttonContainer">
                    <Button productId={product.id} detailsPage={detailsPage} />
                  </div>
                  <div className="details__description">
                    <div className="details__description__name">
                      <div className={descriptionItem}>Screen</div>
                      <div className={descriptionModels}>{product?.screen}</div>
                    </div>
                    <div className="details__description__name">
                      <div className={descriptionItem}>Resolution</div>
                      <div className={descriptionModels}>
                        {product?.resolution}
                      </div>
                    </div>
                    <div className="details__description__name">
                      <div className={descriptionItem}>Processor</div>
                      <div className={descriptionModels}>
                        {product?.processor}
                      </div>
                    </div>
                    <div className="details__description__name">
                      <div className={descriptionItem}>RAM</div>
                      <div className={descriptionModels}>{product?.ram}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="details__section">
              <div
                className="details__section__descript
                details__section__descript--about"
              >
                <h2 className={sectionAboutHead}>About</h2>
                <div className={detailsLine}></div>
                {product?.description.map((p, index) => (
                  <div className="details__section__aboutItem" key={index}>
                    <h3 className={detailsMain}>{p.title}</h3>

                    <p className={detaisParagraph}>{p.text}</p>
                  </div>
                ))}
              </div>
              <div className="details__section__descript">
                <div className={sectionAboutHead}>Tech specs</div>
                <div className={detailsLine}></div>
                <div className="details__section__item">
                  <div className={sectionName}>Screen</div>
                  <div className={sectionModel}>{product?.screen}</div>
                </div>
                <div className="details__section__item">
                  <div className={sectionName}>Resolution</div>
                  <div className={sectionModel}>{product?.resolution}</div>
                </div>
                <div className="details__section__item">
                  <div className={sectionName}>Processor</div>
                  <div className={sectionModel}>{product?.processor}</div>
                </div>
                <div className="details__section__item">
                  <div className={sectionName}>RAM</div>
                  <div className={sectionModel}>{product?.ram}</div>
                </div>
                <div className="details__section__item">
                  <div className={sectionName}>Built in memory</div>
                  <div className={sectionModel}>{product?.capacity}</div>
                </div>
                <div className="details__section__item">
                  <div className="details__section__name">Camera</div>
                  <div className={sectionModel}>{product?.camera}</div>
                </div>
                <div className="details__section__item">
                  <div className={sectionName}>Zoom</div>
                  <div className={sectionModel}>{product?.zoom}</div>
                </div>
                <div className="details__section__item">
                  <div className={sectionName}>Cell</div>
                  <div className={sectionModel}>{product?.cell}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={notFound}>Product was not found</div>
      )}
      <div className="details__like">
        <div className="details__like__container">
          <YouMayAlsoLike />
        </div>
      </div>
    </>
  );
};
