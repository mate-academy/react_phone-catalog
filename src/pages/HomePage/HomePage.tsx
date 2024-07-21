import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Carousel } from '../../Components/Carousel/Carousel';
import { Slider } from '../../Components/Slider/Slider';
import { Title } from '../../Components/Title/Title';
import { ProductsContext } from '../../context/ProductContext';
import { Category } from '../../types/Category';
import { useLoading } from '../../hooks/useLoading';
import { Loader } from '../../Components/Loader/Loader';

import './HomePage.scss';

export const Homepage = () => {
  const { allProducts } = useContext(ProductsContext);
  const isLoading = useLoading();

  const newModels = [...allProducts].sort((p1, p2) => p2.year - p1.year);
  const hotPrice = [...allProducts].sort(
    (p1, p2) => p2.fullPrice / p2.price - p1.fullPrice / p1.price,
  );
  const phonesCount = [...allProducts].filter(
    p => p.category === Category.phone,
  ).length;
  const tabletsCount = [...allProducts].filter(
    p => p.category === Category.tablet,
  ).length;
  const accessoriesCount = [...allProducts].filter(
    p => p.category === Category.accessory,
  ).length;

  return (
    <div className="content home">
      <div className="home__title">
        <Title title="Welcome to Nice Gadgets store!" />
      </div>

      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <div className="home__slider">
            <Slider />
          </div>

          <div className="home__carousel">
            <Carousel title={'Brand new models'} products={newModels} />
          </div>

          <div className="home__category">
            <h2 className="home__category-main-title">Shop by category</h2>

            <div className="home__category-containar">
              <div className="home__category-item">
                <Link
                  to={'./phones'}
                  className="home__category-img home__category--phones"
                />

                <h3 className="home__category-title">Mobile phones</h3>

                <p className="home__category-text">{`${phonesCount} models`}</p>
              </div>

              <div className="home__category-item">
                <Link
                  to={'./tablets'}
                  className="home__category-img home__category--tablets"
                />

                <h3 className="home__category-title">Tablets</h3>

                <p className="home__category-text">{`${tabletsCount} models`}</p>
              </div>

              <div className="home__category-item">
                <Link
                  to={'/accessories'}
                  className="home__category-img home__category--accessories"
                />

                <h3 className="home__category-title">Accessories</h3>

                <p className="home__category-text">{`${accessoriesCount} models`}</p>
              </div>
            </div>
          </div>

          <div className="home__carousel">
            <Carousel title={'Hot prices'} products={hotPrice} />
          </div>
        </>
      )}
    </div>
  );
};
