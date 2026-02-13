import { Breadcrumbs, DetailedList, ReturnButton } from '@ui/index';
import styles from './styles/productPage.module.scss';
import { organizeProps, useProductPage } from './model';
import { SliderType } from '@shared/types';
import { Slider } from '@widgets/sliders';
import { InfoSection } from './ui';
import { Options, PurchaseUI } from './widgets';

export const ProductPage = () => {
  const { prod, sliderItems } = useProductPage();

  const { breadcrumbs, h1, uiProps, infoProps } = organizeProps(prod);

  return (
    <div className={styles.layout}>
      <nav aria-label="breadcrumb">
        <Breadcrumbs links={breadcrumbs} />
      </nav>
      <ReturnButton />
      <h1 className={styles.h1}>{h1}</h1>
      <main className={styles.main}>
        <div className={styles['ui-container']}>
          <Slider model={SliderType.PRODUCT} props={uiProps.slider} />

          <div className={styles['ui-block']}>
            <span className={styles.sku}>{uiProps.SKU}</span>
            <Options data={uiProps.optionsData} />
            <PurchaseUI data={uiProps.purchaseData} />

            <DetailedList listData={uiProps.baseDetailedList} />
          </div>
        </div>
        <InfoSection data={infoProps} />
        <Slider
          model={SliderType.CATALOGUE}
          props={{ data: sliderItems, title: 'You may also like' }}
        />
      </main>
    </div>
  );
};
