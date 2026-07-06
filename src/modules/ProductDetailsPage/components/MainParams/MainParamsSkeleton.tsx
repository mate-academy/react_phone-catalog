//#region imports
import { ProductOptionsSkeleton } from '../ProductOptions';
import { PurchaseBlockSkeleton } from '../PurchaseBlock';
import { TechSpecsSkeleton } from '../TechSpecsList';
import baseStyles from './base.module.scss';
//#endregion

export const MainParamsSkeleton = () => (
  <div className={baseStyles.mainParams}>
    <ProductOptionsSkeleton />

    <PurchaseBlockSkeleton />

    <TechSpecsSkeleton variant="summary" />
  </div>
);
