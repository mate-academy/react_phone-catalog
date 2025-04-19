import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { ProductImages } from '../ProductImages/ProductImages';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { BackButton } from '../BackButton/BackButton';
import { ProductColors } from '../ProductColors/ProductColors';
import { ProductCapacity } from '../ProductCapacity/ProductCapacity';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { AddToFavButton } from '../AddToFavButton/AddToFavButton';
import { Loader } from '../Loader';
import './ProductDetails.scss';

export interface BreadcrumbsProps {
  items: { label: string; link?: string }[];
}

export const ProductDetails: React.FC = () => {
  const { phoneId = '' } = useParams();
  const {
    selectedProduct,
    isLoading,
    handleColorSelect,
    handleCapacitySelect,
  } = useContext(ProductContext);

  if (isLoading) {
    return <Loader />;
  }

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  const {
    name,
    images,
    colors,
    capacities,
    description,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
    price,
    fullPrice,
    galleryImages = [],
  } = selectedProduct;

  return (
    <div className="product-details">
      <div className="product-details__nav">
        <Breadcrumbs
          items={[{ label: 'Phones', link: '/phones' }, { label: name }]}
        />
        <BackButton />
      </div>

      <h1 className="product-details__title">{name}</h1>

      <div className="product-details__content">
        <div className="product-details__images">
          <ProductImages
            name={name}
            mainImage={images[0]}
            galleryImages={galleryImages}
          />
        </div>

        <div className="product-details__info">
          <div className="product-details__colors">
            <ProductColors
              colors={colors}
              phoneId={phoneId}
              onColorSelect={handleColorSelect}
            />
          </div>

          <div className="product-details__capacity">
            <ProductCapacity
              capacities={capacities}
              phoneId={phoneId}
              onCapacitySelect={handleCapacitySelect}
            />
          </div>

          <div className="product-details__price">
            <span className="product-details__price-current">${price}</span>
            <span className="product-details__price-full">${fullPrice}</span>
          </div>

          <div className="product-details__buttons">
            <AddToCartButton product={selectedProduct} />
            <AddToFavButton product={selectedProduct} />
          </div>

          <div className="product-details__specs">
            <div className="product-details__spec">
              <span className="product-details__spec-name">Screen</span>
              <span className="product-details__spec-value">{screen}</span>
            </div>

            <div className="product-details__spec">
              <span className="product-details__spec-name">Resolution</span>
              <span className="product-details__spec-value">{resolution}</span>
            </div>

            <div className="product-details__spec">
              <span className="product-details__spec-name">Processor</span>
              <span className="product-details__spec-value">{processor}</span>
            </div>

            <div className="product-details__spec">
              <span className="product-details__spec-name">RAM</span>
              <span className="product-details__spec-value">{ram}</span>
            </div>

            <div className="product-details__spec">
              <span className="product-details__spec-name">Camera</span>
              <span className="product-details__spec-value">{camera}</span>
            </div>

            <div className="product-details__spec">
              <span className="product-details__spec-name">Zoom</span>
              <span className="product-details__spec-value">{zoom}</span>
            </div>

            <div className="product-details__spec">
              <span className="product-details__spec-name">Cell</span>
              <span className="product-details__spec-value">
                {cell.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="product-details__about">
        <h2 className="product-details__about-title">About</h2>
        {description.map((text: string, index: number) => (
          <p key={index} className="product-details__about-text">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};
