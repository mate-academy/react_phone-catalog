import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/lib/hooks/reduxHooks';
import { TitleTag } from '../../../shared/ui/TitleTag/TitleTag';
import classNames from 'classnames';
import cls from './homePage.module.scss';
import { Section } from '../../../shared/ui/Section';
import { SectionTop } from '../../../shared/ui/SectionTop/ui/SectionTop';
import { Categories } from '../../../entities/Categories';
import { MainSlider } from '../../../features/MainSlider';
import { ProductsSlider } from '../../../features/ProductsSlider';
import { getNewModels } from '../model/selectors/getNewModels';
import { getHotPriceProducts } from '../model/selectors/getHotPriceProducts';
import { getNewModelsLoading } from '../model/selectors/getNewModelsLoading';
import { useEffect } from 'react';
import { fetchNewModels } from '../model/services/fetchNewModels';
import { fetchHotProducts } from '../model/services/fetchHotProducts';
import { getHotPriceProductsLoading } from '../model/selectors/getHotPriceProductsLoading';

function HomePage() {
  const dispatch = useAppDispatch();
  const newProducts = useAppSelector(getNewModels);
  const hotProducts = useAppSelector(getHotPriceProducts);
  const hotProductsLoading = useAppSelector(getHotPriceProductsLoading);
  const newProductsLoading = useAppSelector(getNewModelsLoading);

  useEffect(() => {
    dispatch(fetchNewModels());
    dispatch(fetchHotProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Section homePage className={classNames(cls.home, cls.main)}>
        <TitleTag
          Tag="h1"
          className={`${cls.main__title}`}
          title="Welcome to Nice Gadgets store!"
        />

        <MainSlider className={cls.main__slider} />
      </Section>

      <Section>
        {newProductsLoading && <TitleTag Tag="h2" title="LOADING" />}
        {newProducts.length !== 0 && (
          <ProductsSlider title="Brand new models" products={newProducts} />
        )}
      </Section>

      <Section className={cls.categories}>
        <SectionTop title={'Shop by category'} />

        <Categories />
      </Section>

      <Section lastSection>
        {hotProductsLoading && <TitleTag Tag="h2" title="LOADING" />}
        {hotProducts.length !== 0 && (
          <ProductsSlider title="Brand new models" products={hotProducts} />
        )}
      </Section>
    </>
  );
}

export default HomePage;
