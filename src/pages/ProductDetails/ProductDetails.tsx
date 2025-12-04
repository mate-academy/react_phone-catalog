//----------------------------------------------------------
// src/pages/ProductDetails/ProductDetails.tsx
//----------------------------------------------------------

// 1. IMPORTS
//----------------------------------------------------------
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ProductDetails.module.css';
import Button from '../../components/Button/Button';
import { Loader } from '../../components/Loader';
import { BrandNewModels } from '../../components/BrandNewModels';
import { useCart } from '../ShoppingCart/cartContext';
import { useFavorites } from '../Favorites/FavoritesContext'; // novo contexto
import { products } from '../../data/products';
import { Product } from '../../types/Product';

//----------------------------------------------------------
// 3. CONSTANTES E UTILIÁRIOS
//----------------------------------------------------------
/**
 * Simula fetch de produto por id (com delay para loader)
 */
const fetchProductById = (id?: string): Promise<Product | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (!id) {
        return resolve(null);
      }

      const found = products.find(p => p.id === id) ?? null;

      resolve(found);
    }, 600);
  });
};

/**
 * Retorna lista de produtos sugeridos (aleatórios)
 */
const getSuggestedProducts = (
  currentId: string | undefined,
  count = 4,
): Product[] => {
  const pool = products.filter(p => p.id !== currentId);

  const shuffled = pool.sort(() => 0.5 - Math.random());

  {
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }
};

