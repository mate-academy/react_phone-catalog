/* eslint-disable react/jsx-one-expression-per-line */
import classNames from 'classnames';
import React, {
  useState, useEffect, Fragment,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import { BackLink } from '../../components/BackLink';
import { Error } from '../../components/Error';
import { Loader } from '../../components/Loader';
import { MainProductDetails } from '../../components/MainProductDetails';
import { ProductsSlider } from '../../components/ProductsSlider';
// eslint-disable-next-line max-len
import { getProductDetailsFromServer } from '../../helpers/fuctions/fetchProduct';
import { shuffle } from '../../helpers/fuctions/shuffle';
import { Product } from '../../helpers/types/Product';
import { ProductDetails } from '../../helpers/types/ProductDetails';
import { TechSpecs } from '../../helpers/types/TechSpecs';

type Props = {
  products: Product[] | null;
};

export const ProductDetailsPage: React.FC<Props> = ({ products }) => {
  const { selectedProductId = '' } = useParams();
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [techSpecs, setTechSpecs] = useState<TechSpecs[] | []>([]);
  const shuffledArray = shuffle(products);
  const [selectedImg, setSelectedImg] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const pureProductArray = selectedProductId.split('-').slice(0, -2);
  const product = products?.find(pr => pr.itemId === selectedProductId);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  async function getProductDetails() {
    setLoading(true);

    try {
      const productDetails
      = await getProductDetailsFromServer(selectedProductId);

      setDetails(productDetails);
    } catch (error) {
      if (products?.some(pr => pr.itemId === selectedProductId)) {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleImgSelect = (img: string) => {
    setSelectedImg(img);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleCapacitySelect = (capacity: string) => {
    setSelectedCapacity(capacity);
  };

  useEffect(() => {
    setTechSpecs(
      [
        { name: 'Screen', value: details?.screen },
        { name: 'Resolution', value: details?.resolution },
        { name: 'Processor', value: details?.processor },
        { name: 'RAM', value: details?.ram },
        { name: 'Built-in memory', value: details?.capacity },
        { name: 'Camera', value: details?.camera },
        { name: 'Zoom', value: details?.zoom },
        { name: 'Cell', value: details?.cell.join(', ') },
      ],
    );

    setSelectedImg(details?.images[0] || '');
    setSelectedColor(details?.color || '');
    setSelectedCapacity(details?.capacity.toLowerCase() || '');
  }, [details?.id]);

  useEffect(() => {
    getProductDetails();
  }, [selectedProductId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="product-details">
      <BackLink />

      {isError && (<Error />)}

      { !isLoading && !isError && !details && (
        <Error message="Product was not found" />
      )}

      { !isLoading && !isError && details && (
        <>
          <h1 className="product-details__title">
            {details?.name}
          </h1>

          <div className="product-details__main-block">
            <article className="product-details__pictures-block">
              <div className="product-details__pictures-list">
                {details?.images.map(img => (
                  <button
                    type="button"
                    key={img}
                    className={classNames(
                      'product-details__pictures-item',
                      {
                        'product-details--is-active-border':
                      selectedImg === img,
                      },
                    )}
                    onClick={() => handleImgSelect(img)}
                  >
                    <img
                      src={img}
                      alt={details?.name}
                      className="product-details__img"
                    />
                  </button>
                ))}
              </div>
              <div
                className="product-details__pictures-presentation"
              >
                <img
                  src={selectedImg}
                  alt={details?.name}
                  className="product-details__img"
                />
              </div>
            </article>

            <article className="product-details__actions-block">
              <div className="product-details__colors">
                <p>Available colors</p>

                <ul className="product-details__actions-list">
                  {details?.colorsAvailable.map(color => {
                    let currColor = '';

                    switch (color) {
                      case 'rosegold':
                        currColor = '#b76e79';
                        break;

                      case 'spacegray':
                        currColor = '#717378';
                        break;

                      case 'midnightgreen':
                        currColor = '#004953';
                        break;

                      default:
                        currColor = color;
                    }

                    return (
                      <li
                        key={color}
                        className={classNames(
                          'product-details__color-item',
                          {
                            'product-details--is-active-border':
                            selectedColor === color,
                          },
                        )}
                      >
                        <Link
                          to={`../${[...pureProductArray, selectedCapacity, color].join('-')}`}
                          className="product-details__color-link"
                          style={{
                            backgroundColor: `${currColor}`,
                          }}
                          type="button"
                          aria-label="Mute volume"
                          onClick={() => handleColorSelect(color)}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="product-details__capacity">
                <p>Select capacity</p>

                <ul className="product-details__actions-list">
                  {details?.capacityAvailable.map(capacity => (
                    <li
                      key={capacity}
                      className={classNames(
                        'product-details__capacity-item',
                        {
                          'product-details--is-active-background':
                          selectedCapacity === capacity.toLowerCase(),
                        },
                      )}
                    >
                      <Link
                        to={`../${[
                          ...pureProductArray,
                          capacity.toLowerCase(),
                          selectedColor,
                        ].join('-')}`}
                        onClick={() => handleCapacitySelect(capacity)}
                      >
                        {capacity}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <MainProductDetails
                product={product}
                characteristicsArr={techSpecs.slice(0, 4)}
                detailsOrder={['price', 'buttons', 'characteristics']}
                priceClassName="product-details__price"
                buttonsClassName="product-details__buttons"
              />
            </article>

            <article
              className="product-details__about-block"
              data-cy="productDescription"
            >
              <h3 className="product-details__block-title">About</h3>

              {details?.description.map(info => (
                <Fragment key={info.title}>
                  <h4 className="product-details__paragraphe-title">
                    {info.title}
                  </h4>
                  <p className="product-details__paragraphe-text">
                    {info.text}
                  </p>
                </Fragment>
              ))}
            </article>

            <article className="product-details__tech-block">
              <h3 className="product-details__block-title">Tech specs</h3>

              <ul className="main-product-details__characteristics-container">
                {techSpecs.map(parameter => (
                  <li
                    key={parameter.name}
                    className="main-product-details__characteristic"
                  >
                    {parameter.name}
                    <span
                      className="main-product-details__characteristic-value"
                    >
                      {parameter.value}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </>
      )}

      <ProductsSlider
        title="You may also like"
        products={shuffledArray}
        topAmount={products?.length || 0}
      />
    </section>
  );
};
