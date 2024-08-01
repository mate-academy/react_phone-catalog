import { useParams } from 'react-router-dom';
import { Section } from '../../../shared/ui/Section';
import { TitleTag } from '../../../shared/ui/TitleTag/TitleTag';
import { TitlePagesEnum } from '../../../widgets/Header/model/types/header';
import { useEffect } from 'react';
import { fetchProducts, ProductCard } from '../../../entities/Product';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/lib/hooks/reduxHooks';
import cls from './productPage.module.scss';
import { CategoriesEnum } from '../../../entities/Categories';
import { getPhonesByCategory } from '../../../entities/Categories';

const ProductsPage = () => {
  const { category = '' } = useParams();
  const dispatch = useAppDispatch();
  const pageTitle = TitlePagesEnum[category];

  const products = useAppSelector(
    getPhonesByCategory(category as CategoriesEnum),
  );

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Section firstSection className={`${cls.productPageTop}`}>
        <TitleTag
          Tag="h1"
          title={pageTitle}
          className={cls.productPage__title}
        />

        <p className={cls.productPage__label}>{`${products.length} models`}</p>
      </Section>

      {/* <Section>
        filters
      </Section> */}

      <Section lastSection>
        <div className={cls.productPage__cards}>
          {products.map(item => (
            <ProductCard key={item.id} cart={item} />
          ))}
        </div>
      </Section>
    </>
  );
};

export default ProductsPage;
