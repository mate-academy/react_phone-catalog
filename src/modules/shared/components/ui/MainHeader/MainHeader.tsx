import React, { useContext } from 'react';
import './MainHeader.scss';
import { Breadcrumbs } from '../Breadcrumbs';
import { SectionTitle } from '../../TextSections/SectionTitle/SectionTitle';
import { getText } from '../../../servises/getText';
import { TranslationContext } from '../../../../../i18next/shared/TranslationContext';

type MainHeaderProps = {
  pageTitle: string;
  productAmount: number;
};

export const MainHeader: React.FC<MainHeaderProps> = ({
  pageTitle,
  productAmount,
}) => {
  const { additionalText } = useContext(TranslationContext);

  return (
    <header className="main-header">
      <div className="main-header__wrapper">
        <div className="main-header__top">
          <Breadcrumbs />
          <SectionTitle text={pageTitle} />
        </div>
        <span className="main-header__count">
          {`${getText(additionalText.productAmountCategory, productAmount.toString())}`}
        </span>
      </div>
    </header>
  );
};
