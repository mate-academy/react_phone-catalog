import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductDetails, Product } from '../../types/Product';
import { getProductDetails, getSuggestedProducts } from '../../api/products';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';
import { toggleFavorite } from '../../store/favoritesSlice';
import cn from 'classnames';
import styles from './ProductDetailsPage.module.scss';
// Додаємо імпорт нашої функції (перевір шлях, якщо він відрізняється)
import { getImageUrl } from '../../api/getImageUrl';

const COLOR_HEX: Record<string, string> = {
  black: '#1F2020',
  spacegray: '#4C4C4C',
  'space gray': '#4C4C4C',
  silver: '#F0F0F0',
  white: '#FBFBFB',
  gold: '#F3D2B3',
  yellow: '#FFE681',
  green: '#AEE1CD',
  purple: '#D1CDDA',
  red: '#C92127',
  midnightgreen: '#4E5851',
};

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [mainImage, setMainImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const cartItems = useAppSelector(state => state.cart.items);
  const favoritesItems = useAppSelector(state => state.favorites.items);

  const isAddedToCart = product
    ? cartItems.some(item => item.id === product.id)
    : false;
  const isFavorite = product
    ? favoritesItems.some(item => item.id === product.id)
    : false;

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    Promise.all([getProductDetails(productId), getSuggestedProducts()])
      .then(([details, suggestedData]) => {
        setProduct(details);
        setSuggested(suggestedData);
        setMainImage(details.images?.[0] || details.image || '');
      })
      .catch(() => setProduct(null))
      .finally(() => setIsLoading(false));
  }, [productId]);

  const handleColorChange = (newColor: string) => {
    if (product && product.color !== newColor) {
      const newId = product.id.replace(
        product.color.replace(' ', '-'),
        newColor.replace(' ', '-'),
      );

      navigate(`/${product.category}/${newId}`);
    }
  };

  const handleCapacityChange = (newCapacity: string) => {
    if (product && product.capacity !== newCapacity) {
      const newId = product.id.replace(
        product.capacity.toLowerCase(),
        newCapacity.toLowerCase(),
      );

      navigate(`/${product.category}/${newId}`);
    }
  };

  const handleAddToCart = () => {
    if (product && !isAddedToCart) {
      dispatch(addToCart(product as unknown as Product));
    }
  };

  if (isLoading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (!product) {
    return <div className={styles.not_found}>Product not found</div>;
  }

  return (
    <div className={styles.container}>
      <Breadcrumbs category={product.category} productName={product.name} />

      <button onClick={() => navigate(-1)} className={styles.back_button}>
        {'<'} Back
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.main_grid}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {product.images?.map(img => (
              <div
                key={img}
                className={cn(styles.thumb, {
                  [styles.thumb_active]: mainImage === img,
                })}
                onClick={() => setMainImage(img)}
              >
                {/* ВИКОРИСТОВУЄМО getImageUrl */}
                <img src={getImageUrl(img)} alt="thumb" />
              </div>
            ))}
          </div>
          <div className={styles.main_image}>
            {/* ВИКОРИСТОВУЄМО getImageUrl */}
            <img src={getImageUrl(mainImage)} alt={product.name} />
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.section}>
            <div className={styles.section_header}>
              <span className={styles.section_label}>Available colors</span>
              <span className={styles.item_id}>
                ID:{' '}
                {product.namespaceId
                  ? Math.floor(Math.random() * 900000) + 100000
                  : '802390'}
              </span>
            </div>

            <div className={styles.colors}>
              {product.colorsAvailable.map(color => (
                <div
                  key={color}
                  className={cn(styles.color_circle, {
                    [styles.color_circle_active]: product.color === color,
                  })}
                  style={{ backgroundColor: COLOR_HEX[color] || '#ccc' }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <span className={styles.section_label}>Select capacity</span>
            <div className={styles.capacities}>
              {product.capacityAvailable.map(cap => (
                <div
                  key={cap}
                  className={cn(styles.cap_box, {
                    [styles.cap_box_active]: product.capacity === cap,
                  })}
                  onClick={() => handleCapacityChange(cap)}
                >
                  {cap}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.price_block}>
            <span className={styles.price_discount}>
              ${product.priceDiscount || product.price}
            </span>
            <span className={styles.price_regular}>
              ${product.priceRegular || product.fullPrice}
            </span>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={cn(styles.add_to_cart, {
                [styles.added_to_cart]: isAddedToCart,
              })}
              onClick={handleAddToCart}
            >
              {isAddedToCart ? 'Added' : 'Add to cart'}
            </button>
            <button
              type="button"
              className={cn(styles.fav_button, {
                [styles.fav_button_active]: isFavorite,
              })}
              onClick={() =>
                dispatch(toggleFavorite(product as unknown as Product))
              }
            >
              {/* ВИКОРИСТОВУЄМО getImageUrl */}
              <img
                src={getImageUrl(
                  isFavorite ? 'img/heart-filled.png' : 'img/heart.png',
                )}
                alt="Favorite"
                className={styles.fav_icon}
              />
            </button>
          </div>

          <div className={styles.quick_specs}>
            <div className={styles.spec_item}>
              <span>Screen</span> <span>{product.screen}</span>
            </div>
            <div className={styles.spec_item}>
              <span>Resolution</span> <span>{product.resolution}</span>
            </div>
            <div className={styles.spec_item}>
              <span>Processor</span> <span>{product.processor}</span>
            </div>
            <div className={styles.spec_item}>
              <span>RAM</span> <span>{product.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.details_grid}>
        <div className={styles.about}>
          <h2 className={styles.section_title}>About</h2>
          {product.description?.map(desc => (
            <div key={desc.title} className={styles.desc_block}>
              <h3>{desc.title}</h3>
              {desc.text.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.tech_specs}>
          <h2 className={styles.section_title}>Tech specs</h2>
          <div className={styles.specs_table}>
            <div className={styles.spec_row}>
              <span>Screen</span> <span>{product.screen}</span>
            </div>
            <div className={styles.spec_row}>
              <span>Resolution</span> <span>{product.resolution}</span>
            </div>
            <div className={styles.spec_row}>
              <span>Processor</span> <span>{product.processor}</span>
            </div>
            <div className={styles.spec_row}>
              <span>RAM</span> <span>{product.ram}</span>
            </div>
            <div className={styles.spec_row}>
              <span>Capacity</span> <span>{product.capacity}</span>
            </div>
            <div className={styles.spec_row}>
              <span>Camera</span> <span>{product.camera}</span>
            </div>
            <div className={styles.spec_row}>
              <span>Zoom</span> <span>{product.zoom}</span>
            </div>
            <div className={styles.spec_row}>
              <span>Cell</span> <span>{product.cell?.join(', ') || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.suggested}>
        <ProductsSlider title="You may also like" products={suggested} />
      </div>
    </div>
  );
};
