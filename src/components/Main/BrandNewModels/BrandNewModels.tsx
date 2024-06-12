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
        <div className={style.brandNewModels__nav}>
          <h2 className={style.brandNewModels__title}>{t('newModels')}</h2>
          <div className={classNames(style.brandNewModels__rightSide)}>
            <button className={style.brandNewModels__buttons}>
              <ArrowLeft />
            </button>
            <button className={style.brandNewModels__buttons}>
              <ArrowRight />
            </button>
          </div>
        </div>

        <div className={style.brandNewModels__wrapper}>
          <ul className={style.brandNewModels__phoneCard}>
            {products.map(product => (
              <li className={style.brandNewModels__container} key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={style.brandNewModels__imgPhone}
                />
                <div className={style.brandNewModels__cardContent}>
                  <div className={style.brandNewModels__containerForPhoneName}>
                    <h2 className={style.brandNewModels__phoneName}>
                      {product.name}
                    </h2>
                  </div>

                  <p className={style.brandNewModels__phonePrice}>
                    &#36;{product.price}
                  </p>
                  <p className={style.brandNewModels__line} />

                  <div className={style.brandNewModels__info}>
                    <p className={style.brandNewModels__valueName}>
                      {t('screen')}
                    </p>
                    <p className={style.brandNewModels__value}>
                      {product.screen}
                    </p>
                  </div>
                  <div className={style.brandNewModels__info}>
                    <p className={style.brandNewModels__valueName}>
                      {t('capacity')}
                    </p>
                    <p className={style.brandNewModels__value}>
                      {product.capacity}
                    </p>
                  </div>
                  <div className={style.brandNewModels__info}>
                    <p className={style.brandNewModels__valueName}>
                      {t('ram')}
                    </p>
                    <p className={style.brandNewModels__value}>{product.ram}</p>
                  </div>
                </div>

                <div className={style.brandNewModels__wrapButtons}>
                  <button className={style.brandNewModels__addToCart}>
                    {t('addToCart')}
                  </button>
                  <button className={style.brandNewModels__favBtn}>
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
