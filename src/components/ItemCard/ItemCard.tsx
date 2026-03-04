import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { Footer } from '../Footer/Footer';
import { Loader } from '../Loader/Loader';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../Card/ProductCard';
import {
  getProductById,
  getProductsByCategory,
  getSuggestedProducts,
} from '../../utils/Fetchproducts';
import { Product } from '../../types/Product';
import styles from './ItemCard.module.scss';
import heartImg from '../../items/vector_heart.png';
import arrowLeft from '../../items/arrow_left.png';
import arrowRight from '../../items/arrow_right.png';
import selectedHeart from '../../items/selected_heart.png';
import { useFavourites } from '../../context/Favouritescontext';
import { useCart } from '../../context/Cartcontext';

const COLOR_MAP: Record<string, string> = {
  black: '#1F2020',
  white: '#F9F6EF',
  yellow: '#FFE680',
  green: '#AEE4B1',
  purple: '#C6C2D9',
  red: '#BA0C2E',
  coral: '#FF6B52',
  gold: '#FCDBC1',
  silver: '#C0C0C0',
  spacegray: '#717378',
  midnightgreen: '#4E5851',
  midnight: '#1F2020',
  rosegold: '#B76E79',
  spaceblack: '#1F1F1F',
  graphite: '#4A4A4F',
  sierrablue: '#A7C4D2',
};

const CATEGORY_LABELS: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const CATEGORY_PATHS: Record<string, string> = {
  phones: '/phones',
  tablets: '/tablets',
  accessories: '/accessories',
};

