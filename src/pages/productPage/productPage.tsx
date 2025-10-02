import styles from './styles/productPage.module.scss';
import { useProductPage, getProps } from './model';
import { ArticleSection, HeadSection, UISection } from './ui';
import { Product } from '@shared/types';

type Props = {
  prod: Product;
};

export const ProductPageMain = ({ prod }: Props) => {
  const { onButton, onLink } = useProductPage();
  //make slider props only images and name
  const SKU = 'ID: 424242';

  const props = getProps(prod);

  return (
    <main className={styles.container}>
      <HeadSection
        breadcrumbs={props.breadcrumbs}
        onButton={onButton}
        name={prod.name}
      />
      <UISection prod={prod} props={props.ui} onLink={onLink} SKU={SKU} />

      <ArticleSection
        description={prod.description}
        specs={props.extendedSpecs}
      />
    </main>
  );
};
