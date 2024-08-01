import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/lib/hooks/reduxHooks';
import {
  fetchProducts,
  getNewModels,
  hotPriceProducts,
} from '../../../entities/Product';
import { MainSlider } from '../../../widgets/MainSlider';
import { ProductsSlider } from '../../../widgets/ProductsSlider';
import { TitleTag } from '../../../shared/ui/TitleTag/TitleTag';
import classNames from 'classnames';
import cls from './homePage.module.scss';
import { Section } from '../../../shared/ui/Section';
import { SectionTop } from '../../../shared/ui/SectionTop/ui/SectionTop';
import { Categories } from '../../../entities/Categories';

function HomePage() {
  const dispatch = useAppDispatch();
  const newProducts = useAppSelector(getNewModels);
  const hotProducts = useAppSelector(hotPriceProducts);

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Section firstSection className={classNames(cls.home, cls.main)}>
        <TitleTag
          Tag="h1"
          className={`${cls.main__title}`}
          title="Welcome to Nice Gadgets store!"
        />

        <MainSlider className={cls.main__slider} />
      </Section>

      <Section>
        <ProductsSlider title="Brand new models" products={newProducts} />
      </Section>

      <Section className={cls.categories}>
        <SectionTop title={'Shop by category'} />

        <Categories />
      </Section>

      <Section lastSection>
        <ProductsSlider title="Brand new models" products={hotProducts} />
      </Section>
    </>
  );
}

export default HomePage;
