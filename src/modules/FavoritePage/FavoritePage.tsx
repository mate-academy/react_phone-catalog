import { useTranslation } from 'react-i18next';
import BreadCrumbs from '../_shared/BreadCrumbs/BreadCrumbs';
import { FavoritePageStyled, ModelsStyled, TitleStyled } from './styled';
import { useAppSelector } from '../../hooks/hookStore';
import { StrCode } from '../../utils/enums';
import ProductList from '../_shared/ProductList/ProductList';

const FavoritePage = () => {
  const { t } = useTranslation();
  const { products } = useAppSelector(state => state.products);
  const { favoritId } = useAppSelector(state => state.favorit);

  const productFilter = products.filter(item => favoritId.includes(item.itemId));

  return (
    <FavoritePageStyled>
      <BreadCrumbs />

      <TitleStyled>
        Favourites
      </TitleStyled>

      <ModelsStyled>{`${productFilter.length} ${t(StrCode.Models)}`}</ModelsStyled>

      <ProductList
        productLength={products.length}
        products={productFilter}
      />
    </FavoritePageStyled>
  );
};

export default FavoritePage;
