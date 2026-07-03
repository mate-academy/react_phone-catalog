//#region imports
import { CapacityItemSkeleton } from './components/CapacityItem';
import { ColorItemSkeleton } from './components/ColorItem';
import { ParamSelectorSkeleton } from '../ParamSelector';
import baseStyles from './base.module.scss';
//#endregion

export const ProductOptionsSkeleton = () => {
  return (
    <div className={baseStyles.productOptions}>
      <ParamSelectorSkeleton paramItem={<ColorItemSkeleton />} />

      <ParamSelectorSkeleton paramItem={<CapacityItemSkeleton />} />
    </div>
  );
};
