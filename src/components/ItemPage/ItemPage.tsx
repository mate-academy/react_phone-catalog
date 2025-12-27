import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NotFoundProduct } from '../NotFoundProduct/NotFoundProduct';
import styles from './ItemPage.module.scss';
import HomeIcon from '../../icons/home_icon.png';
import RightArrow from '../../icons/arrows/Disabled_right.png';
import BackArrow from '../../icons/arrows/Active_left.png';
import Favorites from '../../icons/favorites_icon.png';
import { Product, ProductSlider } from '../ProductSlider/ProductSlider';

export interface ProductDescription {
  title: string;
  text: string[];
}

export interface Item {
  id: string;
  name: string;
  images: string[];
  colorsAvailable: string[];
  capacityAvailable: string[];
  priceDiscount: number;
  priceRegular: number;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
  capacity: string;
  description: ProductDescription[];
}

interface Props {
  categoryName: string;
  items: Item[];
}

export const ItemPage: React.FC<Props> = ({ categoryName, items}) => {
  const navigate = useNavigate();

  const { itemId } = useParams<{ itemId: string }>();
  const item = items.find(i => i.id === itemId);
  const youMayAlsoLike = items
    .filter(i => i.id !== itemId)
    .slice(0, 12);


  const formattedProducts: Product[] = youMayAlsoLike.map((p) => ({
    ...p,
    price: p.priceDiscount,
    fullPrice: p.priceRegular,
    image: p.images[0],
  }))

  if (!item) {
    return <NotFoundProduct />
  }
  return (
    <div className={styles.item_page}>
      <div className={styles.item_page__container}>
        <div className={styles.item_page__path}>
          <img src={HomeIcon} alt="Home page" className={styles.item_page__path__icon} />
          <img src={RightArrow} alt="Next" className={styles.item_page__path__arrow} />
          <p className={styles.item_page__path__text}>{categoryName}</p>
          <img src={RightArrow} alt="Next" className={styles.item_page__path__arrow} />
          <p className={styles.item_page__path__name}>{item.name}</p>
        </div>

        <div className={styles.item_page__back} onClick={() => navigate(-1)}>
          <img src={BackArrow} alt="Back" className={styles.item_page__back__icon} />
          <p className={styles.item_page__back__text}>Back</p>
        </div>

        <h2 className={styles.item_page__title}>{item.name}</h2>

        <div className={styles.item_page__main_info}>
          <div className={styles.item_page__main_info__images}>
            <div className={styles.item_page__main_info__images__side}>
              {item.images.map(img => (
                <div
                  key={img.indexOf(img)}
                  className={styles.item_page__main_info__images__side__image}
                >
                  <img
                    src={img}
                    alt="Product photo"
                    className={styles.item_page__main_info__images__side__image__img}
                  />
                </div>
              ))}
            </div>
            <div className={styles.item_page__main_info__images__main_image}>
              <img
                src={item.images[0]}
                alt="Main product photo"
                className={styles.item_page__main_info__images__main_image__img}
              />
            </div>
          </div>

          <div className={styles.item_page__main_info__options}>
            <p className={styles.item_page__main_info__options__text}>Available colors</p>
            <div className={styles.item_page__main_info__options__colors}>
              {item.colorsAvailable.map(color => (
                <button
                  key={color.indexOf(color)}
                  className={styles.item_page__main_info__options__colors__option}
                >
                  {color}
                </button>
              ))}
            </div>

            <div className={styles.item_page__main_info__options__capacity}>
              <p className={styles.item_page__main_info__options__text}>Select capacity</p>
              <div className={styles.item_page__main_info__options__capacity__buttons}>
                {item.capacityAvailable.map(capacity => (
                  <button
                    key={capacity.indexOf(capacity)}
                    className={styles.item_page__main_info__options__capacity__options}
                  >
                    {capacity}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.item_page__main_info__options__price}>
              <p className={styles.item_page__main_info__options__price__main_price}>${item.priceDiscount}</p>
              <p className={styles.item_page__main_info__options__price__full_price}>${item.priceRegular}</p>
            </div>

            <div className={styles.item_page__main_info__options__buttons}>
              <button className={styles.item_page__main_info__options__buttons__cart}>Add to cart</button>
              <button className={styles.item_page__main_info__options__buttons__fav}>
                <img
                  src={Favorites}
                  alt="Add to favorites"
                  className={styles.item_page__main_info__options__buttons__fav__icon}
                />
              </button>
            </div>

            <div className={styles.item_page__main_info__options__description}>
              <div className={styles.item_page__main_info__options__description__line}>
                <p className={styles.item_page__main_info__options__description__line__text}>Screen</p>
                <p className={styles.item_page__main_info__options__description__line__value}>{item.screen}</p>
              </div>
              <div className={styles.item_page__main_info__options__description__line}>
                <p className={styles.item_page__main_info__options__description__line__text}>Resolution</p>
                <p className={styles.item_page__main_info__options__description__line__value}>{item.resolution}</p>
              </div>
              <div className={styles.item_page__main_info__options__description__line}>
                <p className={styles.item_page__main_info__options__description__line__text}>Processor</p>
                <p className={styles.item_page__main_info__options__description__line__value}>{item.processor}</p>
              </div>
              <div className={styles.item_page__main_info__options__description__line}>
                <p className={styles.item_page__main_info__options__description__line__text}>RAM</p>
                <p className={styles.item_page__main_info__options__description__line__value}>{item.ram}</p>
              </div>
            </div>

          </div>
          <div className={styles.item_page__main_info__id}>
            <p className={styles.item_page__main_info__id__text}>ID:</p>
          </div>
        </div>

        <div className={styles.item_page__info}>
          <div className={styles.item_page__info__about}>
            <h2 className={styles.item_page__info__title}>About</h2>
            <div className={styles.item_page__info__about__container}>
              {item.description.map(p => (
                <>
                  <p
                    key={p.title}
                    className={styles.item_page__info__about__title}
                  >
                    {p.title}
                  </p>
                  {p.text.map(text => (
                    <p
                      key={text.indexOf(text)}
                      className={styles.item_page__info__about__description}
                    >
                      {text}
                    </p>
                  ))}
                </>
              ))}
            </div>
          </div>

          <div className={styles.item_page__info__tech_specs}>
            <h2 className={styles.item_page__info__title}>Tech specs</h2>
            <div className={styles.item_page__info__tech_specs__container}>
              <div className={styles.item_page__info__tech_specs__line}>
                <p className={styles.item_page__info__tech_specs__line__text}>Screen</p>
                <p className={styles.item_page__info__tech_specs__line__value}>{item.screen}</p>
              </div>
              <div className={styles.item_page__info__tech_specs__line}>
                <p className={styles.item_page__info__tech_specs__line__text}>Resolution</p>
                <p className={styles.item_page__info__tech_specs__line__value}>{item.resolution}</p>
              </div>
              <div className={styles.item_page__info__tech_specs__line}>
                <p className={styles.item_page__info__tech_specs__line__text}>Processor</p>
                <p className={styles.item_page__info__tech_specs__line__value}>{item.processor}</p>
              </div>
              <div className={styles.item_page__info__tech_specs__line}>
                <p className={styles.item_page__info__tech_specs__line__text}>RAM</p>
                <p className={styles.item_page__info__tech_specs__line__value}>{item.ram}</p>
              </div>
              <div className={styles.item_page__info__tech_specs__line}>
                <p className={styles.item_page__info__tech_specs__line__text}>Built in memory</p>
                <p className={styles.item_page__info__tech_specs__line__value}>{item.capacity}</p>
              </div>
              {item.camera && (
                <div className={styles.item_page__info__tech_specs__line}>
                  <p className={styles.item_page__info__tech_specs__line__text}>Camera</p>
                  <p className={styles.item_page__info__tech_specs__line__value}>{item.camera}</p>
                </div>
              )}
              {item.zoom && (
                <div className={styles.item_page__info__tech_specs__line}>
                  <p className={styles.item_page__info__tech_specs__line__text}>Zoom</p>
                  <p className={styles.item_page__info__tech_specs__line__value}>{item.zoom}</p>
                </div>
              )}
              <div className={styles.item_page__info__tech_specs__line}>
                <p className={styles.item_page__info__tech_specs__line__text}>Cell</p>
                <p className={styles.item_page__info__tech_specs__line__value}>{item.cell.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>

        <ProductSlider
          title="You may also like"
          products={formattedProducts}
        />
      </div>
    </div>
  );
}
