import { useNavigate, useParams } from 'react-router-dom';
import style from './ProductDetailsPage.module.scss';
import { useProductDetails } from '../../hook/useProductDetails';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Icon } from '../../components/ui/Icon/Icon';
import { Gallery } from './Galery';
import { ColorOptions } from './ColorOptions';
import { CapacityOptions } from './CapacityOptions';
import classNames from 'classnames';
import { TechSpec } from './TechSpec/TechSpec';
import { ProductsSlider } from '../../components/ProductsSlider';
import { SkeletonDetails } from '../../components/SkeletonDetails';
import { ErrorScreen } from '../../components/ErrorScreen';
import { useFavorite } from '../../context/FavoriteContext';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { selectedProsuct, product, suggested, isLoading, errorMessage } =
    useProductDetails(productId);

  const { isFavorite, toggleFavorite } = useFavorite();
  const isAddedToFavorite = selectedProsuct
    ? isFavorite(selectedProsuct.id)
    : false;

  const handleActionFavoriteClick = () => {
    if (selectedProsuct) {
      toggleFavorite(selectedProsuct);
    }
  };

  const spec = [
    { nameSpec: 'Screen', value: product?.screen },
    { nameSpec: 'Resolution', value: product?.resolution },
    { nameSpec: 'Processor', value: product?.processor },
    { nameSpec: 'RAM', value: product?.ram },
  ];

  return (
    <div className={style.productDetails}>
      <div className={style.productDetails__breadcrumbs}>
        <Breadcrumbs
          category={selectedProsuct?.category}
          productName={selectedProsuct?.name}
        />
      </div>
      <div className={style.productDetails__containerBack}>
        <button
          className={style.productDetails__buttonBack}
          onClick={() => navigate(-1)}
        >
          <Icon className={style.productDetails__iconBack} nameIcon="left" />
          <span className={style.productDetails__back}>Back</span>
        </button>
      </div>
      {isLoading && (
        <div className={style.productDetails__skeleton}>
          <SkeletonDetails />
        </div>
      )}

      {!isLoading && errorMessage && <ErrorScreen title={errorMessage} />}

      {!product && (
        <p className={style.productDetails__notFound}>Product was not found.</p>
      )}

      {!isLoading && product && !errorMessage && (
        <>
          <h2 className={style.productDetails__title}>
            {selectedProsuct?.name}
          </h2>

          <div className={style.productDetails__gallery}>
            <Gallery images={product?.images} />
          </div>

          <div className={style.productDetails__optionsActionContainer}>
            <div className={style.productDetails__options}>
              <ColorOptions product={product} />
            </div>

            <hr className={style.productDetails__hr} />

            <div className={style.productDetails__capacity}>
              <CapacityOptions product={product} />
            </div>

            <hr
              className={classNames(style.productDetails__hr, [
                style['productDetails__hr--bottom'],
              ])}
            />

            <h3 className={style.productDetails__priceContainer}>
              <span className={style.productDetails__price}>
                ${selectedProsuct?.price}
              </span>
              {selectedProsuct?.fullPrice !== selectedProsuct?.price && (
                <span className={style.productDetails__fullPrice}>
                  ${selectedProsuct?.fullPrice}
                </span>
              )}
            </h3>

            <div className={style.productDetails__actionContainer}>
              <button className={style.productDetails__actionAdd}>
                Add to cart
              </button>

              <button
                className={style.productDetails__actonFavorite}
                onClick={handleActionFavoriteClick}
              >
                {isAddedToFavorite ? (
                  <Icon
                    className={style.productDetails__favoriteIcon}
                    nameIcon="addedToFavorite"
                  />
                ) : (
                  <Icon
                    className={style.productDetails__favoriteIcon}
                    nameIcon="addFavorite"
                  />
                )}
              </button>
            </div>

            <div className={style.productDetails__specContainer}>
              {spec.map(({ nameSpec, value }) => (
                <div key={nameSpec} className={style.productDetails__spec}>
                  <span className={style.productDetails__specName}>
                    {nameSpec}
                  </span>
                  <span className={style.productDetails__specValue}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={style.productDetails__bottom}>
            <section className={style.productDetails__about}>
              <div>
                <h3 className={style.productDetails__aboutTitle}>About</h3>
                <hr className={style.productDetails__hrAbout} />
              </div>
              {product.description.map((description, index) => (
                <article key={index} className={style.productDetails__article}>
                  <h4 className={style.productDetails__articleTitle}>
                    {description.title}
                  </h4>
                  <p className={style.productDetails__paragraph}>
                    {description.text}
                  </p>
                </article>
              ))}
            </section>

            <div className={style.productDetails__specs}>
              <h3 className={style.productDetails__titleTech}>Tech specs</h3>
              <hr className={style.productDetails__hrAbout} />
              <div>
                <TechSpec product={product} />
              </div>
            </div>
          </div>

          <div className={style.productDetails__suggested}>
            {suggested && (
              <ProductsSlider
                titleLine1="You may also like"
                products={suggested}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
