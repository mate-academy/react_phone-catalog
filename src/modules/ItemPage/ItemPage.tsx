/* eslint-disable prettier/prettier */
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import products from '../../../public/api/products.json';
import accessories from '../../../public/api/accessories.json';
import { Phone } from '../../types/Phone';
import { Accessories } from '../../types/Accessories';
import { Product } from '../../types/Product';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import home from '../Phone/phoneImg/Home.svg';
import arrow from '../Phone/phoneImg/Vector (PhonePage).svg';
import arrowBack from '../ItemPage/itemPageImg/ItemPageArrowBack.svg';
import { ProductsSlider } from '../../components/productSlider/productSlider';
import { fromAccessories, fromPhone, fromProduct } from '../../types/mappers';
import { useFavorites } from '../../components/Context/FavoriteContext';
import { useCart } from '../../components/Context/CartContext';
import favorite from '../../modules/Navbar/NavbarImg/Vector (Stroke).svg';
import heartLike from '../../modules/Navbar/NavbarImg/Heart Like.svg';
import { CardItem } from '../../types/СardItem';
import './itemPage.scss';

type RouteParams = {
  category?: string;
  itemId?: string;
};

type AnyItem = Phone | Accessories | Product;

export const ItemPage: React.FC = () => {
  const { category, itemId } = useParams<RouteParams>();
  const { favorites, toggleFavorite } = useFavorites();
  const { cart, toggleCart } = useCart();

  const item: AnyItem | null = useMemo(() => {
    if (!category || !itemId) {
      return null;
    }

    switch (category) {
      case 'phones':
        return (phones as Phone[]).find(p => p.namespaceId === itemId) || null;
      case 'tablets':
        return (tablets as Phone[]).find(t => t.namespaceId === itemId) || null;
      case 'products':
        return (products as Product[]).find(p => p.itemId === itemId) || null;
      case 'accessories':
        return (
          (accessories as Accessories[]).find(a => a.namespaceId === itemId) ||
          null
        );
      default:
        return null;
    }
  }, [category, itemId]);

  const normalizeImg = (path: string) =>
    path.startsWith('/') ? path : `/${path}`;

  const [activeImg, setActiveImg] = useState<string>('');
  const [activeColor, setActiveColor] = useState<string>('');
  const [activeCapacity, setActiveCapacity] = useState<string>('');

  const imagesForActiveColor = useMemo(() => {
    if (!item) {
      return [];
    }

    if (category === 'products') {
      const product = item as Product;

      return [normalizeImg(product.image)];
    }

    const phoneLike = item as Phone | Accessories;

    const baseColor = phoneLike.color;
    const currentColor = activeColor || baseColor;

    return phoneLike.images.map((img: string) => {
      const withColor = img.replace(`/${baseColor}/`, `/${currentColor}/`);

      return normalizeImg(withColor);
    });
  }, [item, activeColor, category]);

  useEffect(() => {
    if (!item) {
      return;
    }

    setActiveColor(item.color);
    setActiveCapacity(item.capacity);
  }, [item]);

  useEffect(() => {
    if (imagesForActiveColor.length > 0) {
      setActiveImg(imagesForActiveColor[0]);
    }
  }, [imagesForActiveColor]);

  if (!item) {
    return (
      <div className="item-page">
        <h2 className="item-page__title">Product not found</h2>
        <Link to="/" className="item-page__back">
          <img
            src={arrowBack}
            alt="ArrowBack"
            className="item-page__arrowBack"
          />
          <div className="item-page__text">Go back</div>
        </Link>
      </div>
    );
  }

  let baseCardItem: CardItem;

  switch (category) {
    case 'phones':
    case 'tablets':
      baseCardItem = fromPhone(item as Phone);
      break;

    case 'products':
      baseCardItem = fromProduct(item as Product);
      break;

    case 'accessories':
      baseCardItem = fromAccessories(item as Accessories);
      break;

    default:
      baseCardItem = fromPhone(item as Phone);
  }

  const baseName = item.name.split(' ').slice(0, -2).join(' ');
  const displayName = `${baseName} ${activeCapacity} ${activeColor}`;

  const variantColor = activeColor || item.color;
  const variantCapacity = activeCapacity || item.capacity;

  const variantImg =
    category === 'phones' || category === 'tablets'
      ? activeImg || baseCardItem.img
      : baseCardItem.img;

  const variantCardItem: CardItem =
    category === 'phones' || category === 'tablets'
      ? {
        ...baseCardItem,
        name: displayName,
        color: variantColor,
        capacity: variantCapacity,
        img: variantImg,
        id: `${baseCardItem.id}-${variantColor}-${variantCapacity}`,
      }
      : baseCardItem;

  const isFav = favorites.some(fav => fav.id === variantCardItem.id);
  const isInCart = cart.some(row => row.item.id === variantCardItem.id);

  let priceNew: number;
  let priceOld: number | undefined;

  if (category === 'products') {
    const product = item as Product;

    priceNew = product.price;
    priceOld = product.fullPrice;
  } else {
    const p = item as Phone | Accessories;

    if (p.priceDiscount !== undefined) {
      priceNew = p.priceDiscount;
      priceOld = p.priceRegular;
    } else {
      priceNew = p.priceRegular;
      priceOld = undefined;
    }
  }

  const hasDiscount =
    typeof priceOld === 'number' &&
    typeof priceNew === 'number' &&
    priceNew < priceOld;

  return (
    <>
      <div className="item-page">
        <nav className="navigation">
          <Link to="/" className="navigation__back">
            <img src={home} alt="Home" className="navigation__back-home" />
          </Link>
          <div className="navigation__gap">
            <img
              src={arrow}
              alt="ArrowItemPage"
              className="navigation__arrow"
            />
          </div>
          <Link to={`/${category}`} className="navigation__title">
            {category}
          </Link>
          <div className="navigation__gap">
            <img
              src={arrow}
              alt="ArrowItemPage"
              className="navigation__arrow"
            />
          </div>
          <div className="navigation__name">{displayName}</div>
        </nav>
        <Link to={`/${category}`} className="item-page__back">
          <img
            src={arrowBack}
            alt="ArrowBack"
            className="item-page__arrowBack"
          />
          <div className="item-page__text">Back</div>
        </Link>

        <h2 className="item-page__title">{displayName}</h2>
        <div className="item-page__main">
          {/* Photo */}
          <div className="item-page__gallery">
            <div className="item-page__preview">
              <img
                src={activeImg}
                alt={displayName}
                className="item-page__mainImg"
              />
            </div>
            <div className="item-page__thumbs">
              {imagesForActiveColor.map(img => {
                const src = normalizeImg(img);
                const isActive = src === activeImg;

                return (
                  <div
                    key={img}
                    className={
                      isActive
                        ? 'item-page__thumb item-page__thumb--active'
                        : 'item-page__thumb'
                    }
                    onClick={() => setActiveImg(src)}
                  >
                    <img
                      src={src}
                      alt={item.name}
                      className="item-page__rowImg"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* ItemInfo */}
          <div className="item-page__info">
            {(category === 'phones' || category === 'tablets') && (
              <div className="item-page__colorsBlock">
                <div className="item-page__colors-row">
                  <div className="item-page__colors-title">
                    Available colors
                  </div>
                  <div className="item-page__colors-id">ID: {item.id}</div>
                </div>
                {(category === 'phones' || category === 'tablets') &&
                  'colorsAvailable' in item && (
                  <div className="item-page__colors">
                    {item.colorsAvailable.map(color => {
                      const isActive = color === activeColor;

                      return (
                        <button
                          key={color}
                          type="button"
                          className={
                            isActive
                              ? 'item-page__color item-page__color--active'
                              : 'item-page__color'
                          }
                          style={{ '--color': color } as React.CSSProperties}
                          onClick={() => setActiveColor(color)}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            {(category === 'phones' || category === 'tablets') &&
              'capacityAvailable' in item && (
              <div className="item-page__capacity-block">
                <div className="item-page__colors-title">Select capacity</div>
                <div className="item-page__capacity-list">
                  {item.capacityAvailable.map(cap => {
                    const isActive = cap === activeCapacity;

                    return (
                      <button
                        key={cap}
                        type="button"
                        className={
                          isActive
                            ? 'item-page__capacity item-page__capacity--active'
                            : 'item-page__capacity'
                        }
                        onClick={() => setActiveCapacity(cap)}
                      >
                        {cap}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="item-page__prices">
              <span className="item-page__price-new">${priceNew}</span>

              {hasDiscount && priceOld && (
                <span className="item-page__price-old">${priceOld}</span>
              )}
            </div>
            <div className="item-page__action">
              <button
                className={
                  isInCart
                    ? 'item-page__button' + ' ' + 'item-page__button-added'
                    : 'item-page__button'
                }
                onClick={() => toggleCart(variantCardItem)}
              >
                {isInCart ? 'Added' : 'Add to cart'}
              </button>
              <button
                className={
                  isFav
                    ? 'item-page__favorite' + ' ' + 'item-page__favorite-added'
                    : 'item-page__favorite'
                }
                onClick={() => toggleFavorite(variantCardItem)}
              >
                <img
                  src={isFav ? heartLike : favorite}
                  alt="Favorite"
                  className={
                    isFav
                      ? 'favoriteImg' + ' ' + 'favoriteImg_added'
                      : 'favoriteImg'
                  }
                />
              </button>
            </div>
            <div className="item-page__specs">
              <div className="item-page__spec-block">
                <span className="item-page__spec-label">Screen</span>
                <span className="item-page__spec-value">{item.screen}</span>
              </div>
              {'resolution' in item && (
                <div className="item-page__spec-block">
                  <span className="item-page__spec-label">Resolution</span>
                  <span className="item-page__spec-value">
                    {item.resolution}
                  </span>
                </div>
              )}
              {'processor' in item && (
                <div className="item-page__spec-block">
                  <span className="item-page__spec-label">Processor</span>
                  <span className="item-page__spec-value">
                    {item.processor}
                  </span>
                </div>
              )}
              <div className="item-page__spec-block">
                <span className="item-page__spec-label">RAM</span>
                <span className="item-page__spec-value">{item.ram}</span>
              </div>
            </div>
          </div>
        </div>
        {category !== 'products' && 'description' in item && (
          <div className="item-page__description">
            <div className="item-page__description-flex">
              <h2 className="item-page__description-title">About</h2>
              <hr className="item-page__divider" />
              {item.description.map(block => (
                <div key={block.title} className="item-page__about-block">
                  <h3 className="item-page__about-subtitle">{block.title}</h3>
                  {block.text.map((paragraph, index) => (
                    <p key={index} className="item-page__about-text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <div className="item-page__tech">
              <div>
                <h2 className="item-page__description-title">Tech specs</h2>
                <hr className="item-page__divider" />
                <div className="item-page__tech-block">
                  <span className="item-page__tech-label">Screen</span>
                  <span className="item-page__tech-value">{item.screen}</span>
                </div>
                {'resolution' in item && (
                  <div className="item-page__tech-block">
                    <span className="item-page__tech-label">Resolution</span>
                    <span className="item-page__tech-value">
                      {item.resolution}
                    </span>
                  </div>
                )}
                <div className="item-page__tech-block">
                  <span className="item-page__tech-label">Processor</span>
                  <span className="item-page__tech-value">
                    {item.processor}
                  </span>
                </div>
                <div className="item-page__tech-block">
                  <span className="item-page__tech-label">RAM</span>
                  <span className="item-page__tech-value">{item.ram}</span>
                </div>
                <div className="item-page__tech-block">
                  <span className="item-page__tech-label">Built in memory</span>
                  <span className="item-page__tech-value">{item.capacity}</span>
                </div>
                {(category === 'phones' || category === 'tablets') && (
                  <>
                    <div className="item-page__tech-block">
                      <span className="item-page__tech-label">Camera</span>
                      <span className="item-page__tech-value">
                        {(item as Phone).camera}
                      </span>
                    </div>
                    <div className="item-page__tech-block">
                      <span className="item-page__tech-label">Zoom</span>
                      <span className="item-page__tech-value">
                        {(item as Phone).zoom}
                      </span>
                    </div>
                  </>
                )}
                {'cell' in item && (
                  <div className="item-page__tech-block">
                    <span className="item-page__tech-label">Cell</span>
                    <span className="item-page__tech-value">
                      {Array.isArray(item.cell)
                        ? item.cell.slice(0, 3).join(', ')
                        : item.cell}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {category === 'phones' && (
        <ProductsSlider
          title="You may also like"
          items={phones as Phone[]}
          mapItem={fromPhone}
        />
      )}

      {category === 'tablets' && (
        <ProductsSlider
          title="You may also like"
          items={tablets as Phone[]}
          mapItem={fromPhone}
        />
      )}

      {category === 'accessories' && (
        <ProductsSlider
          title="You may also like"
          items={accessories as Accessories[]}
          mapItem={fromAccessories}
        />
      )}
    </>
  );
};
