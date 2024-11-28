// import React from 'react';
// import './ProductsSlider.scss';
// import { ProductCard } from '../../../shared/ProductCard';
// import products from '../../../../../public/api/products.json';

// type Props = {
//   title: string;
// };

// export const ProductsSlider: React.FC<Props> = ({ title }) => {
//   const newestPhones = [...products]
//     .filter(product => product.category === 'phones')
//     .sort((phone1, phone2) => phone2.year - phone1.year)
//     .slice(0, 10);

//   // console.log(newestPhones);

//   return (
//     <div className="productsSlider">
//       <div className="productsSlider__container-top">
//         <h2 className="productsSlider__title">{title}</h2>
//         <div className="productsSlider__buttons">
//           <button
//             className="
//               productsSlider__button productsSlider__button--left"
//           ></button>
//           <button
//             className="
//               productsSlider__button productsSlider__button--right"
//           ></button>
//         </div>
//       </div>

//       <div className="productsSlider__content">
//         {newestPhones.map(phone => {
//           return <ProductCard phone={phone} key={phone.id} />;
//         })}
//       </div>
//     </div>
//   );
// };


import React, { useState } from 'react';
import './ProductsSlider.scss';
import { ProductCard } from '../../../shared/ProductCard';
import products from '../../../../../public/api/products.json';

type Props = {
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ title }) => {
  const newestPhones = [...products]
    .filter(product => product.category === 'phones')
    .sort((phone1, phone2) => phone2.year - phone1.year)
    .slice(0, 10);

  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 4;
  const maxIndex = Math.ceil(newestPhones.length / itemsPerPage) - 1;

  const handleNext = () => {
    setCurrentIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  const visiblePhones = newestPhones.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage,
  );

  return (
    <div className="productsSlider">
      <div className="productsSlider__container-top">
        <h2 className="productsSlider__title">{title}</h2>
        <div className="productsSlider__buttons">
          <button
            className="productsSlider__button productsSlider__button--left"
            onClick={handlePrev}
          ></button>
          <button
            className="productsSlider__button productsSlider__button--right"
            onClick={handleNext}
          ></button>
        </div>
      </div>

      <div className="productsSlider__content">
        {visiblePhones.map(phone => (
          <ProductCard phone={phone} key={phone.id} />
        ))}
      </div>
    </div>
  );
};
