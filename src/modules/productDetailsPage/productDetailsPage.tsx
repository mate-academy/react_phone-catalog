import './productDetailsPage.scss';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { FavoriteButton } from '../../components/favoriteButton/favoriteButton';
import homeLogo from '../../images/catalog/home-logo.png';
import sliderRight from '../../images/catalog/slider-right.png';
import leftSlider from '../../images/arrow-left.png';
import { mapToProductListItem } from '../../function/mapToProductListItem';
import { ProductListItem } from '../../types/product';
import { ProductsSlider } from '../../components/productsSlider';
import { CartButton } from '../../components/cartButton';
import { Loader } from '../../components/loader/loader';

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const alsoLike = 'You may also like';
  const navigate = useNavigate();
  const allProducts = useMemo(
    () =>
      [...phones, ...tablets, ...accessories].map(product => ({
        ...product,
        cell: Array.isArray(product.cell) ? product.cell : [product.cell],
      })),
    [],
  );

  const alsoProducts: ProductListItem[] = useMemo(
    () => [
      ...phones.map((p, i) =>
        mapToProductListItem({ ...p, category: 'phones' }, i),
      ),
      ...tablets.map((p, i) =>
        mapToProductListItem({ ...p, category: 'tablets' }, i + phones.length),
      ),
      ...accessories.map((p, i) =>
        mapToProductListItem(
          { ...p, category: 'accessories' },
          i + phones.length + tablets.length,
        ),
      ),
    ],
    [],
  );

  const [isLoading, setIsLoading] = useState(true);

  const product = useMemo(() => {
    return allProducts.find(p => p.id === id);
  }, [allProducts, id]);

  const [selectedImage, setSelectedImage] = useState(
    product ? product.images[0] : '',
  );

  const [selectedColor, setSelectedColor] = useState(
    product ? product.color : '',
  );

  const [selectedCapacity, setSelectedCapacity] = useState(
    product ? product.capacity : '',
  );

  const [suggestedProducts, setSuggestedProducts] = useState<ProductListItem[]>(
    [],
  );

  const getSuggestedProducts = (
    products: ProductListItem[],
    count: number = 8,
  ) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, count);
  };

  useEffect(() => {
    setSuggestedProducts(getSuggestedProducts(alsoProducts, 10));
  }, [alsoProducts]);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedColor(product.color);
      setSelectedCapacity(product.capacity);
    }
  }, [id, product]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <h2>Product was not found</h2>;
  }

  const handleColorChange = (newColor: string) => {
    if (newColor === selectedColor) {
      return;
    }

    const newProduct = allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.capacity === product.capacity &&
        p.color === newColor,
    );

    if (newProduct) {
      navigate(`/product/${newProduct.id}`);
    }
  };

  const handleCapacityChange = (newCapacity: string) => {
    if (newCapacity === selectedCapacity) {
      return;
    }

    const newProduct = allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === selectedColor &&
        p.capacity === newCapacity,
    );

    if (newProduct) {
      navigate(`/product/${newProduct.id}`);
    }
  };

  const getHexColor = (colorName: string) => {
    const colorMap: Record<string, string> = {
      black: '#000000',
      green: '#00FF00',
      yellow: '#FFFF00',
      white: '#FFFFFF',
      purple: '#800080',
      red: '#FF0000',
      blue: '#0000FF',
      orange: '#FFA500',
      pink: '#FFC0CB',
      gray: '#808080',
      silver: '#C0C0C0',
      gold: '#FFD700',
      graphite: '#383838',
      sierrablue: '#607B9C',
      spacegray: '#595959',
      midnightgreen: '#004953',
      rosegold: '#B76E79',
      coral: '#FF6F61',
      spaceblack: '#161617',
      midnight: '#191970',
    };

    return colorMap[colorName.toLowerCase()] || '#000000';
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="cardHeader">
        <div className="cardHeader__top">
          <NavLink to="/" className="cardHeader__top--home">
            <img
              src={homeLogo}
              alt="Logo Home"
              className="cardHeader__top--logoHome"
            />
          </NavLink>
          <img
            src={sliderRight}
            alt="Seta"
            className="cardHeader__top--sliderRight"
          />
          <NavLink
            to={`/${product.category}`}
            className="cardHeader__top--category"
          >
            <p className="cardHeader__top--category cardHeader__top--font">
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </p>
          </NavLink>
          <img
            src={sliderRight}
            alt="Seta"
            className="cardHeader__top--sliderRight"
          />
          <p className="cardHeader__top--name cardHeader__top--font">
            {product.name}
          </p>
        </div>
        <div className="cardHeader__back">
          <img
            src={leftSlider}
            alt="Logo Home"
            className="cardHeader__back--leftSlider"
          />
          <span
            onClick={handleBack}
            style={{ cursor: 'pointer' }}
            className="cardHeader__back--name"
          >
            Back
          </span>
        </div>
        <div className="cardHeader__title">
          <h1 className="h2">{product.name}</h1>
        </div>
      </div>
      <div className="cardImg">
        <div className="cardImg__box">
          <img
            src={`../public/${selectedImage}`}
            alt="ProductImage"
            className="cardImg__box--img"
          />
        </div>
      </div>
      <div className="cardPhotos">
        {product.images.map((image, index) => (
          <div
            className={`cardPhotos__box ${selectedImage === image ? 'active' : ''}`}
            onClick={() => setSelectedImage(image)}
            key={index}
          >
            <img
              src={`../public/${image}`}
              alt={`Product image ${index + 1}`}
              className="cardPhotos__box--img"
            />
          </div>
        ))}
      </div>
      <div className="cardOptions">
        <div className="cardOptions__color">
          <p>Avaliable colors</p>
          <p>ID:</p>
        </div>
        <div className="cardOptions__palette">
          {product.colorsAvailable.map(color => {
            const hex = getHexColor(color);

            return (
              <div
                key={color}
                className="cardOptions__palette--box"
                style={{ backgroundColor: hex }}
                title={color}
                onClick={() => handleColorChange(color)}
              ></div>
            );
          })}
        </div>
        <div className="cardOptions__line"></div>
        <div className="cardOptions__capacity">
          <p>Select capacity</p>
          <div className="cardOptions__capacity--box">
            {product.capacityAvailable.map(capacity => (
              <div
                key={capacity}
                className={`cardOptions__capacity--label ${selectedCapacity === capacity ? 'active' : ''}`}
                title={capacity}
                onClick={() => handleCapacityChange(capacity)}
              >
                {capacity}
              </div>
            ))}
          </div>
        </div>
        <div className="cardOptions__line"></div>
        <div className="cardOptions__prices">
          <p className="cardOptions__prices--discount h2">
            ${product.priceDiscount}
          </p>
          <p className="cardOptions__prices--regular">
            ${product.priceRegular}
          </p>
        </div>
        <div className="cardOptions__buttons">
          <CartButton itemId={product.id} size={48} />
          <FavoriteButton itemId={product.id} size={48} />
        </div>
        <div className="cardOptions__details">
          <p className="cardOptions__details--title">Screen</p>
          <p className="cardOptions__details--info">{product.screen}</p>
        </div>
        <div className="cardOptions__details">
          <p className="cardOptions__details--title">Resolution</p>
          <p className="cardOptions__details--info">{product.resolution}</p>
        </div>
        <div className="cardOptions__details">
          <p className="cardOptions__details--title">Processor</p>
          <p className="cardOptions__details--info">{product.processor}</p>
        </div>
        <div className="cardOptions__details">
          <p className="cardOptions__details--title">RAM</p>
          <p className="cardOptions__details--info">{product.ram}</p>
        </div>
      </div>
      <div className="cardAbout">
        <p className="cardAbout__title h3">About</p>
        <div className="cardOptions__line"></div>
        {product.description.map(description => (
          <div className="cardAbout__box" key={description.title}>
            <p className="cardAbout__box--infoTitle h4">{description.title}</p>
            <p className="cardAbout__box--infoDetails bodyText">
              {description.text}
            </p>
          </div>
        ))}
      </div>
      <div className="cardTech">
        <p className="cardTech__title h3">Tech specs</p>
        <div className="cardOptions__line"></div>
        <div className="cardTech__info">
          <div className="cardTech__info--box">
            <p className="cardTech__info--box--title">Screen</p>
            <p className="cardTech__info--box--info">{product.screen}</p>
          </div>
          <div className="cardTech__info--box">
            <p className="cardTech__info--box--title">Resolution</p>
            <p className="cardTech__info--box--info">{product.resolution}</p>
          </div>
          <div className="cardTech__info--box">
            <p className="cardTech__info--box--title">Processor</p>
            <p className="cardTech__info--box--info">{product.processor}</p>
          </div>
          <div className="cardTech__info--box">
            <p className="cardTech__info--box--title">RAM</p>
            <p className="cardTech__info--box--info">{product.ram}</p>
          </div>
          <div className="cardTech__info--box">
            <p className="cardTech__info--box--title">Built in memory</p>
            <p className="cardTech__info--box--info">{product.capacity}</p>
          </div>
          <div className="cardTech__info--box">
            <p className="cardTech__info--box--title">Camera</p>
            <p className="cardTech__info--box--info">
              {String(
                'camera' in product && product.camera ? product.camera : 'N/A',
              )}
            </p>
          </div>
          <div className="cardTech__info--box">
            <p className="cardTech__info--box--title">Zoom</p>
            <p className="cardTech__info--box--info">
              {String('zoom' in product && product.zoom ? product.zoom : 'N/A')}
            </p>
          </div>
          <div className="cardTech__info--box">
            <p className="cardTech__info--box--title">Cell</p>
            <div className="cardTech__info--box--cell">
              <span className="cardTech__info--box--info">
                {product.cell.map(cell => cell).join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>
      <ProductsSlider products={suggestedProducts} title={alsoLike} />
      <div className="cardEnd"></div>
    </div>
  );
};
