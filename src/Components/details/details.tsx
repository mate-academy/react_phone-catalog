import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import './details.scss';
import home from './Home.svg';
import chevron from './Chevron-right.svg';
import chevronleft from './Chevron-left.svg';
import black from './black.svg';
import white from './white.svg';
import green from './green.svg';
import HotPrices from '../HotPrices/hotprices';
import YouMay from '../Youmayalsolike/youmay';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [selectedPicture, setSelectedPicture] = useState(0);
  const location = useLocation();
  const product = location.state?.product || {};
  const [addedToCart, setAddedToCart] = useState(false);
  const [liked, setLiked] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [favoriteProducts, setFavoriteProducts] = useState([]);


  useEffect(() => {
    fetch(`https://mate-academy.github.io/react_phone-catalog/api/products/${productId}.json`)
      .then((response) => response.json())
      .then((data) => {
        setProductDetails(data);
      })
      .catch((error) => console.error('Error fetching product details:', error));
  }, [productId]);

  useEffect(() => {
    const storedFavorites: string[] | null = JSON.parse(localStorage.getItem('favorites'));
    setFavoriteProducts(storedFavorites || []);
  }, []);

  const handlePictureClick = (index) => {
    setSelectedPicture(index);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleCapacityClick = (capacity) => {
    setSelectedCapacity(capacity);
  };

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  const calculateDiscountedPrice = () => {
    if (product.discount) {
      const discountedPrice = product.price - (product.price * product.discount) / 100;
      return (
        <div className='prices'>
          <p className='discounted-price'>{discountedPrice}$</p>
          <p className='original-price'>{product.price}$</p>
        </div>
      );
    }
    return <p className='price'>{product.price}$</p>;
  };

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleAddToCartClick = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const isProductInCart = storedCart.includes(productId);

    if (isProductInCart) {
      const updatedCart = storedCart.filter((id) => id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...storedCart, productId];
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json')
        .then((response) => response.json())
        .then((data) => {
          const foundProduct = data.find((item) => item.id === productId);

          if (foundProduct) {
            console.log(foundProduct);
            onAddToCart({
              productId,
              imgUrl: foundProduct.imageUrl,
              name: foundProduct.name,
            });
          } else {
            console.error(`Product with ID ${productId} not found.`);
          }
        })
        .catch((error) => console.error('Error fetching product data:', error));
    }

    setAddedToCart((prev) => !prev);
  };


  const handleAddToFavoritesAndLike = () => {
    handleAddToFavorite();
    handleLikeClick();
  };


  const handleAddToFavorite = () => {
    if (!favoriteProducts.includes(productId)) {
      const updatedFavorites = [...favoriteProducts, productId];
      setFavoriteProducts(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };
  return (
    <>
    <div className='details'>
      <div className='folder-holder'>
        <button className='home-button'>
          <img src={home} alt="Home" />
        </button>
        <img src={chevron} alt="Chevron" className='folder-chevron' />
        <p className='page-folder'>Phones</p>
        <img src={chevron} alt="Chevron" className='folder-chevron' />
        <p className='page-name'>{productDetails.name}</p>
      </div>
      <div className='page-back__holder'>
        <img src={chevronleft} alt="Chevron" className='folder-chevron' />
        <Link className='page-back' to="/">Back</Link>
      </div>
      <div>
        <h2 className='details-title'>{productDetails.name}</h2>
        <div className='product-details'>
          <div className='product-upside'>
          <div className='images-holder'>
            <div className='pictures'>
              {productDetails.images.map((image, index) => (
                <div className='image-holder' key={index}>
                  <img
                    src={image}
                    className={index === selectedPicture ? 'selected-picture' : 'unselected-picture'}
                    onClick={() => handlePictureClick(index)}
                  />
                </div>
              ))}
            </div>
            <div className='selected-picture'>
              {productDetails.images[selectedPicture] && (
                <img
                  src={productDetails.images[selectedPicture]}
                  alt={`Selected Product`}
                  className='selected-picture'
                />
              )}
            </div>
          </div>

          <div className='product-details2'>
          <div className='colors'>
        <p className='colors-title'>Available colors</p>
        <div className='colors-holder'>
          {[black, white, green].map((color, index) => (
            <div
              key={index}
              onClick={() => handleColorClick(color)}
            >
              <img src={color} alt={color} className={`color ${selectedColor === color ? 'selected' : ''}`}/>
            </div>
          ))}
        </div>
              <div className='line lined' />
            </div>
            <div className='capacity'>
        <p className='colors-title'>Select capacity</p>
        {['64GB', '256GB', '512GB'].map((capacity, index) => (
          <button
            key={index}
            className={`capacity-button ${selectedCapacity === capacity ? 'selected' : ''}`}
            onClick={() => handleCapacityClick(capacity)}
          >
            {capacity}
          </button>
        ))}
      </div>
            <div className='line' />
            <div className='add-to-cart'>
              <p className='price-title'></p>
              <p>{calculateDiscountedPrice()}</p>
              <div className='buttons-holder'>
              <button type="submit" className={addedToCart ? 'button-add added super' : 'button-add super'} onClick={handleAddToCartClick}>
            {addedToCart ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
          type="button"
          onClick={handleAddToFavoritesAndLike}
          className={liked ? 'button-like liked super1' : 'button-like super1'}
        />
          </div>
            </div>
            <div className='SRPR'>
              <div className='SRPR-title'>
              <div className='names'>Screen</div>
              <div className='text'>{productDetails.display.screenSize}</div>
                </div>
              <div className='SRPR-title'>
              <div className='names'>RAM</div>
              <div className='text'>{productDetails.storage.ram}</div>
                </div>

            <div className='SRPR-title'>
                <div className='names'>Processor</div>
                <div className='text'>{productDetails.hardware.cpu} </div>
              </div>

          <div className='SRPR-title'>
                <div className='names'>Resolution </div>
                <div className='text'>{productDetails.display.screenResolution} </div>
                </div>
                </div>
                </div>
                </div>
                <div className='product-downside'>
                  <div className='about'>
                    <p className='about-title'>About</p>
                    <div className='line lined' />
                    <div className='description'>{productDetails.description}</div>
                  </div>
                  <div className='techspecs'>
                    <p className='about-title'>Techspecs</p>
                    <div className='line lined' />
                    <div className='specs'>
                      <div className='specs-title'>
                        <div className='specs-name'>Screen</div>
                        <div className='specs-info'>{product.screen}</div>
                      </div>
                      <div className='specs-title'>
                      <div className='specs-name'>Resolution</div>
                      <div className='specs-info'>{productDetails.display.screenResolution}</div>
                      </div>
                      <div className='specs-title'>
                      <div className='specs-name'>Processor</div>
                      <div className='specs-info'>{productDetails.hardware.cpu}</div>
                      </div>
                      <div className='specs-title'>
                      <div className='specs-name'>RAM</div>
                      <div className='specs-info'>{productDetails.storage.ram}</div>
                      </div>
                      <div className='specs-title'>
                      <div className='specs-name'>Built in memory</div>
                      <div className='specs-info'>{productDetails.storage.flash}</div>
                      </div>
                      <div className='specs-title'>
                      <div className='specs-name'>Camera</div>
                      <div className='specs-info'>{productDetails.camera.primary}</div>
                      </div>
                      <div className='specs-title'>
                        <div className='specs-name'>Cell</div>
                        <div className='specs-info'>{productDetails.connectivity.cell}</div>
                      </div>
                    </div>
                  </div>
                </div>
        </div>
      </div>
      <YouMay/>
      </div>
    </>
  );
};

export default ProductDetailsPage;
