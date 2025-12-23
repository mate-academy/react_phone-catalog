import React from 'react';
import phones from '../../../public/api/phones.json';
import { useNavigate, useParams } from 'react-router-dom';
import { NotFoundProduct } from '../NotFoundProduct/NotFoundProduct';
import styles from './PhonePage.module.scss';
import HomeIcon from '../../icons/home_icon.png';
import RightArrow from '../../icons/arrows/Disabled_right.png';
import BackArrow from '../../icons/arrows/Active_left.png';
import Favorites from '../../icons/favorites_icon.png';
import { Product, ProductSlider } from '../ProductSlider/ProductSlider';

export const PhonePage: React.FC = () => {
  const navigate = useNavigate();

  const { phoneId } = useParams<{ phoneId: string }>();
  const phone = phones.find(p => p.id === phoneId);
  const youMayAlsoLikePhones = phones
    .filter(p => p.id !== phoneId)
    .slice(0, 11);
  const YOU_MAY_ALSO_LIKE_TITLE = 'You may also like';


  const formattedProducts: Product[] = youMayAlsoLikePhones.map((item) => ({
    ...item,
    price: item.priceDiscount,
    fullPrice: item.priceRegular,
    image: item.images[0],
  }))

  if (!phone) {
    return <NotFoundProduct />
  }
  return (
    <div className={styles.phone_page}>
      <div className={styles.phone_page__container}>
        <div className={styles.phone_page__path}>
          <img src={HomeIcon} alt="Home page" className={styles.phone_page__path__icon} />
          <img src={RightArrow} alt="Next" className={styles.phone_page__path__arrow} />
          <p className={styles.phone_page__path__text}>Phones</p>
          <img src={RightArrow} alt="Next" className={styles.phone_page__path__arrow} />
          <p className={styles.phone_page__path__name}>{phone.name}</p>
        </div>

        <div className={styles.phone_page__back} onClick={() => navigate(-1)}>
          <img src={BackArrow} alt="Back" className={styles.phone_page__back__icon} />
          <p className={styles.phone_page__back__text}>Back</p>
        </div>

        <h2 className={styles.phone_page__title}>{phone.name}</h2>

        <div className={styles.phone_page__main_info}>
          <div className={styles.phone_page__main_info__images}>
            <div className={styles.phone_page__main_info__images__side}>
              {phone.images.map(img => (
                <div
                  key={img.indexOf(img)}
                  className={styles.phone_page__main_info__images__side__image}
                >
                  <img
                    src={img}
                    alt="Product photo"
                    className={styles.phone_page__main_info__images__side__image__img}
                  />
                </div>
              ))}
            </div>
            <div className={styles.phone_page__main_info__images__main_image}>
              <img
                src={phone.images[0]}
                alt="Main product photo"
                className={styles.phone_page__main_info__images__main_image__img}
              />
            </div>
          </div>

          <div className={styles.phone_page__main_info__options}>
            <p className={styles.phone_page__main_info__options__text}>Avaliable colors</p>
            <div className={styles.phone_page__main_info__options__colors}>
              {phone.colorsAvailable.map(color => (
                <button
                  key={color.indexOf(color)}
                  className={styles.phone_page__main_info__options__colors__option}
                >
                  {color}
                </button>
              ))}
            </div>

            <div className={styles.phone_page__main_info__options__capacity}>
              <p className={styles.phone_page__main_info__options__text}>Select capacity</p>
              <div className={styles.phone_page__main_info__options__capacity__buttons}>
                {phone.capacityAvailable.map(capacity => (
                  <button
                    key={capacity.indexOf(capacity)}
                    className={styles.phone_page__main_info__options__capacity__options}
                  >
                    {capacity}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.phone_page__main_info__options__price}>
              <p className={styles.phone_page__main_info__options__price__main_price}>${phone.priceDiscount}</p>
              <p className={styles.phone_page__main_info__options__price__full_price}>${phone.priceRegular}</p>
            </div>

            <div className={styles.phone_page__main_info__options__buttons}>
              <button className={styles.phone_page__main_info__options__buttons__cart}>Add to cart</button>
              <button className={styles.phone_page__main_info__options__buttons__fav}>
                <img
                  src={Favorites}
                  alt="Add to favorites"
                  className={styles.phone_page__main_info__options__buttons__fav__icon}
                />
              </button>
            </div>

            <div className={styles.phone_page__main_info__options__description}>
              <div className={styles.phone_page__main_info__options__description__line}>
                <p className={styles.phone_page__main_info__options__description__line__text}>Screen</p>
                <p className={styles.phone_page__main_info__options__description__line__value}>{phone.screen}</p>
              </div>
              <div className={styles.phone_page__main_info__options__description__line}>
                <p className={styles.phone_page__main_info__options__description__line__text}>Resolution</p>
                <p className={styles.phone_page__main_info__options__description__line__value}>{phone.resolution}</p>
              </div>
              <div className={styles.phone_page__main_info__options__description__line}>
                <p className={styles.phone_page__main_info__options__description__line__text}>Processor</p>
                <p className={styles.phone_page__main_info__options__description__line__value}>{phone.processor}</p>
              </div>
              <div className={styles.phone_page__main_info__options__description__line}>
                <p className={styles.phone_page__main_info__options__description__line__text}>RAM</p>
                <p className={styles.phone_page__main_info__options__description__line__value}>{phone.ram}</p>
              </div>
            </div>

          </div>
          <div className={styles.phone_page__main_info__id}>
            <p className={styles.phone_page__main_info__id__text}>ID:</p>
          </div>
        </div>

        <div className={styles.phone_page__info}>
          <div className={styles.phone_page__info__about}>
            <h2 className={styles.phone_page__info__title}>About</h2>
            <div className={styles.phone_page__info__about__container}>
              {phone.description.map(p => (
                <>
                  <p
                    key={p.title}
                    className={styles.phone_page__info__about__title}
                  >
                    {p.title}
                  </p>
                  {p.text.map(text => (
                    <p
                      key={text.indexOf(text)}
                      className={styles.phone_page__info__about__description}
                    >
                      {text}
                    </p>
                  ))}
                </>
              ))}
            </div>
          </div>

          <div className={styles.phone_page__info__tech_specs}>
            <h2 className={styles.phone_page__info__title}>Tech specs</h2>
            <div className={styles.phone_page__info__tech_specs__container}>
              <div className={styles.phone_page__info__tech_specs__line}>
                <p className={styles.phone_page__info__tech_specs__line__text}>Screen</p>
                <p className={styles.phone_page__info__tech_specs__line__value}>{phone.screen}</p>
              </div>
              <div className={styles.phone_page__info__tech_specs__line}>
                <p className={styles.phone_page__info__tech_specs__line__text}>Resolution</p>
                <p className={styles.phone_page__info__tech_specs__line__value}>{phone.resolution}</p>
              </div>
              <div className={styles.phone_page__info__tech_specs__line}>
                <p className={styles.phone_page__info__tech_specs__line__text}>Processor</p>
                <p className={styles.phone_page__info__tech_specs__line__value}>{phone.processor}</p>
              </div>
              <div className={styles.phone_page__info__tech_specs__line}>
                <p className={styles.phone_page__info__tech_specs__line__text}>RAM</p>
                <p className={styles.phone_page__info__tech_specs__line__value}>{phone.ram}</p>
              </div>
              <div className={styles.phone_page__info__tech_specs__line}>
                <p className={styles.phone_page__info__tech_specs__line__text}>Built in memory</p>
                <p className={styles.phone_page__info__tech_specs__line__value}>{phone.capacity}</p>
              </div>
              <div className={styles.phone_page__info__tech_specs__line}>
                <p className={styles.phone_page__info__tech_specs__line__text}>Camera</p>
                <p className={styles.phone_page__info__tech_specs__line__value}>{phone.camera}</p>
              </div>
              <div className={styles.phone_page__info__tech_specs__line}>
                <p className={styles.phone_page__info__tech_specs__line__text}>Zoom</p>
                <p className={styles.phone_page__info__tech_specs__line__value}>{phone.zoom}</p>
              </div>
              <div className={styles.phone_page__info__tech_specs__line}>
                <p className={styles.phone_page__info__tech_specs__line__text}>Cell</p>
                <p className={styles.phone_page__info__tech_specs__line__value}>{phone.cell.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* <h2 className={styles.phone_page__title}>You may also like</h2> */}
        <ProductSlider
          title={YOU_MAY_ALSO_LIKE_TITLE}
          products={formattedProducts}
        />
      </div>
    </div>
  );
}
