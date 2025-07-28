export type TabletInfoType = {
  id: string;                         // уникальный ID товара
  category: string;                  // категория (напр. tablets)
  namespaceId: string;              // идентификатор внутри namespace
  name: string;                      // полное имя устройства
  capacityAvailable: string[];      // список доступных объемов памяти
  capacity: string;                 // текущий объем памяти
  priceRegular: number;             // обычная цена
  priceDiscount: number;            // цена со скидкой
  colorsAvailable: string[];        // доступные цвета
  color: string;                    // текущий цвет
  images: string[];                 // пути к изображениям
  description: {
    title: string;                  // заголовок секции описания
    text: string[];                 // список абзацев в описании
  }[];                              // массив блоков описания
  screen: string;                   // описание экрана
  resolution: string;               // разрешение экрана
  processor: string;                // процессор
  ram: string;                      // оперативная память
  camera: string;                   // описание камеры
  zoom: string;                     // описание зума
  cell: string[];                   // поддержка сотовой связи
};
