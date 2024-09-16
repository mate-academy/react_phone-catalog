import {
  ButtonAddStyled,
  ButtonFavoritStyled,
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
import favourites from '../../../icons/Favourites.png';

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
        <ButtonAddStyled>Add to cart</ButtonAddStyled>

        <ButtonFavoritStyled>
          <img src={favourites} />
        </ButtonFavoritStyled>
      </ButtonsBlockStyled>
    </CardStyled>
  );
};

export default ProductCard;
