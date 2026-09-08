import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductsInfo } from '../../../../shared/types/ProductsInfo';
import { ColorPicker } from '../ColorPicker';
import { DividingLine } from '../../../../components/DividingLine';
import { useProducts } from '../../../../shared/context/ProductsContext';
import { BtnAddToCart } from '../../../../components/ui/BtnAddToCart';
import { BtnAddToFavorite } from '../../../../components/ui/BtnAddToFavorite';
import styles from './ProductConfig.module.scss';

type ProductConfigProps = {
  product: ProductsInfo | null;
  selectCapacity: string;
  setSelectCapacity: (capacity: string) => void;
};

export const ProductConfig: React.FC<ProductConfigProps> = ({
  product,
  selectCapacity,
  setSelectCapacity,
}) => {
  const { products, favorites } = useProducts();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const { id } = useParams();
  const navigate = useNavigate();

  const ProductImages = product.images;
  const isFavorite = favorites.some(item => item.itemId === product.id);
  const card = products.find(item => item.itemId === id);

  const handleCapacitySelect = (capacity: string) => {
    setSelectCapacity(capacity);
    const modelWithoutCapacity = id?.split('-').slice(0, -2).join('-');
    const newId = `${modelWithoutCapacity}-${capacity.toLocaleLowerCase()}-${selectedColor}`;

    navigate(`/${product.category}/${newId}`);
  };

  useEffect(() => {
    setSelectedImage(product.images[0]);
    setSelectedColor(product.color);
    setSelectCapacity(product.capacity);
  }, [product.images, product.color, product.capacity, setSelectCapacity]);

  return (
    <div className={styles.ProductConfig}>
      <div className={styles.ProductConfig__photos}>
        <ul className={styles.photos__list}>
          {ProductImages.map((img, index) => (
            <li
              key={index}
              onClick={() => setSelectedImage(img)}
              className={`${styles.photos__item} ${selectedImage === img ? styles.active : ''}`}
            >
              <img
                src={`/react_phone-catalog/${img}`}
                alt={`Product thumbnail ${index + 1}`}
              />
            </li>
          ))}
        </ul>
        <div className={styles.photos__large}>
          <img src={`/react_phone-catalog/${selectedImage}`} alt="Product" />
        </div>
      </div>
      <div className={styles.ProductConfig__details}>
        <div className={styles.details__colors}>
          <div className={styles.colors__title}>
            <h3>Available colors</h3>
          </div>
          <ColorPicker
            product={product}
            colors={product.colorsAvailable}
            selectedColor={selectedColor}
            onSelect={setSelectedColor}
          />
        </div>
        <DividingLine />
        <div className={styles.details__capacity}>
          <div className={styles.capacity__title}>
            <h3>Capacity</h3>
          </div>
          <div className={styles.capacity__options}>
            {product.capacityAvailable.map((capacity, index) => (
              <div
                key={index}
                className={`${styles.capacity__option} ${selectCapacity === capacity ? styles.capacity__active : ''}`}
                onClick={() => {
                  setSelectCapacity(capacity);
                  handleCapacitySelect(capacity);
                }}
              >
                {capacity}
              </div>
            ))}
          </div>
        </div>
        <DividingLine />
        <div className={styles.details__price}>
          <h3 className={styles.price__title}>{product.priceDiscount}</h3>
          {product.priceDiscount && (
            <span className={styles.price__discount}>
              {product.priceRegular}
            </span>
          )}
        </div>
        <div className={styles.details__buttons}>
          <BtnAddToCart card={card} />
          <BtnAddToFavorite isFavorite={isFavorite} card={card} />
        </div>
        <div className={styles.details__description}>
          <ul className={styles.description__items}>
            <li className={styles.description__item}>
              <span className={styles.item__label}>Screen</span>
              <span className={styles.item__value}>
                {product.screen.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')}
              </span>
            </li>
            <li className={styles.description__item}>
              <span className={styles.item__label}>Resolution</span>
              <span className={styles.item__value}>
                {product.resolution.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')}
              </span>
            </li>
            <li className={styles.description__item}>
              <span className={styles.item__label}>Processor</span>
              <span className={styles.item__value}>
                {product.processor.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')}
              </span>
            </li>
            <li className={styles.description__item}>
              <span className={styles.item__label}>RAM</span>
              <span className={styles.item__value}>
                {product.ram.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')}
              </span>
            </li>
          </ul>
        </div>
        <div
          className={`${styles.configuration__id} ${styles.description__id}`}
        >
          <h3>ID: 802390</h3>
        </div>
      </div>
      <div className={`${styles.configuration__id} ${styles.details__id}`}>
        <h3>ID: 802390</h3>
      </div>
    </div>
  );
};
