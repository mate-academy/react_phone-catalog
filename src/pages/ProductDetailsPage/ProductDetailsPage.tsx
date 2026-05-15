import { useParams, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Phone, Tablet, Accessories } from '../../Interface';
import { useCart } from '../../Functional/CartContext/CartContext';
import './ProductDetailsPage.scss';
import { YourComponent } from './YourComponent';

import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

export const ProductDetailsPage = () => {
  const { productId, category } = useParams();
  const { pathname } = useLocation();

  const { addToCart, toggleFavorite, cart, favorites } = useCart();

  const [product, setProduct] = useState<Phone | Tablet | Accessories | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [allProducts, setAllProducts] = useState<(Phone | Tablet | Accessories)[]>([]);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);

  const isPhoneOrTablet = (item: Phone | Tablet | Accessories): item is Phone | Tablet => {
    return 'capacityAvailable' in item && !!item.capacityAvailable;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      const categoryUrlMap: Record<string, string> = {
        phones: 'api/phones.json',
        tablets: 'api/tablets.json',
        accessories: 'api/accessories.json',
      };

      const urls =
        category && categoryUrlMap[category]
          ? [categoryUrlMap[category]]
          : [
              'api/phones.json',
              'api/tablets.json',
              'api/accessories.json',
            ];

      try {
        const responses = await Promise.all(
          urls.map(url =>
            fetch(`${import.meta.env.BASE_URL}/${url}`)
          ),
        );

        const datasets = await Promise.all(
          responses.map(res => res.json()),
        );

        const allData: (Phone | Tablet | Accessories)[] = datasets.flat();

        setAllProducts(allData);

  
        const found = allData.find(
          item => item.itemId === productId
        );

        if (found) {
          setProduct(found);
          setSelectedColor(found.color);
          setSelectedImage(found.images?.[0] || 'img/page-not-found.png');
          setSelectedCapacity(isPhoneOrTablet(found) ? found.capacity : null);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [productId, category]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.itemId,
      name: product.name,
      price: product.priceDiscount,
      image: selectedImage || 'img/page-not-found.png',
      color: selectedColor || product.color,
      capacity: selectedCapacity || undefined,
      quantity: 1,
    });
  };

  const handleToggleFavorite = () => {
    if (!product) return;
    toggleFavorite(product.itemId);
  };

  const isInCart = cart.some(
    item =>
      item.id === product?.itemId &&
      item.color === selectedColor &&
      item.capacity === selectedCapacity,
  );

  const getCategoryLink = () => {
    if (!product) return '#/phones';

    if (product.category === 'phones') return '#/phones';
    if (product.category === 'tablets') return '#/tablets';
    return '#/accessories';
  };

  const relatedProducts = allProducts.filter(
    item =>
      item.category === product?.category &&
      item.itemId !== product?.itemId,
  );


  const buildVariantLink = (color?: string, capacity?: string | null) => {
    if (!product) return '#';

    const parts = [
      product.category,
      product.itemId,
    ];

    if (color) parts.push(color);
    if (capacity) parts.push(capacity);

    return `/${parts.join('-')}`;
  };

  if (isLoading) return <div className="product-details">Loading...</div>;
  if (!product) return <div className="product-details">Product not found</div>;

  return (
    <section className="product-details section">

      <div className="home--nav">
        <a href="#">
          <img src="./icons/home.svg" alt="home" />
        </a>

        <img src="./icons/arrow-right.svg" alt="arrow" />

        <a href={getCategoryLink()}>
          <YourComponent product={product} />
        </a>

        <img src="./icons/arrow-right.svg" alt="arrow" />

        <span>{product.name}</span>
      </div>

      <h1>{product.name}</h1>


      <div className="color-options">
        {product.colorsAvailable?.map(color => (
          <Link
            key={color}
            to={buildVariantLink(color, selectedCapacity)}
            onClick={() => setSelectedColor(color)}
            className={selectedColor === color ? 'active' : ''}
          >
            <div
              className={`color-circle color-${color
                .toLowerCase()
                .replace(' ', '-')}`}
            />
          </Link>
        ))}
      </div>


      {isPhoneOrTablet(product) && (
        <div className="capacity-options">
          {product.capacityAvailable?.map(cap => (
            <Link
              key={cap}
              to={buildVariantLink(selectedColor || undefined, cap)}
              onClick={() => setSelectedCapacity(cap)}
              className={selectedCapacity === cap ? 'active' : ''}
            >
              {cap}
            </Link>
          ))}
        </div>
      )}

      <button onClick={handleAddToCart}>
        Add to cart
      </button>

      <button onClick={handleToggleFavorite}>
        ❤️
      </button>

      <div className="related-products">
        <h2>You may also like</h2>

        <Swiper modules={[Navigation]} navigation>
          {relatedProducts.map(item => (
            <SwiperSlide key={item.itemId}>
              <Link to={`/${item.category}/${item.itemId}`}>
                <img src={item.images[0]} alt={item.name} />
                <p>{item.name}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};