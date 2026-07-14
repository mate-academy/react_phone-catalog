/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
//#region import
import styles from './ItemCard.module.scss';
import 'swiper/swiper-bundle.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CardGalery } from '../../components/CardGalery/CardGalery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { BrandCard } from '../../components/BrandCard';
import { useState } from 'react';
import { ProductDetails } from '../../types';
import { Product } from '../../types';
//#endregion
//#region icons imports
import Right from '../../icons/Right.svg';
import Left from '../../icons/Left.svg';
import Home from '../../icons/Home.svg';
import Like from '../../icons/like.svg';
import isLike from '../../icons/IsLike.svg';
//#endregion
//#region data imports
import phonesData from '../../../public/api/phones.json';
import tabletsData from '../../../public/api/tablets.json';
import accessoriesData from '../../../public/api/accessories.json';
import productsData from '../../../public/api/products.json';
import { useFavorites } from '../../context/FavoritesContext';
//#endregion

//data
const allProductDetails: ProductDetails[] = [
  ...(phonesData as ProductDetails[]),
  ...(tabletsData as ProductDetails[]),
  ...(accessoriesData as ProductDetails[]),
];
const products = productsData as Product[];

//card
export function ItemCard() {
  const [newSwiper, setNewSwiper] = useState<any>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const product = allProductDetails.find(item => item.id === id);
  //fav
  const { toggleFavorite, isFavorite } = useFavorites();

  //colorselect
  const handleColorSelect = (newColor: string) => {
    const targetProduct = allProductDetails.find(
      item =>
        item.namespaceId === product!.namespaceId &&
        item.capacity === product!.capacity &&
        item.color === newColor,
    );

    if (targetProduct) {
      navigate(`/${targetProduct.category}/${targetProduct.id}`);
    }
  };

  //capacity
  const handleCapacitySelect = (newCapacity: string) => {
    const targetProduct = allProductDetails.find(
      item =>
        item.namespaceId === product!.namespaceId &&
        item.color === product!.color &&
        item.capacity === newCapacity,
    );

    if (targetProduct) {
      navigate(`/${targetProduct.category}/${targetProduct.id}`);
    }
  };

  //discount
  const hasDiscount = product!.priceDiscount < product!.priceRegular;

  //specs
  const techSpecs = [
    { label: 'Screen', value: product!.screen },
    { label: 'Resolution', value: product!.resolution },
    { label: 'Processor', value: product!.processor },
    { label: 'RAM', value: product!.ram },
    { label: 'Camera', value: product!.camera },
    { label: 'Zoom', value: product!.zoom },
    { label: 'Cell network', value: product!.cell.join(', ') },
  ];

  //if nenashel
  if (!product) {
    return <div>Товар не найден</div>;
  }

  //fav
  const productCardData = products.find(p => p.itemId === product.id);
  const isLiked = isFavorite(product.id);

  const recommendations = products
    .filter(p => p.category === product.category && p.itemId !== product.id)
    .slice(0, 8);

  return (
    <div className={styles.ItemCard}>
      <Header />
      <main className={styles.main}>
        <div className={styles.BreadCrumbs}>
          <Link to={'/'} className={styles.BreadCrumbs__link}>
            <img src={Home} alt="" className={styles.BreadCrumbs__img} />
          </Link>
          <img src={Right} alt="" />
          <span className={styles.BreadCrumbs__link}>Phones</span>

          <img src={Right} alt="" />

          <Link
            to={''}
            className={`${styles.BreadCrumbs__link} ${styles.BreadCrumbs__last}`}
          >
            Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
          </Link>
        </div>
        <div className={styles.back}>
          <img src={Left} alt="" className={styles.back__img} />
          <p className={styles.back__text}>Back</p>
        </div>
        <h1 className={styles.galery__title}>{product.name}</h1>
        <div className={styles.galeryBlock}>
          <div className={styles.galery}>
            <CardGalery images={product.images} />
          </div>
          <div className={styles.description}>
            <div className={styles.top}>
              <h2 className={styles.top__title}>Available colors</h2>
              <h2 className={styles.top__id}>ID: 802390</h2>
            </div>
            <div className={styles.colors}>
              {product.colorsAvailable.map(colorOption => (
                <span
                  key={colorOption}
                  className={`${styles.colors__color} ${colorOption === product.color ? styles.colors__color_active : ''}`}
                  style={{ backgroundColor: colorOption }}
                  onClick={() => handleColorSelect(colorOption)}
                />
              ))}
            </div>
            <hr className={styles.divider} />
            <div className={styles.cap}>
              <h1 className={styles.cap__title}>Select capacity</h1>
              <div className={styles.variants}>
                {product.capacityAvailable.map(capacityOption => (
                  <span
                    key={capacityOption}
                    className={`${styles.variants__var} ${capacityOption === product.capacity ? styles.variants__var_active : ''}`}
                    onClick={() => handleCapacitySelect(capacityOption)}
                  >
                    {capacityOption}
                  </span>
                ))}
              </div>
            </div>
            <hr className={styles.divider} />
            <div className={styles.cart}>
              <div className={styles.price}>
                <div className={styles.price}>
                  <h2 className={styles.price__main}>
                    ${product.priceDiscount}
                  </h2>
                  {hasDiscount && (
                    <h2 className={styles.price__disc}>
                      ${product.priceRegular}
                    </h2>
                  )}
                </div>
              </div>
              <div className={styles.buttons}>
                <button className={styles.buttons__cart}>Add to cart</button>
                <button
                  className={`${styles.brandCard__buttons__fav}`}
                  onClick={e => {
                    e.stopPropagation();
                    if (productCardData) {
                      toggleFavorite(productCardData);
                    }
                  }}
                >
                  {isLiked ? (
                    <img src={isLike} alt="" />
                  ) : (
                    <img src={Like} alt="" />
                  )}
                </button>
              </div>
              <div className={styles.desksm}>
                {techSpecs.slice(0, 3).map(spec => (
                  <div key={spec.label} className={styles.params}>
                    <h3 className={styles.params__label}>{spec.label}</h3>
                    <p className={styles.params__value}>{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bot}>
          <div className={styles.about}>
            <h1 className={styles.about__title}>About</h1>
            <hr className={styles.divider} />
            <div className={styles.aboutpage}>
              {product.description.map(block => (
                <div key={block.title} className={styles.aboutBlock}>
                  <h2 className={styles.aboutBlock__title}>{block.title}</h2>
                  {block.text.map((paragraph, index) => (
                    <p key={index} className={styles.aboutBlock__desk}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.specs}>
            <h2 className={styles.specs__title}>Tech specs</h2>
            <hr className={styles.divider} />
            <div className={styles.specsWrap}>
              {techSpecs.map(spec => (
                <div key={spec.label} className={styles.specsBlock}>
                  <h3 className={styles.specsBlock__label}>{spec.label}</h3>
                  <p className={styles.specsBlock__value}>{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.new}>
          <div className={styles.new__topblock}>
            <h1 className={styles.new__title}>You may also like</h1>
            <div className={styles.new__divider}>
              <button
                onClick={() => newSwiper?.slidePrev()}
                className={styles.new__btn}
              >
                ‹
              </button>
              <button
                onClick={() => newSwiper?.slideNext()}
                className={styles.new__btn}
              >
                ›
              </button>
            </div>
          </div>
          <div className={styles.new__slider}>
            <Swiper
              modules={[Navigation]}
              onSwiper={setNewSwiper}
              slidesPerView={1.2}
              spaceBetween={16}
              breakpoints={{
                640: {
                  slidesPerView: 2.5,
                },
                1200: {
                  slidesPerView: 4,
                },
              }}
            >
              {recommendations.map(item => (
                <SwiperSlide key={item.id}>
                  <BrandCard product={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
