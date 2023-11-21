import { slides } from '../../assets/slides';
import { Categories } from '../../components/Categories';
import { Promo } from '../../components/UX/Promo';
import { Slider } from '../../components/UX/Slider';
import { Loader } from '../../components/UX/Loader';
import { PromoName } from '../../types/PromoName';
import { useLoadPromoProducts } from '../../customHooks/useLoadPromoProducts';
import { ErrorModal } from '../../components/UX/ErrorModal';

export const HomePage = () => {
  const [
    { hotPrices, brandNew },
    isLoadingPromoProducts,
    hasError,
    promoErrorMessage,
    setPromoErrorMessage,
  ] = useLoadPromoProducts({ hotPrices: [], brandNew: [] });

  return (
    <>
      <Slider slides={slides} />

      {promoErrorMessage && (
        <ErrorModal
          errorMessage={promoErrorMessage}
          setErrorMessage={setPromoErrorMessage}
        />
      )}

      {isLoadingPromoProducts && (
        <Loader />
      )}

      {(!isLoadingPromoProducts && !hasError) && (
        <Promo
          name={PromoName.HotPrices}
          products={hotPrices}
        />
      )}

      <Categories />

      {isLoadingPromoProducts && (
        <Loader />
      )}

      {(!isLoadingPromoProducts && !hasError) && (
        <Promo
          name={PromoName.BrandNew}
          products={brandNew}
        />
      )}
    </>
  );
};
