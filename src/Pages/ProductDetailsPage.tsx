/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ProductsContext } from '../store/ProductsContext';
import { getProductDetails } from '../helpers/utils/api';
import { ButtonIcon } from '../elements/ButtonIcon/ButtonIcon';
import { DetailType } from '../helpers/types/DetailType';
import { ButtonCircle } from '../elements/ButtonCircle/ButtonCircle';

export const ProductDetailsPage: React.FC = () => {
  const { selectedProduct, setSelectedProduct } = useContext(ProductsContext);
  const { productId } = useParams();

  const specs = ['Screen', 'Resolution', 'Processor', 'RAM', 'Camera', 'Zoom', 'Cell'];

  const urlImg = selectedProduct?.images[0].slice(selectedProduct?.images[0].indexOf('/'), selectedProduct?.images[0].lastIndexOf('/'));

  const images = [
    `../api${urlImg}/00.jpg`,
    `../api${urlImg}/01.jpg`,
    `../api${urlImg}/02.jpg`,
    `../api${urlImg}/03.jpg`,
    `../api${urlImg}/04.jpg`,
  ];

  useEffect(() => {
    getProductDetails(productId || null)
      .then(setSelectedProduct);
  }, [productId, setSelectedProduct]);

  if (!selectedProduct) {
    return <p>product not found</p>;
  }

  const { name, colorsAvailable } = selectedProduct;

  return (
    <div className="product-detail">
      <Breadcrumbs page="phones" product={selectedProduct} />

      <ButtonIcon
        type="link"
        shape="left-light"
        path="/"
        text="Back"
      />
      <h1 className="product-detail__title">{name}</h1>

      <div className="product-detail__images">
        <div className="product-detail__images-column">
          {images.map(image => (
            <img
              src={image}
              alt="img"
              key={image}
            />
          ))}
          <img src={images[0]} alt="img" />
        </div>
        <img src={selectedProduct.images[0]} alt="img" />
      </div>

      <div className="product-detail__details">
        <div className="product-detail__colors">
          {colorsAvailable.map(color => (
            <ButtonCircle color={color} key={color} />
          ))}
        </div>

        <div className="product-detail__capacities">
          <p className="capacity">select capasity</p>
          <p className="capacity">capasity</p>
          <p className="capacity">capasity</p>
        </div>

        <div className="product-details__general">
          <div className="product-detail__prices">
            <p className="price">price</p>
            <p className="price">price</p>
          </div>

          <div className="product-detail__statuses">
            <p className="status">status</p>
            <p className="status">status</p>
          </div>
        </div>

        <div className="product-details__all">
          {specs.slice(0, 5).map(spec => (
            <>
              <p className="info">{spec}</p>
              <p className="info">{selectedProduct[spec.toLowerCase() as keyof DetailType]}</p>
            </>
          ))}
        </div>
      </div>

      <section className="product-detail__section">
        <h2 className="product-detail__title-h2">About</h2>
        <article className="product-detail__article">
          <h3 className="product-detail__title-h3">And then there was Pro</h3>
          <p className="product-detail__p">paragragh</p>
        </article>
      </section>

      <section className="product-detail__section">
        <h2 className="product-detail__title-h2">Tech specs</h2>
        <div className="product-details__specs">
          {specs.map(spec => (
            <>
              <p className="product-details__spac-name">{spec}</p>
              <p className="product-details__spac-value">{selectedProduct[spec.toLowerCase() as keyof DetailType]}</p>
            </>
          ))}
        </div>
      </section>
    </div>
  );
};
