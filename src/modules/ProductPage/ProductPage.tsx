// modules/ProductPage/ProductPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import { ProductGallery } from './components/ProductGallery';
import { ProductFunc } from './components/ProductControls/ProductControls';
import { BackButton } from '../../components/Ui/BackButton';
import styles from './ProductPage.module.scss';

import type { ProductDetails, VariantChange } from '../../types/ProductDetails';
const cx = classNames.bind(styles);

import {
  buildVariantId,
  getProductDetails,
  isCategory,
} from '../../services/productDetailsService';
import { Breadcrumbs } from '../../components/Breadcrumbs';

type Status = 'loading' | 'error' | 'not-found' | 'success';

export const ProductPage = () => {
  const { category, productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    if (!isCategory(category) || !productId) {
      setStatus('not-found');

      return;
    }

    let isCancelled = false;

    setStatus('loading');

    getProductDetails(category, productId)
      .then(details => {
        if (isCancelled) {
          return;
        }

        if (!details) {
          setStatus('not-found');

          return;
        }

        setProduct(details);
        setStatus('success');
      })
      .catch(() => {
        if (!isCancelled) {
          setStatus('error');
        }
      });

    window.scrollTo(0, 0);

    return () => {
      isCancelled = true;
    };
  }, [category, productId]);

  const handleVariantChange = (next: VariantChange) => {
    if (!product) {
      return;
    }

    const newId = buildVariantId(
      product.namespaceId,
      next.capacity ?? product.capacity,
      next.color ?? product.color,
    );

    navigate(`/${product.category}/${newId}`, { replace: true });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Something went wrong. Please try again later.</div>;
  }

  if (status === 'not-found' || !product) {
    return (
      <div>
        <BackButton />

        <h1>Product was not found</h1>
      </div>
    );
  }

  const {
    name,
    images,
    description,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
  } = product;

  const techSpecs = [
    { label: 'Screen', value: screen },
    { label: 'Resolution', value: resolution },
    { label: 'Processor', value: processor },
    { label: 'RAM', value: ram },
    { label: 'Camera', value: camera },
    { label: 'Zoom', value: zoom },
    { label: 'Cell', value: cell.join(', ') },
  ];
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <main className={cx('product-page')}>
      <section className={cx('product-page__main-content-wraper')}>
        <div className={cx('product-page__breadcrumbs')}>
          <Breadcrumbs
            items={[
              { label: capitalize(category ?? ''), to: '/' + category },
              { label: name },
            ]}
          />
        </div>

        <div className={cx('product-page__back-button')}>
          <BackButton fallbackTo={`/${product.category}`} />
        </div>

        <h1 className={cx('product-page__title')}>{name}</h1>

        <div className={cx('product-page__main-content')}>
          <div className={cx('product-page__gallery')}>
            <ProductGallery images={images} name={name} />
          </div>

          <div className={cx('product-page__controls')}>
            <ProductFunc
              product={product}
              onVariantChange={handleVariantChange}
            />
          </div>
        </div>
      </section>

      <section className={cx('product-page__description')}>
        <div className={cx('product-page__about')}>
          <h3 className={cx('product-page__section-title')}>About</h3>

          {description.map(({ title, text }) => (
            <div key={title} className={cx('product-page__about-item')}>
              <h4 className={cx('product-page__about-title')}>{title}</h4>
              {text.map((paragraph, i) => (
                <p key={i} className={cx('product-page__about-text')}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={cx('product-page__tech')}>
          <h3 className={cx('product-page__section-title')}>Tech specs</h3>

          <div className={cx('product-page__tech-items-wrapper')}>
            {techSpecs.map(
              ({ label, value }) =>
                value && (
                  <div key={label} className={cx('product-page__tech-item')}>
                    <div className={cx('product-page__tech-label')}>
                      {label}
                    </div>
                    <div className={cx('product-page__tech-value')}>
                      {value}
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
