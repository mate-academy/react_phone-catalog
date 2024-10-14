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
import { Skeleton } from '../Skeleton/Skeleton';
import { useAddCartFavorit } from '../../../hooks/useAddCartFavorit';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../components/Themes/ThemeProvider';

type Props = {
  variant: 'HomePage' | 'ListPage';
  product?: ProductType;
};

const ProductCard: React.FC<Props> = ({ variant, product }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const { handleToBasket, handleToFavorit, includesBacket, includesFavorit } =
    useAddCartFavorit(product?.itemId);

  const handleViewItem = () => {
    if (!product) {
      return;
    }

    navigate(`/${product.category}/${product.itemId}`);
  };

  return (
    <CardStyled variant={variant} onClick={handleViewItem}>
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
              css="width: 40px; flex-shrink: 0; cursor: pointer;"
              onFunc={handleToFavorit}
            >
              {includesFavorit() ? (
                <FAVORIT_SVG fill={theme.favoritIconColor} />
              ) : (
                <LIKE_SVG />
              )}
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
