
export type AccessoryInfoType = {
  id: string;
  category: 'accessories'; // фиксированное значение
  namespaceId: string;
  name: string;
  capacityAvailable: string[]; // например: ["38mm", "42mm"]
  capacity: string;            // текущий выбор, например: "42mm"
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];   // список доступных цветов
  color: string;               // выбранный цвет
  images: string[];            // массив путей к изображениям
  description: {
    title: string;
    text: string[];
  }[];
  screen: string;              // размер и тип экрана
  resolution: string;          // разрешение экрана
  processor: string;
  ram: string;
  cell: string[];              // поддержка сетей и протоколов
};
