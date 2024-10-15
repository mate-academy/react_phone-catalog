import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/Button/Button';
import {
  addCoundBacketId,
  deleteBacketId,
  subtractionCoundBacketId,
} from '../../../../features/basketSlice';
import { useAppDispatch } from '../../../../hooks/hookStore';
import { ProductType } from '../../../../types/productsType';
import { CLOSING_SVG, MINUS_SVG, PLUS_SVG } from '../../../../utils/SVG';
import {
  CartCardStyled,
  CountCalcStyled,
  CountNumberStyled,
  InfoImgStyled,
  InfoSecondStyled,
  InfoStyled,
  PriceItemStyled,
} from './styled';

type Props = {
  product: ProductType;
  count: number;
};

const CartCard: React.FC<Props> = ({ product, count }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeleteItem = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    dispatch(deleteBacketId(product.itemId));
  };

  const handleAddCount = () => {
    dispatch(addCoundBacketId(product.itemId));
  };

  const handleSubtractionCount = () => {
    if (count <= 1) {
      return;
    } else {
      dispatch(subtractionCoundBacketId(product.itemId));
    }
  };

  const handleViewItem = () => {
    if (!product) {
      return;
    }

    navigate(`/${product.category}/${product.itemId}`);
  };

  return (
    <CartCardStyled onClick={handleViewItem}>
      <InfoStyled>
        <div onClick={handleDeleteItem}>
          <CLOSING_SVG />
        </div>

        <InfoImgStyled src={product.image} />

        {product.name}
      </InfoStyled>

      <InfoSecondStyled>
        <CountCalcStyled>
          <Button
            variant={count > 1 ? 'white' : 'disabled'}
            css="flex-shrink: 0; width: 32px; height: 32px; padding: 0px;"
            onFunc={handleSubtractionCount}
          >
            <MINUS_SVG />
          </Button>

          <CountNumberStyled>{count}</CountNumberStyled>

          <Button
            variant="white"
            css="flex-shrink: 0; width: 32px; height: 32px; padding: 0px;"
            onFunc={handleAddCount}
          >
            <PLUS_SVG />
          </Button>
        </CountCalcStyled>

        <PriceItemStyled>{`$${count * product.price}`}</PriceItemStyled>
      </InfoSecondStyled>
    </CartCardStyled>
  );
};

export default CartCard;
