import React, { useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { useParams } from 'react-router-dom';

type Product = {
  id: string;
  name: string;
  priceDiscount: number;
  priceRegular: number;
  images: string[];
  colorsAvailable: string[];
  capacityAvailable: string[];
  screen: string;
  resolution: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  processor: string;
  description: {
    title: string;
    text: string[];
  }[];
};

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [phonesRes, tabletsRes, accessoriesRes] = await Promise.all([
          fetch('/api/phones.json'),
          fetch('/api/tablets.json'),
          fetch('/api/accessories.json'),
        ]);

        const [phones, tablets, accessories] = await Promise.all([
          phonesRes.json(),
          tabletsRes.json(),
          accessoriesRes.json(),
        ]);

        const found =
          phones.find((p: { id: string }) => p.id === productId) ||
          tablets.find((p: { id: string }) => p.id === productId) ||
          accessories.find((p: { id: string }) => p.id === productId);

        setProduct(found);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [productId]);

  useEffect(() => {
    if (product) {
      setSelectedImg(product.images[0]);
    }
  }, [product]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!product) {
    return <h1>Product not found</h1>;
  }

  const specs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    { label: 'Cell', value: product.cell.join(', ') },
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.topSection}>
        <img
          className={styles.mainImage}
          src={`/${selectedImg}`}
          alt={product.name}
        />

        <div className={styles.gallery}>
          {product.images.map(img => (
            <img
              key={img}
              className={styles.galleryImage}
              src={`/${img}`}
              alt={product.name}
              onClick={() => setSelectedImg(img)}
            />
          ))}
        </div>
      </div>

      <div className={styles.infoBlock}>
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Available colors</p>

          <div className={styles.colors}>
            {product.colorsAvailable.map(color => (
              <button
                key={color}
                className={`${styles.colorCircle} ${styles[color]}`}
              ></button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>Select capacity</p>

          <div className={styles.capacity}>
            {product.capacityAvailable.map(cap => (
              <button
                key={cap}
                className={`${styles.capacityBtn} ${
                  selectedCapacity === cap ? styles.activeCapacity : ''
                }`}
                onClick={() => setSelectedCapacity(cap)}
              >
                {cap}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.priceBlock}>
          <span className={styles.priceNew}>{product.priceRegular}</span>
          <span className={styles.priceOld}>{product.priceDiscount}</span>
        </div>

        <div className={styles.buttons}>
          <button className={styles.addToCart}>Add to cart</button>
          <button className={styles.favoriteButton}>favorite</button>
        </div>

        <div className={styles.detailsShort}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Screen</span>
            <span className={styles.detailValue}>{product.screen}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Resolution</span>
            <span className={styles.detailValue}>{product.resolution}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Processor</span>
            <span className={styles.detailValue}>{product.processor}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Ram</span>
            <span className={styles.detailValue}>{product.ram}</span>
          </div>
        </div>

        <div className={styles.abutBlock}>
          <h2 className={styles.botomTitle}>About</h2>

          {product.description.map(section => (
            <div key={section.title}>
              <h3 className={styles.aboutSectionTitle}>{section.title}</h3>

              {section.text.map((paragraph, index) => (
                <p key={index} className={styles.aboutText}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.techSpecsBlock}>
          <h2 className={styles.bottomTitle}>Tech specs</h2>

          {specs.map(spec => (
            <div key={spec.label} className={styles.techRow}>
              <span className={styles.techLabel}>{spec.label}</span>
              <span className={styles.techValue}>{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
