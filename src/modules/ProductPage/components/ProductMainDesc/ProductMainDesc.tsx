import { FC, useEffect, useState } from 'react';
import styles from './ProductMainDesc.module.scss';
import { Link } from 'react-router-dom';
import { ProductFullInfo } from '../../../../types/ProductFullInfo';
import phones from '../../../../../public/api/phones.json';
import tablets from '../../../../../public/api/tablets.json';
import accessories from '../../../../../public/api/accessories.json';
import { Favorite } from '../../../shared/components/Favorite';
import { AddToCart } from '../../../shared/components/AddToCart';

type Props = {
  images: string[];
  colorsAvailable: string[];
  capacityAvailable: string[];
  currentPrice: number;
  fullPrice: number;
  descScreen: string;
  descCapacity: string;
  descRAM: string;

  currentProduct: ProductFullInfo;
};

export const ProductMainDesc: FC<Props> = ({
  images,
  colorsAvailable,
  capacityAvailable,
  currentPrice,
  fullPrice,
  descScreen,
  descCapacity,
  descRAM,

  currentProduct,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    currentProduct.color,
  );
  const [selectedCapacity, setSelectedCapacity] = useState<string>(
    currentProduct.capacity,
  );

  const [selectedImage, setSelectedImage] = useState<string>(
    currentProduct.images[0],
  );

  const handleChangedProduct = (color: string, capacity: string) => {
    const phone = phones.find(product => {
      return (
        product.namespaceId === currentProduct.namespaceId &&
        product.capacity === capacity &&
        product.color === color
      );
    });

    if (phone) {
      return phone.id;
    }

    const tablet = tablets.find(product => {
      return (
        product.namespaceId === currentProduct.namespaceId &&
        product.capacity === capacity &&
        product.color === color
      );
    });

    if (tablet) {
      return tablet.id;
    }

    const accessory = accessories.find(product => {
      return (
        product.namespaceId === currentProduct.namespaceId &&
        product.capacity === capacity &&
        product.color === color
      );
    });

    if (accessory) {
      return accessory.id;
    }

    return null;
  };

  useEffect(() => {
    setSelectedImage(currentProduct.images[0]);
    setSelectedColor(currentProduct.color);
    setSelectedCapacity(currentProduct.capacity);
  }, [currentProduct]);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const currentIndex = images.indexOf(selectedImage);

  const showNextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;

    setSelectedImage(images[nextIndex]);
  };

  const showPrevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    setSelectedImage(images[prevIndex]);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) {
      return;
    }

    const distance = touchStartX - touchEndX;

    if (distance > 50) {
      showNextImage();
    }

    if (distance < -50) {
      showPrevImage();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div className={styles.content}>
      <div className={styles.gallery}>
        <div className={styles.thumbnails}>
          {images.map(img => (
            <div
              key={img}
              className={`${styles.img} ${img === selectedImage ? styles.active : ''}`}
            >
              <img
                src={img}
                onClick={() => {
                  setSelectedImage(img);
                }}
              />
            </div>
          ))}
        </div>
        <div
          className={styles.main__image}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img src={selectedImage} />
        </div>
      </div>

      <div className={styles.main__desc}>
        <div className={styles.options}>
          <div className={styles.wrapper}>
            <h4 className={styles.label}>Available colors</h4>
            <div className={styles.colors}>
              {colorsAvailable.map((color, index) => (
                <Link
                  to={`/product/${handleChangedProduct(color, selectedCapacity)}`}
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`${styles.color__frame} ${
                    color === selectedColor ? styles.active__frame : ''
                  }`}
                >
                  <div
                    className={styles.color}
                    style={{ backgroundColor: `${color}` }}
                  ></div>
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.wrapper}>
            <h4 className={styles.label}>Select capacity</h4>
            <div className={styles.capacities}>
              {capacityAvailable.map((capacity, index) => (
                <Link
                  to={`/product/${handleChangedProduct(selectedColor, capacity)}`}
                  onClick={() => setSelectedCapacity(capacity)}
                  key={index}
                  className={`${styles.capacity__frame} ${
                    capacity === selectedCapacity ? styles.active__frame : ''
                  }`}
                >
                  <div className={styles.capacity}>{capacity}</div>
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.prices}>
          <p className={styles.card__price}>${currentPrice}</p>
          <p className={styles.card__oldPrice}>${fullPrice}</p>
        </div>

        <div className={styles.card__actions}>
          <div className={styles.addToCart}>
            <AddToCart productId={currentProduct.id} />
          </div>
          <Favorite productId={currentProduct.id} />
        </div>

        <div className={styles.card__desc}>
          <div className={styles.desc}>
            <h6 className={styles.desc__name}>Screen</h6>
            <p className={styles.desc__text}>{descScreen}</p>
          </div>
          <div className={styles.desc}>
            <h6 className={styles.desc__name}>Capacity</h6>
            <p className={styles.desc__text}>{descCapacity}</p>
          </div>
          <div className={styles.desc}>
            <h6 className={styles.desc__name}>RAM</h6>
            <p className={styles.desc__text}>{descRAM}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
