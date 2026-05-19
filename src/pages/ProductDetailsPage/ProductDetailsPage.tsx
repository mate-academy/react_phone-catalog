/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import React, { useContext, useEffect, useState } from 'react';
import './ProductDetailsPage.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductDetails, getSimilarProducts } from '../../api/api';
import { Loader } from '../../components/Loader';
import { ProductDetailsType } from '../../types/ProductDetailsType';
import { ProductDetails } from '../../components/ProductDetails';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Product } from '../../types/Product';
import { GeneralContext } from '../../helpers/GeneralContext';

export const ProductDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { fullListOfProducts } = useContext(GeneralContext);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProductDetailsType | null>(
    null,
  );
  const { itemId } = useParams();
  const productFromList = fullListOfProducts.find(
    item => item.itemId === selectedItem?.id,
  );
  let category = '';

  if (productFromList) {
    category =
      productFromList?.category.charAt(0).toUpperCase() +
      productFromList?.category.slice(1);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (itemId) {
          const productDetails = await getProductDetails(itemId.slice(1));

          setSelectedItem(productDetails);
          getSimilarProducts(
            productDetails.color,
            productDetails.capacity,
          ).then(setSimilarProducts);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="productDetailsPage">
      {!selectedItem && (
        <div className="productDetailsPage__itemWasNotFound">
          Product was not found
        </div>
      )}

      {selectedItem &&
        (isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="productDetailsPage__header">
              <div
                className="productDetailsPage__breadcrumbs"
                data-cy="breadCrumbs"
              >
                <Link to="/" className="productDetailsPage__goHome">
                  <img
                    src={require('../../images/icons/home.svg').default}
                    alt="Home"
                  />
                </Link>

                <img
                  src={
                    require('../../images/icons/slider-arrow-right-disabled.svg')
                      .default
                  }
                  alt="Arrow"
                />

                <Link
                  to={`/${productFromList?.category}`}
                  className="productDetailsPage__type"
                >
                  {category}
                </Link>

                <img
                  src={
                    require('../../images/icons/slider-arrow-right-disabled.svg')
                      .default
                  }
                  alt="Arrow"
                />

                <span className="productDetailsPage__name">
                  {selectedItem.name}
                </span>
              </div>

              <Link
                to="/"
                className="productDetailsPage__go-back"
                data-cy="backButton"
                onClick={() => goBack()}
              >
                <img
                  src={require('../../images/icons/back-arrow.svg').default}
                  alt="Arrow"
                />

                <span>Back</span>
              </Link>

              <h1 className="productDetailsPage__title">{selectedItem.name}</h1>
            </div>

            <ProductDetails
              selectedItem={selectedItem}
              productFromList={productFromList}
            />

            <section className="productDetailsPage__youMayAlsoLike">
              <h2 className="title">You may also like</h2>

              <ProductsSlider productsList={similarProducts} showOldPrice />
            </section>
          </>
        ))}
    </div>
  );
};
