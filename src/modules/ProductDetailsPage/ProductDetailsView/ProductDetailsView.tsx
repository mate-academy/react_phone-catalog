import { Link, useNavigate } from 'react-router-dom';
import Breadcrumps from '../../shared/components/Breadcrumps/Breadcrumps';
import { ProductDetails } from '../../shared/types/ProductDetails';
import styles from './ProductDetailsView.module.scss';
import { useEffect, useState } from 'react';
import { ColorKey, getColor } from '../../shared/utils/color';
import { ProductsSlider } from '../../shared/components/ProductsSlider';
import { Product } from '../../shared/types/Product';
import { ButtonAddToCart } from '../../shared/components/ButtonAddToCart';
// eslint-disable-next-line max-len
import { ButtonAddToFavorites } from '../../shared/components/ButtonAddToFavorites';
import { asset } from '../../shared/utils/asset';

type Props = {
  productDetails: ProductDetails;
  suggestedProducts?: Product[];
};

export const ProductDetailsView: React.FC<Props> = ({
  productDetails,
  suggestedProducts = [],
}) => {
  const [mainPhoto, setMainPhoto] = useState(productDetails.images[0]);

  useEffect(() => {
    setMainPhoto(productDetails.images[0]);
  }, [productDetails.images]);

  const navigate = useNavigate();

  return (
    <div className={styles.section}>
      <Breadcrumps type={productDetails.category} name={productDetails.name} />

      <div className={styles.back}>
        <svg
          className={styles.icon}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
            fill="currentColor"
          />
        </svg>
        <div onClick={() => navigate(-1)} className={styles.backLink}>
          <p className={styles.text}>Back</p>
        </div>
      </div>

      <h1 className={styles.sectionTitle}>{productDetails.name}</h1>

      <div className={styles.content}>
        <div className={styles.mainPhoto}>
          <img
            src={asset('/' + mainPhoto)}
            alt="Main Photo"
            className={styles.mainPhotoImg}
          />
        </div>
        <div className={styles.previews}>
          {productDetails.images.map((url, i) => (
            <div
              key={i}
              className={`${styles.previewPhoto} ${mainPhoto === url ? styles['previewPhoto--active'] : ''}`}
            >
              <img
                src={asset('/' + url)}
                alt="Preview Photo"
                className={styles.previewPhotoImg}
                onClick={() => setMainPhoto(url)}
              />
            </div>
          ))}
        </div>
        <div className={styles.details}>
          <div className={styles.detail}>
            <p className={styles.detailId}>ID: {productDetails.product.id}</p>
            <p className={styles.detailTitle}>Available colors </p>

            <div className={styles.colors}>
              {productDetails.colorsAvailable.map((color: ColorKey) => {
                const normalizedColor = color
                  .split(' ')
                  .join('-')
                  .toLowerCase();

                const newItemId = `${productDetails.namespaceId}-${productDetails.capacity.toLowerCase()}-${normalizedColor}`;

                return (
                  <Link
                    to={`/product/${newItemId}`}
                    key={color}
                    className={`${styles.colorBlock} ${color === productDetails.color ? styles['colorBlock--active'] : ''}`}
                  >
                    <div
                      className={styles.color}
                      style={{ backgroundColor: getColor(color) }}
                    ></div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className={styles.detail}>
            <p className={styles.detailTitle}>Select capacity</p>
            <div className={styles.capacities}>
              {productDetails.capacityAvailable.map(capacity => {
                const normalizedColor = productDetails.color
                  .split(' ')
                  .join('-')
                  .toLowerCase();

                const newItemId = `${productDetails.namespaceId}-${capacity.toLowerCase()}-${normalizedColor}`;

                return (
                  <Link
                    to={`/product/${newItemId}`}
                    key={capacity}
                    className={`${styles.capacityLink}  ${capacity === productDetails.capacity ? styles.active : ''}`}
                  >
                    <p>{capacity}</p>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className={styles.prices}>
            <p className={styles.price}>${productDetails.priceRegular}</p>
            <p className={styles.fullPrice}>${productDetails.priceDiscount}</p>
          </div>
          <div className={styles.buttons}>
            <ButtonAddToCart product={productDetails.product} />

            <ButtonAddToFavorites product={productDetails.product} />
          </div>
          <div className={styles.characteristics}>
            <div className={styles.characteristic}>
              <p className={styles.cName}>Screen</p>
              <p className={styles.cValue}>{productDetails.screen}</p>
            </div>

            <div className={styles.characteristic}>
              <p className={styles.cName}>Resolution</p>
              <p className={styles.cValue}>{productDetails.resolution}</p>
            </div>

            <div className={styles.characteristic}>
              <p className={styles.cName}>Processor</p>
              <p className={styles.cValue}>{productDetails.processor}</p>
            </div>
            <div className={styles.characteristic}>
              <p className={styles.cName}>RAM</p>
              <p className={styles.cValue}>{productDetails.ram}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.about}>
        <div>
          <h3 className={styles.aboutTitle}>About</h3>
          <div className={styles.descriptions}>
            {productDetails.description.map((desc, index) => (
              <div key={index} className={styles.descBlock}>
                <h4 className={styles.descTitle}>{desc.title}</h4>

                {desc.text.map((text, i) => (
                  <p className={styles.descText} key={i}>
                    {text}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className={styles.aboutTitle}>Tech specs</h3>
          <div className={styles.characteristics}>
            <div className={styles.characteristic}>
              <p className={styles.specName}>Screen</p>
              <p className={styles.specValue}>{productDetails.screen}</p>
            </div>

            <div className={styles.characteristic}>
              <p className={styles.specName}>Resolution</p>
              <p className={styles.specValue}>{productDetails.resolution}</p>
            </div>

            <div className={styles.characteristic}>
              <p className={styles.specName}>Processor</p>
              <p className={styles.specValue}>{productDetails.processor}</p>
            </div>
            <div className={styles.characteristic}>
              <p className={styles.specName}>RAM</p>
              <p className={styles.specValue}>{productDetails.ram}</p>
            </div>
            <div className={styles.characteristic}>
              <p className={styles.specName}>Built in memory</p>
              <p className={styles.specValue}>{productDetails.capacity}</p>
            </div>

            {productDetails.camera && (
              <div className={styles.characteristic}>
                <p className={styles.specName}>Camera</p>
                <p className={styles.specValue}>{productDetails.camera}</p>
              </div>
            )}

            {productDetails.zoom && (
              <div className={styles.characteristic}>
                <p className={styles.specName}>Zoom</p>
                <p className={styles.specValue}>{productDetails.zoom}</p>
              </div>
            )}

            <div className={styles.characteristic}>
              <p className={styles.specName}>Cell</p>
              <p className={styles.specValue}>
                {productDetails.cell.join(' ')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ProductsSlider
        key={'suggested'}
        products={suggestedProducts}
        title={'You may also like'}
        showDiscount={true}
      />
    </div>
  );
};
