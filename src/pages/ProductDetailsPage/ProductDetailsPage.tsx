/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/indent */

import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Phone, Tablet, Accessories } from '../../Interface';
import { useCart } from '../../Functional/CartContext/CartContext';
import './ProductDetailsPage.scss';
import { YourComponent } from './YourComponent';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const { addToCart, toggleFavorite, cart, favorites } = useCart();

  const [product, setProduct] = useState<Phone | Tablet | Accessories | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<(Phone | Tablet | Accessories)[]>([]);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);

  const isPhoneOrTablet = (
    item: Phone | Tablet | Accessories,
  ): item is Phone | Tablet => {
    return 'capacityAvailable' in item && !!item.capacityAvailable;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      const urls = [
        './api/phones.json',
        './api/tablets.json',
        './api/accessories.json',
      ];

      const allData: (Phone | Tablet | Accessories)[] = [];

      try {
        for (const url of urls) {
          const res = await fetch(`${import.meta.env.BASE_URL}${url}`);

          if (!res.ok) {
            throw new Error(`Failed to fetch ${url}`);
          }

          const data = await res.json();

          allData.push(...data);
        }

        setAllProducts(allData);

        console.log(productId);
        console.log(allData);

        const found = allData.find(item => item.id === productId);

        if (found) {
          const params = new URLSearchParams(search);

          const urlColor =
            params.get('color')?.replace('-', ' ') || found.color;

          const urlCapacity =
            params.get('capacity') ||
            (isPhoneOrTablet(found)
              ? found.capacityAvailable[0]
              : null);

          const newProduct =
            allData.find(
              p =>
                p.id === productId &&
                p.color === urlColor &&
                ('capacity' in p
                  ? p.capacity === urlCapacity
                  : true),
            ) || found;

          setProduct(newProduct);

          setSelectedColor(urlColor);

          setSelectedImage(
            newProduct.images?.[0] || 'img/page-not-found.png',
          );

          setSelectedCapacity(urlCapacity);

          const newParams = new URLSearchParams();

          newParams.set(
            'color',
            urlColor.toLowerCase().replace(' ', '-'),
          );

          if (isPhoneOrTablet(newProduct) && urlCapacity) {
            newParams.set('capacity', urlCapacity);
          }

          const newUrl = `${pathname}?${newParams.toString()}`;

          if (newUrl !== `${pathname}${search}`) {
            navigate(newUrl, { replace: true });
          }
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
  }, [productId]);

  const handleColorChange = (color: string) => {
    if (!product) return;

    const newProduct = allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === color &&
        ('capacity' in p
          ? p.capacity === selectedCapacity
          : true),
    );

    if (newProduct) {
      setProduct(newProduct);
      setSelectedColor(color);

      setSelectedImage(
        newProduct.images?.[0] || 'img/page-not-found.png',
      );

      navigate(`/products/${newProduct.id}`);
    }
  };

  const handleMemoryChange = (capacity: string) => {
    if (!product) return;

    const newProduct = allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === selectedColor &&
        ('capacity' in p
          ? p.capacity === capacity
          : true),
    );

    if (newProduct) {
      setSelectedCapacity(capacity);
      setProduct(newProduct);

      setSelectedImage(
        newProduct.images?.[0] || 'img/page-not-found.png',
      );

      navigate(`/products/${newProduct.id}`);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
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

    toggleFavorite(product.id);
  };

  const handleImageError = (imageSrc: string) => {
    setImageError(prev => ({
      ...prev,
      [imageSrc]: true,
    }));
  };

  const isInCart = cart.some(
    item =>
      item.id === product?.id &&
      item.color === selectedColor &&
      item.capacity === selectedCapacity,
  );

  const getCategoryLink = () => {
    if (!product) {
      return '#/phones';
    }

    if (product.category === 'phones') {
      return '#/phones';
    }

    if (product.category === 'tablets') {
      return '#/tablets';
    }

    return '#/accessories';
  };

  const relatedProducts = allProducts.filter(
    item =>
      item.category === product?.category &&
      item.id !== product?.id,
  );

  if (isLoading) {
    return (
      <div className="product-details">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details">
        Product not found
      </div>
    );
  }

  return (
    <section className="product-details section">
      <div className="home--nav">
        <a href="#">
          <img
            src="./icons/home.svg"
            alt="home_nav"
            className="home--nav-icon"
          />
        </a>

        <img
          src="./icons/arrow-right.svg"
          alt="arrow-right"
          className="home--nav-arrow"
        />

        <a href={getCategoryLink()}>
          <YourComponent product={product} />
        </a>

        <img
          src="./icons/arrow-right.svg"
          alt="arrow-right"
          className="home--nav-arrow"
        />

        <span className="product-details__id">
          {product.name}
        </span>
      </div>

      {/* дальше твой JSX без изменений */}
    </section>
  );
};