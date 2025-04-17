/* eslint-disable @typescript-eslint/indent */
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Phone, Tablet, Accessories } from '../../Interface';
import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [product, setProduct] = useState<Phone | Tablet | Accessories | null>(
    null,
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<
    (Phone | Tablet | Accessories)[]
  >([]);

  useEffect(() => {
    if (product?.images?.[0]) {
      setSelectedImage('/' + product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    const fetchProducts = async () => {
      const urls = [
        '/api/phones.json',
        '/api/tablets.json',
        '/api/accessories.json',
      ];
      const allData: (Phone | Tablet | Accessories)[] = [];

      for (const url of urls) {
        const res = await fetch(url);
        const data = await res.json();

        allData.push(...data);
      }

      setAllProducts(allData);

      const found = allData.find(item => item.id === productId);

      if (found) {
        setProduct(found);
        setSelectedColor(found.color);
        setSelectedImage(found.images?.[0] || '/public/img/page-not-found.png');
        if ('capacityAvailable' in found && found.capacityAvailable) {
          setSelectedCapacity(found.capacityAvailable[0]);
        }

        const params = new URLSearchParams(window.location.search);

        params.set('color', found.color.toLowerCase().replace(' ', '-'));
        if ('capacityAvailable' in found && found.capacityAvailable?.[0]) {
          params.set('capacity', found.capacityAvailable[0]);
        }

        window.history.replaceState({}, '', `${pathname}?${params}`);
      } else {
        setProduct(null);
      }
    };

    fetchProducts();
  }, [productId]);

  const handleColorChange = (color: string) => {
    if (!product) {
      return;
    }

    const newProduct = allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === color &&
        ('capacity' in p ? p.capacity === selectedCapacity : true),
    );

    if (newProduct) {
      navigate(
        `/products/${newProduct.id}?color=${color.toLowerCase().replace(' ', '-')}&capacity=${selectedCapacity || ''}`,
      );
      setProduct(newProduct);
      setSelectedColor(color);
      setSelectedImage(
        newProduct.images?.[0] || '/public/img/page-not-found.png',
      );
    }
  };

  const handleMemoryChange = (capacity: string) => {
    if (!product) {
      return;
    }

    const newProduct = allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === selectedColor &&
        ('capacity' in p ? p.capacity === capacity : true),
    );

    if (newProduct) {
      setSelectedCapacity(capacity);

      setProduct(newProduct);

      setSelectedImage(
        newProduct.images?.[0] || '/public/img/page-not-found.png',
      );

      navigate(
        `/products/${newProduct.id}?color=${selectedColor?.toLowerCase().replace(' ', '-') || ''}&capacity=${capacity}`,
      );
    }
  };

  const isPhoneOrTablet = (
    item: Phone | Tablet | Accessories,
  ): item is Phone | Tablet => {
    return 'capacityAvailable' in item && !!item.capacityAvailable;
  };

  if (!product) {
    return <div className="product-details">Loading...</div>;
  }

  return (
    <section className="product-details section">
      <h1 className="product-details__title">{product.name}</h1>
      <span className="product-details__id">ID: {product.id}</span>

      <div className="product-details__main">
        <div className="product-details__gallery">
          <div className="gallery__main-image">
            <img
              src={selectedImage || '/public/img/page-not-found.png'}
              alt={product?.name || 'No image available'}
              loading="lazy"
            />
          </div>
          <div className="gallery__thumbnails">
            {product?.images?.map((image, index) => (
              <img
                key={index}
                src={'/' + image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`thumbnail ${selectedImage === image ? 'thumbnail--active' : ''}`}
                onClick={() => setSelectedImage(image)}
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <div className="product-details__info">
          <div className="product-details__colors">
            <p className="product-details__label">Available colors</p>
            <div className="color-options">
              {product.colorsAvailable?.map(color => (
                <button
                  key={color}
                  className={`color-option color-option--${color.toLowerCase().replace(' ', '-')}`}
                  onClick={() => handleColorChange(color)}
                  aria-label={`Select ${color} color`}
                  aria-selected={selectedColor === color}
                />
              ))}
            </div>
          </div>

          {isPhoneOrTablet(product) && product.capacityAvailable && (
            <div className="product-details__capacities">
              <p className="product-details__label">Select capacity</p>
              <div className="capacity-options">
                {product.capacityAvailable.map(option => (
                  <button
                    key={option}
                    className={`capacity-option ${
                      selectedCapacity === option
                        ? 'capacity-option--active'
                        : ''
                    }`}
                    onClick={() => handleMemoryChange(option)}
                    aria-label={`Select ${option} capacity`}
                    aria-selected={selectedCapacity === option}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="product-details__prices">
            <span className="product-details__price">
              ${product.priceDiscount}
            </span>
            <span className="product-details__price--old">
              ${product.priceRegular}
            </span>
          </div>

          <button className="product-details__add-to-cart">Add to cart</button>
        </div>
      </div>

      <div className="product-details__description">
        <h2>About</h2>
        {product.description?.map((desc, index) => (
          <div key={index}>
            <h3>{desc.title}</h3>
            {desc.text.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        ))}
      </div>

      <div className="product-details__tech-specs">
        <h2>Tech specs</h2>
        {'screen' in product && <p>Screen: {product.screen}</p>}
        {'resolution' in product && <p>Resolution: {product.resolution}</p>}
        {'processor' in product && <p>Processor: {product.processor}</p>}
        {'ram' in product && <p>RAM: {product.ram}</p>}
        {'capacity' in product && <p>Capacity: {product.capacity}</p>}
        {'camera' in product && <p>Camera: {product.camera}</p>}
        {'zoom' in product && <p>Zoom: {product.zoom}</p>}
        {'cell' in product && product.cell && (
          <p>Cell: {product.cell.join(', ')}</p>
        )}
      </div>

      {/* <div className="product-details__recommendations">
        <h2>You may also like</h2>
        <div className="recommendations__list">
          <div className="recommendation-card">
            <img
              src="img/phones/sample-phone-1.jpg"
              alt="Sample Phone 1"
              loading="lazy"
            />
            <p>Apple iPhone 11 64GB Black</p>
            <p>$799</p>
            <button>Add to cart</button>
          </div>
        </div>
      </div> */}
    </section>
  );
};
