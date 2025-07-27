import './HomePage.scss';
import { useProductForHomePage } from '../../hooks/useProductsForHomePage';
import { MainSlider } from '../../Components/MainSlider';
import { ShopByCategory } from '../../Components/ShopByCategories';
import { SliderForProduct } from '../../Components/SliderForProduct';
import { useTranslationState } from '../../stateManagers/languageState';

export const HomePage = () => {
  const {
    loading,
    amountPhones,
    amountTablets,
    amountAccessories,
    newProducts,
    hotPriceProducts,
  } = useProductForHomePage();

  const { translate } = useTranslationState();

  return (
    <>
      <div className="page-title">
        <h1>{translate('Welcome to Nice Gadgets store!')}</h1>
      </div>
      <MainSlider />

      <SliderForProduct
        loading={loading}
        visibleProducts={newProducts}
        title={translate('Brand new models')}
      />

      <ShopByCategory
        amountPhones={amountPhones}
        amountTablets={amountTablets}
        amountAccessories={amountAccessories}
      />

      <SliderForProduct
        loading={loading}
        visibleProducts={hotPriceProducts}
        title={translate('Hot prices')}
      />
    </>
  );
};
