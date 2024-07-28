import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, getYouMayAlsoLike } from '../../services/Products';
import './ProductDetailsPage.scss';
import '../../styles/utils/typography.scss';
import { ProductFull } from '../../types/ProductFull';
import { Color, Colors } from './colors';
import { ActionButtons } from '../../components/ActionButtons';
import { BreadCrumb } from '../../components/BreadCrumb';
import { ProductCarousel } from '../../components/ProductCarousel';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';

type ProductPageParams = {
  itemId: string;
};

export const ProductDetailsPage: React.FC = () => {
  const { itemId } = useParams<ProductPageParams>();
  const [product, setProduct] = useState<ProductFull | null>(null);
  const [productsAlsoLike, setProductsAlsoLike] = useState<Product[]>([]);
  const [currentImage, setCurrentImage] = useState<string | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('itemId:', itemId);

    const fetchProduct = async () => {
      try {
        if (itemId) {
          const fetchedProduct = await getProduct(itemId);
          const fetchedAlsoLike = await getYouMayAlsoLike();

          setProduct(fetchedProduct || null);
          setProductsAlsoLike(fetchedAlsoLike);

          if (fetchedProduct?.images) {
            setCurrentImage(fetchedProduct.images[0]);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [itemId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <>
        <div className="product-details-page__not-found">Product not found</div>
      </>
    );
  }

  const photosSecondary = product.images.slice(1);

  const handleColorChange = (color: string) => {
    const newUrl = `/${product.category}/${product.namespaceId}-${product.capacity.toLowerCase()}-${color}`;

    navigate(newUrl);
  };

  const handleImageChange = (image: string) => {
    setCurrentImage(image);
  };

  const handleCapacityChange = (capacity: string) => {
    const newUrl = `/${product.category}/${product.namespaceId}-${capacity.toLowerCase()}-${product.color}`;

    navigate(newUrl);
  };

  return (
    <div className="product-details-page">
      <div className="product-details-page__breadcrumb">
        <BreadCrumb />
      </div>
      <h2 className="product-details-page__title title title--h2">
        {product.name}
      </h2>
      <div className="product-details-page__top">
        <div className="product-details-page__photos photos">
          <div className="photos__secondary">
            {photosSecondary.map(image => (
              <button
                className="photos__secondary-wrapper"
                key={image}
                onClick={() => handleImageChange(image)}
              >
                <img
                  src={image}
                  alt={`${product.name} secondary`}
                  className="photos__small-photo"
                />
              </button>
            ))}
          </div>
          <div className="photos__main-wrapper">
            <img
              src={currentImage}
              className="photos__main"
              alt={product.name}
            />
          </div>
        </div>

        <div className="product-details-page__main-info main-info">
          <div className="main-info__colors colors">
            <p className="colors__subtitle small-text">Available Colors</p>
            <div className="colors__wrapper">
              {product.colorsAvailable.map(color => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={classNames('colors__button', {
                    'colors__button--active': color === product.color,
                  })}
                >
                  <div
                    className="colors__button-inside"
                    style={{ backgroundColor: Colors[color as Color] }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="main-info__capacity capacity">
            <p className="capacity__subtitle small-text">Select capacity</p>
            <div className="capacity__wrapper">
              {product.capacityAvailable.map(capacity => (
                <button
                  key={capacity}
                  onClick={() => handleCapacityChange(capacity)}
                  className={classNames('capacity__button paragraph', {
                    'capacity__button--active': capacity === product.capacity,
                  })}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>

          <div className="main-info__price price">
            <div className="price__wrapper">
              <h3 className="price__regular title title--h3">
                ${product.priceRegular}
              </h3>
              <p className="price__discount">${product.priceDiscount}</p>
            </div>

            <ActionButtons productId={product.id} />
          </div>

          <div className="main-info__charact charact">
            <div className="charact__item">
              <p className="charact__subtitle small-text">Screen</p>
              <p className="charact__data">{product.screen}</p>
            </div>

            <div className="charact__item">
              <p className="charact__subtitle small-text">Capacity</p>
              <p className="charact__data">{product.capacity}</p>
            </div>

            <div className="charact__item">
              <p className="charact__title small-text">Processor</p>
              <p className="charact__data">{product.processor}</p>
            </div>

            <div className="charact__item">
              <p className="charact__subtitle small-text">RAM</p>
              <p className="charact__data">{product.ram}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="product-details-page__bottom">
        <div className="product-details-page__about">
          <h3 className="product-details-page__bottom__title title title--h3">
            About
          </h3>
          {product.description.map(description => (
            <div
              className="product-details-page__description"
              key={description.title}
            >
              <h4
                className="
                product-details-page__description__title
                title title--h4"
              >
                {description.title}
              </h4>
              <p className="product-details-page__description__text paragraph">
                {description.text}
              </p>
            </div>
          ))}
        </div>

        <div className="product-details-page__charact charact">
          <h3 className="product-details-page__bottom__title title title--h3">
            Tech specs
          </h3>
          <div className="charact__item">
            <p className="charact__title small-text">Screen</p>
            <p className="charact__data">{product.screen}</p>
          </div>
          <div className="charact__item">
            <p className="charact__title small-text">Resolution</p>
            <p className="charact__data">{product.resolution}</p>
          </div>
          <div className="charact__item">
            <p className="charact__title small-text">Processor</p>
            <p className="charact__data">{product.processor}</p>
          </div>
          <div className="charact__item">
            <p className="charact__title small-text">RAM</p>
            <p className="charact__data">{product.ram}</p>
          </div>
          <div className="charact__item">
            <p className="charact__title small-text">Built in memory</p>
            <p className="charact__data">{product.capacity}</p>
          </div>
          <div className="charact__item">
            <p className="charact__title small-text">Camera</p>
            <p className="charact__data">{product.camera}</p>
          </div>
          <div className="charact__item">
            <p className="charact__title small-text">Zoom</p>
            <p className="charact__data">{product.zoom}</p>
          </div>
          <div className="charact__item">
            <p className="charact__title small-text">Cell</p>
            <p className="charact__data">{product.cell.join(', ')}</p>
          </div>
        </div>
      </div>

      <div className="product-details-page__product-carousel">
        <ProductCarousel
          products={productsAlsoLike}
          title="You may also like"
        />
      </div>
    </div>
  );
};
