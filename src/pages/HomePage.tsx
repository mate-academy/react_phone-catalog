import { FC } from 'react';
import { BannerCarousel } from '../components/SliderCarousel/BannerCarousel';
import { Product } from '../types/Product';

type Props = {
  products: Product[],
};

export const HomePage: FC<Props> = (props) => {
  const { products } = props;

  return (
    <>
      <section
        className="banner page__section"
        id="banner"
      >
        <div className="container">
          <BannerCarousel />
        </div>
      </section>

      <section
        className="page__section"
      >
        <div className="container">
          { /* <ProductsCarousel products={products} /> */}
        </div>
      </section>
    </>
  );
};
