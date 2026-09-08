import { NaviLine } from '../../components/NaviLine';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Price } from '../../components/Price';
import { CartButton } from '../../components/CartButton';
import { FavButton } from '../../components/FavButton';
import { ProductsSwiper } from '../../components/ProductsSwiper';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductsDetails } from '../../utils/api';
import { ProductName } from '../../types/prodName';
import { Loader } from '../../components/Loader';
import { getCssColor } from '../../utils/cssColor';
import { GlobalContext } from '../../context/GlobalContext';
import './DetailsPage.scss';
import { Product } from '../../types/Product';
import { ButtonBack } from '../../components/ButtonBack';
import { ErrorBlock } from '../../components/ErrorBlock';

type Option = 'color' | 'capacity';

const formatter = (str?: string | string[]) => {
  if (!str) {
    return '';
  }

  if (typeof str === 'string') {
    const index = str.length - 2;

    return str.slice(0, index) + ' ' + str.slice(index);
  }

  return str.join(', ');
};

export const DetailsPage = () => {
  const [prodDetail, setProdDetail] = useState<ProductDetails | null>(null);
  const [prodDetails, setProdDetails] = useState<ProductDetails[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const [prevPhoto, setPrevPhoto] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { allProducts } = useContext(GlobalContext);

  const { productId } = useParams();
  const category = useLocation().pathname.split('/')[1];

  const loadDetails = useCallback(async () => {
    if (!category) {
      setError('Category not found');
      setIsLoading(false);

      return;
    }

    try {
      setError('');
      setProdDetail(null);
      setIsLoading(true);

      const data = await getProductsDetails(category as ProductName);

      setProdDetails(data);
    } catch {
      setError('Product not found');
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  useEffect(() => {
    if (!productId || !prodDetails.length || isLoading) {
      return;
    }

    const currentProduct = prodDetails.find(p => p.id === productId);

    if (!currentProduct) {
      setError('Product not found');

      return;
    }

    setProdDetail(currentProduct);
  }, [productId, prodDetails, isLoading]);

  const getLink = useCallback(
    (option: Option, value: string) => {
      if (!prodDetail) {
        return null;
      }

      const { color, capacity, namespaceId } = prodDetail;

      const elem = prodDetails.find(d => {
        const isNameMatch = d.namespaceId === namespaceId;

        if (option === 'color') {
          const normalizedDColor = String(d.color)
            .toLowerCase()
            .replace(/[-\s]/g, '');
          const normalizedValue = String(value)
            .toLowerCase()
            .replace(/[-\s]/g, '');

          return (
            isNameMatch &&
            normalizedDColor === normalizedValue &&
            d.capacity === capacity
          );
        }

        if (option === 'capacity') {
          return isNameMatch && d.capacity === value && d.color === color;
        }

        return false;
      });

      return elem?.id;
    },
    [prodDetail, prodDetails],
  );

  const switchPhoto = (index: number) => {
    if (index === activePhoto) {
      return;
    }

    setPrevPhoto(activePhoto);
    setActivePhoto(index);
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
      setPrevPhoto(null);
    }, 300);
  };

  const suggestedProducts: Product[] = useMemo(() => {
    if (!prodDetail || !allProducts.length) {
      return [];
    }

    return allProducts.filter(p => {
      const isMatchPrice = p.price >= prodDetail!.priceDiscount - 300;
      const isMatchCategory = p.category === prodDetail?.category;
      const isNotSameProduct = p.itemId !== prodDetail.id;

      return isMatchCategory && isMatchPrice && isNotSameProduct;
    });
  }, [prodDetail, allProducts]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="details">
        <div className="container">
          <ButtonBack />
          <ErrorBlock message={error} onReload={loadDetails} />
        </div>
      </div>
    );
  }

  if (!prodDetail) {
    return null;
  }

  return (
    <div className="details">
      <div className="container">
        <div className="details__content">
          <div className="details__navi-line">
            <NaviLine category={category} productName={prodDetail.name} />
            <ButtonBack />
          </div>

          <h1 className="details__title">{prodDetail.name}</h1>

          <div className="details__sections">
            <section className="details__top">
              <div className="details__preview">
                {prodDetail.images.map((pic, i) => (
                  <div
                    key={i}
                    className={classNames('details__preview-item', {
                      'details__preview-item--active': i === activePhoto,
                    })}
                    onClick={() => {
                      switchPhoto(i);
                    }}
                  >
                    <img src={pic} alt="preview-photo" />
                  </div>
                ))}
              </div>

              <div className="details__photo">
                {prevPhoto !== null && (
                  <img
                    key={`prev-${prevPhoto}`}
                    src={prodDetail.images[prevPhoto]}
                    className={classNames('photo', {
                      'photo--fade-out': isAnimating,
                    })}
                    alt="previous"
                  />
                )}
                <img
                  key={activePhoto}
                  src={prodDetail.images[activePhoto]}
                  className={classNames('photo', {
                    'photo--fade-in': isAnimating,
                  })}
                  alt="active"
                />
              </div>

              <div className="details__options">
                <div className="details__options-top">
                  <div className="details__colors">
                    <span className="details__colors-label">
                      Available colors
                    </span>
                    <div className="details__color-items">
                      {[...prodDetail.colorsAvailable].sort().map(col => {
                        const targetId = getLink('color', col);

                        return (
                          <Link
                            key={`${prodDetail.id}-${col}`}
                            to={
                              targetId
                                ? `/${prodDetail.category}/${targetId}`
                                : '#'
                            }
                            className={classNames(
                              'details__color-item',
                              col === prodDetail.color
                                ? 'details__color-item--active'
                                : '',
                            )}
                          >
                            <div
                              style={{ backgroundColor: getCssColor(col) }}
                            ></div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <span className="details__id">{`ID: ${prodDetail.id}`}</span>
                </div>

                <div className="details__capacity">
                  <span className="details__capacity-label">
                    Select capacity
                  </span>
                  <div className="details__capacity-items">
                    {prodDetail.capacityAvailable.map(cap => (
                      <Link
                        key={`${prodDetail.id}-${cap}`}
                        to={`/${prodDetail.category}/${getLink('capacity', cap)}`}
                      >
                        <span
                          className={classNames(
                            'details__capacity-item',
                            cap === prodDetail.capacity
                              ? 'details__capacity-item--active'
                              : '',
                          )}
                        >
                          {formatter(cap)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <Price
                  price={{
                    fullPrice: prodDetail.priceRegular,
                    price: prodDetail.priceDiscount,
                  }}
                  discount={true}
                  size="m"
                />

                <div className="details__buttons">
                  <CartButton productId={prodDetail.id} size={'m'} />
                  <FavButton productId={prodDetail.id} size={'m'} />
                </div>

                <div className="details__info">
                  {(['screen', 'resolution', 'processor', 'ram'] as const).map(
                    el => (
                      <div key={el} className="details__info-item">
                        {el === 'ram' ? (
                          <span>{el.toUpperCase()}</span>
                        ) : (
                          <span>{el[0].toUpperCase() + el.slice(1)}</span>
                        )}
                        <span>{formatter(prodDetail[el])}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </section>

            <div className="flex-wrapper">
              <section className="details__about">
                <h2>About</h2>
                {prodDetail.description.map((des, i) => (
                  <div key={i} className="details__about-block">
                    <p className="details__about-title">{des.title}</p>
                    <p className="details__about-text">{des.text}</p>
                  </div>
                ))}
              </section>

              <section className="details__specs">
                <h2>Tech specs</h2>
                <div className="details__specs-items">
                  {(
                    [
                      'screen',
                      'resolution',
                      'processor',
                      'ram',
                      'capacity',
                      'camera',
                      'zoom',
                      'cell',
                    ] as const
                  ).map(el => (
                    <div key={el} className="details__specs-item">
                      {el === 'ram' ? (
                        <span className="details__specs-item-label">
                          {el.toUpperCase()}
                        </span>
                      ) : el === 'capacity' ? (
                        <span className="details__specs-item-label">
                          {'Built in memory'}
                        </span>
                      ) : (
                        <span className="details__specs-item-label">
                          {el[0].toUpperCase() + el.slice(1)}
                        </span>
                      )}
                      <span className="details__specs-item-value">
                        {formatter(prodDetail[el])}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <section className="details__swiper">
              <ProductsSwiper
                products={suggestedProducts}
                discount={true}
                title={'You may also like'}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
