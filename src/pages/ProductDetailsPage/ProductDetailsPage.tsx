import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader/Loader';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { useCart } from '../../context/CartContext'; // <--- Import koszyka
import { useFav } from '../../context/FavContext'; // <--- Import ulubionych
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Stan do galerii zdjęć
  const [selectedImage, setSelectedImage] = useState<string>('');

  const { productId } = useParams();
  const navigate = useNavigate();

  // Hooki z Contextu
  const { addToCart, cartItems } = useCart();
  const { addToFav, removeFromFav, favItems } = useFav();

  useEffect(() => {
    setIsLoading(true);

    fetch('/api/products.json')
      .then(res => res.json())
      .then((products: Product[]) => {
        // Szukamy po itemId (np. "apple-iphone-11")
        const found = products.find(p => p.itemId === productId);

        if (found) {
          setProduct(found);
          setSelectedImage(found.image); // Ustawiamy główne zdjęcie na start

          // Losowanie polecanych
          const others = products
            .filter(p => p.itemId !== found.itemId)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);

          setSuggestedProducts(others);
        } else {
          // Opcjonalnie: navigate('/page-not-found');
        }
      })
      .finally(() => setIsLoading(false));

    window.scrollTo(0, 0);
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <div className="container">Product not found</div>;
  }

  // Sprawdzamy czy produkt jest w koszyku/ulubionych
  const isAdded = cartItems.some(item => item.id === product.id);
  const isFav = favItems.some(item => item.id === product.id);

  // Obsługa kliknięcia w serce
  const handleFavClick = () => {
    if (isFav) {
      removeFromFav(product.id);
    } else {
      addToFav(product);
    }
  };

  // Zbudujmy tablicę zdjęć (jeśli API nie zwraca tablicy, używamy tylko głównego)
  // UWAGA: Sprawdź w types/Product.ts czy masz pole 'images'.
  // Jeśli nie, na razie użyjemy tricku z jednym zdjęciem, ale profesjonalnie powinna być tablica.
  const images = [product.image];
  // Jeśli masz w JSON pole 'images': const images = product.images || [product.image];

  return (
    <div className={`container ${styles.container}`}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        {'<'} Back
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.grid}>
        {/* LEWA KOLUMNA: Galeria */}
        <div className={styles.galleryContainer}>
          {/* Miniaturki (na razie jedna, ale gotowe pod więcej) */}
          <div className={styles.thumbnails}>
            {images.map((img, index) => (
              <div
                key={index}
                className={cn(styles.thumbnailBox, {
                  [styles.active]: selectedImage === img,
                })}
                onClick={() => setSelectedImage(img)}
              >
                <img src={`/${img}`} alt="Thumbnail" />
              </div>
            ))}
          </div>

          {/* Duże zdjęcie */}
          <div className={styles.mainImage}>
            <img src={`/${selectedImage}`} alt={product.name} />
          </div>
        </div>

        {/* PRAWA KOLUMNA: Szczegóły */}
        <div className={styles.detailsWrapper}>
          <div className={styles.headerRow}>
            <span className={styles.price}>${product.price}</span>
            {product.fullPrice !== product.price && (
              <span className={styles.fullPrice}>${product.fullPrice}</span>
            )}
          </div>

          <div className={styles.actions}>
            {/* Przycisk Koszyka */}
            <button
              className={cn(styles.addToCart, { [styles.added]: isAdded })}
              onClick={() => addToCart(product)}
            >
              {isAdded ? 'Added to cart' : 'Add to cart'}
            </button>

            {/* Przycisk Ulubionych */}
            <button
              className={cn(styles.favoriteBtn, { [styles.isFav]: isFav })}
              onClick={handleFavClick}
            >
              {isFav ? '❤️' : '♡'}
            </button>
          </div>

          <div className={styles.specs}>
            <div>
              <span>Screen</span> <span>{product.screen}</span>
            </div>
            <div>
              <span>Resolution</span> <span>{product.resolution}</span>
            </div>
            <div>
              <span>Processor</span> <span>{product.processor}</span>
            </div>
            <div>
              <span>RAM</span> <span>{product.ram}</span>
            </div>
            <div>
              <span>Camera</span> <span>{product.camera}</span>
            </div>
            <div>
              <span>Zoom</span> <span>{product.zoom}</span>
            </div>
            {/* Jeśli masz pole 'cell' w typach */}
            {product.cell && (
              <div>
                <span>Cell</span> <span>{product.cell.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.recommended}>
        <h3>You may also like</h3>
        <ProductsList products={suggestedProducts} />
      </div>
    </div>
  );
};
