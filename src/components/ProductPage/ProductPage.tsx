import './ProductPage.scss';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useShop } from '../../context/shopContext';
import { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { getAssetUrl } from '../../utils/functions/function';

export const ProductPage = () => {
  const [photo, setPhoto] = useState(0);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    products,
    phones,
    tablets,
    accessories,
    addToBasket,
    toggleFavourite,
    isInBasket,
    isFavourite,
  } = useShop();

  useEffect(() => {
    setPhoto(0);
  }, [id]);

  const handlePhoto = (index: number) => {
    setPhoto(index);
  };

  const product = products.find(p => p.id.toString() === id);

  let details;

  if (product) {
    switch (product.category) {
      case 'phones':
        details = phones.find(p => p.id === product.itemId);
        break;
      case 'tablets':
        details = tablets.find(p => p.id === product.itemId);
        break;
      case 'accessories':
        details = accessories.find(p => p.id === product.itemId);
        break;
      default:
        details = null;
    }
  }

  if (!product || !details) {
    return <div>Product not found!</div>;
  }

  const fullProduct = { ...product, ...details };

  const handleColorChange = (newColor: string) => {
    let newProduct;

    switch (fullProduct.category) {
      case 'phones':
        newProduct = phones.find(
          p => p.namespaceId === details.namespaceId && p.color === newColor,
        );
        break;
      case 'tablets':
        newProduct = tablets.find(
          p => p.namespaceId === details.namespaceId && p.color === newColor,
        );
        break;
      case 'accessories':
        newProduct = accessories.find(
          p => p.namespaceId === details.namespaceId && p.color === newColor,
        );
        break;
    }

    if (newProduct) {
      const productsItem = products.find(p => p.itemId === newProduct.id);

      if (productsItem) {
        navigate(`/product/${productsItem.id}`);
      }
    }
  };

  const handleCapacityChange = (newCapacity: string) => {
    let newProduct;

    switch (fullProduct.category) {
      case 'phones':
        newProduct = phones.find(
          p =>
            p.namespaceId === details.namespaceId && p.capacity === newCapacity,
        );
        break;
      case 'tablets':
        newProduct = tablets.find(
          p =>
            p.namespaceId === details.namespaceId && p.capacity === newCapacity,
        );
        break;
      case 'accessories':
        newProduct = accessories.find(
          p =>
            p.namespaceId === details.namespaceId && p.capacity === newCapacity,
        );
        break;
    }

    if (newProduct) {
      const productsItem = products.find(p => p.itemId === newProduct.id);

      if (productsItem) {
        navigate(`/product/${productsItem.id}`);
      }
    }
  };

  return (
    <div className="product">
      <div className="product__path">
        <Link to="/">
          <img src={getAssetUrl('/img/Home.png')} alt="home" />
        </Link>
        <img src={getAssetUrl('/img/arrow-right.png')} alt="img" />
        <Link
          to={`/${fullProduct.category}`}
          className="product__path--category"
        >
          {fullProduct.category}
        </Link>
        <img src={getAssetUrl('/img/arrow-right.png')} alt="img" />
        <div className="product__path--name">{fullProduct.name}</div>
      </div>
      <div className="product__back">
        <img src={getAssetUrl('/img/arrow-left.png')} alt="img" />
        <div className="product__back--text" onClick={() => navigate(-1)}>
          Back
        </div>
      </div>
      <div className="product__name">{fullProduct.name}</div>
      <div className="product__details">
        <div className="product__details--images">
          <div className="product__details--images-container">
            <div className="product__details--images-main">
              <img
                src={fullProduct.images && fullProduct.images[photo]}
                alt="photo"
                className="product__details--images-main-img"
              />
            </div>
            <div className="product__details--images-options">
              {fullProduct.images?.map((image, index) => {
                return (
                  <div
                    key={image}
                    className="product__details--images-options-option"
                    onClick={() => handlePhoto(index)}
                  >
                    <img
                      src={image}
                      alt="image"
                      className="product__details--images-options-option-img"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="product__details--images--rest">
            <div className="product__details--images--rest-colors">
              <div className="product__details--images--rest-colors-text">
                Available colors
              </div>
              <div className="product__details--images--rest-colors-options">
                {fullProduct.colorsAvailable?.map(color => (
                  <div
                    key={color}
                    className={`product__details--images--rest-colors-options-option product__details--images--rest-colors-options-option-${color} ${
                      fullProduct.color === color ? 'active' : ''
                    }`}
                    onClick={() => handleColorChange(color)}
                  ></div>
                ))}
              </div>
            </div>
            <div className="product__details--images--rest-line"></div>
            <div className="product__details--images--rest-capacity">
              <div className="product__details--images--rest-capacity-text">
                Select capacity
              </div>
              <div className="product__details--images--rest-capacity-options">
                {fullProduct.capacityAvailable?.map(option => (
                  <div
                    key={option}
                    className={`product__details--images--rest-capacity-options-option ${
                      fullProduct.capacity === option ? 'active' : ''
                    }`}
                    onClick={() => handleCapacityChange(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <div className="product__details--images--rest-line"></div>
            <div className="product__details--images--rest-price">
              <div className="product__details--images--rest-price-discount">
                ${fullProduct.price}
              </div>
              <div className="product__details--images--rest-price-full">
                ${fullProduct.fullPrice}
              </div>
            </div>
            <div className="product__details--images--rest-buttons">
              <button
                className={`product__details--images--rest-buttons-add ${isInBasket(product.id) && 'product__details--images--rest-buttons-add-added'}`}
                onClick={event => {
                  event.preventDefault();
                  event.stopPropagation();
                  addToBasket(product);
                }}
              >
                {isInBasket(product.id) ? 'Added' : 'Add to cart'}
              </button>
              <button
                className="product__details--images--rest-buttons-fav"
                onClick={() => toggleFavourite(product)}
              >
                <img
                  src={
                    isFavourite(product.id)
                      ? getAssetUrl('/img/heart-red.png')
                      : getAssetUrl('/img/heart.png')
                  }
                  alt="favourites"
                />
              </button>
            </div>
            <div className="product__details--images--rest-info">
              <div className="product__details--images--rest-info-title">
                Screen
              </div>
              <div className="product__details--images--rest-info-value">
                {fullProduct.screen}
              </div>
            </div>
            <div className="product__details--images--rest-info">
              <div className="product__details--images--rest-info-title">
                Resolution
              </div>
              <div className="product__details--images--rest-info-value">
                {fullProduct.resolution}
              </div>
            </div>
            <div className="product__details--images--rest-info">
              <div className="product__details--images--rest-info-title">
                Processor
              </div>
              <div className="product__details--images--rest-info-value">
                {fullProduct.processor}
              </div>
            </div>
            <div className="product__details--images--rest-info">
              <div className="product__details--images--rest-info-title">
                RAM
              </div>
              <div className="product__details--images--rest-info-value">
                {fullProduct.ram}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product__about">
        <div className="product__about--about">
          <div className="product__about--about-title">About</div>
          <div className="product__about--about-line"></div>
          {fullProduct.description?.map(desc => {
            return (
              <>
                <div key={desc.title} className="product__about--about-name">
                  {desc.title}
                </div>
                <div key={desc.text[0]} className="product__about--about-text">
                  {desc.text}
                </div>
              </>
            );
          })}
        </div>
        <div className="product__about--tech">
          <div className="product__about--tech-title">Tech</div>
          <div className="product__about--tech-line"></div>
          <div className="product__about--tech-info">
            <div className="product__about--tech-info-name">Screen</div>
            <div className="product__about--tech-info-specs">
              {fullProduct.screen}
            </div>
          </div>
          <div className="product__about--tech-info">
            <div className="product__about--tech-info-name">Resolution</div>
            <div className="product__about--tech-info-specs">
              {fullProduct.resolution}
            </div>
          </div>
          <div className="product__about--tech-info">
            <div className="product__about--tech-info-name">Processor</div>
            <div className="product__about--tech-info-specs">
              {fullProduct.processor}
            </div>
          </div>
          <div className="product__about--tech-info">
            <div className="product__about--tech-info-name">RAM</div>
            <div className="product__about--tech-info-specs">
              {fullProduct.ram}
            </div>
          </div>
          <div className="product__about--tech-info">
            <div className="product__about--tech-info-name">
              Built in memory
            </div>
            <div className="product__about--tech-info-specs">64 GB</div>
          </div>
          <div className="product__about--tech-info">
            <div className="product__about--tech-info-name">Camera</div>
            <div className="product__about--tech-info-specs">
              {fullProduct.camera}
            </div>
          </div>
          <div className="product__about--tech-info">
            <div className="product__about--tech-info-name">Zoom</div>
            <div className="product__about--tech-info-specs">
              {fullProduct.zoom}
            </div>
          </div>
          <div className="product__about--tech-info">
            <div className="product__about--tech-info-name">Cell</div>
            <div className="product__about--tech-info-specs">
              {fullProduct.cell}
            </div>
          </div>
        </div>
      </div>
      <div className="product__like">
        <div className="product__like--title">
          <div className="product__like--title--text">You may also like</div>
          <div className="product__like--title--arrows">
            <div className="product__like--title--arrows-arrow">
              <img src={getAssetUrl('/img/arrow-left.png')} alt="left" />
            </div>
            <div className="product__like--title--arrows-arrow arrow-active">
              <img src={getAssetUrl('/img/arrow-right.png')} alt="right" />
            </div>
          </div>
        </div>
        <div className="product__like--phones">
          {products.map(pro => {
            return <ProductCard key={pro.id} product={pro} />;
          })}
        </div>
      </div>
    </div>
  );
};
