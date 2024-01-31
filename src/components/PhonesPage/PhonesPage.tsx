/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import { SectionHeader } from '../SectionHeader';
import { PhoneCard } from '../PhoneCard';
import { PagePagination } from '../PagePagination/PagePagination';

import './PhonesPage.scss';
import { PageFilter } from '../PageFilter/PageFilter';

const phonesPages = [1, 2, 3, 4, 5];

export const PhonesPage = () => {
  return (
    <div className="main__phones-page phones-page">
      <div className="phones-page__nav phones-page-nav">
        <Link
          to="/"
          className="phones-page-nav__home"
        />
        <Link
          to="/phones"
          className="
            phones-page-nav__link
            phones-page-nav__link--current
          "
        >
          Phones
        </Link>
      </div>
      <div className="phones-page__title">
        <SectionHeader title="Mobile phones" />
        <p className="phones-page__subtitle">
          95 models
        </p>
      </div>
      <PageFilter />
      <div className="phones-page__cards">
        <PhoneCard />
        <PhoneCard />
        <PhoneCard />
        <PhoneCard />
        <PhoneCard />
        <PhoneCard />
        <PhoneCard />
        <PhoneCard />
        <PhoneCard />
        <PhoneCard />
        <PhoneCard />
        <PhoneCard />
        <PhoneCard />
        <PhoneCard />
        <PhoneCard />
      </div>
      <PagePagination pages={phonesPages} />
    </div>
  );
};
