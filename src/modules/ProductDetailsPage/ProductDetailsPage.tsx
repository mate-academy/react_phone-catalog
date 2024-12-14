import { Breadcrumbs } from '../shared/Breadcrumbs';
import './ProductDetailsPage.scss';
import phones from '../../../public/api/phones.json';
// import products from '../../../public/api/products.json';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SpecificProduct } from '../../types/SpecificProduct';
import { ProductsSlider } from '../shared/ProductsSlider';
import { Product } from '../../types/Product';
import { ProductContentTop } from './components/ProductContentTop';
import { ProductContentBottom } from './components/ProductContentBottom';
import { getSpecificProducts, GlobalContext } from '../../store/GlobalContext';

const getSuggestedProducts = (allProducts: Product[]) => {
  // Фильтруем продукты по категории 'phone'
  const filtered = [...allProducts].filter(
    product => product.category === 'phones',
  );

  // Перемешиваем массив
  const shuffled = filtered.sort(() => Math.random() - 0.5);

  // Возвращаем первые `count` элементов
  return shuffled;
};

export const ProductDetailsPage: React.FC = () => {
  const { products } = useContext(GlobalContext);

  const [selectedPhone, setSelectedPhone] = useState<SpecificProduct | null>(
    null,
  );

  const suggestedProducts = getSuggestedProducts(products);

  const { productsType, productItemId } = useParams();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const specificProducts = getSpecificProducts('phones');

  // console.log(specificProducts);

  // useEffect(() => {
  //     const fetchSpecificProducts = async () => {
  //       try {
  //         const fetchedSpecificProducts = await getSpecificProducts(''); // Получаем все продукты
  //         const updatedProducts = fetchedProducts.map(product => ({
  //           ...product,
  //           shoppingCart: false, // Если свойства нет, добавляем его с дефолтным значением
  //           favourite: false, // То же для favourite
  //         }));

  //         setProducts(updatedProducts); // Устанавливаем их в состояние
  //       } catch (error) {
  //         throw new Error(
  //           `Error fetching products: ${error instanceof Error ? error.message : 'Unknown error'}`,
  //         );
  //       }
  //     };

  //     fetchAllProducts(); // Вызов асинхронной функции
  //   }, [productsType]);

  const currentProductObject = phones.find(ph => ph.id === productItemId);

  useEffect(() => {
    if (currentProductObject) {
      setSelectedPhone(currentProductObject);
    }
  }, [productItemId, currentProductObject]);

  if (!selectedPhone) {
    return <div>Загрузка...</div>;
  }

// console.log('Render params:', { productsType, productItemId });

  return (
    <div className="productDetailsPage">
      <Breadcrumbs
        productType={selectedPhone.category}
        productName={selectedPhone.name}
      />

      <button className="productDetailsPage__button-back" onClick={handleBack}>
        Back
      </button>
      <h2 className="productDetailsPage__title">{selectedPhone.name}</h2>

      <ProductContentTop selectedPhone={selectedPhone} />

      <ProductContentBottom selectedPhone={selectedPhone} />

      <div className="productDetailsPage__like-block">
        <ProductsSlider
          title={'You may also like'}
          products={suggestedProducts}
          displayType={'with-discount'}
        />
      </div>
    </div>
  );
};
