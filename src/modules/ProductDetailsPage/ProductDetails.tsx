import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts, getProductsDetails } from '../../api/products';
import { Loader } from '../../components/Loader';
import { ProductDescription } from '../../types/ProductFull';
import { BreadCrumbs } from '../shared/components/BreadCrumbs';
import { BackBtn } from '../shared/components/BackBtn';
import styles from './ProductDetails.module.scss';
import { ProductCategory } from '../../types/ProductCategory';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../HomePage/components/ProductsSlider';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';

export const ProductDetails = () => {
  const { category, productId } = useParams();
  const [product, setProduct] = useState<ProductDescription | null>(null);
  const [baseProduct, setBaseProduct] = useState<Product | null>(null);
  const [baseProducts, setBaseProducts] = useState<Product[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { cart, toggleCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = baseProduct ? favorites.includes(baseProduct?.id) : false;
  const isProductInCart = baseProduct
    ? cart.find(p => p.id === baseProduct?.id) || 0
    : false;

  const images = product?.images;
  const [activeImg, setActiveImg] = useState<string | undefined>(undefined);

  const colorMap: Record<string, string> = {
    gold: '#FCDBC1',
    midnightgreen: '#5F7170',
    spacegray: '#4C4C4C',
    silver: '#C0C0C0',
    rosegold: '#DEA193',
    graphite: '#251607',
    sierrablue: '#BFDAF7',
    starlight: '#F8F9EC',
  };

  useEffect(() => {
    if (!category || !productId) {
      return;
    }

    setIsLoading(true);

    Promise.all([getProducts(), getProductsDetails(category)])
      .then(([allProducts, products]) => {
        const foundedBaseProduct = allProducts.find(
          (prod: Product) => prod.itemId === productId,
        );

        setBaseProduct(foundedBaseProduct);
        setBaseProducts(
          allProducts.filter((prod: Product) => prod.category === category),
        );

        const foundProduct = products.find(
          (prod: ProductDescription) => prod.id === productId,
        );

        setProduct(foundProduct || null);
      })
      .finally(() => setIsLoading(false));
  }, [category, productId]);

  useEffect(() => {
    if (product) {
      setActiveImg(product.images[0]);
    }
  }, [product]);

  const getSuggestedProducts = (products: Product[]) => {
    const filtered = products.filter(p => p.id !== baseProduct?.id);

    return filtered.sort(() => Math.random() - 0.5).slice(0, 8);
  };

  return (
    <div className="container">
      {!product && !isLoading && <h2>Product was not found</h2>}
      {isLoading && <Loader />}

      {product && (
        <div className={styles['product-details']}>
          <BreadCrumbs
            category={category as ProductCategory}
            itemName={product.name}
          />
          <BackBtn />

          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles['product-top']}>
            <img src={activeImg} className={styles['product-image']} />

            <div className={styles['images-block']}>
              {images?.map(image => (
                <img
                  key={image}
                  src={image}
                  alt={product.name}
                  className={`${image === activeImg ? styles.active : ''}`}
                  onClick={() => setActiveImg(image)}
                />
              ))}
            </div>

            <div className={styles['product-characteristics']}>
              <div className={styles.colors}>
                <p className={styles['top-description']}>
                  <p className={styles['option-title']}>Available colors</p>
                  <p className={styles.id}>ID: {baseProduct?.id}</p>
                </p>

                <div className={styles.colorDots}>
                  {product.colorsAvailable.map(color => (
                    <NavLink
                      key={color}
                      to={`/${category}/${product.namespaceId}-${product.capacity.toLowerCase()}-${color.toLowerCase()}`}
                      className={`${styles.colorDot} ${color === product.color ? styles.active : ''}`}
                      style={{
                        background: colorMap[color] || color,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.capacities}>
                <p className={styles['option-title']}>Select capacity</p>

                <div className={styles.capacityDots}>
                  {product.capacityAvailable.map(capacity => (
                    <NavLink
                      key={capacity}
                      to={`/${category}/${product.namespaceId}-${capacity.toLowerCase()}-${product.color}`}
                      className={`${styles.capacity} ${capacity === product.capacity ? styles.active : ''}`}
                    >
                      <p>{capacity}</p>
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className={styles.prices}>
                <p className={styles.price}>${product.priceDiscount}</p>
                {product.priceRegular !== product.priceDiscount && (
                  <p className={styles.fullPrice}>${product.priceRegular}</p>
                )}
              </div>

              <div className={styles['buttons-wrapper']}>
                <button
                  className={`${styles['add-to-cart']} ${isProductInCart ? styles.added : ''}`}
                  onClick={() => baseProduct && toggleCart(baseProduct.id)}
                >
                  {isProductInCart ? 'Added' : 'Add to cart'}
                </button>
                <button
                  className={styles['add-to-favorite']}
                  onClick={() => baseProduct && toggleFavorite(baseProduct.id)}
                >
                  <img
                    src={
                      isFavorite
                        ? 'img/icons/Favourites Filled (Heart Like).svg'
                        : 'img/icons/Favourites (Heart Like).svg'
                    }
                    alt="Favourites"
                  />
                </button>
              </div>

              <ul className={styles['option-list']}>
                <li className={styles['option-item']}>
                  <p className={styles.option}>Screen</p>
                  <p className={styles.value}>{product.screen}</p>
                </li>
                <li className={styles['option-item']}>
                  <p className={styles.option}>Resolution</p>
                  <p className={styles.value}>{product.resolution}</p>
                </li>
                <li className={styles['option-item']}>
                  <p className={styles.option}>Capacity</p>
                  <p className={styles.value}>{product.capacity}</p>
                </li>
                <li className={styles['option-item']}>
                  <p className={styles.option}>RAM</p>
                  <p className={styles.value}>{product.ram}</p>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles['product-bottom']}>
            <div className={styles.about}>
              <p className={styles['section-title']}>About</p>
              {product.description.map(item => (
                <>
                  <p className={styles.title}>{item.title}</p>
                  <p className={styles.text}>{item.text}</p>
                </>
              ))}
            </div>

            <div className={styles['tech-speck']}>
              <p className={styles['section-title']}>Tech specs</p>
              <ul className={styles['option-list']}>
                <li className={styles['option-item']}>
                  <p className={styles.option}>Screen</p>
                  <p className={styles.value}>{product.screen}</p>
                </li>
                <li className={styles['option-item']}>
                  <p className={styles.option}>Resolution</p>
                  <p className={styles.value}>{product.resolution}</p>
                </li>
                <li className={styles['option-item']}>
                  <p className={styles.option}>Processor</p>
                  <p className={styles.value}>{product.processor}</p>
                </li>
                <li className={styles['option-item']}>
                  <p className={styles.option}>RAM</p>
                  <p className={styles.value}>{product.ram}</p>
                </li>
                <li className={styles['option-item']}>
                  <p className={styles.option}>Built in memory</p>
                  <p className={styles.value}>{product.capacity}</p>
                </li>
                <li className={styles['option-item']}>
                  <p className={styles.option}>Camere</p>
                  <p className={styles.value}>{product.camera}</p>
                </li>
                <li className={styles['option-item']}>
                  <p className={styles.option}>Zoom</p>
                  <p className={styles.value}>{product.zoom}</p>
                </li>
                <li className={styles['option-item']}>
                  <p className={styles.option}>Cell</p>
                  <p className={styles.value}>{product.cell}</p>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles['may-like']}>
            <ProductsSlider
              products={getSuggestedProducts(baseProducts)}
              title="You may also like"
            />
          </div>
        </div>
      )}
    </div>
  );
};
