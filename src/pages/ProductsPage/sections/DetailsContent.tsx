import { FC, useContext } from 'react';
import { ProductContext } from 'src/contexts/ProductContext';
import { Product } from 'src/types/Product';
import { ProdcutDetails } from 'src/types/ProductDetails';
import { GoBack } from 'src/components/GoBack';
import { getMultupleRandom } from 'src/utils/helpers/getMultupleRandom';
import { SliderSection } from '../../HomePage/sections/SliderSection';
import { ShopButton } from '../subsections/ShopButton';
import { Capacity } from '../subsections/Capacity';
import { Colors } from '../subsections/Colors';
import { Gallery } from '../subsections/Gallery';
import { GeneralSpec } from '../subsections/GeneralSpec';
import { Paragraph } from '../subsections/Paragraph';
import { Prices } from '../subsections/Prices';
import { TechSpecs } from '../subsections/TechSpecs';
import { Title } from '../subsections/Title';

type Props = {
  selectedProductDetails: ProdcutDetails,
  selectedProductGeneralInfo: Product,
};

export const DetailsContent: FC<Props> = ({
  selectedProductDetails,
  selectedProductGeneralInfo,
}) => {
  const { products } = useContext(ProductContext);
  const productsWithoutCurrent = [...products]
    .filter(x => x.id !== selectedProductGeneralInfo.id);
  const randomSuggestedProducts = getMultupleRandom(productsWithoutCurrent, 8);

  return (
    <div className="products-details">
      <GoBack />

      <div className="details">
        <Title selectedProductDetails={selectedProductDetails} />

        <div className="details__general grid-2-col">
          <Gallery selectedProductDetails={selectedProductDetails} />

          <section className="specifications">
            <div className="options options-color">
              <div className="options-top">
                <div className="options__title">
                  Available colors
                </div>
                <div className="options__id">
                  {`ID: ${selectedProductDetails.id}`}
                </div>
              </div>

              <Colors />
            </div>

            <div className="options options-memory">
              <div className="options-top">
                <div className="options__title">
                  Select capacity
                </div>
              </div>

              <Capacity />
            </div>

            <Prices
              selectedProductGeneralInfo={selectedProductGeneralInfo}
            />

            <ShopButton
              selectedProductGeneralInfo={selectedProductGeneralInfo}
            />

            <GeneralSpec
              selectedProductDetails={selectedProductDetails}
              selectedProductGeneralInfo={selectedProductGeneralInfo}
            />
          </section>
        </div>

        <section className="about grid-2-col">
          <div className="about__content">
            <h1 className="about__title">About</h1>

            <Paragraph
              selectedProductDetails={selectedProductDetails}
            />
          </div>

          <TechSpecs
            selectedProductDetails={selectedProductDetails}
            selectedProductGeneralInfo={selectedProductGeneralInfo}
          />
        </section>
      </div>

      <SliderSection
        sectionTitle="You may also like"
        renderedProducts={randomSuggestedProducts}
      />
    </div>
  );
};
