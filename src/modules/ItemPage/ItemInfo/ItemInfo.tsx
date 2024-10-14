import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button/Button';
import { useAddCartFavorit } from '../../../hooks/useAddCartFavorit';
import { AccessoryType } from '../../../types/productsType';
import { StrCode } from '../../../utils/enums';
import {
  BlockStyled,
  ButtonColorInStyled,
  ButtonsBlockStyled,
  ButtonsStyled,
  ColorButtonStyled,
  CountBlockStyled,
  InfoBlockStyled,
  InfoStyled,
  ItemInfoStyled,
  RegularPriceStyled,
} from './styled';
import { FAVORIT_SVG, LIKE_SVG } from '../../../utils/SVG';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../components/Themes/ThemeProvider';

type Props = {
  product: AccessoryType;
};

const ItemInfo: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();
  const { handleToBasket, handleToFavorit, includesBacket, includesFavorit } =
    useAddCartFavorit(product.id);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { theme } = useTheme();

  const changeProduct = (newProductId: string) => {
    const basePath = pathname.split('/')[1];

    navigate(`/${basePath}/${newProductId}`);
  };

  const handleReplase = (oldRout: string, newRout: string) => {
    if (!productId || oldRout === newRout) {
      return;
    }

    const formattedOldRout = oldRout.toLowerCase().replace(/\s+/g, '-');
    const formattedNewRout = newRout.toLowerCase().replace(/\s+/g, '-');
    const formatParam = productId.replace(formattedOldRout, formattedNewRout);

    changeProduct(formatParam);
  };

  return (
    <ItemInfoStyled>
      <BlockStyled>
        {t(StrCode.AvailableColor)}

        <ButtonsStyled>
          {product.colorsAvailable.map(item => (
            <ColorButtonStyled
              isActive={item === product.color}
              onClick={() => handleReplase(product.color, item)}
              key={item}
            >
              <ButtonColorInStyled
                style={{
                  backgroundColor: item !== 'space gray' ? item : 'gray',
                }}
              />
            </ColorButtonStyled>
          ))}
        </ButtonsStyled>
      </BlockStyled>

      <BlockStyled>
        {t(StrCode.SelectCapacity)}

        <ButtonsStyled>
          {product.capacityAvailable.map(item => (
            <Button
              variant={item === product.capacity ? 'capacity' : 'notCapacity'}
              onFunc={() => handleReplase(product.capacity, item)}
              key={item}
            >
              {item}
            </Button>
          ))}
        </ButtonsStyled>
      </BlockStyled>

      <CountBlockStyled>
        ${product.priceDiscount}
        <RegularPriceStyled>${product.priceRegular}</RegularPriceStyled>
      </CountBlockStyled>

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

      <InfoBlockStyled>
        <div>
          {t(StrCode.Screen)}
          <InfoStyled>{product.screen}</InfoStyled>
        </div>

        <div>
          {t(StrCode.Resolution)}
          <InfoStyled>{product.resolution}</InfoStyled>
        </div>

        <div>
          {t(StrCode.Processor)}
          <InfoStyled>{product.processor}</InfoStyled>
        </div>

        <div>
          {t(StrCode.Ram)}
          <InfoStyled>{product.ram}</InfoStyled>
        </div>
      </InfoBlockStyled>
    </ItemInfoStyled>
  );
};

export default ItemInfo;
