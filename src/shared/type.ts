type Capacity = '32GB' | '64GB' | '128GB' | '256GB' | '512GB';
type Color = 'black' | 'green' | 'yellow' | 'white' | 'purple' | 'red';
type Cell = 'GPRS' | 'EDGE' | 'WCDMA' | 'UMTS' | 'HSPA' | 'LTE';


type Description = {
 title: string;
 text: string[];
}

export type Phone = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: Capacity[];
  capacity: Capacity;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: Color[];
  color: Color;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: Cell[];
}
