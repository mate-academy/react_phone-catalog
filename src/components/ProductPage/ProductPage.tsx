import { useNavigate, useParams } from 'react-router-dom';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import './ProductPage.scss';
import { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { PhoneFull } from '../../types/PhoneFull';
import { mapToProductBase } from '../../utils/mapToProductBase';
import { ProductBase } from '../../types/ProductBase';
import { useFavourites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { CartProduct } from '../../types/Cart';

export const ProductPage = () => {
  const navigate = useNavigate();
  const products = [...phones, ...tablets, ...accessories] as PhoneFull[];

  const { itemId } = useParams<{ itemId: string }>();

  const product = products.find(p => String(p.id) === itemId);

  const [selectedImg, setSelectedImg] = useState<string>('');
  const [sliderIndex, setSliderIndex] = useState(0);


  useEffect(() => {
    if (product?.images.length) {
      setSelectedImg(`${product.images[0]}`);
      setSliderIndex(0);
    }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

  }, [product]);

  if (!product || !itemId) {
    return <NotFoundPage />;
  }

  const recommended = products.filter(p => p.id !== product.id).slice(0, 10);
  const visibleCount = 4;
  const maxIndex = Math.max(recommended.length - visibleCount, 0);

  const recommendedBase: ProductBase[] = recommended.map(p =>
    mapToProductBase(p),
  );

  const handleCapacityChange = (capacity: string) => {
    const newProduct = products.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === product.color &&
        p.capacity === capacity,
    );

    if (newProduct) {
      navigate(`/${newProduct.category}/${newProduct.id}`);
    }
  };

  const handleColorChange = (color: string) => {
    const newProduct = products.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.capacity === product.capacity &&
        p.color.toLowerCase() === color.toLowerCase(),
    );

    if (newProduct) {
      navigate(`/${newProduct.category}/${newProduct.id}`);
    }
  };
  const { toggle, isFavourite } = useFavourites();
  const { addToCart, removeFromCart, isInCart } = useCart();



  const favouriteKey = `${product.id}-${product.capacity}-${product.color}`;

  const productBase: ProductBase = {
    ...mapToProductBase(product),
    favouriteKey,
  };

  const cartKey = `${product.id}-${product.capacity}-${product.color}`;
  const cartProduct: CartProduct = {
    id: `${product.id}-${product.capacity}-${product.color}`, // cart id
    itemId: product.itemId,                                   // ❗️
    category: product.category,                               // ❗️
    name: product.name,
    price: product.price,
    priceDiscount:
      product.fullPrice > product.price ? product.price : undefined,
    images: [product.image],
    capacity: product.capacity,
    color: product.color,
  };

  return (
    <div className="productPage" key={product.id}>
      <div className="container">
        <div className="grid productPage__grid">
          <div className="productPage__top">
            <div className="productPage__breadcrumbs">
              <img src="img/Home.png" alt="home" />
              <img src="img/ChevronRight.png" alt="arrow" />
              <span>{product.name}</span>
            </div>

            <button
              className="productPage__back"
              onClick={() => window.history.back()}
            >
              <img src="img/ChevronLeft.png" alt="back" />
              Back
            </button>
          </div>

          <h1 className="productPage__title">{product.name}</h1>

          <div className="productPage__gallery">
            <div className="productPage__thumbnails">
              {product.images.map((img, i) => {
                const path = `${img}`;
                return (
                  <img
                    key={i}
                    src={path}
                    alt={product.name}
                    onClick={() => setSelectedImg(path)}
                    className={selectedImg === path ? 'active' : ''}
                  />
                );
              })}
            </div>

            <div className="productPage__mainImg">
              <img src={selectedImg} alt={product.name} />
            </div>
          </div>

          <div className="productPage__info">
            <div className="productPage__colors">
              <p className="productPage__label">Available colors</p>

              <div className="productPage__colorButtons">
                {product.colorsAvailable.map(color => (
                  <button
                    key={color}
                    className={product.color === color ? 'active' : ''}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>

              <p className="productPage__id">ID: {product.id}</p>
            </div>

            <div className="productPage__capacity">
              <p className="productPage__label">Select capacity</p>

              <div className="productPage__capacityButtons">
                {product.capacityAvailable.map(cap => (
                  <button
                    key={cap}
                    className={product.capacity === cap ? 'active' : ''}
                    onClick={() => handleCapacityChange(cap)}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>

            <div className="productPage__price">
              <span className="new">${product.priceDiscount}</span>
              <span className="old">${product.priceRegular}</span>
            </div>

            <div className="productPage__actions">
              <button
                className={`productPage__add ${isInCart(cartKey) ? 'added' : ''}`}
                onClick={() => {
                  if (isInCart(cartKey)) {
                    removeFromCart(cartKey);
                  } else {
                    addToCart(cartProduct);
                  }
                }}
              >
                {isInCart(cartKey) ? 'Added to cart' : 'Add to cart'}
              </button>


              <button
                className={`productPage__favourites-button ${isFavourite(favouriteKey) ? 'is-active' : ''
                  }`}
                onClick={() => toggle(productBase)}
              >
                <span className="icon icon--favourite" />
              </button>


            </div>

            <div className="productPage__shortSpecs">
              <div>
                <p>Screen</p>
                <span>{product.screen}</span>
              </div>
              <div>
                <p>Resolution</p>
                <span>{product.resolution}</span>
              </div>
              <div>
                <p>Capacity</p>
                <span>{product.capacity}</span>
              </div>
              <div>
                <p>RAM</p>
                <span>{product.ram}</span>
              </div>
            </div>
          </div>

          <div className="productPage__about">
            <h2 className="productPage__aboutT">About</h2>

            {product.description.map((block, index) => (
              <div key={index} className="productPage__aboutBlock">
                <h3>{block.title}</h3>

                {block.text.map((text, i) => (
                  <p className="productPage__aboutP" key={i}>
                    {text}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="productPage__tech">
            <h2 className="productPage__techT">Tech specs</h2>

            <div className="productPage__techGrid">
              <div className="productPage__techSpecs">
                <p className="productPage__techP">Screen</p>
                <p className="productPage__techChars">{product.screen}</p>
              </div>
              <div className="productPage__techSpecs">
                <p className="productPage__techP">Resolution</p>
                <p className="productPage__techChars">{product.resolution}</p>
              </div>
              <div className="productPage__techSpecs">
                <p className="productPage__techP">Processor</p>
                <p className="productPage__techChars">{product.processor}</p>
              </div>
              <div className="productPage__techSpecs">
                <p className="productPage__techP">RAM</p>
                <p className="productPage__techChars">{product.ram}</p>
              </div>
              <div className="productPage__techSpecs">
                <p className="productPage__techP">Camera</p>
                <p className="productPage__techChars">{product.camera}</p>
              </div>
              <div className="productPage__techSpecs">
                <p className="productPage__techP">Zoom</p>
                <p className="productPage__techChars">{product.zoom}</p>
              </div>
              <div className="productPage__techSpecs">
                <p className="productPage__techP">Cell</p>
                <p className="productPage__techChars">
                  {product.cell.join(', ')}
                </p>
              </div>
            </div>
          </div>

          <div className="productPage__recommended">
            <div className="productPage__sliderTop">
              <h2>You may also like</h2>

              <div className="productPage__sliderControls">
                <button
                  onClick={() => setSliderIndex(prev => Math.max(prev - 1, 0))}
                  disabled={sliderIndex === 0}
                >
                  {'<'}
                </button>

                <button
                  onClick={() =>
                    setSliderIndex(prev => Math.min(prev + 1, maxIndex))
                  }
                  disabled={sliderIndex === maxIndex}
                >
                  {'>'}
                </button>
              </div>
            </div>

            <div className="productPage__slider">
              {recommendedBase
                .slice(sliderIndex, sliderIndex + visibleCount)
                .map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    isDiscounted={p.fullPrice > p.price}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
