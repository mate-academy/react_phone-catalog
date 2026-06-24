/* eslint-disable max-len */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import '../../styles/style.scss';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import { icons } from '../../utils/icons';
import { useNavigate } from 'react-router-dom';
import { CartsContext } from '../../components/Context/CartsContext';
import { FavouritesContext } from '../../components/Context/FavouritesContext';
import { ProductCardItem } from '../../types/CartItem';
import { SwiperSlide } from 'swiper/react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ProductSlider } from '../../components/Slider/ProductSlider';
import { Loader } from '../../components/Loader';
import { getProductsDetails } from '../../api';

export const ProductDetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [variants, setVariants] = useState<ProductDetails[]>([]);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const { category, itemId } = useParams<{
    category: string;
    itemId: string;
  }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { carts, setCarts } = useContext(CartsContext);
  const { favourites, setFavourites } = useContext(FavouritesContext);
  const getItemId = (p: ProductDetails) => p.id;
  const mainImage = selectedImg || product?.images?.[0] || '';

  const toProductCardItem = (p: ProductDetails): ProductCardItem => {
    const productItemId = getItemId(p);

    return {
      id: productItemId,
      itemId: productItemId,

      name: p.name,

      price: p.priceDiscount,
      fullPrice: p.priceRegular,

      image: p.images[0],
      screen: p.screen,
      ram: p.ram,
      capacity: p.capacity,

      category: p.category,
      color: p.color,
    };
  };

  const handleToggleFavourite = (item: ProductCardItem) => {
    setFavourites(prev =>
      prev.some(f => f.id === item.id)
        ? prev.filter(f => f.id !== item.id)
        : [...prev, item],
    );
  };

  const handleToggleCarts = (item: ProductCardItem) => {
    setCarts(prev => {
      const exiting = prev.find(c => c.id === item.id);

      if (exiting) {
        return prev.filter(c => c.id !== item.id);
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const favouriteIds = useMemo(
    () => new Set(favourites.map(f => f.id)),
    [favourites],
  );

  const cartIds = useMemo(() => new Set(carts.map(c => c.id)), [carts]);

  const isFavourite = (id: string) => favouriteIds.has(id);
  const isCarts = (id: string) => cartIds.has(id);

  const getParam = (key: string, fallback?: string) =>
    searchParams.get(key) ?? fallback ?? '';
  const normalizeColor = (value: string) =>
    value.replace(/\s+/g, '').toLowerCase();

  const selectedColor = getParam('color', product?.color);
  const selectedCapacity = getParam('capacity', product?.capacity);

  useEffect(() => {
    if (!category || !itemId) {
      return;
    }

    setLoading(true);
    setLoadError(null);

    getProductsDetails(category)
      .then((data: ProductDetails[]) => {
        setVariants(data);
        const current = data.find(p => p.id === itemId);

        if (!current) {
          setLoadError('Product not found');

          return;
        }

        setProduct(current);
      })
      .catch(() => {
        setLoadError('Failed to load product');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category, itemId]);

  const handleChange = (type: 'color' | 'capacity', value: string) => {
    if (!product) {
      return;
    }

    const newColor = type === 'color' ? value : selectedColor;
    const newCapacity = type === 'capacity' ? value : selectedCapacity;

    const matched = variants.find(
      p =>
        p.namespaceId === product.namespaceId &&
        normalizeColor(p.color) === normalizeColor(newColor) &&
        p.capacity === newCapacity,
    );

    if (!matched) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    params.set('color', matched.color);
    params.set('capacity', newCapacity);

    navigate(`/${category}/${matched.id}?${params.toString()}`);
  };

  useEffect(() => {
    setSelectedImg(null);
  }, [product?.id]);

  if (loading) {
    return (
      <div className="page">
        <Loader />
      </div>
    );
  }

  if (loadError) {
    return <p className="has-text-danger">{loadError}</p>;
  }

  if (!product) {
    return <p className="has-text-danger">Product not found</p>;
  }

  const currentItemId = product.id;

  return (
    <>
      <div className="page page__details">
        <div className="page__top">
          <NavLink to="/" end className="logo logo--house">
            <img
              className="icon icon--house"
              src={icons.logoHouse}
              alt="Logo"
            />
          </NavLink>
          <div className="icon icon--arrow">
            <img src={icons.arrowIconRight} alt="Logo arrow"></img>
          </div>
          <div
            className="page__top--title"
            onClick={() => navigate(`/${category}`)}
          >
            {product.category}
          </div>
          <div className="icon icon--arrow">
            <img src={icons.arrowIconRight} alt="Logo arrow"></img>
          </div>
          <div className="page__top--titleDetail">{product.name}</div>
        </div>
        <div className="page__back">
          <div className="page__back--arrow" onClick={() => navigate(-1)}>
            <img src={icons.arrowIconLeft} alt="Logo arrow"></img>
          </div>
          <div className="page__back--title" onClick={() => navigate(-1)}>
            Back
          </div>
        </div>
        <div className="page__title page__title__PageDetail text-h1">
          {product?.name}
        </div>
        <div className="pageDetails">
          <div className="pageDetails__top">
            <div className="pageDetails__main--img img__mobile">
              <img className="selectedimg" src={mainImage} alt="" />
            </div>
            <div className="pageDetails__img__container">
              {product?.images.map(t => (
                <div className="pageDetails__imges" key={t}>
                  <img
                    src={t}
                    className="pageDetails__imges--t"
                    alt=""
                    onClick={() => setSelectedImg(t)}
                  />
                </div>
              ))}
            </div>
            <div className="pageDetails__main--img img__desctop">
              <img className="selectedimg" src={mainImage} alt="" />
            </div>
            <div className="pageDetails__top__section">
              <div className="pageDetails__color">
                <div className="pageDetails__color--title">
                  Available colors
                </div>
                <div className="pageDetails__color__container">
                  {product.colorsAvailable.map((c, i) => (
                    <div
                      className={
                        normalizeColor(c) === normalizeColor(selectedColor)
                          ? 'pageDetails__color__container--border--active'
                          : 'pageDetails__color__container--border'
                      }
                      key={i}
                    >
                      <div
                        className={`pageDetails__color--option product-${normalizeColor(c)}`}
                        onClick={() => handleChange('color', c)}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pageDetails__capacity">
                <div className="pageDetails__capacity--title">
                  Select capacity
                </div>
                <div className="pageDetails__capacity__container">
                  {product.capacityAvailable.map((cap, i) => (
                    <div
                      className={
                        cap === selectedCapacity
                          ? 'pageDetails__capacity__container--border pageDetails__capacity__container--border--active'
                          : 'pageDetails__capacity__container--border'
                      }
                      key={i}
                    >
                      <div
                        className={
                          cap === selectedCapacity
                            ? 'pageDetails__capacity--option pageDetails__capacity--option--active'
                            : 'pageDetails__capacity--option'
                        }
                        onClick={() => handleChange('capacity', cap)}
                      >
                        {cap}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pageDetails__priceBottom">
                <div className="product__price pageDetails__priceBottom--border">
                  <div className="product__price--sale text-h3">
                    ${product?.priceRegular}
                  </div>
                  <div className="product__price--fullprice">
                    ${product?.priceDiscount}
                  </div>
                </div>
                {product && (
                  <div className="product__button">
                    <div className="product__button--cart">
                      <button
                        className={
                          isCarts(currentItemId)
                            ? 'logo logo__c logo__c--phones logo__c--active'
                            : 'logo logo__c logo__c--phones'
                        }
                        onClick={() =>
                          handleToggleCarts(toProductCardItem(product))
                        }
                      >
                        {isCarts(currentItemId) ? (
                          <p className="product__button__name--active text-button">
                            Added to cart
                          </p>
                        ) : (
                          <p className="product__button__name text-button">
                            Add to cart
                          </p>
                        )}
                      </button>
                    </div>
                    <div className="product__button--accessories">
                      <button
                        className="logo logo__f logo__f--phones"
                        onClick={() =>
                          handleToggleFavourite(toProductCardItem(product))
                        }
                      >
                        <img
                          className="icon icon__favourites icon__favourites--phones"
                          src={
                            isFavourite(currentItemId)
                              ? icons.favActive
                              : icons.logoFavourites
                          }
                          alt="Logo"
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="product__info text-small">
                <div className="product__info__section">
                  <div className="product__info--key">Screen</div>
                  <div className="product__info--value">{product?.screen}</div>
                </div>
                <div className="product__info__section">
                  <div className="product__info--key">Resolution</div>
                  <div className="product__info--value">
                    {product?.resolution}
                  </div>
                </div>
                <div className="product__info__section">
                  <div className="product__info--key">Processor</div>
                  <div className="product__info--value">
                    {product?.processor}
                  </div>
                </div>
                <div className="product__info__section">
                  <div className="product__info--key">RAM</div>
                  <div className="product__info--value">{product?.ram}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="pageDetails__info">
            <div className="pageDetails__info__section">
              <div className="product__info__title text-h3">About</div>
              <div className="product__info">
                {product?.description.map((k, i) => (
                  <div className="product__info__section__pageDetail" key={i}>
                    <div className="product__info--key__pageDetail text-h4">
                      {k.title}
                    </div>
                    <div className="product__info--value__pageDetail">
                      {k.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pageDetails__info__section__second">
              <div className="product__info__title text-h3">Tech specs</div>
              <div className="product__info pageDetails__bottomInfo text-small">
                <div className="product__info__section">
                  <div className="product__info--key">Screen</div>
                  <div className="product__info--value">{product?.screen}</div>
                </div>
                <div className="product__info__section">
                  <div className="product__info--key">Resolution</div>
                  <div className="product__info--value">
                    {product?.resolution}
                  </div>
                </div>
                <div className="product__info__section">
                  <div className="product__info--key">Processor</div>
                  <div className="product__info--value">
                    {product?.processor}
                  </div>
                </div>
                <div className="product__info__section">
                  <div className="product__info--key">RAM</div>
                  <div className="product__info--value">{product.ram}</div>
                </div>
                {product.camera && (
                  <div className="product__info__section">
                    <div className="product__info--key">Camera</div>
                    <div className="product__info--value">{product.camera}</div>
                  </div>
                )}
                {product.zoom && (
                  <div className="product__info__section">
                    <div className="product__info--key">Zoom</div>
                    <div className="product__info--value">{product.zoom}</div>
                  </div>
                )}
                <div className="product__info__section">
                  <div className="product__info--key">Cell</div>
                  <div className="product__info--value">{product.cell}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="productSlider__product-slider hot-prices">
        <ProductSlider
          title="You may also like"
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
        >
          {variants
            .filter(p => p.id !== product.id)
            .map(p => (
              <SwiperSlide key={p.id}>
                <ProductCard
                  products={toProductCardItem(p)}
                  isFavourite={isFavourite}
                  isCarts={isCarts}
                  handleToggleFavourite={handleToggleFavourite}
                  handleToggleCarts={handleToggleCarts}
                />
              </SwiperSlide>
            ))}
        </ProductSlider>
      </section>
    </>
  );
};
