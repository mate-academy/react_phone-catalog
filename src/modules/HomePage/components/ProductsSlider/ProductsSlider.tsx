import { ButtonsBlockStyled, ItemsStyled, ProductStyled } from './styled';
import { Button } from '../../../../components/Button/Button';
import { VECTOR_SVG } from '../../../../utils/SVG';
import { ProductType } from '../../../../types/productsType';
import ProductCard from '../../../_shared/productCard/ProductCard';
import { useRef } from 'react';

type Props = {
  name: string;
  products: ProductType[];
};

const ProductsSlider: React.FC<Props> = ({ name, products = [] }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const getScrollAmount = (pos: 'left' | 'right') => {
    if (window.innerWidth >= 1200) {
      return pos === 'left' ? -1152 : 1152;
    } else if (window.innerWidth >= 640) {
      return pos === 'left' ? -508 : 508;
    } else {
      return pos === 'left' ? -229 : 229;
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: getScrollAmount('left'),
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: getScrollAmount('right'),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <ProductStyled>
        {name}

        <ButtonsBlockStyled>
          <Button
            variant="white"
            css="width: 32px; flex-shrink: 0; height: 32px"
            onFunc={handleScrollLeft}
          >
            <VECTOR_SVG variant="left" />
          </Button>

          <Button
            variant="white"
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
