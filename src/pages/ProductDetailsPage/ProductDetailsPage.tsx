import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductDetails, getSuggestedProducts } from '../../api';
import { ProductType } from '../../types/ProductType';
import { NotFoundPage } from '../NotFoundPage';
import { ProductDetails } from '../../types/ProductDetails';
import styles from './ProductDetailsPage.module.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Loader } from '../../components/Loader';
import { BackButton } from '../../components/BackButton';
import { AddButtons } from '../../components/AddButtons';
import { InfoBlock } from '../../components/InfoBlock';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Product } from '../../types/Product';
import { SliderTitle } from '../../types/SliderTitle';

function isProductType(value: string): value is ProductType {
  return (Object.values(ProductType) as string[]).includes(value);
}

const hexColors = {
  spacegray: '#5F7170',
  midnightgreen: '#4E5851',
  rosegold: '#FCDBC1',
  midnight: '#1F2024',
  spaceblack: '#35393B',
  graphite: '#4C4C4C',
  sierrablue: '#A7C1D9',
  starlight: '#FAF6F2',
};

const getColorHex = (color: string) => {
  const normalized = color.toLowerCase().replace(/[\s-_]+/g, '');

  return hexColors[normalized as keyof typeof hexColors] || normalized;
};

export const ProductDetailsPage = () => {
  const { type, id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState<ProductDetails | undefined>();
  const [currimgInd, setCurrimgInd] = useState(0);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[] | null>(
    null,
  );
  const startX = useRef<number | null>(null);

  useEffect(() => {
    if (!type || !isProductType(type) || !id) {
      return;
    }

    setLoading(true);
    getProductDetails(type, id)
      .then(setProduct)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [type, id]);

  useEffect(() => {
    getSuggestedProducts()
      .then(setSuggestedProducts)
      .catch(() => setError(true));
  }, []);

  if (!type || !isProductType(type) || !id) {
    return <NotFoundPage isNotFoundPage={false} />;
  }

  if (loading) {
    return <Loader />;
  }

  if (!product || error) {
    return <NotFoundPage isNotFoundPage={false} />;
  }

  const toCapitalize = type[0].toUpperCase() + type.slice(1);

  const breadCrumbsElements = [
    { label: 'Home', path: '/' },
    { label: toCapitalize, path: `/${type}` },
    { label: product.name },
  ];

  const getSwipe = (coordEnd: number, coordStart: number | null) => {
    if (coordStart === null) {
      return;
    }

    const distance = coordEnd - coordStart;

    if (Math.abs(distance) < 50) {
      return;
    }

    if (distance > 0) {
      setCurrimgInd(
        (currimgInd - 1 + product.images.length) % product.images.length,
      );
    } else {
      setCurrimgInd((currimgInd + 1) % product.images.length);
    }
  };

  return (
    <section className={styles.productDetailsContainer}>
      <div className={styles.topContent}>
        <BreadCrumbs elements={breadCrumbsElements} />

        <div className={styles.elementsOfTop}>
          <BackButton />

          <h1 className={styles.title}>{product.name}</h1>
        </div>
      </div>

      <div className={styles.middleContent}>
        <div className={styles.imagesBlock}>
          <div className={styles.mainImgWrapper}>
            <img
              src={`/${product.images[currimgInd]}`}
              alt={product.name}
              className={styles.mainimg}
              onTouchStart={e => (startX.current = e.touches[0].clientX)}
              onTouchEnd={e =>
                getSwipe(e.changedTouches[0].clientX, startX.current)
              }
            />
          </div>

          <div className={styles.imagesPrevue}>
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setCurrimgInd(i)}
                className={`${styles.imgButton} ${
                  i === currimgInd ? styles.active : ''
                }`}
              >
                <img src={`/${img}`} className={styles.imagePrevue} />
              </button>
            ))}
          </div>
        </div>

        <article className={styles.characteristics}>
          <div className={styles.charWrapper}>
            <span className={styles.charTitle}>Available colors</span>

            <div className={styles.charBlock}>
              {product.colorsAvailable.map(color => (
                <div
                  key={color}
                  className={`${styles.colorWrapper} ${
                    product.color === color ? styles.activeColor : ''
                  }`}
                >
                  <Link
                    to={`/${product.category}/${product.namespaceId}-${product.capacity.toLowerCase()}-${color}`}
                    className={styles.colorLink}
                    style={{ backgroundColor: getColorHex(color) }}
                    aria-label={color}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.decoration} />

          <div className={styles.charWrapper}>
            <span className={styles.charTitle}>Select capacity</span>

            <div className={styles.charBlock}>
              {product.capacityAvailable.map(cap => (
                <Link
                  key={cap}
                  to={`/${product.category}/${product.namespaceId}-${cap.toLowerCase()}-${product.color}`}
                  className={`${styles.capacityLink} ${
                    product.capacity === cap ? styles.activeCapacity : ''
                  }`}
                >
                  {cap.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.decoration} />

          <div className={styles.toBuyBlock}>
            <div className={styles.priceBlock}>
              <span className={styles.priceDiscount}>
                {`$${product.priceDiscount}`}
              </span>

              <span className={styles.priceRegular}>
                {`$${product.priceRegular}`}
              </span>
            </div>

            <AddButtons product={product} />
          </div>

          <InfoBlock product={product} />
        </article>
      </div>

      <div className={styles.productDetailsBlock}>
        <article className={styles.about}>
          <div className={styles.acticleTitle}>
            <span className={styles.titleText}>About</span>

            <div className={styles.decoration} />
          </div>

          {product.description.map(des => (
            <div key={des.title} className={styles.desBlock}>
              <p className={styles.desTitle}>{des.title}</p>

              <p className={styles.desText}>{des.text}</p>
            </div>
          ))}
        </article>

        <article className={styles.techSpecs}>
          <div className={styles.acticleTitle}>
            <span className={styles.titleText}>Tech specs</span>

            <div className={styles.decoration} />
          </div>

          <div className={styles.infoBlock}>
            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Screen</span>

              <span>{product.screen}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Resolution</span>

              <span>{product.resolution}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Processor</span>

              <span>{product.processor}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoKey}>RAM</span>

              <span>{product.ram}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Built in memory</span>

              <span>{product.capacity}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Camera</span>

              <span>{product.camera}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Zoom</span>

              <span>{product.zoom}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Cell</span>

              <span>{product.cell}</span>
            </div>
          </div>
        </article>

        <div className={styles.suggestionBlock}>
          {suggestedProducts && suggestedProducts?.length > 0 && !error && (
            <ProductsSlider
              products={suggestedProducts}
              sliderTitle={SliderTitle.SuggestedProducts}
            />
          )}
        </div>
      </div>
    </section>
  );
};
