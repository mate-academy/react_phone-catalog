import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Phone } from '../types/phone';
import { Tablet } from '../types/tablet';
import { Accessory } from '../types/accessory';

type Product = Phone | Tablet | Accessory;

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);

        let apiUrl = '';

        if (location.pathname.includes('/phones')) {
          apiUrl = './api/phones.json';
        } else if (location.pathname.includes('/tablets')) {
          apiUrl = './api/tablets.json';
        } else if (location.pathname.includes('/accessories')) {
          apiUrl = './api/accessories.json';
        }

        const response = await fetch(apiUrl);
        const data: Product[] = await response.json();
        const selectedProduct = data.find(item => item.id === productId);

        if (!selectedProduct) {
          throw new Error('Product not found');
        }

        setProduct(selectedProduct);
      } catch (error) {
        setError('Failed to fetch product details');
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, location.pathname]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="details">
      <h1 className="details__text">{product.name}</h1>

      <img className="details__image" src={product.images[0]} alt="image" />

      <div className="details__image--more">
        {product.images.map(img => (
          <img
            key={img}
            className="details__image--more__img"
            src={img}
            alt="image"
          />
        ))}
      </div>

      <div className="details-flex">
        <p className="details-flex-text">Aviables colors</p>
        <p className="details-flex-text">ID: 903253</p>
      </div>

      {product.colorsAvailable.map(color => (
        <div
          key={color}
          className="details__color"
          style={{ backgroundColor: color, marginBottom: 6 + 'px' }}
        >
          {color}
        </div>
      ))}

      <div className="card__line"></div>

      <p className="card__price-regular">{`${product.priceRegular}$`}</p>

      <div className="card__buy">
        <button className="card__buy-cart">Add to cart</button>
        <img src="./img/add-to-cart.svg" alt="add-to-cart" />
      </div>

      <div className="card__screen">
        <p className="card__screen-name">Screen</p>
        <p className="card__screen-info">{product.screen}</p>
      </div>

      <div className="card__ram">
        <p className="card__ram-name">Resolution</p>
        <p className="card__ram-info">{product.resolution}</p>
      </div>

      <div className="card__ram">
        <p className="card__ram-name">Processor</p>
        <p className="card__ram-info">{product.processor}</p>
      </div>

      <div className="card__ram">
        <p className="card__ram-name">RAM</p>
        <p className="card__ram-info">{product.ram}</p>
      </div>

      <h3>About</h3>
      <div className="card__line"></div>

      <h4>And then there was pro</h4>
      <p>
        A transformative triple‑camera system that adds tons of capability
        without complexity.
      </p>
      <p>
        An unprecedented leap in battery life. And a mind‑blowing chip that
        doubles down on machine learning and pushes the boundaries of what a
        smartphone can do. Welcome to the first iPhone powerful enough to be
        called Pro.
      </p>

      <h4>Camera</h4>
      <p>
        Meet the first triple‑camera system to combine cutting‑edge technology
        with the legendary simplicity of iPhone. Capture up to four times more
        scene. Get beautiful images in drastically lower light. Shoot the
        highest‑quality video in a smartphone — then edit with the same tools
        you love for photos. You’ve never shot with anything like it.
      </p>

      <h4>
        Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love
        it.
      </h4>
      <p>
        iPhone 11 Pro lets you capture videos that are beautifully true to life,
        with greater detail and smoother motion. Epic processing power means it
        can shoot 4K video with extended dynamic range and cinematic video
        stabilization — all at 60 fps. You get more creative control, too, with
        four times more scene and powerful new editing tools to play with.
      </p>

      <h3>Tech specs</h3>

      <div className="card__line"></div>

      <div className="card__screen">
        <p className="card__screen-name">Screen</p>
        <p className="card__screen-info">{product.screen}</p>
      </div>

      <div className="card__ram">
        <p className="card__ram-name">Resolution</p>
        <p className="card__ram-info">{product.resolution}</p>
      </div>

      <div className="card__ram">
        <p className="card__ram-name">Processor</p>
        <p className="card__ram-info">{product.processor}</p>
      </div>

      <div className="card__ram">
        <p className="card__ram-name">RAM</p>
        <p className="card__ram-info">{product.ram}</p>
      </div>

      <div className="card__ram">
        <p className="card__ram-name">Built in memory</p>
        <p className="card__ram-info">{product.capacity}</p>
      </div>

      <div className="card__ram">
        <p className="card__ram-name">Camera</p>
        <p className="card__ram-info">{product.camera}</p>
      </div>

      <div className="card__ram">
        <p className="card__ram-name">Zoom</p>
        <p className="card__ram-info">{product.zoom}</p>
      </div>

      <div className="card__ram">
        <p className="card__ram-name">Cell</p>
        {product.cell.map((el, index) => (
          <div key={`${product.id}-cell-${index}`} className="card__ram-info">
            <span
              className="card__ram-circle"
              style={{ backgroundColor: el }}
            ></span>
            <p className="card__ram-text">{el}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
