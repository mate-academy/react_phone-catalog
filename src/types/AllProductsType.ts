export type AllProductsType = {
  id: number;                 // Уникальный числовой ID
  category: string;    // Категория (в данном случае всегда accessories)
  itemId: string;             // Уникальный string ID (можно использовать как slug или ключ)
  name: string;               // Название продукта
  fullPrice: number;          // Полная цена без скидки
  price: number;              // Цена со скидкой
  screen: string;             // Характеристика экрана
  capacity: string;           // Вместимость или размер (например, 44mm)
  color: string;              // Цвет
  ram: string;                // Объем оперативной памяти
  year: number;               // Год выпуска
  image: string;              // Путь к изображению
};

