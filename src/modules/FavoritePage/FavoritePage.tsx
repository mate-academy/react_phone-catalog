import { useTranslation } from 'react-i18next';
import BreadCrumbs from '../_shared/BreadCrumbs/BreadCrumbs';
import {
  FavoritePageStyled,
  ModelsStyled,
  NotFoundStyled,
  TitleStyled,
} from './styled';
import { useAppSelector } from '../../hooks/hookStore';
import { StrCode } from '../../utils/enums';
import ProductList from '../_shared/ProductList/ProductList';
import { NotFoundImg } from '../ProductsPage/styled';

const FavoritePage = () => {
  const { t } = useTranslation();
  const { products } = useAppSelector(state => state.products);
  const { favoritId } = useAppSelector(state => state.favorit);

  const productFilter = products.filter(item =>
    favoritId.includes(item.itemId),
  );

  return (
    <FavoritePageStyled>
      <BreadCrumbs />

      <TitleStyled>{t(StrCode.Favourites)}</TitleStyled>

      {favoritId.length ? (
        <ModelsStyled>{`${productFilter.length} ${t(StrCode.Models)}`}</ModelsStyled>
      ) : (
        <>
          <NotFoundStyled>{t(StrCode.NotFavourites)}</NotFoundStyled>

          <NotFoundImg src="/react_phone-catalog/img/product-not-found.png" />
        </>
      )}

      <ProductList productLength={products.length} products={productFilter} />
    </FavoritePageStyled>
  );
};

export default FavoritePage;
