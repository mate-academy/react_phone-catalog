import styles from './styles/productPage.module.scss';
import { useProductPage, getProps } from './model';
import { ArticleSection, HeadSection, UISection } from './ui';
import { Product } from '@shared/types';
import { InfiniteSlider } from '@widgets/slider';
import { CatalogueData } from '@shared/api/types';

type Props = {
  prod: Product;
};

export const ProductPageMain = ({ prod }: Props) => {
  const { onButton, onLink, sliderItems } = useProductPage();
  //make slider props only images and name
  const SKU = 'ID: 424242';

  const props = getProps(prod);

  return (
    <div className={styles.container}>
      <HeadSection
        breadcrumbs={props.breadcrumbs}
        onButton={onButton}
        name={prod.name}
      />
      <main className={styles['main-container']}>
        <UISection props={props.ui} onLink={onLink} SKU={SKU} />
        <ArticleSection
          description={prod.description}
          specs={props.extendedSpecs}
        />
        {typeof sliderItems !== 'string' && (
          <InfiniteSlider
            data={{
              array: (sliderItems as CatalogueData).items,
              title: 'You may also like',
            }}
          />
        )}
      </main>
    </div>
  );
};
