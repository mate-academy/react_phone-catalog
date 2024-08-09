import cn from 'classnames';
import { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import { GoHome } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setDetailProduct } from '../../../redux/slices/detailProductSlice';
import { ProductActions } from '../../components/ProductActions';
import { Section } from '../../components/Section';
import styles from './detail.module.scss';

export default function Detail() {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detailProduct = useSelector(state => state.detailProduct.detailProduct);
  const detailPhones = useSelector(state => state.detailProduct.detailPhones);
  const detailTablets = useSelector(state => state.detailProduct.detailTablets);
  const favorites = useSelector(state => state.favorites.favorites);
  const products = useSelector(state => state.products.products);
  const detailAccessories = useSelector(
    state => state.detailProduct.detailAccessories,
  );

  const [selectedColor, setSelectedColor] = useState(detailProduct?.color);
  const [selectedRam, setSelectedRam] = useState(detailProduct?.capacity);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setSelectedColor(detailProduct?.color);
    setSelectedRam(detailProduct?.capacity);
  }, [detailProduct]);

  if (!detailProduct) {
    return <div>Product not found</div>;
  }

  const findProduct = (color, ram) => {
    let products = [];
    switch (detailProduct.category) {
      case 'phones':
        products = detailPhones;
        break;
      case 'tablets':
        products = detailTablets;
        break;
      case 'accessories':
        products = detailAccessories;
        break;
      default:
        break;
    }
    return products.find(
      product =>
        product.namespaceId === detailProduct.namespaceId &&
        product.color === color &&
        product.capacity === ram,
    );
  };

  const handleColorSelect = color => {
    const product = findProduct(color, selectedRam);
    if (product) {
      setSelectedColor(color);
      setSelectedImageIndex(0);
      dispatch(
        setDetailProduct({ id: product.id, category: detailProduct.category }),
      );
      navigate(`/product/${product.id}`);
    }
  };

  const handleRamSelect = ram => {
    const product = findProduct(selectedColor, ram);
    if (product) {
      setSelectedRam(ram);
      dispatch(
        setDetailProduct({ id: product.id, category: detailProduct.category }),
      );
      navigate(`/product/${product.id}`);
    }
  };

  const handleImageSelect = index => {
    setSelectedImageIndex(index);
  };

  const filteredImages = detailProduct.images.filter(image =>
    image.includes(selectedColor),
  );
  const handleMouseMove = e => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setCursorPosition({ x, y });
  };

  const productId =
    products.find(product => product.itemId === detailProduct.id)?.id || null;

  return (
    <div className={styles.root}>
      <div className={styles.crumbs}>
        <GoHome size={22} />
        <FaAngleRight className={styles.crumbs__arrow} size={18} />
        <p className={styles.pageName}>{detailProduct.category}</p>
        <FaAngleRight className={styles.crumbs__arrow} size={18} />
        <p className={styles.pageName}>{detailProduct.name}</p>
      </div>
      <h2>{detailProduct.name}</h2>
      <div className={styles.main}>
        <div className={styles.image}>
          <div className={styles.image__small}>
            {filteredImages.map((image, i) => (
              <img
                key={i}
                src={image}
                alt={detailProduct.name}
                className={cn({
                  [styles.active]: selectedImageIndex === i,
                })}
                onClick={() => handleImageSelect(i)}
              />
            ))}
          </div>

          <div
            className={styles.image__big}
            onMouseMove={handleMouseMove}
            style={{
              '--x': `${cursorPosition.x}%`,
              '--y': `${cursorPosition.y}%`,
            }}
          >
            <img
              src={filteredImages[selectedImageIndex]}
              alt={detailProduct.name}
              style={{
                transformOrigin: `${cursorPosition.x}% ${cursorPosition.y}%`,
              }}
            />
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.colors}>
            <p>Available colors</p>
            <div className={styles.colors__list}>
              {detailProduct.colorsAvailable.map((color, index) => (
                <ul
                  className={cn(styles.circle, {
                    [styles.active]: selectedColor === color,
                  })}
                  key={index}
                >
                  <li
                    className={styles.color}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                  ></li>
                </ul>
              ))}
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.ram}>
            <p>Select capacity</p>
            <div className={styles.ram__list}>
              {detailProduct.capacityAvailable.map((ram, index) => (
                <div
                  key={index}
                  className={cn(styles.rectangle, {
                    [styles.active]: selectedRam === ram,
                  })}
                  onClick={() => handleRamSelect(ram)}
                >
                  {ram}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.price}>
            <div className={styles.price__list}>
              <h2>${detailProduct.priceDiscount}</h2>
              <p>{detailProduct.priceRegular}</p>
            </div>
            <ProductActions productId={productId} />
          </div>
          <div>
            <ul className={styles.about}>
              <li>
                <strong>Screen</strong> <p>{detailProduct.screen}</p>
              </li>
              <li>
                <strong>Capacity</strong> <p>{selectedRam}</p>
              </li>
              <li>
                <strong>Resolution</strong> <p>{detailProduct.resolution}</p>
              </li>
              <li>
                <strong>Processor</strong> <p>{detailProduct.processor}</p>
              </li>
              <li>
                <strong>RAM</strong> <p>{detailProduct.ram}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.space}>
          <h3>About</h3>
          <div className={styles.line}></div>
          <ul className={styles.description}>
            {detailProduct.description.map((item, index) => (
              <li key={index} className={styles.descriptionItem}>
                <h4>{item.title}</h4>
                {item.text.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.tech}>
          <h3>Tech specs</h3>
          <div className={styles.line}></div>
          <ul className={styles.about}>
            <li>
              <strong>Screen</strong> <p>{detailProduct.screen}</p>
            </li>
            <li>
              <strong>Resolution</strong> <p>{detailProduct.resolution}</p>
            </li>
            <li>
              <strong>Processor</strong> <p>{detailProduct.processor}</p>
            </li>
            <li>
              <strong>RAM</strong> <p>{detailProduct.ram}</p>
            </li>
            <li>
              <strong>Built in memory</strong> <p>{detailProduct.capacity}</p>
            </li>
            <li>
              <strong>Camera</strong> <p>{detailProduct.zoom}</p>
            </li>
            <li>
              <strong>Zoom</strong> <p>{detailProduct.camera}</p>
            </li>
            <li>
              <strong>Cell</strong> <p>{detailProduct.cell}</p>
            </li>
          </ul>
        </div>
      </div>
      <Section sort="new" title="You may also like" />
    </div>
  );
}
