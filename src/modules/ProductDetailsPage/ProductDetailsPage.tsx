/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */
import { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductDetails } from './hooks/useProductDetails';
import { Loader } from '../shared/components/Loader';
import productNotFound from '../../assets/images/product-not-found.png';
import { ProductImagesGallery } from './components/ProductImagesGallery';
import { ErrorNotice } from '../shared/components/ErrorNotice';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { CATEGORIES } from '../shared/constants';
import s from './ProductDetailsPage.module.scss';
import { ProductButtons } from '../shared/components/ProductButtons';
import { ProductTechSpec } from './components/ProductTechSpec';
import { SuggestedProducts } from './components/SuggestedProducts';
import { GoBackLink } from '../shared/components/GoBackLink';

const normalizeString = (string: string, separator: string = '') =>
  string.replace(/\s+/g, separator).toLowerCase();

export const ProductDetailsPage: FC = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();

  const { product, isLoading, errorMessage } = useProductDetails(productId);

  const techSpecs = [
    { label: 'Screen', value: product?.screen ?? '' },
    { label: 'Resolution', value: product?.resolution ?? '' },
    { label: 'Processor', value: product?.processor ?? '' },
    { label: 'RAM', value: product?.ram ?? '' },
    { label: 'Built in memory', value: product?.capacity ?? '' },
    { label: 'Camera', value: product?.camera ?? '' },
    { label: 'Zoom', value: product?.zoom ?? '' },
    {
      label: 'Cell',
      value: product?.cell?.join(', ') ?? '',
    },
  ].filter(spec => spec.value);

  const handleNavigate = (color: string, capacity: string) => {
    const normalizedCapacity = normalizeString(capacity);
    const normalizedColor = normalizeString(color, '-');

    const path = `/product/${product?.namespaceId}-${normalizedCapacity}-${normalizedColor}`;

    navigate(path);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return (
      <ErrorNotice
        message={errorMessage}
        onReload={() => window.location.reload()}
      />
    );
  }

  if (!product) {
    return (
      <div className={s.productNotFound}>
        <h1>Product was not found</h1>
        <button onClick={() => navigate(-1)}>Go Back</button>
        <img src={productNotFound} alt="Product was not found" />
      </div>
    );
  }

  const paths = [
    {
      link: CATEGORIES[product.category].path,
      label: CATEGORIES[product.category].name,
    },
    { link: null, label: product.name },
  ];

  return (
    <main>
      <section className={s.container}>
        <Breadcrumbs paths={paths} />
        <GoBackLink />
        <h2 className={s.productDetailsH2}>{product.name}</h2>
        <div className={s.productDetailsContent}>
          <div className={s.productContentLeft}>
            <ProductImagesGallery images={product.images} alt={product.name} />
          </div>
          <div className={s.productContentRight}>
            <div className={s.productContentWide}>
              <span className={s.productDetailsLabel}>Available colors</span>
              <span className={s.productDetailsLabel}>
                ID: {product.productId}
              </span>
            </div>
            <div className={s.productContentRightTop}>
              <div className={s.productDetailsBlock}>
                <ul className={s.optionsList}>
                  {product.colorsAvailable.map(color => {
                    const normalizedColor = normalizeString(color);

                    return (
                      <li key={color}>
                        <button
                          className={`${s.colorButton} ${s[normalizedColor] || ''} ${color === product.color ? s.selected : ''}`}
                          type="button"
                          title={color}
                          onClick={() =>
                            handleNavigate(color, product.capacity)
                          }
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={s.productDetailsBlock}>
                <span className={s.productDetailsLabel}>Select capacity</span>
                <ul className={s.optionsList}>
                  {product.capacityAvailable.map(capacity => {
                    return (
                      <li key={capacity}>
                        <button
                          className={`${s.capacityButton} ${capacity === product.capacity ? s.selected : ''}`}
                          type="button"
                          title={capacity}
                          onClick={() =>
                            handleNavigate(product.color, capacity)
                          }
                        >
                          {capacity}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={s.productPrice}>
                <span className={s.newPrice}>${product.priceDiscount}</span>
                <span className={s.oldPrice}>${product.priceRegular}</span>
              </div>
              <ProductButtons itemId={productId} />
              <div className={s.productTechShort}>
                <ProductTechSpec techSpec={techSpecs.slice(1, 4)} />
              </div>
            </div>
          </div>
          <div className={s.productContentBottomLeft}>
            <h3 className={s.blockTitle}>About</h3>
            <div className={s.productAbout}>
              {product.description.map((item, index) => (
                <div key={index}>
                  <h4>{item.title}</h4>
                  <div className={s.productAboutText}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={s.productContentBottomRight}>
            <h3 className={s.blockTitle}>Tech specs</h3>
            <div className={s.productTechLong}>
              <ProductTechSpec techSpec={techSpecs} />
            </div>
          </div>
          <div className={s.productContentBoth}>
            <SuggestedProducts category={product.category} />
          </div>
        </div>
      </section>
    </main>
  );
};
