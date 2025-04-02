import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import styles from './ProductDetailPage.module.scss';
import { ProductDetails } from '../../types';
import { ProductSlider } from '../../components/ProductSlider';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { VectorBreadCrumbs } from '../../components/VectorBreadCrumbs';

export const ProductDetailPage: React.FC = () => {
  const { product, productId } = useParams();
  const location = useLocation();

  const [productDetail, setProductDetail] = useState<ProductDetails | null>(
    null,
  );
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getNewIdColor = (color: string) => {
    if (!productDetail?.id) {
      return productId || '';
    }

    const parts = productDetail.id.split('-');

    parts[parts.length - 1] = color;

    return parts.join('-');
  };

  const getNewIdCapacity = (capacity: string) => {
    if (!productDetail?.id) {
      return productId || '';
    }

    const parts = productDetail.id.split('-');

    parts[parts.length - 2] = capacity.toLowerCase();

    return parts.join('-');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://roman-logos-frontend.github.io/react_phone-catalog/api/${product}.json`,
        );
        const data = await response.json();

        const productDetailId = data.find(
          (item: ProductDetails) => item.id === productId,
        );

        if (productDetailId) {
          setProductDetail(productDetailId);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product, productId]);

  useEffect(() => {
    if (productDetail) {
      setSelectedImage(productDetail.images[0]);

      const colorFromUrl = location.pathname.split('-').pop();
      const capacityFromUrl =
        location.pathname.split('-')[location.pathname.split('-').length - 2];

      if (colorFromUrl) {
        setSelectedColor(colorFromUrl);
      }

      if (capacityFromUrl) {
        setSelectedCapacity(capacityFromUrl);
      }
    }
  }, [productDetail, location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!productDetail) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.container}>
      <BreadCrumbs name={productDetail.name}></BreadCrumbs>
      <VectorBreadCrumbs></VectorBreadCrumbs>
      <h2 className={styles.title}>{productDetail.name}</h2>
      <div className={styles.section}>
        <div className={styles.container__images}>
          <img
            src={selectedImage}
            alt={productDetail.name}
            className={styles.image}
          />
        </div>

        <div className={styles.selectImage}>
          {productDetail.images.map(image => (
            <div
              className={`${styles.imageDiv} ${selectedImage === image ? styles.selectedImage : ''}`}
              key={image}
            >
              <img
                onClick={() => setSelectedImage(image)}
                className={styles.image}
                src={image}
              />
            </div>
          ))}
        </div>

        <div className={styles.container__specs}>
          <div className={styles.container__specs__top}>
            <div className={styles.selectOptions}>
              <span>Available colors</span>
              <div className={styles.select}>
                {productDetail.colorsAvailable.map(color => (
                  <NavLink
                    className={`${styles.colorDiv} ${selectedColor === color ? styles.selectedColor : ''}`}
                    key={color}
                    style={{ backgroundColor: color }}
                    to={`/${product}/${getNewIdColor(color)}`}
                  />
                ))}
              </div>
            </div>

            <hr />

            <div className={styles.selectOptions}>
              <span>Select capacity</span>
              <div className={styles.select}>
                {productDetail.capacityAvailable.map(capacity => (
                  <NavLink
                    className={`${styles.capacityDiv} ${selectedCapacity === capacity.toLowerCase() ? styles.selectedCapacity : ''}`}
                    key={capacity}
                    to={`/${product}/${getNewIdCapacity(capacity)}`}
                  >
                    {capacity}
                  </NavLink>
                ))}
              </div>
            </div>

            <hr />
          </div>

          <div className={styles.price}>
            <h2>
              ${productDetail.priceDiscount}
              <span className={styles.regularPrice}>
                ${productDetail.priceRegular}
              </span>
            </h2>

            <button className={styles.add}>Add to cart</button>
          </div>

          <div className={styles.productDescription__bottom}>
            <div className={styles.specs}>
              <p>Screen</p>
              <p>{productDetail.screen}</p>
            </div>
            <div className={styles.specs}>
              <p>Resolution</p>
              <p>{productDetail.resolution}</p>
            </div>
            <div className={styles.specs}>
              <p>Processor</p>
              <p>{productDetail.processor}</p>
            </div>
            <div className={styles.specs}>
              <p>RAM</p>
              <p>{productDetail.ram}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.productDescription}>
        <div className={styles.productDescription__top}>
          <h3>About</h3>
          <hr />
        </div>
        {productDetail.description.map((desc, index) => (
          <div key={index} className={styles.desc}>
            <h4>{desc.title}</h4>
            <div className={styles.desc__description}>
              {desc.text.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.productDescription}>
        <div className={styles.productDescription__top}>
          <h3>Tech specs</h3>
          <hr />
        </div>
        <div className={styles.productDescription__bottom}>
          <div className={styles.specs}>
            <p>Screen</p>
            <p>{productDetail.screen}</p>
          </div>
          <div className={styles.specs}>
            <p>Resolution</p>
            <p>{productDetail.resolution}</p>
          </div>
          <div className={styles.specs}>
            <p>Processor</p>
            <p>{productDetail.processor}</p>
          </div>
          <div className={styles.specs}>
            <p>RAM</p>
            <p>{productDetail.ram}</p>
          </div>
          <div className={styles.specs}>
            <p>Camera</p>
            <p>{productDetail.camera}</p>
          </div>
          <div className={styles.specs}>
            <p>Zoom</p>
            <p>{productDetail.zoom}</p>
          </div>
          <div className={styles.specs}>
            <p>Cell</p>
            <p>{productDetail.cell.join(', ')}</p>
          </div>
        </div>
      </div>

      <div className={styles.slider}>
        <ProductSlider sliderTitle={'You may also like'} filteredItems={[]} />
      </div>
    </div>
  );
};
