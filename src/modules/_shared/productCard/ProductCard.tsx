import {
  ButtonsBlockStyled,
  CardStyled,
  CountBlockStyled,
  ImgStyled,
  InfoBlockStyled,
  InfoStyled,
  NameBlockStyled,
  RegularPriceStyled,
  SkeletonImg,
} from './styled';
import { Button } from '../../../components/Button/Button';
import { FAVORIT_SVG, LIKE_SVG } from '../../../utils/SVG';
import { useTranslation } from 'react-i18next';
import { StrCode } from '../../../utils/enums';
import { ProductType } from '../../../types/productsType';
import { addBacketId } from '../../../features/basketSlice';
import { addFavoritId, deleteFavoritId } from '../../../features/favoritSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hookStore';
import { Skeleton } from '../Skeleton/Skeleton';

type Props = {
  variant: 'HomePage' | 'ListPage';
  product?: ProductType;
};

const ProductCard: React.FC<Props> = ({ variant, product }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { backetsId } = useAppSelector(state => state.backets);
  const { favoritId } = useAppSelector(state => state.favorit);

  const handleToBasket = () => {
    if (!product) {
      return;
    }

    dispatch(addBacketId(product.itemId));
  };

  const handleToFavorit = () => {
    if (!product) {
      return;
    }

    if (favoritId.includes(product.itemId)) {
      dispatch(deleteFavoritId(product.itemId));
    } else {
      dispatch(addFavoritId(product.itemId));
    }
  };

  const includesBacket = () => {
    if (!product) {
      return;
    }

    return backetsId.includes(product.itemId);
  };

  const includesFavorit = () => {
    if (!product) {
      return false;
    }

    return favoritId.includes(product.itemId);
  };

  return (
    <CardStyled variant={variant}>
      {product ? (
        <>
          <ImgStyled src={product.image} variant={variant} />

          <NameBlockStyled>{product.name}</NameBlockStyled>

          <CountBlockStyled>
            ${product.price}
            <RegularPriceStyled>${product.fullPrice}</RegularPriceStyled>
          </CountBlockStyled>

          <InfoBlockStyled>
            <div>
              {t(StrCode.Screen)}
              <InfoStyled>{product.screen}</InfoStyled>
            </div>

            <div>
              {t(StrCode.Capacity)}
              <InfoStyled>{product.capacity}</InfoStyled>
            </div>

            <div>
              {t(StrCode.Ram)}
              <InfoStyled>{product.ram}</InfoStyled>
            </div>
          </InfoBlockStyled>

          <ButtonsBlockStyled>
            <Button
              variant={includesBacket() ? 'activate' : 'dark'}
              css="width: 100%; padding: 0; text-align: center;"
              onFunc={handleToBasket}
            >
              {includesBacket() ? t(StrCode.Added) : t(StrCode.AddToCard)}
            </Button>

            <Button
              variant={includesFavorit() ? 'disabled' : 'white'}
              css="width: 40px; flex-shrink: 0;"
              onFunc={handleToFavorit}
            >
              {includesFavorit() ? <FAVORIT_SVG /> : <LIKE_SVG />}
            </Button>
          </ButtonsBlockStyled>
        </>
      ) : (
        <>
          <SkeletonImg>
            <Skeleton />
          </SkeletonImg>

          <Skeleton height="58px" />

          <Skeleton height="31px" />

          <InfoBlockStyled>
            <Skeleton height="15px" />
            <Skeleton height="15px" />
            <Skeleton height="15px" />
          </InfoBlockStyled>

          <ButtonsBlockStyled>
            <Skeleton height="40px" />

            <Skeleton height="40px" width="40px" />
          </ButtonsBlockStyled>
        </>
      )}
    </CardStyled>
  );
};

export default ProductCard;
