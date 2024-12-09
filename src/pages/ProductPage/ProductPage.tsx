import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { PagePath } from '../../components/PagePath';
import { Loader } from '../../components/Loader';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SectionHeader } from '../../components/SectionHeader';
import { Card } from '../../components/Card';
import * as productActions from '../../features/products';
import { ImageSlider } from '../../components/ImageSlider';
import { ProductDetails } from '../../components/ProductDetails';
import { ProductAbout } from '../../components/ProductAbout';
import { ProductTech } from '../../components/ProductTech';

export const ProductPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products);
  const { selectedProduct, loaded, hasError } = useAppSelector(
    state => state.selectedProduct,
  );

  const goBack = () => {
    if (state?.search) {
      navigate({ pathname: '..', search: state.search });
    } else if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const windowWidth = window.innerWidth;

  const gap = 16;
  const productsLength = products.length;
  const firstCard = 1;
  const lastCard = productsLength - 2;

  const cardWidthInPC = 272;
  const cardWidthInTablet = 237;
  const cardWidthInMobile = 212;

  const cardWidth =
    windowWidth >= 1135
      ? cardWidthInPC + gap
      : windowWidth >= 640
        ? cardWidthInTablet + gap
        : cardWidthInMobile + gap;

  const [currentCard, setCurrentCard] = useState(firstCard);

  const slider = useRef<HTMLDivElement>(null);

  const isFirstCard = currentCard === firstCard;
  const isLastCard =
    currentCard ===
    lastCard - (windowWidth >= 1135 ? 1 : windowWidth >= 640 ? 0 : 0);

  const transform = cardWidth * (currentCard - 1);

  const handleMoveLeft = useCallback(() => {
    if (!isFirstCard) {
      setCurrentCard(prev => prev - 1);
    }
  }, [isFirstCard]);

  const handleMoveRight = useCallback(() => {
    if (!isLastCard) {
      setCurrentCard(prev => prev + 1);
    }
  }, [isLastCard]);

  useEffect(() => {
    dispatch(productActions.init());
  }, [products, dispatch]);

  return (
    <div>
      {loaded && !hasError ? (
        <Loader />
      ) : (
        <div className="mx-[16px] sm:mx-0">
          <div className="grids">
            <PagePath />
          </div>

          <div className="grids">
            <div
              className="
                col-[1/5]
                mb-[16px]
                mt-[24px]
                flex
                items-center
                gap-[4px]
                sm:col-[1/13]
                sm:mt-[40px]
                xl:col-[1/25]
              "
            >
              <img
                src="./img/icons/Arrow_Left_Black.svg"
                alt="Arrow"
                className="icons"
              />
              <p
                className="
                cursor-pointer 
                font-mont-semi 
                text-[12px] 
                leading-[15.34px] 
                text-secondary 
                transition-all
                duration-300
                ease-in-out
                hover:text-primary
              "
                onClick={goBack}
              >
                Back
              </p>
            </div>
          </div>

          {selectedProduct && (
            <div className="grids">
              <h1
                className="
                section-title
                col-[1/5]
                mb-[32px]
                sm:col-[1/13]
                sm:mb-[40px]
                xl:col-[1/25]
              "
              >
                {selectedProduct.name}
              </h1>

              <ImageSlider />

              <ProductDetails />

              <ProductAbout />

              <div className="col-[1/5] sm:col-[1/13] xl:col-[14/25]">
                <ProductTech />
              </div>

              <div
                className="
                  col-[1/5] 
                  mb-[56px] 
                  overflow-hidden 
                  sm:col-[1/13]
                  sm:mb-[64px] 
                  xl:col-[1/25] 
                  xl:mb-[80px]
                  
                "
              >
                <SectionHeader
                  title="You may also like"
                  hasButtons={true}
                  handleMoveLeft={handleMoveLeft}
                  handleMoveRight={handleMoveRight}
                  isFirstCard={isFirstCard}
                  isLastCard={isLastCard}
                />

                <div
                  className="transition-transform duration-300 ease-in-out"
                  ref={slider}
                  style={{ transform: `translateX(-${transform}px)` }}
                >
                  <div className="flex gap-[16px]">
                    <Card products={products} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {!loaded && hasError && (
        <h1
          className="
            page-title
          flex
            justify-center
            text-red-color
          "
        >
          Product was not found
        </h1>
      )}
    </div>
  );
};
