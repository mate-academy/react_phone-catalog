import { FC, useContext } from 'react';
import { ProductContext } from 'src/contexts/ProductContext';
import { Product } from 'src/types/Product';
import { GoBack } from 'src/components/GoBack';
import { getMultupleRandom } from 'src/utils/helpers/getMultupleRandom';
import { PhoneNotFound } from 'src/features/PhoneNotFound/PhoneNotFound';
import { ShopButton } from '../../subsections/ShopButton';
import { Capacity } from '../../subsections/Capacity/Capacity';
import { Colors } from '../../subsections/Colors/Colors';
import { Gallery } from '../../subsections/Gallery/Gallery';
import { GeneralSpec } from '../../subsections/GeneralSpec';
import { Paragraph } from '../../subsections/About/About';
import { Prices } from '../../subsections/Prices';
import { TechSpecs } from '../../subsections/TechSpecs';
import { Title } from '../../subsections/Title';
import './DetailsContent.scss';
import { SwiperSlider } from '../../../../features/SwiperSlider/SwiperSlider';

type Props = {
  selectedProductGeneralInfo: Product,
  selectedCapacity: string,
  setSelectedCapacity: React.Dispatch<React.SetStateAction<string>>,
  favourites: Product[],
  setFavourites: React.Dispatch<React.SetStateAction<Product[]>>,
  cartProducts: Product[],
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>,
};

export const DetailsContent: FC<Props> = ({
  selectedProductGeneralInfo,
  selectedCapacity,
  setSelectedCapacity,
  favourites,
  setFavourites,
  cartProducts,
  setCartProducts,
}) => {
  const {
    products,
    selectedProductDetails,
    isDetailsFailed,
  } = useContext(ProductContext);
  const productsWithoutCurrent = [...products]
    .filter(x => x.id !== selectedProductGeneralInfo.id);
  const randomSuggestedProducts = getMultupleRandom(productsWithoutCurrent, 8);

  return (
    <>
      {isDetailsFailed
        ? <PhoneNotFound />
        : (
          <div className="products-details">
            <div className="product-details__go-back">
              <GoBack />
            </div>

            {selectedProductDetails && (
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
                          {`ID: ${selectedProductGeneralInfo.id}`}
                        </div>
                      </div>

                      <Colors
                        selectedProductDetails={selectedProductDetails}
                        selectedProductGeneralInfo={selectedProductGeneralInfo}
                      />

                    </div>

                    <div className="options options-memory">
                      <div className="options-top">
                        <div className="options__title">
                          Select capacity
                        </div>
                      </div>

                      <Capacity
                        selectedCapacity={selectedCapacity}
                        setSelectedCapacity={setSelectedCapacity}
                        selectedProductGeneralInfo={selectedProductGeneralInfo}
                        selectedProductDetails={selectedProductDetails}
                      />
                    </div>

                    <Prices
                      selectedProductGeneralInfo={selectedProductGeneralInfo}
                    />

                    <ShopButton
                      selectedProductGeneralInfo={selectedProductGeneralInfo}
                      favourites={favourites}
                      setFavourites={setFavourites}
                      cartProducts={cartProducts}
                      setCartProducts={setCartProducts}
                    />

                    <GeneralSpec
                      selectedProductDetails={selectedProductDetails}
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
                  />
                </section>
              </div>
            )}

            <SwiperSlider
              sectionTitle="You may also like"
              renderedProducts={randomSuggestedProducts}
            />
          </div>
        )}
    </>
  );
};
