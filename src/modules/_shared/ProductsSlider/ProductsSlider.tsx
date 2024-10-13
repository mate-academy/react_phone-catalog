import {
  ButtonsBlockStyled,
  ItemsStyled,
  ProductStyled,
  TitleStyled,
} from './styled';
import { Button } from '../../../components/Button/Button';
import { VECTOR_SVG } from '../../../utils/SVG';
import { ProductType } from '../../../types/productsType';
import ProductCard from '../productCard/ProductCard';
import useScrollButtons from '../../../hooks/useScrollButtons';

type Props = {
  name: string;
  products: ProductType[];
};

const ProductsSlider: React.FC<Props> = ({ name, products = [] }) => {
  const {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    handleScrollLeft,
    handleScrollRight,
  } = useScrollButtons();

  return (
    <div>
      <ProductStyled>
        <TitleStyled>{name}</TitleStyled>

        <ButtonsBlockStyled>
          <Button
            variant={canScrollLeft ? 'white' : 'disabled'}
            css="width: 32px; flex-shrink: 0; height: 32px"
            onFunc={handleScrollLeft}
          >
            <VECTOR_SVG variant="left" />
          </Button>

          <Button
            variant={canScrollRight ? 'white' : 'disabled'}
            css="width: 32px; flex-shrink: 0; height: 32px"
            onFunc={handleScrollRight}
          >
            <VECTOR_SVG />
          </Button>
        </ButtonsBlockStyled>
      </ProductStyled>

      <ItemsStyled ref={scrollRef}>
        {products.length === 0
          ? [1, 2, 3, 4, 5, 6].map(item => (
              <ProductCard variant="HomePage" key={item} />
            ))
          : products.map(item => (
              <ProductCard variant="HomePage" product={item} key={item.id} />
            ))}
      </ItemsStyled>
    </div>
  );
};

export default ProductsSlider;
