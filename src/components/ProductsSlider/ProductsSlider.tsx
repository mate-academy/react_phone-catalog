import { useState } from 'react';
import strokeLeft from '../../../public/img/icons/StrokeLeft.svg';
import strokeRight from '../../../public/img/icons/StrokeRight.svg';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductsSliderProps {
  goods: Product[];
  title: string;
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({ goods, title }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const productsPerPage = 4;
  const totalProducts = goods.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const nextPage = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(prevIndex => (prevIndex + 1) % totalPages);
    }
  };

  const prevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => (prevIndex - 1 + totalPages) % totalPages);
    }
  };

  const startIndex = currentIndex * productsPerPage;
  const currentProducts = goods.slice(startIndex, startIndex + productsPerPage);

  return (
      <section className="section section--section ">
        <div className='section__header'>
          <h2 className="section__title">{title}</h2>
          <div className="slider">
            <button onClick={prevPage}
              className='slider__button button--prev'
              disabled={currentIndex === 0}>
              <img src={strokeLeft} alt="Previous" className='slider__icon--prev'/>
            </button>
            <button onClick={nextPage}
              className='slider__button'
              disabled={currentIndex >= totalPages - 1 }>
              <img src={strokeRight} alt="Next" className='slider__icon--next'/>
            </button>
          </div>
        </div>

        <section className='products'>
          <div className="products__list product-grid">
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </div>
        </section>
      </section>
  );
};
