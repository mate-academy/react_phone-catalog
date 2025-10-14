import styles from './styles/productPage.module.scss';
import { useProductPage, getProps } from './model';
import { ArticleSection, HeadSection, UISection } from './ui';
import { CatalogueProduct, Product } from '@shared/types';
import { CatalogueData } from '@shared/api/types';
import { Slider } from '@widgets/slider';

type Props = {
  prod: Product;
};

export const ProductPageMain = ({ prod }: Props) => {
  const { sliderItems } = useProductPage();

  //make slider props only images and name
  const SKU = 'ID: 424242';

  const props = getProps(prod);

  return (
    <div className={styles.container}>
      <HeadSection breadcrumbs={props.breadcrumbs} name={prod.name} />
      <main className={styles['main-container']}>
        <UISection props={props.ui} SKU={SKU} />
        <ArticleSection
          description={prod.description}
          specs={props.extendedSpecs}
        />
        {typeof sliderItems !== 'string' && (
          <Slider
            data={{
              array: (sliderItems as CatalogueData).items as CatalogueProduct[],
              title: 'You may also like',
            }}
          />
        )}
      </main>
    </div>
  );
};
