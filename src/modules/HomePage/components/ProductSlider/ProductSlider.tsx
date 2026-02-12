import React, { useState, useEffect } from 'react';
import { Product } from '../../../../types/ProductTypes/Product';
import AddToCartButton from '../AddToCart/AddToCart';
import styles from './ProductSlider.module.scss';
import { Link } from 'react-router-dom';
import AddToFavoritesButton from '../AddToFavorite/AddToFavorite';

// Interface estendida para incluir especificações que aparecem na imagem
interface ProductWithSpecs extends Product {}

const ProductsSlider: React.FC = () => {
  const [products, setProducts] = useState<ProductWithSpecs[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 4; // Ajustado para 4 conforme a imagem

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then((data: Product[]) => {
        // Ordena pelo preço decrescente
        const sorted = data.sort(
          (a, b) => (b.fullPrice || 0) - (a.fullPrice || 0),
        );
        // Limita a 8 produtos para ter 2 slides completos
        const top8 = sorted.slice(0, 8);

        // Mock de especificações para demonstração (em produção, viriam da API)
        const productsWithSpecs: ProductWithSpecs[] = top8.map(product => ({
          ...product,
          screen: product.screen || '6.1" OLED',
          capacity: product.capacity || '128 GB',
          ram: product.ram || '6 GB',
        }));

        setProducts(productsWithSpecs);
      })
      .catch(() => {
        return -1;
      });
  }, []);

  const prev = () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setCurrentIndex(prev =>
      prev - itemsPerSlide >= 0
        ? prev - itemsPerSlide
        : Math.max(products.length - itemsPerSlide, 0),
    );
  };

  const next = () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setCurrentIndex(prev =>
      prev + itemsPerSlide < products.length ? prev + itemsPerSlide : 0,
    );
  };

  if (products.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <p>Carregando produtos...</p>
      </div>
    );
  }

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + itemsPerSlide,
  );

  return (
    <section className={styles.productSliderSection}>
      <div className={styles.hotPricesHeader}>
        <h2 className={styles.hotPricesTitle}>Hot prices</h2>
      </div>

      <div className={styles.hotPricesContainer}>
        <button
          className={styles.sliderButton}
          onClick={prev}
          aria-label="Produtos anteriores"
        >
          <span>‹</span>
        </button>

        <div className={styles.productsWrapper}>
          {visibleProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageContainer}>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                  />
                )}
              </div>

              <div className={styles.productInfo}>
                <Link
                  to={`/product/${product.itemId}`}
                  className={styles.productName}
                >
                  <h3>{product.name}</h3>
                </Link>

                <div className={styles.priceContainer}>
                  <span className={styles.currentPrice}>
                    ${product.fullPrice}
                  </span>
                  {product.discount && product.discount > 0 && (
                    <span className={styles.oldPrice}>
                      ${(product.fullPrice + product.discount).toFixed(0)}
                    </span>
                  )}
                </div>

                {/* Especificações do produto */}
                <div className={styles.productSpecs}>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Screen</span>
                    <span className={styles.specValue}>{product.screen}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Capacity</span>
                    <span className={styles.specValue}>{product.capacity}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>RAM</span>
                    <span className={styles.specValue}>{product.ram}</span>
                  </div>
                </div>

                {/* Ações do produto */}
                <div className={styles.productActions}>
                  <AddToCartButton product={product} />
                  <AddToFavoritesButton productId={product.itemId} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão avançar */}
        <button
          className={styles.sliderButton}
          onClick={next}
          aria-label="Próximos produtos"
        >
          <span>›</span>
        </button>
      </div>
    </section>
  );
};

export default ProductsSlider;
