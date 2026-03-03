import { ProductSection } from '../shared/components/ProductSection';
import { Banner } from './components/Banner/Banner';
import { CategorySection } from './components/Category';
import './../../styles/global.scss';
import './../../styles/global.scss';
import { PageContainer } from '../shared/components/PageContainer';

export const HomePage = () => {
  return (
    <PageContainer>
      <h1 className="visuallyHidden">Product Catalog</h1>
      <Banner />
      <ProductSection title={'Brand new models'} type={'new'} />
      <CategorySection />
      <ProductSection title={'Hot models'} type={'hot'} />
    </PageContainer>
  );
};
