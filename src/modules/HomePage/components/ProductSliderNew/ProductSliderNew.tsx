import React, { useState, useEffect } from 'react';
import AddToCartButton from '../AddToCart/AddToCart'; // Mantenha o caminho correto
import { useCart } from '../../../CartPage/CartContext'; // Mantenha o caminho correto
import { Product } from '../../../../types/ProductTypes/Product'; // Mantenha o caminho correto
import { Link } from 'react-router-dom';
// Importa os estilos do módulo SCSS
import styles from './ProductSliderNew.module.scss'; // Caminho para o seu arquivo SCSS
import AddToFavoritesButton from '../AddToFavorite/AddToFavorite';

// Adicionei essas propriedades para os detalhes, se elas existirem no seu Product.
// Se não existirem, os placeholders serão usados.
interface ProductWithDetails extends Product {
  screen?: string;
  capacity?: string;
  ram?: string;
}

const ProductsSliderNew: React.FC = () => {
  const [products, setProducts] = useState<ProductWithDetails[]>([]);
  const { addToCart } = useCart(); // pega a função do contexto

  useEffect(() => {
    fetch('/api/products.json')
      .then((res) => res.json())
      .then((data: ProductWithDetails[]) => {
        // Ajuste para exibir 4 produtos, como na imagem
        const sorted = data.sort((a, b) => b.year - a.year).slice(0, 4);
        setProducts(sorted);
      });
  }, []);

  if (products.length === 0) return <p>Carregando produtos...</p>;

  // A lógica de `prev` e `next` funciona bem para girar os itens no array.
  // Para um slider visual com scroll/transição, uma biblioteca como Swiper ou Slick
  // seria mais indicada, mas para o visual estático da imagem, manteremos essa lógica.
  const prev = () => {
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      // Move o último elemento para o início
      newProducts.unshift(newProducts.pop()!);
      return newProducts;
    });
  };

  const next = () => {
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      // Move o primeiro elemento para o final
      newProducts.push(newProducts.shift()!);
      return newProducts;
    });
  };

  return (
    <div className={styles.productSliderContainer}>
      <div className={styles.sliderHeader}>
        <h2>Brand new models</h2> {/* Título atualizado conforme a imagem */}
        <div className={styles.navigationButtons}>
          <button className={styles.navButton} onClick={prev}>
            {/* Ícone de seta para a esquerda (SVG básico) */}
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1L1 7L7 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={styles.navButton} onClick={next}>
            {/* Ícone de seta para a direita (SVG básico) */}
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 13L7 7L1 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.productCardsWrapper}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            
            <img src={product.image} alt={product.name} className={styles.productImage} />
            <Link to={`/product/${product.itemId}`} className={styles.productName}>
  {product.name}
</Link>


            <p className={styles.productPrice}>${product.price}</p>

            {/* Detalhes do produto (Screen, Capacity, RAM) */}
            <div className={styles.productDetails}>
                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Screen</span>
                    <span className={styles.detailValue}>{product.screen || '6.7" OLED'}</span> {/* Placeholder */}
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Capacity</span>
                    <span className={styles.detailValue}>{product.capacity || '128 GB'}</span> {/* Placeholder */}
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>RAM</span>
                    <span className={styles.detailValue}>{product.ram || '6 GB'}</span> {/* Placeholder */}
                </div>
            </div>

            {/* Contêiner para o botão AddToCart e o botão de Wishlist */}
            <div className={styles.actions}>
              <AddToCartButton product={product} /> {/* Componente AddToCartButton não estilizado aqui */}
              <AddToFavoritesButton productId={product.itemId} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsSliderNew;