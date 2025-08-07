import './productInfoPage.scss';
import { useParams } from 'react-router-dom';
import { BreadcrumbsNav } from '../BreadcrumbsNav';
import { useEffect, useState } from 'react';


import { PhoneInfoType } from '../../types/PhoneInfoType';
import { TabletInfoType } from '../../types/TabletInfoType';
import { AccessoryInfoType } from '../../types/AccessoryInfoType';

export type ProductInfoUnionType = PhoneInfoType | TabletInfoType | AccessoryInfoType;

export const ProductInfoPage: React.FC = () => {
  const [foundItem, setFoundItem] = useState({});

  const { category, itemId } = useParams<{
    category: string;
    itemId: string;
  }>();

  useEffect(() => {
    fetch(`/api/${category}.json`)
      .then(res => res.json())
      .then(data => {
        setFoundItem(data.find((product: ProductInfoUnionType) => product.id === itemId));
      });
    }, [itemId]);

    console.log(foundItem);
  // console.log(product);

  return (
    <div className="product-info-page">
      <BreadcrumbsNav />

      <h2>Продукт: {itemId}</h2>
      <h1>Категория: {category}</h1>
    </div>
  );
};


// import './productInfoPage.scss';
// import { useParams, useLocation } from 'react-router-dom';  // ← добавили useLocation
// import { BreadcrumbsNav } from '../BreadcrumbsNav';
// import { useEffect, useState } from 'react';

// import { PhoneInfoType } from '../../types/PhoneInfoType';
// import { TabletInfoType } from '../../types/TabletInfoType';
// import { AccessoryInfoType } from '../../types/AccessoryInfoType';

// export type ProductInfoUnionType =
//   | PhoneInfoType
//   | TabletInfoType
//   | AccessoryInfoType;

// export const ProductInfoPage: React.FC = () => {
//   const [foundItem, setFoundItem] = useState<ProductInfoUnionType | undefined>(undefined);

//   const { category, itemId } = useParams<{
//     category: string;
//     itemId: string;
//   }>();

//   // 1) Получаем location и вытягиваем state.search
//   const location = useLocation<{ search?: string }>();
//   const comingSearch = location.state?.search ?? '';

//   useEffect(() => {
//     fetch(`/api/${category}.json`)
//       .then(res => res.json())
//       .then((data: ProductInfoUnionType[]) => {
//         setFoundItem(data.find(p => p.id === itemId));
//       });
//   }, [category, itemId]);

//   return (
//     <div className="product-info-page">
//       {/* 2) Передаём comingSearch в хлебные крошки, если нужно */}
//       <BreadcrumbsNav />

//       <div className="product-meta">
//         <h2>Продукт: {itemId}</h2>
//         <h1>Категория: {category}</h1>
//         {/* 3) Покажем текущие search-параметры для визуального контроля */}
//         {comingSearch && (
//           <p className="current-search">
//             Search params при переходе: <code>{comingSearch}</code>
//           </p>
//         )}
//       </div>

//       {/* Здесь можно рендерить детали foundItem */}
//     </div>
//   );
// };
