// import React, { useRef } from 'react';
// import './ProductCard.scss';
// import type { Product } from '../../../../shared/types/Product';
// import { CircleButton } from '../../../../shared/components/CircleButton';
// import { icons } from '../../../../../global-assets/static';
// import { BtnAdd } from '../../../../shared/components/BtnAdd';

// type ProductCardProps = {
//   product: Product;
// };

// export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const { id, image, name, price, screen, capacity, ram } = product;
//   const card = useRef<HTMLDivElement>(null);

//   const properties = [
//     { name: 'screen', value: screen },
//     { name: 'capacity', value: capacity },
//     { name: 'ram', value: ram },
//   ];

//   return (
//     <div className="product-card" key={id} ref={card}>
//       <div className="product-card__container">
//         <div className="product-card__image-wrapper">
//           <img src={`/${image}`} className="product-card__image" />
//         </div>
//         <p className="product-card__title">{name}</p>
//         <p className="product-card__price">{`$${price}`}</p>

//         <hr className="product-card__separator" />

//         <div className="product-card__info-wrapper">
//           {properties.map(property => (
//             <div className="product-card__info" key={property.name}>
//               <p className="product-card__info-property">
//                 {property.name[0].toUpperCase() + property.name.slice(1)}
//               </p>
//               <p className="product-card__info-value">{property.value}</p>
//             </div>
//           ))}
//         </div>

//         <div className="product-card__btns">
//           <BtnAdd selectedProductID={product.itemId} />
//           <CircleButton icon={icons.like.valuePath} />
//         </div>
//       </div>
//     </div>
//   );
// };
