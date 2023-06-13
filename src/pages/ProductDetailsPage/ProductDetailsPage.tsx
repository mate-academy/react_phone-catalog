/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/jsx-one-expression-per-line */
import classNames from 'classnames';
import React, {
  useState, useEffect, Fragment,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductsSlider } from '../../components/ProductsSlider';
// eslint-disable-next-line max-len
import { getProductDetailsFromServer } from '../../helpers/fuctions/fetchProduct';
import { shuffle } from '../../helpers/fuctions/shuffle';
import { Product } from '../../helpers/types/Product';
import { ProductDetails } from '../../helpers/types/ProductDetails';

type Props = {
  products: Product[] | null;
};

type TechSpecs = {
  name: string;
  value: string | number | undefined;
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
  const [isProductSelected, setProductSelected] = useState(false);

  async function getProductDetails() {
    const productDetails = await getProductDetailsFromServer(selectedProductId);

    setDetails(productDetails);
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

  const toggleProduct = () => {
    const product = products?.find(pr => pr.itemId === details?.id);

    const cartedProducts = JSON.parse(window.localStorage
      .getItem('cartedProducts') || '[]');

    if (!isProductSelected) {
      window.localStorage.setItem('cartedProducts', JSON.stringify(
        [...cartedProducts, { ...product, count: 1 }],
      ));
    } else {
      const arr = cartedProducts.filter(
        (pr: Product) => pr.itemId !== product?.itemId,
      );

      window.localStorage.setItem(
        'cartedProducts', JSON.stringify([...arr]),
      );
    }

    window.console.log(JSON.parse(window.localStorage
      .getItem('cartedProducts') || '[]'));

    setProductSelected(!isProductSelected);
  };

  useEffect(() => {
    getProductDetails();
  }, [selectedProductId]);

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
    setProductSelected(
      JSON.parse(window.localStorage
        .getItem('cartedProducts') || '[]')
        .some(
          (pr: Product) => pr.itemId === details?.id,
        ),
    );
  }, [details?.id]);

  return (
    <section className="product-details">
      <Link to="/phones" className="product-details__back">
        Back
      </Link>

      <h2 className="product-details__title">
        {details?.name}
      </h2>

      <div className="product-details__main-block">
        <article className="product-details__pictures-block">
          <div className="product-details__pictures-list">
            {details?.images.map(img => (
              <button
                type="button"
                key={img}
                className={classNames(
                  'product-details__pictures-item',
                  { 'product-details--is-active-border': selectedImg === img },
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

          <div className="main-product-details">
            <p className="main-product-details__price product-details__price">
              ${details?.priceDiscount}
              <span className="main-product-details__sale">
                ${details?.priceRegular}
              </span>
            </p>

            <div className="
              main-product-details__buttons
              product-details__buttons"
            >
              <button
                type="button"
                className={classNames(
                  'main-product-details__add-to-cart',
                  'icon-button',
                  { 'main-product-details--is-selected': isProductSelected },
                )}
                onClick={toggleProduct}
              >
                {isProductSelected ? 'Selected' : 'Add to cart'}
              </button>
              <button
                type="button"
                aria-label="Mute volume"
                className="main-product-details__add-to-favorites icon-button"
              />
            </div>

            <ul className="main-product-details__characteristics-container">
              {techSpecs.slice(0, 4).map(parameter => (
                <li
                  key={parameter.name}
                  className="main-product-details__characteristic"
                >
                  {parameter.name}
                  <span className="main-product-details__characteristic-value">
                    {parameter.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="product-details__about-block">
          <h3 className="product-details__block-title">About</h3>

          {details?.description.map(info => (
            <Fragment key={info.title}>
              <h4 className="product-details__paragraphe-title">
                {info.title}
              </h4>
              <p className="product-details__paragraphe-text">{info.text}</p>
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
                <span className="main-product-details__characteristic-value">
                  {parameter.value}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <ProductsSlider
        title="You may also like"
        products={shuffledArray}
        topAmount={products?.length || 0}
      />
    </section>
  );
};
