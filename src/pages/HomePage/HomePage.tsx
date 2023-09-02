import '../../styles/pages/HomePage/HomePage.scss';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Banner } from '../../components/Banner';
import { ProductSlider } from '../../components/ProductSlider';
import { Product } from '../../types/product';

import phonesImg from '../../images/phones-block.png';
import tabletsImg from '../../images/tablets-block.png';
import accessoriesImg from '../../images/accessories-block.png';

export const HomePage: React.FC = () => {
  const product: Product = {
    age: 0,
    id: 'aaa',
    type: 'aaa',
    imageUrl: 'aaa',
    name: 'Iphone',
    snippet: 'aaa',
    price: 700,
    discount: 0,
    screen: 'Some screen',
    capacity: 'Some capacity',
    ram: 'Some ram',
  };

  const products = [
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
  ];

  return (
    <>
      <Header />

      <main className="main">
        <Banner />

        <ProductSlider
          title="Hot prices"
          products={products}
        />

        <section className="main__category-links">
          <h1 className="main__categories-title">Shop by gategory</h1>

          <div className="main__category-blocks">
            <div className="main__category-block">
              <img
                src={phonesImg}
                alt="phones"
                className="main__category-img main__phones"
              />

              <h3 className="main__category-title">Mobile phones</h3>

              <p className="main__pieces-quantity">95 models</p>
            </div>

            <div className="main__category-block">
              <img
                src={tabletsImg}
                alt="phones"
                className="main__category-img main__tablets"
              />

              <h3 className="main__category-title">Tablets</h3>

              <p className="main__pieces-quantity">40 models</p>
            </div>

            <div className="main__category-block">
              <img
                src={accessoriesImg}
                alt="phones"
                className="main__category-img main__accessories"
              />

              <h3 className="main__category-title">Accessories</h3>

              <p className="main__pieces-quantity">205 models</p>
            </div>
          </div>
        </section>

        <ProductSlider
          title="Brand new models"
          products={products}
        />
      </main>

      <Footer />
    </>
  );
};
