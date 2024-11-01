import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import homeIcon from '../../../public/img/icons/Home.svg';
import arrowRight from '../../../public/img/icons/ArrowRight.svg';
import strokeLeft from '../../../public/img/icons/StrokeLeft.svg';
import strokeRight from '../../../public/img/icons/StrokeRight.svg';
import { ProductDescription } from '../../types/Accessories';
import { Link } from 'react-router-dom';
import favouritesIcon from '../../../public/img/icons/Favourites.svg';
import { SliderProducts } from '../../components/SliderProducts/SliderProducts';

interface ProductDetailsPageProps {
  productDescription: ProductDescription;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = () => {
  const { itemId, category } = useParams<{
    itemId: string;
    category: string;
  }>();

  const [product, setProduct] = useState<ProductDescription | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState('');

  const [chooseColor, setChooseColor] = useState<string | null>(null);
  const [chooseCapacity, setChooseCapacity] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<
    ProductDescription[]
  >([]);

  const navigate = useNavigate();


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const baseUrl =
        window.location.hostname === 'localhost'
          ? 'http://localhost:5173/api'
          : 'https://anastasiiakorolko.github.io/react_phone-catalog/api';

      const response = await fetch(`${baseUrl}/${category}.json`);
      const data = await response.json();

      const selectedProduct = data.find(
        (item: ProductDescription) => item.id === itemId
      );

      if (selectedProduct) {
        setProduct(selectedProduct);
        setSelectedImage(`/${selectedProduct.images[0]}`);
        setChooseCapacity(selectedProduct.capacity);
        setChooseColor(selectedProduct.color);
      } else {
        setError('Product not found');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestedProducts = async () => {
    try {
      const baseUrl =
        window.location.hostname === 'localhost'
          ? 'http://localhost:5173/api'
          : 'https://anastasiiakorolko.github.io/react_phone-catalog/api';

      const response = await fetch(`${baseUrl}/${category}.json`);
      const data = await response.json();

      const filteredProducts = data.filter(
        (item: ProductDescription) => item.id !== itemId
      );

      const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
      const randomSuggested = shuffled.slice(0, 4);

      setSuggestedProducts(randomSuggested);
    } catch (error) {
      setError('Unable to get recommendation products');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSuggestedProducts();
  }, [itemId, category]);


  // const fetchProducts = async () => {
  //   setLoading(true);
  //   try {
  //     // const resolve = await fetch(`/api/${category}.json`);
  //     // const resolve = await fetch('http://localhost:5173/api/products.json');
  //     const resolve = await fetch('http://localhost:5173/api/${category}.json');
  //     const data = await resolve.json();
  //     const selectedProduct = data.find(
  //       (item: ProductDescription) => item.id === itemId,
  //     );

  //     if (selectedProduct) {
  //       setProduct(selectedProduct);
  //       setSelectedImage(`/${selectedProduct.images[0]}`);
  //       setChooseCapacity(selectedProduct.capacity);
  //       setChooseColor(selectedProduct.color);
  //     } else {
  //       setError('Product not found');
  //     }
  //   } catch (error) {
  //     setError('Something went wrong. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const fetchSuggestingProducts = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`/api/${category}.json`);
  //     // const response = await fetch('https://anastasiiakorolko.github.io/react_phone-catalog/api/phones.json');
  //     // const response = await fetch('http://localhost:5173/api/products.json');
  //     const data = await response.json();
  //     const suggestedProducts = data.filter(
  //       (item: ProductDescription) => item.id !== itemId,
  //     );
  //     const shuffled = suggestedProducts.sort(() => 0.5 - Math.random());
  //     const randomSuggested = shuffled.slice(0, 4);
  //     setSuggestedProducts(randomSuggested);
  //     return randomSuggested;
  //   } catch (error) {
  //     setError('Unable get recomenation products');
  //     return [];
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  //   fetchSuggestingProducts();
  // }, [itemId, category]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleReload = () => {
    fetchProducts();
  };

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCapacityChange = (capacity: string) => {
    setChooseCapacity(capacity);
  };

  const handleColorChange = (color: string) => {
    setChooseColor(color);
  };

  const baseImagePath = `/img/${product?.category}/${product?.namespaceId}/${chooseColor}`;

  const imageFiles = ['00.webp', '01.webp', '02.webp'];
  // "img/accessories/apple-watch-series-6/silver/00.webp",

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="section section--product-details">
      <nav className="breadcrumbs">
        <a href="/">
          <img
            src={homeIcon}
            alt="Home"
            className="breadcrumbs__item breadcrumbs__item--home"
          />
        </a>
        <span className="breadcrumbs__separator">/</span>
        <a href="#">
          <img src={strokeRight} alt="Previous"></img>
        </a>
        <span className="breadcrumbs__separator">/</span>
        <a href="/accessories" className="breadcrumbs__item">
          {product?.category}
        </a>
        <span className="breadcrumbs__separator">/</span>
        <a href="#">
          <img src={strokeRight} alt="Previous"></img>
        </a>
        <span className="breadcrumbs__separator">/</span>
        <a href="/product.id" className="breadcrumbs__item">
          {product?.name}
        </a>
      </nav>

      <div className="back-button">
        <span className="breadcrumbs__separator">/</span>
        <a
          href="#"
          onClick={handleBackClick}
          aria-label="Go back"
          className="back-button__link"
        >
          <span className="breadcrumbs__icon">
            <img src={strokeLeft} alt="Stroke left" />
          </span>
          <span className="breadcrumbs__text">Back</span>
        </a>
      </div>

      <main>
        <h1 className="section__title">{product?.name}</h1>

        <div className="product-page">
          <div className="product-content">
            <div className="product-gallery">
              <div className="product-gallery product-gallery__thumbnails">
                {imageFiles.map((fileName, index) => (
                  <img
                    key={index}
                    src={`${baseImagePath}/${fileName}`}
                    className={`thumbnail ${selectedImage === fileName ? 'active' : ''}`}
                    onClick={() =>
                      handleThumbnailClick(`${baseImagePath}/${fileName}`)
                    }
                    alt={`${product?.name} ${chooseColor} ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="product-gallery product-gallery__main-image">
              <img className='image'
              src={selectedImage ? `${selectedImage}` : ''}
              alt="Product main view"
              />
            </div>
          </div>

          {/* <div className="product-gallery product-gallery__main-image">
            <img
              src={selectedImage ? `${selectedImage}` : ''}
              alt="Product main view"
            />
          </div> */}

          <div className="product-info">
            <div className="color-picker">
              <h3 className="color-picker__title picker-title">
                Available colors
              </h3>
              <div className="color-picker__options">
                {product?.colorsAvailable.map(color => {
                  const isCurrColor = color === product?.color;

                  return (
                    <Link
                      key={color}
                      to={`/product/${product?.category}/${product?.namespaceId}-${product?.capacity.toLowerCase()}-${color}`}
                      onClick={() => handleColorChange(color)}
                      className={`color-picker__option color-picker__option--${color.replace(' ', '-')} ${isCurrColor ? 'active' : ''}`}
                    ></Link>
                  );
                })}
              </div>
            </div>

            <div className="capacity-picker">
              <h3 className="capacity-picker__title picker-title">
                Select capacity
              </h3>
              <div className="capacity-picker__options">
                {product?.capacityAvailable.map((capacity: string) => {
                  const isCurrCapacity = capacity === product?.capacity;

                  return (
                    <Link
                      key={capacity}
                      to={`/product/${product?.category}/${product?.namespaceId}-${capacity.toLowerCase()}-${product?.color}`}
                      className={`capacity-picker__option ${isCurrCapacity ? 'active' : ''}`}
                      aria-label={`Select ${capacity}`}
                      onClick={() => handleCapacityChange(capacity)}
                    >
                      {capacity}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="product-price">
              <span className="product-price__current">
                {product?.priceDiscount}$
              </span>
              <span className="product-price__old">
                {product?.priceRegular}$
              </span>
            </div>

            <div className="product-actions">
              <button className="product-actions__button">Add to cart</button>
              <a href="#">
                <img
                  src={favouritesIcon}
                  alt="Favourites"
                  className="product-actions__icon"
                />
              </a>
            </div>

            <div className="specs">
              <div className="specs__details">
                <span className="specs__property">Screen</span>
                <span className="specs__value">{product?.screen}</span>
              </div>
              <div className="specs__details">
                <span className="specs__property">Resolution</span>
                <span className="specs__value">{product?.resolution}</span>
              </div>
              <div className="specs__details">
                <span className="specs__property">Processor</span>
                <span className="specs__value">{product?.processor}</span>
              </div>
              <div className="specs__details">
                <span className="specs__property">RAM</span>
                <span className="specs__value">{product?.ram}</span>
              </div>
            </div>
          </div>
          <div className="product-id">
            <div className="product-info__id">ID: BD3390</div>
          </div>
        </div>

        <section className="products-details">
          <div className="about">
            <h2 className="about__title">About</h2>
            {product?.description.map((section, index) => (
              <div key={index} className={`section-${index + 1}`}>
                <h3 className="section-title"></h3>
                {section.text.map((paragraph, idx) => (
                  <p key={idx} className="about__text">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className="tech-specs">
            <h2 className="specs__title ">Tech specs</h2>
            <div className="specs">
              <div className="specs__details">
                <span className="specs__property">Screen</span>
                <span className="specs__value">{product?.screen}</span>
              </div>
              <div className="specs__details">
                <span className="specs__property">Resolution</span>
                <span className="specs__value">{product?.resolution}</span>
              </div>
              <div className="specs__details">
                <span className="specs__property">Processor</span>
                <span className="specs__value">{product?.processor}</span>
              </div>
              <div className="specs__details">
                <span className="specs__property">RAM</span>
                <span className="specs__value">{product?.ram}</span>
              </div>
              <div className="specs__details">
                <span className="specs__property">Built in memory</span>
                <span className="specs__value">64 GB</span>
              </div>
              <div className="specs__details">
                <span className="specs__property">Camera</span>
                <span className="specs__value">
                  12 Mp + 12 Mp + 12 Mp (Triple)
                </span>
              </div>
              <div className="specs__details">
                <span className="specs__name">Zoom</span>
                <span className="specs__value">Optical, 2x</span>
              </div>
              <div className="specs__details">
                <span className="specs__name">Cell</span>
                <span className="specs__value">GSM, LTE, UMTS</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SliderProducts products={suggestedProducts} />
    </div>
  );
};
