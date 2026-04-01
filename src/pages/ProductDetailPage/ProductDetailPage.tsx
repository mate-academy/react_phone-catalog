import { Fragment, useEffect, useState } from 'react';
import { BackCrumb } from '../../components/BackCrumb';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { fetchProductById, fetchProducts } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Product, ProductCarousel } from '../../components/ProductCarousel';

import Favourite from '../../assets/Icons/Favourites.svg';
import FavouriteFilled from '../../assets/Icons/Favourites_filled.svg';

import styles from './/ProductDetailPage.module.scss';
import { loadFavorites, saveFavorites } from '../../services/favorites';

interface CategoryProduct {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: {
    title: string;
    text: string[];
  }[];
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
}

export const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<CategoryProduct>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [idProducts, setIdProducts] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const [favorites, setFavorites] = useState<Product[]>(() => loadFavorites());
  const [favProduct, setFavProduct] = useState<Product | null>(null);

  const liked = favorites.some(p => p.itemId === productId);

  useEffect(() => {
    fetchProductById(productId)
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        throw error;
      });

    fetchProducts().then(data => {
      const foundFavProduct = data.find((p: Product) => p.itemId === productId);

      if (foundFavProduct) {
        setFavProduct(foundFavProduct);
      }

      const foundProduct = [...data].find(p => p.itemId === productId);

      if (foundProduct) {
        setIdProducts(foundProduct.id);
      }

      const filteredProducts = [...data].filter(p => {
        const priceDiff = Math.abs(
          p.fullPrice - (product?.priceRegular || 800),
        );
        const priceDiffThreshold = 100;

        return (
          priceDiff < priceDiffThreshold && p.category === product?.category
        );
      });

      setProducts(filteredProducts);
    });
  }, [product?.category, product?.priceRegular, productId]);

  useEffect(() => {
    let mounted = true;

    fetchProductById(productId)
      .then(data => {
        if (!mounted) {
          return;
        }

        setProduct(data);
      })
      .catch(error => {
        throw error;
      });

    return () => {
      mounted = false;
    };
  }, [productId]);
  // синхронізація liked
  useEffect(() => {
    if (!productId) {
      return;
    }
  }, [productId, favorites]);

  // Словник: Назва з бекенду -> Реальний колір (Hex)
  const COLOR_MAP: Record<string, string> = {
    spacegray: '#4C4C4B',
    midnightgreen: '#4E5851',
    gold: '#FCDCB4',
    silver: '#E4E4E2',
    rosegold: '#B76E79',
    red: '#CA001A',
    black: '#1F2020',
    white: '#F9F6EF',
    yellow: '#FFE681',
    purple: '#D1CDDA',
    green: '#AEE1CD',
  };

  const toggleFavorite = () => {
    if (!favProduct) {
      return;
    }

    setFavorites(prev => {
      // Використовуємо String() для 100% гарантії збігу типів
      const isAlreadyFav = prev.some(
        item => String(item.id) === String(favProduct.id),
      );

      const next = isAlreadyFav
        ? prev.filter(item => String(item.id) !== String(favProduct.id))
        : [...prev, favProduct];

      saveFavorites(next);

      return next;
    });
  };

  const handleColorClick = (color: string) => {
    const id = product?.id;

    const splitId = id?.toString().split('-');

    if (splitId) {
      splitId.pop();
      splitId.push(color.toLowerCase());
      const newId = splitId.join('-');

      setSelectedImage(null); // Скидаємо вибрану картинку, щоб показати першу з нового кольору

      return newId;
    }

    return id;
  };

  const handleCapacityClick = (capacity: string) => {
    const id = product?.id;

    const splitId = id?.toString().split('-');

    if (splitId) {
      splitId[splitId.length - 2] = capacity.toLowerCase();
      const newId = splitId.join('-');

      return newId;
    }

    return id;
  };

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const HeartIcon = ({ filled }: { filled: boolean }) =>
    filled ? (
      <img src={FavouriteFilled} alt="favorite_filled_icon" />
    ) : (
      <img src={Favourite} alt="favorite_icon" />
    );

  return (
    <>
      <div className="grid">
        <Breadcrumbs />
        <div className={`${styles.detail_page} grid`}>
          <BackCrumb />
          <div className={styles.detail_page__title}>{product?.name}</div>

          <div className={styles.detail_page__preview}>
            <div className={styles.detail_page__preview__main_photo}>
              <img
                src={`/${selectedImage || product?.images?.[0]}`}
                alt="img"
              />
            </div>
            <div className={styles.detail_page__preview__list}>
              {product?.images?.map(img => (
                <div
                  className={`${styles.detail_page__preview__list__photo} `}
                  key={img}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={`/${img}`}
                    alt="img"
                    className={
                      selectedImage === img
                        ? styles.selected
                        : selectedImage === null && img === product?.images?.[0]
                          ? styles.selected
                          : ''
                    }
                  />
                </div>
              )) || <></>}
            </div>
          </div>

          <div className={styles.detail_page__info}>
            <div className={styles.detail_page__info__colors}>
              <div className={styles.detail_page__info__colors_id}>
                ID:{idProducts}
              </div>
              <p className={styles.detail_page__info__title}>
                Available colors
              </p>
              <div className={styles.detail_page__info__colors_list}>
                {product?.colorsAvailable?.map(color => {
                  // Шукаємо колір у словнику. Якщо раптом бекенд пришле якийсь
                  // новий колір, якого в нас немає, ми спробуємо використати саму назву.
                  const hexColor = COLOR_MAP[color] || color;

                  return (
                    <span
                      key={color}
                      className={`${styles.detail_page__info__colors_list__item} ${color === product.color ? styles.selected : ''}`}
                      style={{ backgroundColor: hexColor }}
                      title={color}
                      onClick={() => {
                        const newId = handleColorClick(color);

                        navigate(`/phones/${newId}`);
                      }}
                    ></span>
                  );
                })}
              </div>
            </div>
            <hr />
            <div className={styles.detail_page__info__capacity}>
              <p className={styles.detail_page__info__title}>Select capacity</p>
              <div className={styles.detail_page__info__capacity_list}>
                {product?.capacityAvailable?.map(capacity => {
                  return (
                    <span
                      key={capacity}
                      className={`${styles.detail_page__info__capacity_list__item} ${capacity === product.capacity ? styles.selectedCapacity : ''}`}
                      title={capacity}
                      onClick={() => {
                        const newId = handleCapacityClick(capacity);

                        navigate(`/phones/${newId}`);
                      }}
                    >
                      {capacity}
                    </span>
                  );
                })}
              </div>
            </div>
            <hr />
            <div className={styles.detail_page__info__price}>
              <span className={styles.detail_page__info__price_value}>
                ${product?.priceDiscount} <span>${product?.priceRegular}</span>
              </span>
              <div className={styles['card-actions']}>
                <button
                  className={`${styles['btn-add']} ${added ? styles.added : ''}`}
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleAdd();
                  }}
                >
                  {added ? '✓ Added' : 'Add to cart'}
                </button>
                <button
                  className={`${styles['btn-like']} ${liked ? styles.liked : ''}`}
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleFavorite();
                  }}
                >
                  <HeartIcon filled={liked} />
                </button>
              </div>
              <p className={styles.detail_page__info__description}>
                <div
                  className={styles.detail_page__info__description__specific}
                >
                  <span
                    className={
                      styles.detail_page__info__description__specific__title
                    }
                  >
                    Screen
                  </span>
                  <span
                    className={
                      styles.detail_page__info__description__specific__text
                    }
                  >
                    {product?.screen}
                  </span>
                </div>
                <div
                  className={styles.detail_page__info__description__specific}
                >
                  <span
                    className={
                      styles.detail_page__info__description__specific__title
                    }
                  >
                    Resolution
                  </span>
                  <span
                    className={
                      styles.detail_page__info__description__specific__text
                    }
                  >
                    {product?.resolution}
                  </span>
                </div>
                <div
                  className={styles.detail_page__info__description__specific}
                >
                  <span
                    className={
                      styles.detail_page__info__description__specific__title
                    }
                  >
                    Proccessor
                  </span>
                  <span
                    className={
                      styles.detail_page__info__description__specific__text
                    }
                  >
                    {product?.processor}
                  </span>
                </div>
                <div
                  className={styles.detail_page__info__description__specific}
                >
                  <span
                    className={
                      styles.detail_page__info__description__specific__title
                    }
                  >
                    RAM
                  </span>
                  <span
                    className={
                      styles.detail_page__info__description__specific__text
                    }
                  >
                    {product?.ram}
                  </span>
                </div>
              </p>
            </div>
          </div>
          {/* <div className={styles.detail_page__grid_info}>
          </div> */}

          <div className={styles.detail_page__about}>
            <p className={styles.detail_page__about__title}>About</p>
            <hr />
            {product?.description.map(desc => (
              <Fragment key={desc.title}>
                <p className={styles.detail_page__about__paragraph}>
                  {desc.title}
                </p>
                <div className={styles.detail_page__about__text}>
                  {desc.text.map((text: string, index: number) => (
                    <p
                      key={index}
                      style={{
                        marginBottom:
                          index < desc.text.length - 1 ? '2em' : '0',
                      }}
                    >
                      {`${text}`}
                    </p>
                  ))}
                </div>
              </Fragment>
            ))}
          </div>

          <div className={styles.detail_page__tech_specs}>
            <div className={styles.detail_page__tech_specs__title}>
              Tech specs
            </div>
            <hr />
            <div className={styles.detail_page__tech_specs__content}>
              {product?.screen && (
                <div
                  className={styles.detail_page__tech_specs__content__specific}
                >
                  <span
                    className={
                      styles.detail_page__tech_specs__content__specific__title
                    }
                  >
                    Screen
                  </span>
                  <span
                    className={
                      styles.detail_page__tech_specs__content__specific__text
                    }
                  >
                    {product?.screen}
                  </span>
                </div>
              )}
              {product?.resolution && (
                <div
                  className={styles.detail_page__tech_specs__content__specific}
                >
                  <span
                    className={
                      styles.detail_page__tech_specs__content__specific__title
                    }
                  >
                    Resolution
                  </span>
                  <span
                    className={
                      styles.detail_page__tech_specs__content__specific__text
                    }
                  >
                    {product?.resolution}
                  </span>
                </div>
              )}
              {product?.processor && (
                <div
                  className={styles.detail_page__tech_specs__content__specific}
                >
                  <span
                    className={
                      styles.detail_page__tech_specs__content__specific__title
                    }
                  >
                    Processor
                  </span>
                  <span
                    className={
                      styles.detail_page__tech_specs__content__specific__text
                    }
                  >
                    {product?.processor}
                  </span>
                </div>
              )}
              {product?.ram && (
                <div
                  className={styles.detail_page__tech_specs__content__specific}
                >
                  <span
                    className={
                      styles.detail_page__tech_specs__content__specific__title
                    }
                  >
                    RAM
                  </span>
                  <span
                    className={
                      styles.detail_page__tech_specs__content__specific__text
                    }
                  >
                    {product?.ram}
                  </span>
                </div>
              )}
              {product?.camera && (
                <div
                  className={styles.detail_page__tech_specs__content__specific}
                >
                  <span
                    className={
                      styles.detail_page__tech_specs__content__specific__title
                    }
                  >
                    Camara
                  </span>
                  <span
                    className={
                      styles.detail_page__tech_specs__content__specific__text
                    }
                  >
                    {product?.camera}
                  </span>
                </div>
              )}
              {product?.zoom && (
                <div
                  className={styles.detail_page__tech_specs__content__specific}
                >
                  <span
                    className={
                      styles.detail_page__tech_specs__content__specific__title
                    }
                  >
                    Zoom
                  </span>
                  <span
                    className={
                      styles.detail_page__tech_specs__content__specific__text
                    }
                  >
                    {product?.zoom}
                  </span>
                </div>
              )}
              {product?.cell && (
                <div
                  className={styles.detail_page__tech_specs__content__specific}
                >
                  <span
                    className={
                      styles.detail_page__tech_specs__content__specific__title
                    }
                  >
                    Cell
                  </span>
                  <span
                    className={
                      styles.detail_page__tech_specs__content__specific__text
                    }
                    style={{ display: 'flex', gap: '8px' }}
                  >
                    {product?.cell.map((text: string, index: number) => (
                      <div key={index}>
                        {text}
                        {index !== (product?.cell ?? []).length - 1 && ','}
                      </div>
                    ))}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <ProductCarousel
          products={products}
          title={'You may also like'}
          discount={true}
        />
      </div>
    </>
  );
};
