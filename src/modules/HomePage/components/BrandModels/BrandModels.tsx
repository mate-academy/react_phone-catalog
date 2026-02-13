import brandClass from './brandModels.module.scss';
import cn from 'classnames';
import products from '../../../../../public/api/products.json';
import { CardsCariusel } from '../../../shared/components/CardsCarousel';

export const BrandModels = () => {
  const newBrands = products.filter(product => product.year >= 2021);

  return (
    <div className={cn(brandClass.brandModels)}>
      {/* <h2 className={cn(brandClass.brandModels__title)}>Brand new models</h2> */}
      <CardsCariusel title="Brand new models" products={newBrands} />
    </div>
  );
};
