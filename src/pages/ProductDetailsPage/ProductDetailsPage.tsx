import React from 'react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { PhotoGallery } from '../../components/PhotoGallery';
import { ProductSpec } from '../../components/ProductSpec';
import { Divider } from '../../components/Divider';
import { SpecsList } from '../../components/SpecsList';
import { ProductsSlider } from '../../components/ProductsSlider';
import { BackButton } from '../../components/Buttons/BackButton';
import { CenteredContent } from '../../components/CenteredContent';
import { ErrorDisplay } from '../../components/ErrorDisplay';
import { Loader } from '../../components/Loader';
import { NotFound } from '../../components/NotFound';
import { useExtendedProductById } from '../../hooks/useExtendedProductById';
import { useSuggestedProducts } from '../../hooks/useSuggestedProducts';
import { useTranslate } from '../../hooks/useTranslate';
import { slugToTitle } from '../../utils/slugToTitle';
import { IMG_NOT_FOUND, TITLE_NOT_FOUND } from '../../constants/notFound';
import { SpecItem } from '../../types/SpecItem';
import { Category } from '../../types/ProductCategory';
import style from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { extendedProductsList, product, isLoading, isError } =
    useExtendedProductById();

  const suggestedProducts = useSuggestedProducts(
    product?.category as Category | undefined,
  );

  const t = useTranslate();

  if (isError) {
    return (
      <CenteredContent>
        <ErrorDisplay
          errorMessage={t('error.message')}
          buttonText={t('error.button-message')}
        />
      </CenteredContent>
    );
  }

  if (isLoading && !product) {
    return (
      <CenteredContent>
        <Loader />
      </CenteredContent>
    );
  }

  if (!product) {
    return (
      <CenteredContent>
        <NotFound img={IMG_NOT_FOUND.product} text={TITLE_NOT_FOUND.product} />
      </CenteredContent>
    );
  }

  const {
    id,
    images,
    description,
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell,
  } = product;

  const specs: SpecItem[] = [
    { label: 'product.screen', value: screen },
    { label: 'product.resolution', value: resolution },
    { label: 'product.processor', value: processor },
    { label: 'product.ram', value: ram },
    { label: 'product.capacity', value: capacity },
    { label: 'product.camera', value: camera },
    { label: 'product.zoom', value: zoom },
    { label: 'product.cell', value: cell },
  ];

  return (
    <>
      <div className="breadcrumbSection">
        <Breadcrumb />
      </div>

      <div className="pageSection">
        <BackButton />

        <h2 className={style.productTitle}>{slugToTitle(id)}</h2>

        <section className={style.productOverview}>
          <PhotoGallery images={images} isLoading={isLoading} />
          <ProductSpec
            product={product}
            ExtendedProductList={extendedProductsList || []}
          />
        </section>

        <div className={style.about}>
          <section className={style.aboutContent}>
            <h3 className={style.aboutSectionTitle}>{t('product.about')}</h3>

            <div className={style.divider}>
              <Divider />
            </div>

            {description.map(desc => (
              <React.Fragment key={desc.title}>
                <h4 className={style.aboutTextTitle}>{desc.title}</h4>

                <p className={style.aboutText}>{desc.text}</p>
              </React.Fragment>
            ))}
          </section>

          <section className={style.techSpecsContent}>
            <h3 className={style.aboutSectionTitle}>{t('product.specs')}</h3>

            <div className={style.divider}>
              <Divider />
            </div>

            <div className={style.specsSection}>
              <SpecsList specs={specs} fontSize={14} />
            </div>
          </section>
        </div>

        <section className={style.suggestedSection}>
          <ProductsSlider
            title={t('product.also-like')}
            titleClassName="sectionTitle"
            data={suggestedProducts}
            isLoading={isLoading}
            hasDiscount={true}
          />
        </section>
      </div>
    </>
  );
};
