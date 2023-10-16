import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Header } from '../components/header/Header';
import { Loader } from '../components/main/products/Loader';
import {
  getId, getProductFullInfo, getProducts,
} from '../helpers/api/GetProducts';
import { Product } from '../helpers/types/Product';
import { ProductType } from '../helpers/enums/ProductType';
import { ProductInfo } from '../helpers/types/ProductInfo';
import {
  ACCESSORIES_LINK, PHONES_LINK, TABLETS_LINK,
} from '../helpers/constants/Links';
import { BreadcrumbsElement } from '../helpers/types/BreadcrumbsElement';
import { Breadcrumbs } from '../components/main/Breadcrumbs';
import { Back } from '../components/main/Back';
import { Title } from '../components/main/Title';
import {
  SmallPhoto,
} from '../components/main/product-card/product-details/SmallPhoto';
import { OldPrice } from '../components/main/OldPrice';
import { ProductButtons } from '../components/main/product-card/ProductButtons';
import { formatInches, formatMb } from '../helpers/functions/Functions';
import {
  Subtitle,
} from '../components/main/product-card/product-details/Subtitle';
import { ProductTechSpec } from '../helpers/types/ProductTechSpec';
import {
  ProductSpecsList,
} from '../components/main/product-card/product-specs/ProductSpecsList';
import {
  ProductsSlider,
} from '../components/main/products-sliders/ProductsSlider';
import { ProductsSlidersType } from '../helpers/enums/ProductsSliderType';
import { Footer } from '../components/footer/Footer';

export const ProductDetailsPage = () => {
  const [isBadId, setIsBadId] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { productId } = useParams();

  const productCategory = product?.type || ProductType.all;
  let breadcrumbCategoryName: string;
  let breadcrumbCategoryLink: string;
  const upSpecs: ProductTechSpec[] = [
    {
      name: 'Screen',
      value: formatInches(product?.screen || ''),
    },
    {
      name: 'Resolution',
      value: productInfo?.display.screenResolution || '',
    },
    {
      name: 'Processor',
      value: productInfo?.hardware.cpu || '',
    },
    {
      name: 'RAM',
      value: formatMb(product?.ram || ''),
    },
  ];
  const downSpecs: ProductTechSpec[] = [
    ...upSpecs,
    {
      name: 'Built in memory',
      value: formatMb(productInfo?.storage.flash || ''),
    },
    {
      name: 'Camera',
      value: productInfo?.camera.primary || '',
    },
    {
      name: 'Cell',
      value: productInfo?.connectivity.cell || '',
    },
  ];

  const productDiscountedPriceText = `$${product?.discountedPrice}`;

  switch (productCategory) {
    case ProductType.phone:
      breadcrumbCategoryName = 'Phones';
      breadcrumbCategoryLink = PHONES_LINK;
      break;
    case ProductType.tablet:
      breadcrumbCategoryName = 'Tablets';
      breadcrumbCategoryLink = TABLETS_LINK;
      break;
    case ProductType.accessories:
      breadcrumbCategoryName = 'Accessories';
      breadcrumbCategoryLink = ACCESSORIES_LINK;
      break;
    default:
      breadcrumbCategoryName = '';
      breadcrumbCategoryLink = '';
      break;
  }

  const idText = `ID: ${getId(product?.id)}`;
  const breadcrumbsPath: BreadcrumbsElement[] = [
    {
      text: breadcrumbCategoryName,
      link: breadcrumbCategoryLink,
    },
    {
      text: product?.name || '',
    },
  ];
  const upSpecsClasses = classNames(
    'product-details__specs',
    'product-details__specs--up',
  );
  const downSpecsClasses = classNames(
    'product-details__specs',
    'product-details__specs--down',
  );

  const handleClick = (index: number) => setSelectedImageIndex(index);

  useEffect(() => {
    getProducts()
      .then(products => {
        setProduct(products.find(
          currentProduct => currentProduct.id === productId,
        ) || null);
      });

    getProductFullInfo(productId)
      .then(setProductInfo)
      .catch(() => setIsBadId(true));
  }, [productId]);

  return (
    <>
      <Header hasSearch={false} activeCategory={productCategory} />

      {product !== null && productInfo !== null ? (

        <main className="product-details">
          <Breadcrumbs path={breadcrumbsPath} />

          <Back extraClass="product-details__back" />

          <Title extraClassName="product-details__title">
            {product.name}
          </Title>

          <section className="product-details__content-up">
            <ul className="product-details__small-photos">
              {productInfo.images.map((imageSrc, index) => {
                const isSelectedIndex = index === selectedImageIndex;

                return (
                  <li key={imageSrc}>
                    <SmallPhoto
                      isSelected={isSelectedIndex}
                      imageSource={imageSrc}
                      index={index}
                      onClick={handleClick}
                    />
                  </li>
                );
              })}
            </ul>

            <img
              className="product-details__big-photo"
              src={productInfo.images[selectedImageIndex]}
              alt="Selected"
            />

            <div className="product-details__up-details">
              <div className="product-details__prices">
                <Title>{productDiscountedPriceText}</Title>

                {!!product.discount && <OldPrice>{product.price}</OldPrice>}
              </div>

              <div className="product-details__buttons">
                <ProductButtons product={product} areBig />
              </div>

              <ProductSpecsList
                isBig={false}
                listClasses={upSpecsClasses}
                specs={upSpecs}
              />
            </div>

            <p className="product-details__id">{idText}</p>
          </section>

          <section className="product-details__content-down">
            <div className="product-details__content-down-left">
              <Subtitle>About</Subtitle>

              <article
                className="product-details__description"
                data-cy="productDescription"
              >
                {productInfo.description}
              </article>
            </div>

            <div className="product-details__content-down-right">
              <Subtitle>Tech-specs</Subtitle>

              <ProductSpecsList
                isBig
                listClasses={downSpecsClasses}
                specs={downSpecs}
              />
            </div>
          </section>

          <ProductsSlider
            type={ProductsSlidersType.random}
            withoutId={product.id}
          >
            You may also like
          </ProductsSlider>
        </main>
      ) : (
        !isBadId && <Loader />
      )}

      {isBadId && (
        <main className="product-details__not-found">
          <Title>Phone was not found</Title>
        </main>
      )}

      <Footer />
    </>
  );
};
