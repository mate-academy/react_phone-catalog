import React, { useEffect } from 'react';
import './Card.scss';
import '../../text.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { Product } from '../../type/Product';
import { CardButton } from '../CardButton/CardButton';
import { useTranslation } from 'react-i18next';

type Props = {
  product: Product;
};

export const Card: React.FC<Props> = ({ product }) => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const currentLanguage = searchParams.get('lang') || 'en';

  useEffect(() => {
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="card">
      <div className="card__content">
        <Link
          className="card__link"
          to={`/${product.category}/${product.itemId}?lang=${currentLanguage}`}
        >
          <img
            className="card__photo"
            src={`/react_phone-catalog/${product.image}`}
            alt={product.name}
          />
        </Link>

        <Link
          className="card__link"
          to={`/${product.category}/${product.itemId}`}
        >
          <span className="card__title text--body">{product.name}</span>
        </Link>
        <div className="card__price text--h3">
          <span className="card__price--new">${product.price}</span>
          <span className="card__price--old">${product.fullPrice}</span>
        </div>

        <span className="card__line"></span>
        <div className="card__info text--small">
          <div className="card__row">
            <span className="card__info--name">{t('cardText.0')}</span>
            <span className="card__info--text">{product.screen}</span>
          </div>
          <div className="card__row">
            <span className="card__info--name">{t('cardText.1')}</span>
            <span className="card__info--text">{product.capacity}</span>
          </div>
          <div className="card__row">
            <span className="card__info--name">{t('cardText.2')}</span>
            <span className="card__info--text">{product.ram}</span>
          </div>
        </div>
        <CardButton product={product} isBigCard={false} />
      </div>
    </div>
  );
};
