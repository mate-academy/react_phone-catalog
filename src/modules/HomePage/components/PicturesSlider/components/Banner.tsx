import React from 'react';
import './Banner.scss';
import { useLanguage } from '../../../../../context/LanguageContext';
import { AllAvailablePages } from '../../../../../types/allAvailablePages';

type Props = {
  className: string;
  openPage: (value: AllAvailablePages) => void;
};

export const Banner: React.FC<Props> = ({ className, openPage }) => {
  const { texts } = useLanguage();

  return (
    <div className={`banner ${className}`}>
      <div className="banner__region-text">
        <h4 className="banner__title">{`${texts.nowAvailableInOurStore}`}</h4>
        <p className="banner__subtitle">{texts.byTheFirst}</p>
      </div>
      <button className="banner__button" onClick={() => openPage('/cart')}>
        <span className="banner__button-text">{texts.orderNow}</span>
      </button>
    </div>
  );
};