//----------------------------------------------------------
// 4. COMPONENTE PRINCIPAL: ESTADOS E EFEITOS
//----------------------------------------------------------
const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productFound = products.find(p => p.id === id);

  // contexto do carrinho e favoritos
  const { addItem, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  // estados locais
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);

  // efeito: busca produto quando id muda
  useEffect(() => {
    let mounted = true;

    setIsLoading(true);

    fetchProductById(id).then(p => {
      if (!mounted) {
        return;
      }

      setProduct(p);
      setIsLoading(false);

      if (p) {
        setSelectedColor(p.colorsAvailable?.[0] ?? null);
        setSelectedCapacity(
          p.capacityAvailable?.[0] ?? p.specs?.capacity ?? null,
        );

        const initialImage =
          p.colorsAvailable &&
          p.images &&
          p.colorsAvailable.length === p.images.length
            ? p.images[p.colorsAvailable.indexOf(p.colorsAvailable[0])]
            : (p.images?.[0] ?? p.imageSrc ?? null);

        setSelectedImage(initialImage);
      }

      setSuggested(getSuggestedProducts(p?.id, 4));
    });

    return () => {
      mounted = false;
    };
  }, [id]);

  //----------------------------------------------------------
  // 5. HANDLERS PARA SELEÇÃO DE COR E CAPACIDADE
  //----------------------------------------------------------
  const handleColorChange = (color: string) => {
    if (!product) {
      return;
    }

    setSelectedColor(color);

    if (
      product.colorsAvailable &&
      product.images &&
      product.colorsAvailable.length === product.images.length
    ) {
      const idx = product.colorsAvailable.indexOf(color);

      if (idx >= 0 && product.images[idx]) {
        setSelectedImage(product.images[idx]);
        {
          return;
        }
      }
    }

    setSelectedImage(product.images?.[0] ?? product.imageSrc ?? null);
  };

  const handleCapacityChange = (cap: string) => {
    setSelectedCapacity(cap);
  };

  //----------------------------------------------------------
  // 6. LÓGICA DE CARRINHO
  //----------------------------------------------------------
  const categoryLink: string = useMemo(() => {
    if (!product?.category) {
      return '/';
    }

    const cat = product.category.toLowerCase();

    if (
      cat.includes('celular') ||
      cat.includes('phone') ||
      cat.includes('phones')
    ) {
      return '/phones';
    }

    if (cat.includes('tablet')) {
      return '/tablets';
    }

    if (cat.includes('acess') || cat.includes('access')) {
      return '/accessories';
    }

    return '/';
  }, [product]);

  const alreadyInCart = product ? isInCart(product.id) : false;

  const handleAddToCart = () => {
    if (!product || alreadyInCart) {
      return;
    }

    const productToAdd = {
      id: product.id,
      title: product.title,
      price: product.price,
      imageSrc: selectedImage ?? product.imageSrc,
      specs: product.specs ?? {},
      color: selectedColor,
      capacity: selectedCapacity,
    };

    addItem(productToAdd);
  };
  //----------------------------------------------------------
  // 7. RENDERIZAÇÃO PRINCIPAL
  //----------------------------------------------------------

  if (!productFound) {
    return (
      <main className={styles.container}>
        <h1 className={styles.title}>Produto não encontrado</h1>
        <p className={styles.text}>
          O produto que você tentou acessar não existe.
        </p>
        <Link to="/" className={styles.backLink}>
          Voltar para a Home
        </Link>
      </main>
    );
  }

  if (isLoading) {
    return <Loader message="Carregando detalhes do produto..." />;
  }

  const safeProduct = product!;
  const specsToShow = ['screen', 'ram', 'capacity', 'battery', 'camera'];

  return (
    <main className={styles.container} data-testid="product-details">
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <Link to="/">Início</Link>
        <span className={styles.sep}>/</span>
        <Link to={categoryLink}>{safeProduct.category ?? 'Categoria'}</Link>
        <span className={styles.sep}>/</span>
        <span aria-current="page">{safeProduct.title}</span>
      </nav>

      {/* Cabeçalho */}
      <div className={styles.header}>
        <h1 className={styles.title} data-testid="product-details-title">
          {safeProduct.title}
        </h1>
      </div>

      {/* Conteúdo principal */}
      <section className={styles.content}>
        {/* Coluna de mídia */}
        <div className={styles.media}>
          <div className={styles.mainImageWrapper}>
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={safeProduct.title}
                className={styles.image}
                data-testid="product-main-image"
              />
            ) : (
              <div
                className={styles.imagePlaceholder}
                data-testid="product-image-placeholder"
              />
            )}
          </div>

          {/* Miniaturas */}
          {safeProduct.images && safeProduct.images.length > 0 && (
            <div className={styles.thumbs} data-testid="product-thumbs">
              {safeProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`${styles.thumbButton} ${selectedImage === img ? styles.thumbActive : ''}`}
                  onClick={() => setSelectedImage(img)}
                  aria-label={`Selecionar imagem ${idx + 1}`}
                  data-testid={`product-thumb-${idx}`}
                >
                  <img
                    src={img}
                    alt={`${safeProduct.title} ${idx + 1}`}
                    className={styles.thumbImg}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Coluna de informações */}
        <div className={styles.info}>
          <p className={styles.price} data-testid="product-price">
            {safeProduct.price}
          </p>

          {/* Cores */}
          {safeProduct.colorsAvailable &&
            safeProduct.colorsAvailable.length > 0 && (
              <div className={styles.optionGroup} data-testid="product-colors">
                <div className={styles.optionLabel}>Cores</div>
                <div className={styles.optionsRow}>
                  {safeProduct.colorsAvailable.map(color => (
                    <label key={color} className={styles.optionButton}>
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        checked={selectedColor === color}
                        onChange={() => handleColorChange(color)}
                        data-testid={`color-option-${color}`}
                      />
                      <span className={styles.optionText}>{color}</span>
                    </label>
                  ))}
                </div>
                {selectedColor && (
                  <p className={styles.selectedInfo}>
                    Cor selecionada: {selectedColor}
                  </p>
                )}
              </div>
            )}

          {/* Capacidades disponíveis */}
          {safeProduct.capacityAvailable &&
            safeProduct.capacityAvailable.length > 0 && (
              <div
                className={styles.optionGroup}
                data-testid="product-capacities"
              >
                <div className={styles.optionLabel}>Capacidade</div>
                <div className={styles.optionsRow}>
                  {safeProduct.capacityAvailable.map(cap => (
                    <label key={cap} className={styles.optionButton}>
                      <input
                        type="radio"
                        name="capacity"
                        value={cap}
                        checked={selectedCapacity === cap}
                        onChange={() => handleCapacityChange(cap)}
                        data-testid={`capacity-option-${cap}`}
                      />
                      <span className={styles.optionText}>{cap}</span>
                    </label>
                  ))}
                </div>
                {selectedCapacity && (
                  <p className={styles.selectedInfo}>
                    Capacidade selecionada: {selectedCapacity}
                  </p>
                )}
              </div>
            )}

          {/* Sobre o produto */}
          {safeProduct.description && (
            <div className={styles.about} data-testid="product-about">
              <h2 className={styles.sectionTitle}>Sobre</h2>
              <p className={styles.description}>{safeProduct.description}</p>
            </div>
          )}

          {/* Especificações técnicas */}
          <div className={styles.specs} data-testid="product-specs">
            <h3 className={styles.sectionTitle}>Especificações técnicas</h3>
            <div className={styles.specList}>
              {specsToShow.map(key => {
                const value =
                  key === 'capacity'
                    ? (selectedCapacity ?? safeProduct.specs?.capacity)
                    : safeProduct.specs?.[key];

                if (!value) {
                  return null;
                }

                const label = key.charAt(0).toUpperCase() + key.slice(1);

                return (
                  <div className={styles.specRow} key={key}>
                    <span className={styles.specLabel}>{label}</span>
                    <span className={styles.specValue}>{value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ações: adicionar ao carrinho e voltar */}
          <div className={styles.actions}>
            <Button
              className={styles.addButton}
              onClick={handleAddToCart}
              variant={alreadyInCart ? 'disabled' : 'primary'}
              size="md"
              data-testid="add-to-cart"
              ariaLabel={
                alreadyInCart
                  ? 'Adicionado ao carrinho'
                  : 'Adicionar ao carrinho'
              }
            >
              {alreadyInCart
                ? 'Adicionado ao carrinho'
                : 'Adicionar ao carrinho'}
            </Button>

            <Link
              to={categoryLink}
              className={styles.backLink}
              data-testid="product-back-link"
            >
              Voltar
            </Link>
          </div>
        </div>
      </section>

      {/*----------------------------------------------------------*/}
      {/* 9. PRODUTOS SUGERIDOS */}
      {/*----------------------------------------------------------*/}
      {suggested.length > 0 && (
        <section className={styles.related} data-testid="product-related">
          <h3 className={styles.sectionTitle}>Você também pode gostar</h3>
          <div className={styles.relatedGrid}>
            {suggested.map(s => (
              <BrandNewModels
                key={s.id}
                id={s.id}
                title={s.title}
                imageSrc={s.imageSrc}
                imageAlt={s.title}
                price={s.price}
                specs={s.specs}
                onButtonClick={() => addItem(s)} // conecta ao carrinho
                onFavouriteClick={() => toggleFavorite(s)} // conecta aos favoritos
                isFavourite={isFavorite(s.id)}
                data-testid={`suggested-${s.id}`}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

//----------------------------------------------------------
// 10. EXPORT
//----------------------------------------------------------
export default ProductDetails;
export { ProductDetails };
