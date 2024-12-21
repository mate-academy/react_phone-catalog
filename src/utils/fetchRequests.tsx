import { Product } from '../types/Product';
import { SpecificProduct } from '../types/SpecificProduct';

// Универсальная функция для запроса
async function fetchProducts<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json(); // Возможная ошибка от сервера

    throw new Error(
      `Error: ${response.statusText} - ${errorData.message || 'Unknown error'}`,
    );
  }

  return response.json();
}

// Функция для получения всех продуктов
function getAllProducts(): Promise<Product[]> {
  return fetchProducts<Product[]>('./api/products.json');
}

// Функция для получения продуктов по типу
function getSpecificProducts(productsType: string): Promise<SpecificProduct[]> {
  return fetchProducts<SpecificProduct[]>(`./api/${productsType}.json`);
}

useEffect(() => {
  getProductsSummary().then(prods => {
    if (selectedProduct) {
      const prodSummary = prods.find(p => p.itemId === selectedProduct.id);

      setProduct(prodSummary);
    }
  });
}, [selectedProduct]);
