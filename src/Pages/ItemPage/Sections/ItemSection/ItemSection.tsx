/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { useContext, useEffect, useMemo, useState } from 'react';
import { modelColors } from '../../../../constants/colors';

import {
  AccessoriesModel,
  PhoneModel,
  TabletModel,
} from '../../../../types/model';
// eslint-disable-next-line max-len
import favoritesActive from '../../../../Icons/Favourites Filled (Heart Like).svg';
import favoritesNonActive from '../../../../Icons/Favourites (Heart Like).svg';
import { useNavigate } from 'react-router-dom';
import styles from './ItemSection.module.scss';
import cn from 'classnames';
import ImageSlider from '../../../../components/Slider/Slider';
import { PrimaryButton } from '../../../../components/PrimaryButton';
import { CartContext } from '../../../../contexts/CartContext';
import { convertToCartItem } from '../../../../utils/convertToCartItem';
import { Product } from '../../../../types/products';
import { FavoritesContext } from '../../../../contexts/FavoritesContext';

interface Props {
  model: AccessoriesModel | PhoneModel | TabletModel;
  kindOfModel: string;
  category: 'Phones' | 'Tablets' | 'Accessories';
  currentModels: PhoneModel[] | AccessoriesModel[] | TabletModel[];
  products: Product[];
}

