import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import styles from './ItemPage.module.scss';

import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { BreadcrumbLink } from '../shared/components/Breadcrumbs/types';
import { useItem } from './useItem';
import { Gallery } from './components/Gallery/Gallery';
import { ProductActions } from './components/ProductActions';
import { Loader } from '../shared/components/Loader';
import { ShortSpec } from '../shared/components/ShortSpec';
import { Description } from './components/Description';
import { TechSpecs } from './components/TechSpecs/TechSpecs';
import { ProductsSection } from '../shared/components/ProductsSection';
import { Back } from '../shared/components/Back';
import { EmptyState } from '../shared/components/EmptyState/EmptyState';

export const ItemPage = () => {
  const {
    isError,
    isLoading,
    product,
    category,
    suggestedProducts,
    shortSpecs,
    detailedSpecs,
  } = useItem();

  const location = useLocation();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className={styles['item-page__loader']}>
        <Loader />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <EmptyState
        className={'container'}
        title="Product not found"
        imageSrc="img/product-not-found.png"
      />
    );
  }

  const backLink = location.state?.from || `/category/${category || ''}`;

  const links: BreadcrumbLink[] = [
    {
      label: `${category}`,
      to: `/catalog/${category}`,
    },
    {
      label: product.name,
    },
  ];

  const handleCapacityChange = (capacity: string) => {
    const newProductId = `${product.namespaceId}-${capacity.toLowerCase()}-${product.color.toLowerCase()}`;

    navigate(`/product/${newProductId}`);
  };

  const handleColorChange = (color: string) => {
    const newProductId = `${product.namespaceId}-${product.capacity.toLowerCase()}-${color.toLowerCase()}`;

    navigate(`/product/${newProductId}`);
  };

  return (
    <div className={classNames(styles['item-page'], 'container')}>
      <div className={styles['item-page__navigation']}>
        <div className={styles['item-page__breadcrumbs']}>
          <Breadcrumbs links={links} />
        </div>
        <Back backLink={backLink} />
      </div>

      <div className={styles['item-page__product-summary']}>
        <h2 className={styles['item-page__title']}>{product.name}</h2>

        <Gallery
          images={product.images}
          className={styles['item-page__gallery']}
        />

        <div className={styles['item-page__info-column']}>
          <ProductActions
            product={product}
            className={styles['item-page__product-actions']}
            currentCapacity={product.capacity}
            handleCapacityChange={handleCapacityChange}
            currentColor={product.color}
            handleColorChange={handleColorChange}
          />

          <ShortSpec
            specList={shortSpecs}
            className={styles['item-page__short-spec']}
          />
        </div>
      </div>

      <div className={styles['item-page__details']}>
        <Description descriptions={product.description} />

        <TechSpecs specList={detailedSpecs} />
      </div>

      <ProductsSection title="You may also like" products={suggestedProducts} />
    </div>
  );
};
