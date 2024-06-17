import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PhoneType } from '../../types/PhoneType';
import './Details.scss';
import { HotPrices } from '../Home page/components/HotPrices/HotPrices';

export const ProductDetailsPage: React.FC = () => {
  const { productType } = useParams<{ productType: string }>();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<PhoneType | undefined>(undefined);
  const id = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/${productType}.json`);
      const data: PhoneType[] = await response.json();

      const localData = data.find((product: PhoneType) => product.id === productId);

      setProduct(localData);
    };

    setTimeout(() => {
      fetchData();
    }, 1000);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [productId]);

  return (
    <section className="details container">
      <div className="details__history">
        <Link to="/" className="product__link">
          <img src="../../../img/links/home.svg" alt="home" />
        </Link>
        <img
          src="../../../img/links/chevron (arrow right).svg"
          alt="chevron_right"
        />
        <Link to={`/product/${product?.category}`} className="product__link">
          {product && product?.category.charAt(0).toUpperCase() + product?.category.slice(1)}
        </Link>
        <img
          src="../../../img/links/chevron (arrow right).svg"
          alt="chevron_right"
        />
        <Link to={`/product/${product?.id}`} className="product__link">
          {product?.name}
        </Link>
      </div>

      <div className="details__back">
        <img
          src="../../../img/slider/svg/chevron (arrow left).svg"
          alt="chevron_left"
        />
        <Link to={`/product/${product?.category}`} className="details__link">
          Back
        </Link>
      </div>

      <h1 className="details__title">{product?.name}</h1>

      <div className="details__data">
        <aside className="details__images">
          <img src={product?.images[0]} alt="" className="details__images--main" />
          <div className="details__images--blocks">
            {product?.images.map((image, index) => (
              <div key={index} className="details__images--blocks-img">
                <img src={image} alt="" />
              </div>
            ))}
          </div>
        </aside>
        <aside className="details__filters">
          <div className="details__colors">
            <div className="details__colors--text">
              <p className="details__colors--title">Available colors</p>
              <p className="details__colors--id">ID: {id}</p>
            </div>
            <div className="details__filters--colors">
              {product?.colorsAvailable.map((color, index) => (
                <div key={index} className="details__filters--colors-block">
                  <div className="color" style={{ backgroundColor: color }}/>
                </div>
              ))}
            </div>
          </div>
          <div className="details__capacity">
            <p className="details__capacity--title">Select capacity</p>
            <div className="details__capacity--capacities">
              {product?.capacityAvailable.map((capacity, index) => (
                <div
                  key={index}
                  className="details__capacity--capacities-block"
                >
                  {capacity}
                </div>
              ))}
            </div>
          </div>
          <div className="details__buy">
            <div className="details__buy--price">
              <span>${product?.priceDiscount}</span>
              <span>${product?.priceRegular}</span>
            </div>
            <div className="details__buy--buttons">
              <button type="button" className="details__buy--buttons-cart">
                Add to cart
              </button>
              <button type="button" className="details__buy--buttons-favourites">
                <img src="nav/favourites.svg" alt="favourites" />
              </button>
            </div>
          </div>
        </aside>
        <div className="details__specs">
          <div className="details__spec">
            <span className="details__spec-label">Screen</span>
            <span className="details__spec-value">{product?.screen}</span>
          </div>
          <div className="details__spec">
            <span className="details__spec-label">Resolution</span>
            <span className="details__spec-value">{product?.resolution}</span>
          </div>
          <div className="details__spec">
            <span className="details__spec-label">Processor</span>
            <span className="details__spec-value">{product?.processor}</span>
          </div>
          <div className="details__spec">
            <span className="details__spec-label">RAM</span>
            <span className="details__spec-value">{product?.ram}</span>
          </div>
        </div>
      </div>

      <div className="details__info">
        <div className="details__about">
          <h3 className="details__info--title">About</h3>
          {product?.description.map((desc, index) => (
            <div key={index} className="details__about--block">
              <h4 className="details__about--block-title">
                {desc.title}
              </h4>
              <p className="details__about--block-text">
                {desc.text}
              </p>
            </div>
          ))}
        </div>
        <div className="details__tech">
          <h3 className="details__info--title">Tech specs</h3>
          <div className="details__specs details__tech--specs">
            <div className="details__spec">
              <span className="details__spec-label">Screen</span>
              <span className="details__spec-value">{product?.screen}</span>
            </div>
            <div className="details__spec">
              <span className="details__spec-label">Resolution</span>
              <span className="details__spec-value">{product?.resolution}</span>
            </div>
            <div className="details__spec">
              <span className="details__spec-label">Processor</span>
              <span className="details__spec-value">{product?.processor}</span>
            </div>
            <div className="details__spec">
              <span className="details__spec-label">RAM</span>
              <span className="details__spec-value">{product?.ram}</span>
            </div>
            <div className="details__spec">
              <span className="details__spec-label">Camera</span>
              <span className="details__spec-value">{product?.camera}</span>
            </div>
            <div className="details__spec">
              <span className="details__spec-label">Zoom</span>
              <span className="details__spec-value">{product?.zoom}</span>
            </div>
            <div className="details__spec">
              <span className="details__spec-label">Cell</span>
              <span className="details__spec-value">
                {product?.cell.map((cell, index) => (
                  <React.Fragment key={index}>
                    {cell}
                    {index < product.cell.length - 1 && ', '}
                  </React.Fragment>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>

      <HotPrices title={'You may also like'} />
    </section>
  );
};
