import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './details.scss';
import YouMay from '../Youmayalsolike/youmay';
import {
  useCartContext,
  useFavoritesContext,
} from '../cartcontext/cartcontext';
import { Product } from '../ProductCard/types';

interface ProductDetails {
  name: string;
  images: string[];
  display: {
    screenSize: string;
    screenResolution: string;
  };
  hardware: {
    cpu: string;
  };
  storage: {
    ram: string;
    flash: string;
  };
  camera: {
    primary: string;
  };
  connectivity: {
    cell: string;
  };
  price: number;
  discount?: number;
  description: string;
}

const basePath = '/img/';
const images = [
  `${basePath}white.svg`,
  `${basePath}black.svg`,
  `${basePath}green.svg`,
];

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [productDetails,
    setProductDetails] = useState<ProductDetails | null>(null);
  const [selectedPicture] = useState(0);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const {
    cartProducts, addToCart, removeFromCart,
  } = useCartContext();

  const {
    favoriteProducts, addToFavorites, removeFromFavorites,
  } = useFavoritesContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // eslint-disable-next-line max-len
          'https://mate-academy.github.io/react_phone-catalog/api/products.json',
        );
        const data: Product[] = await response.json();

        const foundProduct = data.find((item) => item.id === productId);

        if (foundProduct) {
          setCurrentProduct(foundProduct);
        } else {
          setCurrentProduct(null);
        }
      } catch (error) {
        addToCart(productId);
      }
    };

    fetchData();
  }, [productId]);

  useEffect(() => {
    fetch(`https://mate-academy.github.io/react_phone-catalog/api/products/${productId}.json`)
      .then((response) => response.json())
      .then((data: ProductDetails) => {
        setProductDetails(data);
      })
      .catch(() => setProductDetails({
        name: 'Error',
        images: [],
        display: { screenSize: '', screenResolution: '' },
        hardware: { cpu: '' },
        storage: { ram: '', flash: '' },
        camera: { primary: '' },
        connectivity: { cell: '' },
        price: 0,
        description: '',
      }));
  }, [productId]);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  const handleCapacityClick = (capacity: string) => {
    setSelectedCapacity(capacity);
  };

  const calculateDiscountedPrice = () => {
    if (currentProduct?.discount) {
      const discountedPrice = currentProduct.price
        - (currentProduct.price * currentProduct.discount) / 100;

      return (
        <div className="prices">
          <p className="discounted-price">
            {discountedPrice}
            $
          </p>
          <p className="original-price">
            {currentProduct.price}
            $
          </p>
        </div>
      );
    }

    return (
      <p className="price">
        {productDetails?.price}
        $
      </p>
    );
  };

  const handleAddToCartClick = () => {
    const isProductInCart
      = cartProducts.some((product: Product) => product.id === productId);

    if (isProductInCart) {
      removeFromCart(productId);
    } else {
      addToCart(productId);
    }
  };

  const handleAddToFavoritesClick = () => {
    if (productId === undefined) {
      // Handle the case where productId is undefined
      return;
    }

    const isProductInFavorites = favoriteProducts.includes(productId);

    if (isProductInFavorites) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  return (
    <>
      <div className="details">
        <div className="folder-holder">
          <button type="button" className="home-button">
            <img src="/img/home.svg" alt="Home" />
          </button>
          <img
            src="/img/Chevron-right.svg"
            alt="Chevron"
            className="folder-chevron"
          />
          <p className="page-folder">Phones</p>
          <img
            src="/img/Chevron-right.svg"
            alt="Chevron"
            className="folder-chevron"
          />
          <p className="page-name">{productDetails?.name}</p>
        </div>
        <div className="page-back__holder">
          <img
            src="/img/Chevron-left.svg"
            alt="Chevron"
            className="folder-chevron"
          />
          <Link className="page-back" to="/">Back</Link>
        </div>
        <div>
          <h2 className="details-title">{productDetails?.name}</h2>
          <div className="product-details">
            <div className="product-upside">
              <div className="images-holder">
                <div className="pictures">
                  {productDetails && 'images' in productDetails
                    && (productDetails.images as string[]
                    ).map((image, index) => (
                      <button
                        type="button"
                        key={image}
                        className={`image-holder ${index === selectedPicture ? 'selected-picture' : 'unselected-picture'}`}
                      >
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                        />
                      </button>
                    ))}
                </div>
                <div className="selected-picture">
                  {productDetails?.images[selectedPicture] && (
                    <img
                      src={productDetails.images[selectedPicture]}
                      alt="Selected Product"
                      className="selected-picture"
                    />
                  )}
                </div>
              </div>
              <div className="product-details2">
                <div className="colors">
                  <p className="colors-title">Available colors</p>
                  <div className="colors-holder">
                    {images.map((color) => (
                      <div
                        key={color}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleColorClick(color)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleColorClick(color);
                          }
                        }}
                      >
                        <img
                          src={color}
                          alt={color}
                          className={`color ${selectedColor === color ? 'selected' : ''}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="line lined" />
                </div>
                <div className="capacity">
                  <p className="colors-title">Select capacity</p>
                  {['64GB', '256GB', '512GB'].map((capacity) => (
                    <button
                      key={capacity}
                      className={`capacity-button ${selectedCapacity === capacity ? 'selected' : ''}`}
                      onClick={() => handleCapacityClick(capacity)}
                      type="button"
                    >
                      {capacity}
                    </button>
                  ))}
                </div>
                <div className="line" />
                <div className="add-to-cart">
                  <p className="price-title" />
                  {calculateDiscountedPrice()}
                  <div className="buttons-holder">
                    <button
                      type="button"
                      onClick={handleAddToCartClick}
                      className={cartProducts.some(
                        (product: Product) => product.id === productId,
                      )
                        ? 'button-add added super' : 'button-add super'}
                    >
                      {cartProducts.some(
                        (product: Product) => product.id === productId,
                      )
                        ? 'Added to cart' : 'Add to cart'}
                    </button>

                    <button
                      type="button"
                      onClick={handleAddToFavoritesClick}
                      className={favoriteProducts.includes(productId)
                        ? 'button-like liked super1' : 'button-like super1'}
                    >
                      { }
                    </button>
                  </div>
                </div>
                <div className="SRPR">
                  <div className="SRPR-title">
                    <div className="names">Screen</div>
                    <div className="text">
                      {productDetails?.display.screenSize}
                    </div>
                  </div>
                  <div className="SRPR-title">
                    <div className="names">RAM</div>
                    <div className="text">{productDetails?.storage.ram}</div>
                  </div>
                  <div className="SRPR-title">
                    <div className="names">Processor</div>
                    <div className="text">
                      {productDetails?.hardware.cpu}
                    </div>
                  </div>
                  <div className="SRPR-title">
                    <div className="names">Resolution </div>
                    <div className="text">
                      {productDetails?.display.screenResolution}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-downside">
              <div className="about">
                <p className="about-title">About</p>
                <div className="line lined" />
                <div className="description">{productDetails?.description}</div>
              </div>
              <div className="techspecs">
                <p className="about-title">Techspecs</p>
                <div className="line lined" />
                <div className="specs">
                  <div className="specs-title">
                    <div className="specs-name">Screen</div>
                    <div className="specs-info">
                      {productDetails?.display.screenSize}
                    </div>
                  </div>
                  <div className="specs-title">
                    <div className="specs-name">Resolution</div>
                    <div className="specs-info">
                      {productDetails?.display.screenResolution}
                    </div>
                  </div>
                  <div className="specs-title">
                    <div className="specs-name">Processor</div>
                    <div className="specs-info">
                      {productDetails?.hardware.cpu}
                    </div>
                  </div>
                  <div className="specs-title">
                    <div className="specs-name">RAM</div>
                    <div className="specs-info">
                      {productDetails?.storage.ram}
                    </div>
                  </div>
                  <div className="specs-title">
                    <div className="specs-name">Built-in memory</div>
                    <div className="specs-info">
                      {productDetails?.storage.flash}
                    </div>
                  </div>
                  <div className="specs-title">
                    <div className="specs-name">Camera</div>
                    <div className="specs-info">
                      {productDetails?.camera.primary}
                    </div>
                  </div>
                  <div className="specs-title">
                    <div className="specs-name">Cell</div>
                    <div className="specs-info">
                      {productDetails?.connectivity.cell}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <YouMay />
      </div>
    </>
  );
};

export default ProductDetailsPage;
