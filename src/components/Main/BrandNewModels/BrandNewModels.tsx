import style from './BrandNewModels.module.scss';
import { LanguageContext } from '../../../store/LanguageProvider';
import { useContext } from 'react';
import { ArrowRight } from '../../Logos/ArrowRight';
import { ArrowLeft } from '../../Logos/ArrowLeft';
import { ThemeContext } from '../../../store/ThemeProvider';
import classNames from 'classnames';
import { LogoFavorites } from '../../Logos/LogoFavorites';
import { PhoneContext } from '../../../store/PhoneProvider';
export const BrandNewModels = () => {
  const { t } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { products } = useContext(PhoneContext);

  return (
    <section
      className={classNames(style.brandNewModels, {
        [style.brandNewModels__darkTheme]: theme,
      })}
    >
      <div className={style.brandNewModels__slider}>
        <div className={style.brandNewModels__cardHeader}>
          <h2 className={style.brandNewModels__cardTitle}>{t('newModels')}</h2>
          <div className={classNames(style.brandNewModels__cardNavBtns)}>
            <button className={style.brandNewModels__icons}>
              <ArrowLeft />
            </button>
            <button className={style.brandNewModels__icons}>
              <ArrowRight />
            </button>
          </div>
        </div>

        <div className={style.brandNewModels__cardContainer}>
          <ul className={style.brandNewModels__cardsList}>
            {products.map(product => (
              <li className={style.brandNewModels__card} key={product.id}>
                <a href="#" className={style.brandNewModels__cardLink}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={style.brandNewModels__cardImg}
                  />
                </a>
                <div className={style.brandNewModels__cardContent}>
                  <div className={style.brandNewModels__containerCardName}>
                    <h2 className={style.brandNewModels__cardName}>
                      {product.name}
                    </h2>
                  </div>

                  <p className={style.brandNewModels__phonePrice}>
                    &#36;{product.price}
                  </p>
                  <span className={style.brandNewModels__cardLine} />

                  <div className={style.brandNewModels__cardDescription}>
                    <p className={style.brandNewModels__key}>{t('screen')}</p>
                    <p className={style.brandNewModels__value}>
                      {product.screen}
                    </p>
                  </div>
                  <div className={style.brandNewModels__cardDescription}>
                    <p className={style.brandNewModels__key}>{t('capacity')}</p>
                    <p className={style.brandNewModels__value}>
                      {product.capacity}
                    </p>
                  </div>
                  <div className={style.brandNewModels__cardDescription}>
                    <p className={style.brandNewModels__key}>{t('ram')}</p>
                    <p className={style.brandNewModels__value}>{product.ram}</p>
                  </div>
                </div>

                <div className={style.brandNewModels__cardActions}>
                  <button className={style.brandNewModels__addToCard}>
                    {t('addToCart')}
                  </button>
                  <button className={style.brandNewModels__CardfavBtn}>
                    <LogoFavorites />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
