import {
  ButtonsBlockStyled,
  CardStyled,
  CountBlockStyled,
  ImgFavoriteStyled,
  ImgStyled,
  InfoBlockStyled,
  InfoStyled,
  NameBlockStyled,
  RegularPriceStyled,
} from './styled';
import { useAppSelector } from '../../../app/hook';
import favourites from '../../../icons/Favourites.png';
import { Button } from '../../../components/Button/Button';

type Props = {
  variant: 'HomePage' | 'ListPage';
};

const ProductCard: React.FC<Props> = ({ variant }) => {
  const { phones = [] } = useAppSelector(state => state.phones);

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
          Screen
          <InfoStyled>{phones[0].screen}</InfoStyled>
        </div>
        <div>
          Capacity
          <InfoStyled>{phones[0].capacity}</InfoStyled>
        </div>
        <div>
          RAM
          <InfoStyled>{phones[0].ram}</InfoStyled>
        </div>
      </InfoBlockStyled>

      <ButtonsBlockStyled>
        <Button variant="dark" css="width: 100%; padding: 0;">
          Add to cart
        </Button>

        <Button variant="white" css="width: 40px; flex-shrink: 0;">
          <ImgFavoriteStyled src={favourites} />
        </Button>
      </ButtonsBlockStyled>
    </CardStyled>
  );
};

export default ProductCard;
