import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Phone } from '../types/phone';
import { Tablet } from '../types/tablet';
import { Accessory } from '../types/accessory';
import { DetailsAbout } from '../components/DetailsAbout';

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
      <div className="page-phones">
        <Link to="/">
          <img className="page-phones__house" src="./img/Home.svg" alt="Home" />
        </Link>
        <img
          className="page-phones__arrow"
          src="./img/Chevron (Arrow Right).svg"
          alt="Chevron"
        />
        <p className="page-phones__catygory-text">
          {location.pathname.includes('/tablets')
            ? 'Tablets'
            : location.pathname.includes('/phones')
              ? 'Phones'
              : location.pathname.includes('/accessories')
                ? 'Accessories'
                : ''}
        </p>
      </div>

      <Link to={location.pathname.includes('/tablets')
        ? '/tablets'
        : location.pathname.includes('/phones')
          ? '/phones'
          : location.pathname.includes('/accessories')
            ? '/accessories'
            : ''}>
        <div className='details__back'>
          <img src="./img/Icons_Chevron (Arrow Right).svg" alt="Home" />
          <p className='details__back--text'>Back</p>
        </div>
      </Link>

      <h1 className="details__text">{product.name}</h1>

      <div className="qwerty">
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

        <div className='q'>
          <div className="details-flex">
            <p className="details-flex-text">Aviables colors</p>
            <p className="details-flex-text">ID: 903253</p>
          </div>

          <div className="details__colors-container">
            {product.colorsAvailable.map(color => (
              <div
                key={color}
                className="details__color"
                style={{ backgroundColor: color, width: '32px', height: '32px', borderRadius: '50%', marginRight: '8px' }}
              />
            ))}
          </div>

          <div className="card__line"></div>

          <p className="details-flex-text">Select capacity</p>

          <div className='flex-capacity'>
            <div className='capacity'>
              <div className="capacity-text">
                64GB
              </div>
            </div>

            <div className='capacity-default'>
              <div className="capacity-default-text">
                128GB
              </div>
            </div>

            <div className='capacity-default'>
              <div className="capacity-default-text">
                254GB
              </div>
            </div>
          </div>

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
        </div>
      </div>

      <DetailsAbout />

      <h3>Tech specs</h3>
      <div className="card__line"></div>

      <div className="card__ram">
        <p className="card__ram-name">Screen</p>
        <p className="card__ram-info">{product.screen}</p>
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
        <p className='card__ram-name'>Cell</p>
        {product.cell.map((el, index) => (
          <p key={`${product.id}-cell-${index}`} className="card__ram-info">{el}</p>
        ))}
      </div>
    </div>
  );
};
