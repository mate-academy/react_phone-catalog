import { motion, Variants } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Breadcrumbs from '../../../components/Breadcrumbs';
import Loader from '../../../components/Loader';
import ProductCarousel from '../../../components/ProductCarousel';
import { useCart } from '../../../context/CartContext';
import { useFavorites } from '../../../context/FavoritesContext';
import { Accessory } from '../../../types/Accessory';
import { Phone } from '../../../types/Phone';
import { Product } from '../../../types/Product';
import { Tablet } from '../../../types/Tablet';
import { fetchAccessories } from '../../../utils/accessories';
import { colorMap } from '../../../utils/colorMap';
import { fetchPhones } from '../../../utils/phones';
import { fetchProducts } from '../../../utils/products';
import { fetchTablets } from '../../../utils/tablets';
import './ProductDetails.scss';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any, delay },
  }),
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any, delay },
  }),
};

const ProductDetails = () => {
  const { category, itemId } = useParams();
  const [product, setProduct] = useState<Phone | Tablet | Accessory | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [activeImg, setActiveImg] = useState('');

  useEffect(() => {
    if (product?.images?.length) {
      setActiveImg(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        let data: any[] = [];

        switch (category) {
          case 'phones':
            data = await fetchPhones();
            break;
          case 'tablets':
            data = await fetchTablets();
            break;
          case 'accessories':
            data = await fetchAccessories();
            break;
          default:
            throw new Error('Unknown category');
        }

        const found = data.find(p => p.id === itemId);
        if (!found) {
          throw new Error('Product Not Found');
        }

        setProduct(found);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [category, itemId]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const handleColorChange = (color: string) => {
    const currentPath = location.pathname;

    const newPath = currentPath.replace(/-(\w+)$/, `-${color.toLowerCase()}`);

    navigate(newPath);
  };

  const handleCapacityChange = (capacity: string) => {
    const currentPath = location.pathname;

    const newPath = currentPath.replace(/-(\d+(gb|tb|mm))-/, `-${capacity.toLowerCase()}-`);
    navigate(newPath);
  };

  const { toggleFavorite } = useFavorites();
  const { toggleCart } = useCart();
  const handleProductAction = async (
    itemId: string | undefined,
    action: (product: Product) => void,
  ) => {
    if (!itemId) return;

    try {
      const allProducts: Product[] = await fetchProducts();
      const product = allProducts.find(p => p.itemId === itemId);

      if (product) {
        action(product);
      } else {
        console.error('Product not found in API');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="product-details">
      <motion.div
        className="product-details__breadcrumbs"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={0}
      >
        <Breadcrumbs />
      </motion.div>

      <div className="product-details__main">
        <motion.div
          className="product-details__left"
          variants={slideIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0.05}
        >
          <h1 className="product-details__left--name">{product?.name}</h1>
          {/*  Product Images */}
          <div className="product-details__left--galary">
            <motion.div
              className="product-details__left--galary-list"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {product?.images.map((img, index) => (
                <motion.img
                  className={`product-details__left--galary-img ${
                    img === activeImg ? 'active' : ''
                  }`}
                  key={index}
                  src={`${img}`}
                  alt={`${product?.name} ${index + 1}`}
                  onClick={() => setActiveImg(img)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  variants={fadeUp}
                  custom={index * 0.03}
                />
              ))}
            </motion.div>

            <motion.div
              className="product-details__left--galary-main"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0.1}
            >
              <img
                className="product-details__left--galary-active"
                src={`${activeImg}`}
                alt={`${product?.name}`}
              />
            </motion.div>
          </div>
          {/* End Product Images */}
        </motion.div>

        <motion.div
          className="product-details__right"
          variants={slideIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0.1}
        >
          <div className="product-details__right--colors">
            <h2>Available colors</h2>
            <div className="product-details__right--colors-wrapper">
              {product?.colorsAvailable.map((i, index) => {
                const colorValue = colorMap[i.toLowerCase()] || i;
                const isActive = product.color?.toLowerCase() === i.toLowerCase();

                return (
                  <motion.span
                    onClick={() => handleColorChange(i)}
                    className={isActive ? 'active' : ''}
                    style={{ backgroundColor: colorValue }}
                    key={index}
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                );
              })}
            </div>
          </div>

          <div className="product-details__right--capacity">
            <h2>Select capacity</h2>
            <div className="product-details__right--capacity-info">
              {product?.capacityAvailable.map((i, index) => {
                const isActive = product.capacity?.toLowerCase() === i.toLowerCase();

                return (
                  <motion.span
                    onClick={() => handleCapacityChange(i)}
                    className={isActive ? 'active' : ''}
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                  >
                    {i}
                  </motion.span>
                );
              })}
            </div>
          </div>

          <div className="product-details__right--buy">
            <h2 className="product-details__right--buy-price">
              {product?.priceDiscount && product?.priceRegular ? (
                <>
                  {product.priceDiscount}$ <del>{product.priceRegular}$</del>
                </>
              ) : (
                <>{product?.priceDiscount || product?.priceRegular}$</>
              )}
            </h2>

            <div className="product-details__right--buy-btn">
              <motion.button
                className="product-details__right--buy-btn__button"
                onClick={() => {
                  handleProductAction(itemId, toggleCart);
                }}
                whileTap={{ scale: 0.97 }}
              >
                Add to cart
              </motion.button>
              <motion.button
                className="product-details__right--buy-btn__button-favorite"
                onClick={() => {
                  handleProductAction(itemId, toggleFavorite);
                }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="img/icons/Favourites.svg" alt="Add to Wishlist" />
              </motion.button>
            </div>

            <div className="product-details__right--buy__tags">
              <span className="product-details__right__tag">
                Screen: <span className="product-details__right__tag-info">{product?.screen}</span>
              </span>
              <span className="product-details__right__tag">
                Resolution:{' '}
                <span className="product-details__right__tag-info">{product?.resolution}</span>
              </span>
              <span className="product-details__right__tag">
                Processor{' '}
                <span className="product-details__right__tag-info">{product?.processor}</span>
              </span>
              <span className="product-details__right__tag">
                RAM <span className="product-details__right__tag-info">{product?.ram}</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="product-details-bottom">
        <motion.div
          className="product-details__description"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          custom={0.05}
        >
          <h2 className="product-details__description__about">About</h2>

          {product?.description.map((i, index) => (
            <React.Fragment key={index + 1}>
              <h3 className="product-details__description__title">{i.title}</h3>
              <p className="product-details__description__text">{i.text}</p>
            </React.Fragment>
          ))}
        </motion.div>

        <motion.div
          className="product-details__tech"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          custom={0.1}
        >
          <h2 className="product-details__tech-title">Tech specs</h2>

          <ul className="product-details__tech-list">
            {product?.screen && (
              <li className="product-details__tech-item">
                <p className="product-details__tech-name">Screen</p>
                <span className="product-details__tech-value">{product.screen}</span>
              </li>
            )}
            {product?.resolution && (
              <li className="product-details__tech-item">
                <p className="product-details__tech-name">Resolution</p>
                <span className="product-details__tech-value">{product.resolution}</span>
              </li>
            )}
            {product?.processor && (
              <li className="product-details__tech-item">
                <p className="product-details__tech-name">Processor</p>
                <span className="product-details__tech-value">{product.processor}</span>
              </li>
            )}
            {product?.ram && (
              <li className="product-details__tech-item">
                <p className="product-details__tech-name">RAM</p>
                <span className="product-details__tech-value">{product.ram}</span>
              </li>
            )}
            {product?.capacity && (
              <li className="product-details__tech-item">
                <p className="product-details__tech-name">Built in memory</p>
                <span className="product-details__tech-value">{product.capacity}</span>
              </li>
            )}
            {product?.camera && (
              <li className="product-details__tech-item">
                <p className="product-details__tech-name">Camera</p>
                <span className="product-details__tech-value">{product.camera}</span>
              </li>
            )}
            {product?.zoom && (
              <li className="product-details__tech-item">
                <p className="product-details__tech-name">Zoom</p>
                <span className="product-details__tech-value">{product.zoom}</span>
              </li>
            )}
            {product?.cell && product.cell.length > 0 && (
              <li className="product-details__tech-item">
                <p className="product-details__tech-name">Cell</p>
                <div className="product-details__tech-value">
                  {product.cell.map((i, index) => (
                    <span key={i} className="product-details__tech-cell">
                      {i}
                      {index === product.cell.length - 1 ? '.' : ', '}
                    </span>
                  ))}
                </div>
              </li>
            )}
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="product-details-carousel"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        custom={0.08}
      >
        <ProductCarousel title="You may also like" showDiscount={true} isRandom={true} />
      </motion.div>
    </div>
  );
};

export default ProductDetails;
