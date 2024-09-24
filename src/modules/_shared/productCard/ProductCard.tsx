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
import { useAppSelector } from '../../../app/hook';
import { Button } from '../../../components/Button/Button';
import { LIKE_SVG } from '../../../utils/SVG';
import { useTranslation } from 'react-i18next';
import { StrCode } from '../../../utils/enums';

type Props = {
  variant: 'HomePage' | 'ListPage';
};

const ProductCard: React.FC<Props> = ({ variant }) => {
  const { phones = [] } = useAppSelector(state => state.phones);
  const { t } = useTranslation();

  if (phones.length === 0) {
    return (
      <div>
        <div></div>
      </div>
    );
  }

  return (
    <CardStyled variant={variant}>
      <ImgStyled src={phones[0].images[0]} variant={variant} />

      <NameBlockStyled>{phones[0].name}</NameBlockStyled>

      <CountBlockStyled>
        ${phones[0].priceDiscount}
        <RegularPriceStyled>${phones[0].priceRegular}</RegularPriceStyled>
      </CountBlockStyled>

      <InfoBlockStyled>
        <div>
          {t(StrCode.Screen)}
          <InfoStyled>{phones[0].screen}</InfoStyled>
        </div>
        <div>
          {t(StrCode.Capacity)}
          <InfoStyled>{phones[0].capacity}</InfoStyled>
        </div>
        <div>
          {t(StrCode.Ram)}
          <InfoStyled>{phones[0].ram}</InfoStyled>
        </div>
      </InfoBlockStyled>

      <ButtonsBlockStyled>
        <Button variant="dark" css="width: 100%; padding: 0;">
          {t(StrCode.AddToCard)}
        </Button>

        <Button variant="white" css="width: 40px; flex-shrink: 0;">
          <LIKE_SVG />
        </Button>
      </ButtonsBlockStyled>
    </CardStyled>
  );
};

export default ProductCard;
