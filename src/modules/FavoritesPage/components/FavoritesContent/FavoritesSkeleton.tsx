//#region imports
import { PageTitleSkeleton } from '../../../shared/components/PageTitle';
import { ProductListSkeleton } from '../../../shared/components/ProductList';
import baseStyles from './base.module.scss';
//#endregion

export const FavoritesSkeleton = () => (
  <div className={baseStyles.favorites} role="status" aria-busy="true">
    <PageTitleSkeleton withCount={true} />

    <ProductListSkeleton />
  </div>
);
