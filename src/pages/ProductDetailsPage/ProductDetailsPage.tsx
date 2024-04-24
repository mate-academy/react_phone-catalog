import './ProductDetailsPage.scss';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { ProductDetails } from '../../types/productDetails';
import { ProductContext } from '../../context/productContext';
import { AddToCart } from '../../components/AddToCart';
import { ProductSlider } from '../../components/ProductsSlider';
import { Navigation } from '../../components/Navigation';
import { BackButton } from '../../components/BackButton';
import { getProductDetailsByID } from '../../utils/fetchProducts';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { pathname } = useLocation();

  const [product, setProduct] = useState<ProductDetails>();

  const [selectImage, setSelectImage] = useState('');

  const { products, dispatch } = useContext(ProductContext);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    dispatch({ type: 'isLoading', payload: true });
    if (productId) {
      const cachedProduct = JSON.parse(localStorage.getItem(productId) || '{}');

      if (cachedProduct && Object.keys(cachedProduct).length > 0) {
        setProduct(cachedProduct);
        setSelectImage(cachedProduct.images[0]);
      } else {
        getProductDetailsByID(productId, products)
          .then(data => {
            if (data) {
              setProduct(data);
              setSelectImage(data.images[0]);
              localStorage.setItem(productId, JSON.stringify(data));
            }
          })
          .catch(() => {})
          .finally(() => dispatch({ type: 'isLoading', payload: true }));
      }
    }
  }, [productId]);

  if (!product || Object.keys(product).length === 0) {
    return <div>Product not found</div>;
  }

  const {
    name,
    category,
    images,
    color,
    colorsAvailable,
    capacity,
    capacityAvailable,
    description,
    priceDiscount,
    priceRegular,
    screen,
    camera,
    resolution,
    processor,
    ram,
    zoom,
    cell,
  } = product;

  const techSpecs = {
    Screen: screen,
    Resolution: resolution,
    Processor: processor,
    Ram: ram,
    Camera: camera,
    Zoom: zoom,
    Cell: cell,
  };

  const topTechSpecs = {
    Screen: screen,
    Resolution: resolution,
    Processor: processor,
    Ram: ram,
  };

  const getSuggestedProducts = () => {
    return products
      .filter(
        product =>
          product.category === category &&
          (product.capacity === capacity || product.color === color),
      )
      .slice(0, 12);
  };

  const suggestedProducts = getSuggestedProducts();

  return (
    <div className="product">
      <Navigation />
      <BackButton />
      <h1 className="product-title">{name}</h1>

      <div className="product__top">
        <div className="product__top-left">
          <div className="product__images">
            {images.map(image => (
              <img
                key={image}
                className="product__images-image"
                src={`../../${image}`}
                onClick={() => setSelectImage(image)}
              />
            ))}
          </div>
          <img src={`../../${selectImage}`} className="product__img" />
        </div>

        <div className="product__top-right">
          <div className="product__top-right-item">
            <p className="product__top-right-text">Available colors</p>
            <div className="product__top-right-list">
              {colorsAvailable.map(color => (
                <Link
                  to={
                    product ? pathname.replace(product.color, color) : pathname
                  }
                  key={color}
                >
                  <div
                    className={classNames('product__top-right-circle', {
                      'product__top-right-circle-active':
                        color === product.color,
                    })}
                  >
                    <div
                      className="product__top-right-circle-inside"
                      style={{
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="product__line" />

          <div className="product__top-right-item">
            <p className="product__top-right-text">Select capacity</p>
            <div className="product__top-right-list">
              {capacityAvailable.map(capacity => (
                /* eslint-disable @typescript-eslint/indent */
                <Link
                  to={
                    product
                      ? pathname.replace(
                          product.capacity.toLocaleLowerCase(),
                          capacity.toLowerCase(),
                        )
                      : pathname
                  }
                  /* eslint-enable @typescript-eslint/indent */
                  key={capacity}
                >
                  <div
                    className={classNames('product__top-right-capacity', {
                      'product__top-right-capacity-active':
                        capacity === product.capacity,
                    })}
                  >
                    <p
                      className={classNames(
                        'product__top-right-capacity-value',
                        {
                          'product__top-right-capacity-value-active':
                            capacity === product.capacity,
                        },
                      )}
                    >
                      {capacity}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="product__line" />

          <div className="product__price">
            <p className="product__price-price">${priceDiscount}</p>
            <p className="product__price-full">${priceRegular}</p>
          </div>

          <AddToCart productId={product.id} typeOfPage="productDetails" />

          <div className="product__info-tech-list">
            {Object.entries(topTechSpecs).map(([key, value]) => (
              <div className="product__info-tech-item" key={key}>
                <p className="product__info-tech-item-name-top">{key}</p>
                <p className="product__info-tech-item-value-top">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="product__info">
        <div className="product__info-about">
          <h3 className="product__info-title">About</h3>
          {description.map(item => (
            <div className="product__description" key={item.title}>
              <h4 className="product__description-title-">{item.title}</h4>
              <p className="product__description-text">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="product__info-tech">
          <h3 className="product__info-title">Tech specs</h3>
          <div className="product__info-tech-list">
            {Object.entries(techSpecs).map(([key, value]) => (
              <div className="product__info-tech-item" key={key}>
                <p className="product__info-tech-item-name">{key}</p>
                <p className="product__info-tech-item-value">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProductSlider products={suggestedProducts} title="You may also like" />
    </div>
  );
};
