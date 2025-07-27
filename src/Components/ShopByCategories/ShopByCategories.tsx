import { useTranslationState } from '../../stateManagers/languageState';
import './ShopByCategoties.scss';
import { Link } from 'react-router-dom';
import logoPhones from '../../../public/img/Phones.png';
import logoTablets from '../../../public/img/Tablets.png';
import logoAccessories from '../../../public/img/Accessories.png';
import { useThemeState } from '../../stateManagers/themeState';

interface ShopByCategoryProps {
  amountPhones: number;
  amountTablets: number;
  amountAccessories: number;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({
  amountPhones,
  amountTablets,
  amountAccessories,
}) => {
  const { translate } = useTranslationState();
  const { theme } = useThemeState();

  return (
    <section className="categories">
      <h2>{translate('Shop by category')}</h2>

      <div className="categories__container">
        <article className={`redirect redirect--${theme}`}>
          <Link to="phones">
            <img
              src={logoPhones}
              alt="picturePhones"
            />
          </Link>
          <div className="contain-text">
            <p>{translate('phones')}</p>
            <span>
              {amountPhones} {translate('models')}
            </span>
          </div>
        </article>

        <article className={`redirect redirect--${theme}`}>
          <Link to="tablets">
            <img
              src={logoTablets}
              alt="pictureTablets"
            />
          </Link>
          <div className="contain-text">
            <p>{translate('tablets')}</p>
            <span>
              {amountTablets} {translate('models')}
            </span>
          </div>
        </article>

        <article className={`redirect redirect--${theme}`}>
          <Link to="accessories">
            <img
              src={logoAccessories}
              alt="pictureAccessories"
            />
          </Link>
          <div className="contain-text">
            <p>{translate('accessories')}</p>
            <span>
              {amountAccessories} {translate('models')}
            </span>
          </div>
        </article>
      </div>
    </section>
  );
};
