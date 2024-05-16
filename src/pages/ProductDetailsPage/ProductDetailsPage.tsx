import { useEffect, useState } from 'react';
import './ProductDetailsPage.scss';
import { getAllProducts } from '../../helpers/getAllProducts';
import { DetailedProduct } from '../../types/DetailedProduct';
import { Product } from '../../types/ProductCard';
import { ProductCategories } from '../../types/ProductCategories';
import { GetDetailedProducts } from '../../helpers/GetDetailedProducts';
import { Link, useParams } from 'react-router-dom';

export const ProductDetailsPage: React.FC = () => {
  const [foundProduct, setFoundProduct] = useState<Product | undefined>(
    undefined,
  );
  const [displayedProduct, setDisplayedProduct] =
    useState<DetailedProduct | null>(null);

  const { productId } = useParams();

  useEffect(() => {
    getAllProducts().then((products: Product[]) =>
      setFoundProduct(
        products.find((product: Product) => product.itemId === productId),
      ),
    );
  }, [productId]);

  // Get product from the Api
  useEffect(() => {
    // Find the product in a certain category
    if (foundProduct) {
      GetDetailedProducts(foundProduct.category as ProductCategories).then(
        (productsFromApi: DetailedProduct[]) => {
          setDisplayedProduct(
            productsFromApi.find(
              (detailedProduct: DetailedProduct) =>
                detailedProduct.id === productId,
            ) ?? null,
          );
        },
      );
    }
  }, [foundProduct, productId]);

  if (!displayedProduct) {
    return <p>Product doesn&apos;t exist</p>;
  }

  const {
    category,
    // id,
    // namespaceId,
    name,
    // capacityAvailable,
    // capacity,
    // priceRegular,
    // priceDiscount,
    // colorsAvailable,
    // color,
    // images,
    // description,
  } = displayedProduct;

  return (
    <>
      {displayedProduct && (
        <main className="product-details">
          <section className="product-details__top ">
            <nav className="breadcrumbs">
              <div className="breadcrumbs__wrapper">
                <img
                  className="breadcrumbs__home"
                  src="./icons/home.svg"
                  alt="home icon"
                />
                <img
                  className="breadcrumbs__next"
                  src="./icons/arrow-right-disabled.svg"
                  alt="right arrow image"
                />
                <Link to={`/${category}`} className="breadcrumbs__category">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>

                <img
                  className="breadcrumbs__next"
                  src="./icons/arrow-right-disabled.svg"
                  alt="right arrow image"
                />

                <p className="breadcrumbs__product-name">{name}</p>
              </div>

              <button
                onClick={history.back}
                className="back-link breadcrumbs__back-link"
              >
                <div className="back-link__image-wrapper">
                  <img
                    className="back-link__image breadcrumbs__back-link"
                    src="./icons/arrow-left.svg"
                    alt="left arrow icon"
                  />
                </div>

                <p className="back-link__text">Back</p>
              </button>
            </nav>
          </section>
          <section>
            {/* product name: {displayedProduct.name}
            product priceRegular: {displayedProduct.priceRegular} */}
          </section>
        </main>
      )}
    </>
  );
};
