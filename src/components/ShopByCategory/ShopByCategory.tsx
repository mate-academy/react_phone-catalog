import { NavLink } from 'react-router-dom';
import phoneImage from '/img/categories/category-phones.webp';
import tabletImage from '/img/categories/category-tablets.webp';
import phonesImage from '/img/categories/category-accessories.webp';
import { usePhones } from '../../context/PhonesContext';
import { useTablets } from '../../context/TabletsContext';
import { useAccessories } from '../../context/AccessoriesContext';

import { useTranslation } from 'react-i18next';

export const ShopByCategory = () => {
  const phonesLength = usePhones().length;
  const tabletsLength = useTablets().length;
  const accessoriesLength = useAccessories().length;

  const { t } = useTranslation('shopbycategory');

  return (
    <section className="mt-14 tablet:mt-16 desktop:mt-20">
      <div className="flex flex-col">
        <h2 className="h2 text-primary dark:text-dark-primary mb-5 self-start">
          {t('title')}
        </h2>

        <div className="flex flex-col tablet:flex-row gap-[22px]">
          <NavLink
            to="/phones"
            className="flex flex-col w-full tablet:w-1/3 desktop:w-1/3"
          >
            <div className="w-full aspect-square mb-4 transition-transform duration-300 hover:scale-110 hover:z-10">
              <img
                src={phoneImage}
                alt="Phone"
                className="w-full h-full object-cover"
              />
            </div>

            <h4 className="text-primary dark:text-dark-primary mb-1">
              <span className="relative inline-block group">
                <span className="relative z-10">{t('phones')}</span>
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
              </span>
            </h4>

            <p className="text-secondary dark:text-dark-secondary mb-6">
              {phonesLength} {t('models')}
            </p>
          </NavLink>

          <NavLink
            to="/tablets"
            className="flex flex-col w-full tablet:w-1/3 desktop:w-1/3 "
          >
            <div className="w-full aspect-square mb-4 transition-transform duration-300 hover:scale-110 hover:z-10">
              <img
                src={tabletImage}
                alt="Tablets"
                className="w-full h-full object-cover"
              />
            </div>

            <h4 className="text-primary dark:text-dark-primary mb-1">
              <span className="relative inline-block group">
                <span className="relative z-10">{t('tablets')}</span>
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
              </span>
            </h4>

            <p className="text-secondary dark:text-dark-secondary mb-6">
              {tabletsLength} {t('models')}
            </p>
          </NavLink>

          <NavLink
            to="/accessories"
            className="flex flex-col w-full tablet:w-1/3 desktop:w-1/3"
          >
            <div className="w-full aspect-square mb-4 transition-transform duration-300 hover:scale-110 hover:z-10">
              <img
                src={phonesImage}
                alt="Phone"
                className="w-full h-full object-cover"
              />
            </div>

            <h4 className="text-primary dark:text-dark-primary mb-1">
              <span className="relative inline-block group">
                <span className="relative z-10">{t('accessories')}</span>
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
              </span>
            </h4>

            <p className="text-secondary dark:text-dark-secondary">
              {accessoriesLength} {t('models')}
            </p>
          </NavLink>
        </div>
      </div>
    </section>
  );
};