export const ItemSection: React.FC<Props> = ({
  model,
  kindOfModel,
  currentModels,
  products,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentModel, setCurrentModel] = useState<
  AccessoriesModel | PhoneModel | TabletModel
  >(model);

  const normalizeColorName = (colorName: string): string => {
    return colorName.toLowerCase().replace(/\s/g, '');
  };

  const [modelColor, setModelColor] = useState<string>(
    normalizeColorName(currentModel.color),
  );
  const [modelCapacity, setModelCapacity] = useState<string>(
    currentModel.capacity,
  );

  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { favorites, setFavorites } = useContext(FavoritesContext);

  const navigate = useNavigate();

  const isInCart = useMemo(() => {
    return cartProducts.some(p => p.itemId === currentModel.id);
  }, [model, cartProducts]);

  const handleThumbnailClick = (index: number) => {
    if (mainSwiper) {
      mainSwiper.slideTo(index, 500);
    }

    setActiveIndex(index);
  };

  const product = products.find(p => p.itemId === currentModel.id);
  const isFavorite = useMemo(() => {
    return favorites.some(fav => fav.itemId === product?.itemId);
  }, [favorites, product?.itemId]);

  const handleAddToCart = () => {
    if (product) {
      const cartProduct = convertToCartItem(product);
      const newCartProducts = [...cartProducts, cartProduct];

      setCartProducts(newCartProducts);
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      if (isFavorite) {
        const newFavorites = favorites.filter(
          fav => fav.itemId !== product.itemId,
        );

        setFavorites(newFavorites);
      } else {
        const newFavorites = [...favorites, product];

        setFavorites(newFavorites);
      }
    }
  };

  const handleSetModelColor = (
    color: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setModelColor(normalizeColorName(color));
    event.currentTarget.blur();
  };

  const handleSetModelCapacity = (capacity: string) => {
    setModelCapacity(capacity);
  };

  const findModel = (
    capacity: string,
    color: string,
  ): PhoneModel | AccessoriesModel | TabletModel | undefined => {
    return (
      currentModels.find(
        m =>
          m.capacity === capacity &&
          m.color === color &&
          m.namespaceId === currentModel.namespaceId,
      ) || undefined
    );
  };

  useEffect(() => {
    const foundModel = findModel(modelCapacity || '', modelColor || '');

    if (!foundModel) {
      return;
    }

    setCurrentModel(foundModel);
    const newPath = `/${kindOfModel}/${foundModel.id}`;

    if (window.location.pathname !== newPath) {
      navigate(newPath, { replace: true });
    }
  }, [modelCapacity, modelColor, currentModels]);

  return (
    <section className={styles.item__section}>
      <main className={styles.grid__wrapper}>
        <ImageSlider
          images={currentModel.images}
          onSlideChange={setActiveIndex}
          setMainSwiper={setMainSwiper}
        ></ImageSlider>

        <aside className={styles.preview__images}>
          <ul className={styles.img__list}>
            {currentModel.images.map((img, index) => (
              <li
                key={index}
                className={cn(styles.img__element, {
                  [styles.is__active]: index === activeIndex,
                })}
                onClick={() => handleThumbnailClick(index)}
              >
                <img src={img} alt="preview-images" className={styles.img} />
              </li>
            ))}
          </ul>
        </aside>
        <aside className={styles.main__controls}>
          <div className={styles.available__colors__wrapper}>
            <div className={styles.available__colors}>
              <span className={styles.item__span}>Available colors</span>
              <ul className={styles.colors__list}>
                {currentModel.colorsAvailable.map(color => (
                  <li key={color} className={styles.color__element}>
                    <button
                      onClick={e => handleSetModelColor(color, e)}
                      className={cn(styles.color__button, {
                        [styles.active__color]:
                          normalizeColorName(color) === modelColor,
                      })}
                      style={{
                        backgroundColor: `${modelColors[normalizeColorName(color)]}`,
                      }}
                    ></button>
                  </li>
                ))}
              </ul>
            </div>
            <span className={styles.id__span}>ID: 802390</span>
          </div>
          <div className={styles.line}></div>
          <div>
            <div className={styles.capacity__wrapper}>
              <span className={styles.item__span}>Select capacity</span>
              <ul className={styles.capacity__list}>
                {currentModel.capacityAvailable.map(capacity => (
                  <li key={capacity} className={styles.capacity__element}>
                    <button
                      onClick={() => handleSetModelCapacity(capacity)}
                      className={cn(styles.capacity__button, {
                        [styles.active__capacity]: capacity === modelCapacity,
                      })}
                    >
                      {capacity.includes('GB')
                        ? `${capacity.split('GB')[0]} GB`
                        : capacity.includes('TB')
                          ? `${capacity.split('TB')[0]} TB`
                          : capacity}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.tech__wrapper}>
            <div className={styles.price__wrapper}>
              <h2 className={styles.price__discount}>
                ${currentModel.priceDiscount}
              </h2>
              <span className={styles.price__regular}>
                ${currentModel.priceRegular}
              </span>
            </div>
            <div className={styles.buttons__wrapper}>
              <PrimaryButton
                isSelected={isInCart}
                text="Add to cart"
                height="48"
                action={handleAddToCart}
              />
              <button
                className={styles.add__to__favorites__button}
                onClick={handleToggleFavorite}
              >
                {isFavorite ? (
                  <img
                    src={favoritesActive}
                    alt="favoritesActive"
                    className="favoriteImg"
                  />
                ) : (
                  <img
                    src={favoritesNonActive}
                    alt="favoritesNonActive"
                    className="favoriteImg"
                  />
                )}
              </button>
            </div>
            <ul className={styles.specs__list}>
              <li>
                <span className={styles.item__span}>Screen </span>
                <span className={styles.bold__span}>{currentModel.screen}</span>
              </li>
              <li>
                <span className={styles.item__span}>Resolution </span>
                <span className={styles.bold__span}>
                  {currentModel.resolution}
                </span>
              </li>
              <li>
                <span className={styles.item__span}>Processor </span>
                <span className={styles.bold__span}>
                  {currentModel.processor}
                </span>
              </li>
              <li>
                <span className={styles.item__span}>Ram </span>
                <span className={styles.bold__span}>{currentModel.ram}</span>
              </li>
            </ul>
          </div>
        </aside>
      </main>
      <div className={styles.description__wrapper}>
        <article className={styles.description__article}>
          <h3 className={styles.article__title}>About</h3>
          <div className={styles.line}></div>
          {currentModel.description.map((desc, index) => (
            <article key={index}>
              <h4 className={styles.description__title}>{desc.title}</h4>
              {desc.text.map((paragraph, i) => (
                <p key={i} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </article>
        <article className={styles.description__article}>
          <h3 className={styles.article__title}>Tech specs</h3>
          <div className={styles.line}></div>
          <ul className={styles.specs__list}>
            <li>
              <span className={styles.item__span}>Screen </span>
              <span className={styles.bold__span}>{currentModel.screen}</span>
            </li>
            <li>
              <span className={styles.item__span}>Resolution </span>
              <span className={styles.bold__span}>
                {currentModel.resolution}
              </span>
            </li>
            <li>
              <span className={styles.item__span}>Processor </span>
              <span className={styles.bold__span}>
                {currentModel.processor}
              </span>
            </li>
            <li>
              <span className={styles.item__span}>Ram </span>
              <span className={styles.bold__span}>{currentModel.ram}</span>
            </li>
            <li>
              <span className={styles.item__span}>Built in memory</span>
              <span className={styles.bold__span}>{currentModel.capacity}</span>
            </li>
            {'camera' in currentModel && currentModel.camera && (
              <li>
                <span className={styles.item__span}>Camera</span>
                <span className={styles.bold__span}>{currentModel.camera}</span>
              </li>
            )}
            {'zoom' in currentModel && currentModel.zoom && (
              <li>
                <span className={styles.item__span}>Zoom</span>
                <span className={styles.bold__span}>{currentModel.zoom}</span>
              </li>
            )}
            <li>
              <span className={styles.item__span}>Cell</span>
              <span className={styles.bold__span}>
                {currentModel.cell.join(', ')}
              </span>
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
};
