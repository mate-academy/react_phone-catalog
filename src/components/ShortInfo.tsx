import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { PhoneInfo } from '../type/PhoneInfo';
import { Products } from '../type/Products';
import { AddCartButton } from './AddCartButton';
import { FavButton } from './FavButton';

interface ShortInfoProps {
  description: PhoneInfo;
  currentProduct: Products;
}

export const ShortInfo: React.FC<ShortInfoProps> = ({
  description,
  currentProduct,
}) => {
  const { t } = useTranslation();

  return (
    <div className="description__short-info">
      <div className="description__filter">
        <div className="description__colors">
          <span className="description__colors-title">
            {t('colors')}
          </span>

          <ul className="description__colors-list">
            {description.colorsAvailable.map(color => (
              <li
                className={classNames('description__colors-item',
                  { current__color: description.color === color })}
                key={color}
              >
                <Link
                  className={`description__color ${color}`}
                  to={`/phones/${description.namespaceId}-${description.capacity.toLocaleLowerCase()}-${color}`}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="description__capacity">
          <span
            className="description__capacity-text"
          >
            {t('selectCapacity')}
          </span>

          <ul className="description__capacity-list">
            {description?.capacityAvailable.map(capacity => (
              <li
                key={capacity}
                className="description__capacity-item"
              >
                <Link
                  className={classNames(
                    'description__capacity-link',
                    { current: description.capacity === capacity },
                  )}
                  to={`/phones/${description.namespaceId}-${capacity.toLocaleLowerCase()}-${description.color}`}
                >
                  {capacity}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="description__buy">
        <div className="description__price">
          <span className="description__price-disc">{`$${description.priceDiscount}`}</span>
          <span className="description__price-regular">{`$${description.priceRegular}`}</span>
        </div>

        <div className="description__buttons">
          <AddCartButton phone={currentProduct} />
          <FavButton phone={currentProduct} />
        </div>

        <ul className="description__info">
          <li className="description__info-str">
            <span>{t('screen')}</span>
            <span
              className="description__info-str-value"
            >
              {description.screen}
            </span>
          </li>

          <li className="description__info-str">
            <span>{t('resolution')}</span>
            <span
              className="description__info-str-value"
            >
              {description.resolution}
            </span>
          </li>

          <li className="description__info-str">
            <span>{t('processor')}</span>
            <span
              className="description__info-str-value"
            >
              {description.processor}
            </span>
          </li>

          <li className="description__info-str">
            <span>{t('ram')}</span>
            <span
              className="description__info-str-value"
            >
              {description.ram}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
