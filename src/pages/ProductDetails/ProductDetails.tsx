// src/pages/ProductDetails/ProductDetails.tsx
// 1. Imports
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ProductDetails.module.css';
import Button from '../../components/Button/Button';
import { Loader } from '../../components/Loader';
import { BrandNewModels } from '../../components/BrandNewModels';
import { phones } from '../../data/phones';
import { tablets } from '../../data/tablets';
import { accessories } from '../../data/accessories';
import { useCart } from '../ShoppingCart/cartContext';

// 2. Interface Product
// Product shape usado na página de detalhes
export interface Product {
  id: string;
  sku?: string;
  title: string;
  price: string;
  imageSrc?: string;
  images?: string[]; // várias imagens
  description?: string;
  specs?: {
    screen?: string;
    capacity?: string;
    ram?: string;
    battery?: string;
    camera?: string;
    [k: string]: string | undefined;
  };
  colorsAvailable?: string[]; // ex: ['Preto','Branco']
  capacityAvailable?: string[]; // ex: ['64GB','128GB']
  category?: 'Celulares' | 'Tablets' | 'Acessórios' | string;
  age?: number;
}

// 3. Constantes e utilitários
// conjunto de todos os produtos (phones, tablets, accessories)
const ALL_PRODUCTS: Product[] = [...phones, ...tablets, ...accessories];

/**
 * Simula fetch de produto por id (delay intencional para loader)
 * Retorna Promise<Product | null>
 */
const fetchProductById = (id?: string): Promise<Product | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (!id) {
        return resolve(null);
      }

      const found = ALL_PRODUCTS.find(p => p.id === id) ?? null;

      resolve(found);
    }, 600);
  });
};

/**
 * Retorna uma lista de produtos sugeridos (aleatórios) excluindo o atual
 */
const getSuggestedProducts = (
  currentId: string | undefined,
  count = 4,
): Product[] => {
  const pool = ALL_PRODUCTS.filter(p => p.id !== currentId);
  const shuffled = pool.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// 4. Componente principal: estados e efeitos
const ProductDetails: React.FC = () => {
  // params da rota
  const { id } = useParams<{ id: string }>();

  // cart context (adicionar e verificar se já está no carrinho)
  const { addItem, isInCart } = useCart();

  // estados locais
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);

  // busca do produto quando id muda
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

        // inicializa imagem conforme cor (se houver mapeamento por índice)
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

  // 5. Handlers para seleção de cor e capacidade
  const handleColorChange = (color: string) => {
    if (!product) {
      return;
    }

    setSelectedColor(color);

    // se houver mapeamento 1:1 entre colorsAvailable e images, usa o índice
    if (
      product.colorsAvailable &&
      product.images &&
      product.colorsAvailable.length === product.images.length
    ) {
      const idx = product.colorsAvailable.indexOf(color);

      if (idx >= 0 && product.images[idx]) {
        setSelectedImage(product.images[idx]);

        return;
      }
    }

    // fallback para primeira imagem ou imageSrc
    setSelectedImage(product.images?.[0] ?? product.imageSrc ?? null);
  };

  const handleCapacityChange = (cap: string) => {
    setSelectedCapacity(cap);
  };

  // determina link de categoria para o breadcrumb / voltar
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

  // verifica se já está no carrinho e handler para adicionar
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
      color: selectedColor, // agora incluímos a cor selecionada
      capacity: selectedCapacity, // e a capacidade selecionada
    };

    addItem(productToAdd);
  };

  // loader
  if (isLoading) {
    return <Loader message="Carregando detalhes do produto..." />;
  }

  // 6. Renderização / produto não encontrado
  if (!product) {
    return (
      <main
        className={styles.container}
        data-testid="product-details-not-found"
      >
        <nav className={styles.breadcrumbs}>
          <Link to="/">Início</Link>
          <span className={styles.sep}>/</span>
          <span>Produto</span>
        </nav>

        <div className={styles.header}>
          <h1 className={styles.title}>Produto não encontrado</h1>
          <div className={styles.headerActions}>
            <Link
              to="/"
              className={styles.backLink}
              data-testid="product-back-link"
            >
              Voltar
            </Link>
          </div>
        </div>

        <p className={styles.notFoundText}>Produto não encontrado</p>
      </main> // <-- fechamento que estava faltando
    );
  }

  // ✅ specsToShow deve estar fora do if
  const specsToShow = ['screen', 'ram', 'capacity', 'battery', 'camera'];

  return (
    <main className={styles.container} data-testid="product-details">
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <Link to="/">Início</Link>
        <span className={styles.sep}>/</span>
        <Link to={categoryLink}>{product.category ?? 'Categoria'}</Link>
        <span className={styles.sep}>/</span>
        <span aria-current="page">{product.title}</span>
      </nav>

      {/* Cabeçalho com título */}
      <div className={styles.header}>
        <h1 className={styles.title} data-testid="product-details-title">
          {product.title}
        </h1>
      </div>

      {/* 7. Conteúdo principal: mídia + info */}
      <section className={styles.content}>
        {/* Coluna de mídia */}
        <div className={styles.media}>
          <div className={styles.mainImageWrapper}>
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product.title}
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
          {product.images && product.images.length > 0 && (
            <div className={styles.thumbs} data-testid="product-thumbs">
              {product.images.map((img, idx) => (
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
                    alt={`${product.title} ${idx + 1}`}
                    className={styles.thumbImg}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 8. Coluna de informações */}
        <div className={styles.info}>
          <p className={styles.price} data-testid="product-price">
            {product.price}
          </p>

          {/* Cores disponíveis */}
          {product.colorsAvailable && product.colorsAvailable.length > 0 && (
            <div className={styles.optionGroup} data-testid="product-colors">
              <div className={styles.optionLabel}>Cores</div>
              <div className={styles.optionsRow}>
                {product.colorsAvailable.map(color => (
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
          {product.capacityAvailable &&
            product.capacityAvailable.length > 0 && (
              <div
                className={styles.optionGroup}
                data-testid="product-capacities"
              >
                <div className={styles.optionLabel}>Capacidade</div>

                <div className={styles.optionsRow}>
                  {product.capacityAvailable.map(cap => (
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

          {/* Sobre */}
          {product.description && (
            <div className={styles.about} data-testid="product-about">
              <h2 className={styles.sectionTitle}>Sobre</h2>
              <p className={styles.description}>{product.description}</p>
            </div>
          )}

          {/* Especificações técnicas */}
          <div className={styles.specs} data-testid="product-specs">
            <h3 className={styles.sectionTitle}>Especificações técnicas</h3>
            <div className={styles.specList}>
              {specsToShow.map(key => {
                const value =
                  key === 'capacity'
                    ? (selectedCapacity ?? product.specs?.capacity)
                    : product.specs?.[key];

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

          {/* Ações */}
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

      {/* 9. Produtos sugeridos */}
      {suggested.length > 0 && (
        <section className={styles.related} data-testid="product-related">
          <h3 className={styles.sectionTitle}>Você também pode gostar</h3>
          <div className={styles.relatedGrid}>
            {suggested.map(s => (
              <Link
                key={s.id}
                to={`/product/${s.id}`}
                className={styles.relatedLink}
              >
                <BrandNewModels
                  id={s.id}
                  title={s.title}
                  imageSrc={s.imageSrc}
                  imageAlt={s.title}
                  price={s.price}
                  specs={s.specs}
                  onButtonClick={() => {}}
                  onFavouriteClick={() => {}}
                  isFavourite={false}
                  data-testid={`suggested-${s.id}`}
                />
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetails;
export { ProductDetails };
