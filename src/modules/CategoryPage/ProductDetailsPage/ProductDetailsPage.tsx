import React, { useEffect, useMemo, useState } from 'react';
import { Breadcrumbs } from '../../shared/Breadcrumbs';
import { Footer } from '../../shared/Footer';
import { Header } from '../../shared/Header';
import styles from './ProductDetailsPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductsSlider } from 'src/modules/HomePage/components/ProductsSlider';
import apiProducts from '../../../../public/api/products.json';
import apiPhones from '../../../../public/api/phones.json';
import apiTablets from '../../../../public/api/tablets.json';
import apiAccessories from '../../../../public/api/accessories.json';
import classNames from 'classnames';

const apiCategoryMap = {
  phones: apiPhones,
  tablets: apiTablets,
  accessories: apiAccessories,
} as const;

export const ProductDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const findProductById = (productID: string) => {
    const summary = apiProducts.find(
      product => String(product.id) === productID,
    );

    if (!summary) {
      return null;
    }

    const categoryProducts =
      apiCategoryMap[summary.category as keyof typeof apiCategoryMap];

    if (!categoryProducts) {
      return summary;
    }

    const detailedProduct = categoryProducts.find(
      item => item.id === summary.itemId,
    );

    return detailedProduct ? { ...detailedProduct } : summary;
  };

  const [activeImage, setActiveImage] = useState<string | null>(null);
  const product = productId ? findProductById(productId) : null;

  const images = useMemo(() => {
    if (!product) {
      return [];
    }

    if ('images' in product) {
      return product.images;
    }

    return [product.image];
  }, [product]);

  useEffect(() => {
    if (images.length > 0) {
      setActiveImage(images[0]);
    }
  }, [images]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.productdetailspage}>
        <Breadcrumbs category={category || ''} productId={productId || ''} />
        <button
          className={styles.productdetailspage__backbutton}
          onClick={() => navigate(-1)}
        >
          <img
            className={styles.productdetailspage__backbutton__icon}
            src="/public/img/icons/icon-chevron-arrow-left.png"
            alt=""
          />
          <p className={styles.productdetailspage__backbutton__text}>Back</p>
        </button>
        <h1 className={styles.productdetailspage__title}>{product.name}</h1>
        <div className={styles.productdetailspage__gallery}>
          <div className={styles.productdetailspage__gallery__thumbs}>
            {images.map(image => (
              <button
                key={image}
                className={classNames(
                  styles.productdetailspage__gallery__thumb,
                  image === activeImage &&
                    styles.productdetailspage__gallery__thumb_active,
                )}
                onClick={() => setActiveImage(image)}
                type="button"
              >
                <img
                  src={`/${image}`}
                  alt={product.name}
                  className={styles.productdetailspage__gallery__thumb_img}
                />
              </button>
            ))}
          </div>

          {/* main image */}
          <div className={styles.productdetailspage__gallery__main}>
            <img
              src={`/${activeImage}`}
              alt={product.name}
              className={styles.productdetailspage__gallery__main_img}
            />
          </div>
        </div>
        <div className={styles.productdetailspage__alsolike}>
          <ProductsSlider title="You may also like" />
        </div>
      </div>
      <Footer />
    </>
  );
};
