import classNames from 'classnames';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Phone } from '../../type/Phone';

type Props = {
  phone: Phone | null;
};

export const Breadcrumbs: React.FC<Props> = ({
  phone,
}) => {
  const location = useLocation();

  let currentLink = '';

  const crumbs = location.pathname.split('/').filter(crumb => crumb !== '');

  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const findPhoneName = (phon: Phone, crumb: string) => {
    if (crumb === phon.itemId) {
      return phon.name;
    }

    return capitalizeFirstLetter(crumb);
  };

  return (
    <div
      className="breadcrumbs"
      data-cy="breadCrumbs"
    >

      <Link to="/">
        <img src="./images/icons/Home.svg" alt="home" />
      </Link>
      {crumbs.map((crumb, index) => {
        currentLink += `/${crumb}`;

        return (
          <div className="breadcrumbs__item">
            <img
              src="./images/icons/ArrowRightDisabled.svg"
              alt="ArrowRightDisabled"
            />
            <Link
              to={currentLink}
              className={classNames(
                'breadcrumbs__crumb',
                { 'breadcrumbs__crumb--disabled': index === crumbs.length - 1 },
              )}
              key={crumb}
            >
              {phone
                ? findPhoneName(phone, crumb)
                : capitalizeFirstLetter(crumb)}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