export const ItemCard = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { isFavourite, toggleFavourite } = useFavourites();
  const { isInCart, addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [sliderStart, setSliderStart] = useState(0);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoading(true);
    setNotFound(false);
    setSelectedImage(0);
    setSliderStart(0);

    getProductById(productId).then(async found => {
      if (!found) {
        setNotFound(true);
        setLoading(false);

        return;
      }

      setProduct(found);
      const all = await getProductsByCategory(found.category);

      setSuggested(getSuggestedProducts(all, found.id, 8));
      setLoading(false);
    });
  }, [productId]);

  const handleColorChange = (color: string) => {
    if (!product) {
      return;
    }

    const newId = `${product.namespaceId}-${product.capacity.toLowerCase()}-${color}`;

    navigate(`/product/${newId}`);
  };

  const handleCapacityChange = (cap: string) => {
    if (!product) {
      return;
    }

    const newId = `${product.namespaceId}-${cap.toLowerCase()}-${product.color}`;

    navigate(`/product/${newId}`);
  };

  const handleFavClick = () => {
    if (!product) {
      return;
    }

    toggleFavourite({
      id: product.id,
      image: product.images[0],
      name: product.name,
      price: product.priceDiscount,
      fullPrice: product.priceRegular,
      screen: product.screen,
      capacity: product.capacity,
      ram: product.ram,
    });
  };

  const VISIBLE = 4;
  const canPrev = sliderStart > 0;
  const canNext = sliderStart + VISIBLE < suggested.length;
  const isFav = product ? isFavourite(product.id) : false;

  return (
    <div className={styles.wrapper}>
      <Navigation />

      <div className={styles.container}>
        {loading && <Loader />}

        {!loading && notFound && (
          <div className={styles.not_found}>
            <h2>Product was not found</h2>
            <Link to="/phones" className={styles.back_link}>
              Back to phones
            </Link>
          </div>
        )}

        {!loading && product && (
          <>
            <Breadcrumbs
              category={CATEGORY_LABELS[product.category] || product.category}
              categoryPath={CATEGORY_PATHS[product.category] || '/'}
              productName={product.name}
            />

            <button
              className={styles.back_btn}
              onClick={() => navigate(-1)}
              type="button"
            >
              <img className={styles.backImg} src={arrowLeft} alt="back" />
              Back
            </button>

            <h1 className={styles.product_name}>{product.name}</h1>

            {/* MAIN SECTION */}
            <div className={styles.main_section}>
              {/* Thumbnails */}
              <div className={styles.thumbnails}>
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    className={`${styles.thumb} ${
                      selectedImage === i ? styles.thumb_active : ''
                    }`}
                    onClick={() => setSelectedImage(i)}
                  >
                    <img src={img} alt={`view ${i + 1}`} />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className={styles.main_image_wrap}>
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className={styles.main_image}
                />
              </div>

              {/* Controls */}
              <div className={styles.controls}>
                <div className={styles.control_group}>
                  <div className={styles.control_label_row}>
                    <span className={styles.control_label}>
                      Available colors
                    </span>
                    <span className={styles.control_id}>
                      ID: {product.namespaceId.slice(-6).toUpperCase()}
                    </span>
                  </div>
                  <div className={styles.color_options}>
                    {product.colorsAvailable.map(color => (
                      <button
                        key={color}
                        type="button"
                        className={`${styles.color_btn} ${
                          product.color === color ? styles.color_btn_active : ''
                        }`}
                        onClick={() => handleColorChange(color)}
                        title={color}
                      >
                        <span
                          className={styles.color_inner}
                          style={{
                            backgroundColor: COLOR_MAP[color] || color,
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.divider} />

                <div className={styles.control_group}>
                  <span className={styles.control_label}>Select capacity</span>
                  <div className={styles.capacity_options}>
                    {product.capacityAvailable.map(cap => (
                      <button
                        key={cap}
                        type="button"
                        className={`${styles.cap_btn} ${
                          product.capacity === cap ? styles.cap_btn_active : ''
                        }`}
                        onClick={() => handleCapacityChange(cap)}
                      >
                        {cap}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.divider} />

                <div className={styles.price_row}>
                  <span className={styles.price_new}>
                    ${product.priceDiscount}
                  </span>
                  {product.priceRegular > product.priceDiscount && (
                    <span className={styles.price_old}>
                      ${product.priceRegular}
                    </span>
                  )}
                </div>

                <div className={styles.action_btns}>
                  <button
                    type="button"
                    className={`${styles.btn_cart} ${
                      isInCart(product.id) ? styles.btn_cart_active : ''
                    }`}
                    onClick={() => {
                      if (!isInCart(product.id)) {
                        addToCart({
                          id: product.id,
                          image: product.images[0],
                          name: product.name,
                          price: product.priceDiscount,
                        });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  >
                    {isInCart(product.id) ? 'Added' : 'Add to cart'}
                  </button>
                  <button
                    type="button"
                    className={`${styles.btn_fav} ${
                      isFav ? styles.btn_fav_active : ''
                    }`}
                    aria-label={
                      isFav ? 'Remove from favorites' : 'Add to favorites'
                    }
                    onClick={handleFavClick}
                  >
                    <img
                      src={isFav ? selectedHeart : heartImg}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <div className={styles.short_specs}>
                  {(
                    [
                      ['Screen', product.screen],
                      ['Resolution', product.resolution],
                      ['Processor', product.processor],
                      ['RAM', product.ram],
                    ] as [string, string][]
                  ).map(([label, value]) => (
                    <div key={label} className={styles.spec_row}>
                      <span className={styles.spec_label}>{label}</span>
                      <span className={styles.spec_value}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ABOUT + TECH SPECS */}
            <div className={styles.details_section}>
              <div className={styles.about}>
                <h3 className={styles.section_title}>About</h3>
                <div className={styles.section_divider} />
                {product.description.map(block => (
                  <div key={block.title} className={styles.about_block}>
                    <h4 className={styles.about_subtitle}>{block.title}</h4>
                    {block.text.map((para, i) => (
                      <p key={i} className={styles.about_text}>
                        {para}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              <div className={styles.tech_specs}>
                <h2 className={styles.section_title}>Tech specs</h2>
                <div className={styles.section_divider} />
                <div className={styles.specs_list}>
                  {(
                    [
                      ['Screen', product.screen],
                      ['Resolution', product.resolution],
                      ['Processor', product.processor],
                      ['RAM', product.ram],
                      ['Built in memory', product.capacity],
                      ['Camera', product.camera],
                      ['Zoom', product.zoom],
                      ['Cell', product.cell.join(', ')],
                    ] as [string, string][]
                  ).map(([label, value]) => (
                    <div key={label} className={styles.spec_row}>
                      <span className={styles.spec_label}>{label}</span>
                      <span className={styles.spec_value}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* YOU MAY ALSO LIKE */}
            {suggested.length > 0 && (
              <div className={styles.suggested_section}>
                <div className={styles.suggested_header}>
                  <h2 className={styles.section_title_like}>
                    You may also like
                  </h2>
                  <div className={styles.slider_controls}>
                    <button
                      type="button"
                      className={styles.slider_btn}
                      disabled={!canPrev}
                      onClick={() => setSliderStart(s => s - 1)}
                    >
                      <img src={arrowLeft} alt="prev" />
                    </button>
                    <button
                      type="button"
                      className={styles.slider_btn}
                      disabled={!canNext}
                      onClick={() => setSliderStart(s => s + 1)}
                    >
                      <img src={arrowRight} alt="next" />
                    </button>
                  </div>
                </div>

                <div className={styles.suggested_grid}>
                  {suggested
                    .slice(sliderStart, sliderStart + VISIBLE)
                    .map(p => (
                      <Link
                        key={p.id}
                        to={`/product/${p.id}`}
                        className={styles.card_link}
                      >
                        <ProductCard
                          id={p.id}
                          image={p.images[0]}
                          name={p.name}
                          price={p.priceDiscount}
                          fullPrice={p.priceRegular}
                          screen={p.screen}
                          capacity={p.capacity}
                          ram={p.ram}
                          onCartClick={() =>
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          } // 👈
                        />
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};
