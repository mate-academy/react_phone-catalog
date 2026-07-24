import { Link, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import { ItemPreview } from '../../types/Product';
import { Container } from '../../components/Container/Container';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { useAddedToCart } from '../../context/AddedToCartContext';
import { useFavorites } from '../../context/FavoritesContext';

import style from './DetailsPage.module.scss';

import home from '../../../public/icons/Home.svg';
import arrow from '../../../public/icons/Arrow.svg';
import heart from '../../../public/icons/Favourites (Heart Like).svg';
// eslint-disable-next-line max-len
import heartFilled from '../../../public/icons/Favourites Filled (Heart Like).svg';

import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import products from '../../../public/api/products.json';

const createSlug = (value: string) => {
  return value.toLowerCase().trim().replaceAll(' ', '-');
};

export const DetailsPage = ({ list }: { list: ItemPreview[] }) => {
  const path = useLocation().pathname;

  const { favorites, toggleFavorite } = useFavorites();
  const { addedToCart, addToCart } = useAddedToCart();

  const item = list.find(product => path.includes(product.itemId));

  const fullItem =
    phones.find(phone => phone.id === item?.itemId) ||
    tablets.find(tablet => tablet.id === item?.itemId) ||
    accessories.find(accessory => accessory.id === item?.itemId);

  const [currentImage, setCurrentImage] = useState('');

  const recommendedProducts = useMemo(() => {
    return [...(products as ItemPreview[])]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
  }, []);

  const isFavorite = item ? favorites.includes(String(item.id)) : false;

  const isAddedToCart = item
    ? addedToCart.some(cartItem => String(cartItem.id) === String(item.id))
    : false;

  useEffect(() => {
    if (fullItem?.images?.[0]) {
      setCurrentImage(fullItem.images[0]);
    } else if (item?.image) {
      setCurrentImage(item.image);
    } else {
      setCurrentImage('');
    }
  }, [fullItem, item]);

  if (!item || !fullItem) {
    return <div>Product not found</div>;
  }

  return (
    <Container>
      <div className={style.main}>
        <div className={style.path}>
          <Link to="/" aria-label="Go to home page">
            <img src={home} alt="" />
          </Link>

          <img src={arrow} alt="" />

          <Link to={`/${item.category}`} className={style.textCategory}>
            {item.category}
          </Link>

          <img src={arrow} alt="" />

          <span className={style.textName}>{item.name}</span>
        </div>

        <div className={style.grid}>
          <h1 className={style.title}>{fullItem.name}</h1>

          <div className={style.smallImages}>
            {fullItem?.images.map(image => (
              <div key={image}>
                <img
                  src={image}
                  onClick={() => setCurrentImage(image)}
                  className={style.smallImage}
                  alt={fullItem.name}
                />
              </div>
            ))}
          </div>

          <img className={style.image} src={currentImage} alt={fullItem.name} />

          <div className={style.detailsBox}>
            <div className={style.colorBox}>
              <span>Available colors</span>

              <div className={style.colors}>
                {fullItem.colorsAvailable.map(color => {
                  const colorPath = createSlug(color);

                  return (
                    <Link
                      to={`/${fullItem.category}/${fullItem.namespaceId}-${createSlug(
                        fullItem.capacity,
                      )}-${colorPath}`}
                      key={color}
                      className={style.colorDot}
                      style={{
                        backgroundColor: color,
                      }}
                      aria-label={`Choose ${color} color`}
                      title={color}
                    />
                  );
                })}
              </div>
            </div>

            <div className={style.colorBox}>
              <span className={style.lineBox}>Select capacity</span>

              <div className={style.colors}>
                {fullItem.capacityAvailable.map(capacity => {
                  const isChosen =
                    capacity.toLowerCase() === fullItem.capacity.toLowerCase();

                  return (
                    <Link
                      to={`/${fullItem.category}/${fullItem.namespaceId}-${createSlug(
                        capacity,
                      )}-${createSlug(fullItem.color)}`}
                      key={capacity}
                      className={`${style.capacity} ${
                        isChosen ? style.choosen : ''
                      }`}
                    >
                      {capacity}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className={style.priceBoxMain}>
              <div className={style.priceBox}>
                <span className={style.priceDiscount}>
                  ${fullItem.priceDiscount}
                </span>

                <span className={style.priceFull}>
                  ${fullItem.priceRegular}
                </span>
              </div>

              <div className={style.lineBox}></div>
              <div className={`${style.buyBox}`}>
                <button
                  type="button"
                  onClick={() => addToCart(String(item.id))}
                  className={
                    isAddedToCart ? style.buttonTextAdded : style.buttonText
                  }
                >
                  {isAddedToCart ? 'Add to cart' : 'Added to cart'}
                </button>

                <button
                  type="button"
                  onClick={() => toggleFavorite(String(item.id))}
                  className={style.heartBox}
                  aria-label={
                    isFavorite ? 'Remove from favorites' : 'Add to favorites'
                  }
                >
                  <img src={isFavorite ? heartFilled : heart} alt="" />
                </button>
              </div>
            </div>
            <div>
              <div className={style.specFlex}>
                <span className={style.smallText}>Screen</span>
                <span>{fullItem.screen}</span>
              </div>
              <div className={style.specFlex}>
                <span className={style.smallText}>Resolution</span>
                <span>{fullItem.resolution}</span>
              </div>
              <div className={style.specFlex}>
                <span className={style.smallText}>Processor</span>
                <span>{fullItem.processor}</span>
              </div>
              <div className={style.specFlex}>
                <span className={style.smallText}>RAM</span>
                <span>{fullItem.ram}</span>
              </div>
            </div>
          </div>

          <div className={style.aboutBox}>
            <h2>About</h2>

            <div className={style.lineBox}>
              {fullItem.description.map(section => (
                <div key={section.title}>
                  <h3>{section.title}</h3>

                  {section.text.map(paragraph => (
                    <p key={paragraph} className={style.smallText}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className={style.techSpecBox}>
            <h2>Tech spec</h2>

            <div className={style.lineBox}>
              <div className={style.specFlex}>
                <span className={style.smallText}>Screen</span>
                <span>{fullItem.screen}</span>
              </div>

              <div className={style.specFlex}>
                <span className={style.smallText}>Resolution</span>
                <span>{fullItem.resolution}</span>
              </div>

              <div className={style.specFlex}>
                <span className={style.smallText}>Processor</span>
                <span>{fullItem.processor}</span>
              </div>

              <div className={style.specFlex}>
                <span className={style.smallText}>RAM</span>
                <span>{fullItem.ram}</span>
              </div>

              <div className={style.specFlex}>
                <span className={style.smallText}>Built in memory</span>
                <span>{fullItem.capacity}</span>
              </div>

              {'camera' in fullItem && (
                <div className={style.specFlex}>
                  <span className={style.smallText}>Camera</span>
                  <span>{String(fullItem.camera)}</span>
                </div>
              )}

              {'zoom' in fullItem && (
                <div className={style.specFlex}>
                  <span className={style.smallText}>Zoom</span>
                  <span>{String(fullItem.zoom)}</span>
                </div>
              )}

              <div className={style.specFlex}>
                <span className={style.smallText}>Cell</span>
                <span>{fullItem.cell.join(', ')}</span>
              </div>
            </div>
          </div>

          <div className={style.productSlider}>
            <ProductSlider
              products={recommendedProducts}
              text="You may also like"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
