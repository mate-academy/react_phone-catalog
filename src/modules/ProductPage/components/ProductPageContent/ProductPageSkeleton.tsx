//#region imports
import { useTranslation } from 'react-i18next';
import { PageTitleSkeleton } from '../../../shared/components/PageTitle';
import { ProductListSkeleton } from '../../../shared/components/ProductList';
import { DropdownSkeleton } from '../Dropdown';
import baseStyles from './base.module.scss';
//#endregion

export const ProductPageSkeleton = () => {
  const { t } = useTranslation('productPage');

  return (
    <section role="status" aria-busy="true" aria-label={t('loading')}>
      <div className={baseStyles.titleWrapper}>
        <PageTitleSkeleton withCount={true} />
      </div>

      <div className={baseStyles.dropdowns}>
        <div className={baseStyles.sortDropdown}>
          <DropdownSkeleton />
        </div>

        <div className={baseStyles.perPageDropdown}>
          <DropdownSkeleton />
        </div>
      </div>

      <ProductListSkeleton />
    </section>
  );
};
