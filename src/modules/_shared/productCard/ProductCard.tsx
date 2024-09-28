import {
  ButtonsBlockStyled,
  CardStyled,
  CountBlockStyled,
  ImgStyled,
  InfoBlockStyled,
  InfoStyled,
  NameBlockStyled,
  RegularPriceStyled,
} from './styled';
import { Button } from '../../../components/Button/Button';
import { LIKE_SVG } from '../../../utils/SVG';
import { useTranslation } from 'react-i18next';
import { StrCode } from '../../../utils/enums';
import { ProductType } from '../../../types/productsType';
import { addBacketId, deleteBacketId } from '../../../features/basketSlice';
import { addFavoritId, deleteFavoritId } from '../../../features/favoritSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hookStore';

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

    if (backetsId.includes(product.itemId)) {
      dispatch(deleteBacketId(product.itemId));
    } else {
      dispatch(addBacketId(product.itemId));
    }
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

  return (
    <CardStyled variant={variant}>
      {product && (
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
              variant="dark"
              css="width: 100%; padding: 0; text-align: center;"
              onFunc={handleToBasket}
            >
              {t(StrCode.AddToCard)}
            </Button>

            <Button
              variant="white"
              css="width: 40px; flex-shrink: 0;"
              onFunc={handleToFavorit}
            >
              <LIKE_SVG />
            </Button>
          </ButtonsBlockStyled>
        </>
      )}
    </CardStyled>
  );
};

export default ProductCard;
