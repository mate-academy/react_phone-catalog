import { useNavigate, useParams } from 'react-router-dom';
import {
  Accessory,
  NormalizedProduct,
  Phone,
  ProductService,
  Tablet,
} from '../../interfaces/Product';
import { hasCamera } from '../../utils/typeGuards';
import { ColorSwatches } from './components/ColorSwatches/ColorSwatches';
import { OptionsToggle } from './components/OptionsToggle/OptionsToggle';
import { PhotoSlider } from './components/PhotoSlider';
import styles from './DetailPage.module.scss';
import { useEffect, useState } from 'react';
import { BackLink } from '../shared/BackLink';
import { useFavourites } from '../../context/FavouritesContext';
import { normalizeProduct } from '../../utils/normalizeProduct';
import { useCart } from '../../context/CartContext';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { ProductsSlider } from '../HomePage/components/ProdutsSlider';

type Entity = Phone | Tablet | Accessory;

type Props = {
  service: ProductService<Entity>;
};

export const DetailPage: React.FC<Props> = ({ service }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Phone | Tablet | Accessory | null>(
    null,
  );
  const [notFound, setNotFound] = useState(false);
  const [allProducts, setAllProducts] = useState<Entity[]>([]);
  const [recommended, setRecommended] = useState<NormalizedProduct[]>([]);
  // const [error, setError] = useState<string>('');

  const { toggleFavourite, isFavourite } = useFavourites();
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    if (!product) {
      return;
    }

    service.getAll().then(all => {
      const seen = new Set<string>();

      const filtered = all
        .filter(p => {
          if (p.namespaceId === product.namespaceId) {
            return false;
          }

          if (seen.has(p.namespaceId)) {
            return false;
          }

          seen.add(p.namespaceId);

          return true;
        })
        .slice(0, 12)
        .map(normalizeProduct);

      setRecommended(filtered);
    });
  }, [product]);

  const handleColorChange = (color: string) => {
    const target = allProducts.find(
      p =>
        p.namespaceId === product?.namespaceId &&
        p.color === color &&
        p.capacity === product?.capacity,
    );

    if (target) {
      navigate(`/${product?.category}/${target.id}`);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    const target = allProducts.find(
      p =>
        p.namespaceId === product?.namespaceId &&
        p.capacity === capacity &&
        p.color === product.color,
    );

    if (target) {
      navigate(`/${product?.category}/${target.id}`);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchProduct = async () => {
      try {
        const data = await service.getById(id);

        if (!data) {
          setNotFound(true);

          return;
        }

        setProduct(data);
      } catch {
        // setError('Failed to load product');
      }
    };

    const fetchAllProducts = async () => {
      try {
        const data = await service.getAll();

        setAllProducts(data);
      } catch {
        // setError('Failed to load product');
      }
    };

    fetchProduct();
    fetchAllProducts();
  }, [id]);

  if (notFound) {
    return (
      <div className="not-found inline-container">
        <img
          src="/img/product-not-found.png"
          alt="not found"
          className="not-found--image"
        />
        <h1 className="page-title not-found--title">Product was not found</h1>
        <a
          onClick={e => {
            e.preventDefault();
            navigate(-1);
          }}
          className="not-found--link"
        >
          Go back
        </a>
      </div>
    );
  }

  if (!product) {
    return;
  }

  return (
    <>
      <div className="inline-container">
        <Breadcrumbs />
      </div>
      <section className={styles.card}>
        <div className="inline-container">
          <BackLink />
          <h1 className={`page-title ${styles.card__title}`}>{product.name}</h1>
          <div className={styles.card__content}>
            <PhotoSlider photos={product.images} />
            <div className={styles.card__info}>
              <div className={styles.card__colors}>
                <div className={styles.card__colors_top}>
                  <span>Available colors</span>
                </div>
                <ColorSwatches
                  className={styles.card__colors_swatches}
                  colors={product.colorsAvailable}
                  activeColor={product.color}
                  onChange={handleColorChange}
                />
              </div>
              <div className="divider"></div>
              <div className={styles.card__options}>
                <p className={styles.card__options_title}>Select capacity</p>
                <OptionsToggle
                  className={styles.card__options_toggle}
                  options={product.capacityAvailable}
                  activeOption={product.capacity}
                  onChange={handleCapacityChange}
                />
              </div>
              <div className="divider"></div>
              <div className={styles.card__prices}>
                <span className={styles.card__price}>
                  ${product.priceDiscount}
                </span>
                {product.priceRegular !== product.priceDiscount && (
                  <span className={styles.card__price_old}>
                    ${product.priceRegular}
                  </span>
                )}
              </div>
              <div className={styles.card__actions}>
                <button
                  className={`btn ${isInCart(product.id) ? 'btn--selected' : ''}`}
                  onClick={() => addToCart(normalizeProduct(product))}
                >
                  {isInCart(product.id) ? 'Added' : 'Add to cart'}
                </button>
                <button
                  onClick={() => toggleFavourite(normalizeProduct(product))}
                  className={`favourite-btn ${isFavourite(product.id) ? 'favourite-btn--active' : ''}`}
                />
              </div>
              <ul className={`spec__list ${styles.card__chars}`}>
                <li className="spec__item">
                  <span className="spec__name">Screen</span>
                  <span className="spec__value">{product.screen}</span>
                </li>
                <li className="spec__item">
                  <span className="spec__name">Resolution</span>
                  <span className="spec__value">{product.resolution}</span>
                </li>
                <li className="spec__item">
                  <span className="spec__name">Processor</span>
                  <span className="spec__value">{product.processor}</span>
                </li>
                <li className="spec__item">
                  <span className="spec__name">RAM</span>
                  <span className="spec__value">{product.ram}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.card__read}>
            <div className={styles.card__about}>
              <h2 className={styles.card__about__title}>About</h2>
              <div className="divider"></div>
              <div className={styles.card__about__blocks}>
                {product.description.map(desc => {
                  return (
                    <div key={desc.title} className={styles.card__about__block}>
                      <h3 className={styles.card__about__sub_title}>
                        {desc.title}
                      </h3>
                      <div className={styles.card__about__texts}>
                        {desc.text.map(text => {
                          return (
                            <p key={text} className={styles.card__about__text}>
                              {text}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.card__specs}>
              <h2 className={styles.card__specs__title}>Tech specs</h2>
              <div className="divider"></div>
              <ul className={`spec__list ${styles.card__specs__list}`}>
                <li className="spec__item">
                  <span className="spec__name">Screen</span>
                  <span className="spec__value">{product.screen}</span>
                </li>
                <li className="spec__item">
                  <span className="spec__name">Resolution</span>
                  <span className="spec__value">{product.resolution}</span>
                </li>
                <li className="spec__item">
                  <span className="spec__name">Processor</span>
                  <span className="spec__value">{product.processor}</span>
                </li>
                <li className="spec__item">
                  <span className="spec__name">RAM</span>
                  <span className="spec__value">{product.ram}</span>
                </li>
                <li className="spec__item">
                  <span className="spec__name">Built in memory</span>
                  <span className="spec__value">{product.capacity}</span>
                </li>

                {hasCamera(product) && (
                  <>
                    <li className="spec__item">
                      <span className="spec__name">Camera</span>
                      <span className="spec__value">{product.camera}</span>
                    </li>
                    <li className="spec__item">
                      <span className="spec__name">Zoom</span>
                      <span className="spec__value">{product.zoom}</span>
                    </li>
                  </>
                )}

                <li className="spec__item">
                  <span className="spec__name">Cell</span>
                  <span className="spec__value">{product.cell.join(', ')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ProductsSlider title="You may also like" products={recommended} />
      </section>
    </>
  );
};
