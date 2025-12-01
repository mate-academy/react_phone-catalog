// src/data/accessories.ts
export interface AccessoriesProduct {
  id: string;
  sku?: string;
  title: string;
  price: string;
  imageSrc: string;
  images?: string[];
  description?: string;
  specs: {
    screen?: string;
    capacity?: string;
    ram?: string;
    battery?: string;
    compatibility?: string;
    [k: string]: string | undefined;
  };
  colorsAvailable?: string[];
  capacityAvailable?: string[];
  category?: string;
  age?: number;
}

// Imagens reutilizáveis (substitua pelos caminhos corretos se necessário)
import accessoriesGoldImg from '../assets/img/accessories/apple-watch-se/gold/00.webp';
import accessoriesSilverImg from '../assets/img/accessories/apple-watch-se/silver/00.webp';
import accessoriesSpaceImg from '../assets/img/accessories/apple-watch-se/space-gray/00.webp';
import accessoriesGrayImg from '../assets/img/accessories/apple-watch-series-3/space-gray/00.webp';

const baseImages = [
  accessoriesGoldImg,
  accessoriesSilverImg,
  accessoriesSpaceImg,
  accessoriesGrayImg,
];

const baseColorNames = ['Dourado', 'Prata', 'Cinza Espacial', 'Cinza'];
const baseCapacities = ['8GB', '16GB', '24GB'];

export const accessories: AccessoriesProduct[] = Array.from(
  { length: 42 },
  (_, i) => {
    const colorIndex = i % baseImages.length;
    const capacityIndex = i % baseCapacities.length;

    const sku = `AC-${3000 + i}`;
    const title = `Accessory ${baseColorNames[colorIndex]} (${sku})`;
    const priceNumber = 99 + (i % 5) * 20;
    const price = `R$ ${priceNumber}`;

    const images = [
      baseImages[colorIndex],
      baseImages[(colorIndex + 1) % baseImages.length],
      baseImages[(colorIndex + 2) % baseImages.length],
    ];

    return {
      id: `accessory-${i + 1}`,
      sku,
      title,
      price,
      imageSrc: baseImages[colorIndex],
      images,
      description:
        'Acessório com design premium, compatível com os principais dispositivos Apple. ' +
        'Construção leve, acabamento refinado e fácil integração com o ecossistema.',
      specs: {
        screen: i % 2 === 0 ? '1.57" AMOLED' : '1.78" Retina',
        capacity: baseCapacities[capacityIndex],
        ram: i % 2 === 0 ? '1 GB' : '2 GB',
        battery: i % 2 === 0 ? '200 mAh' : '250 mAh',
        compatibility: 'iPhone, iPad, Apple Watch',
      },
      colorsAvailable: baseColorNames,
      capacityAvailable: baseCapacities,
      category: 'Acessórios',
      age: i,
    };
  },
);

// exemplo único para teste
export const sampleAccessory = {
  id: 'accessory-999',
  sku: 'AC-0999',
  title: 'Pulseira Sport Dourada (AC-0999)',
  price: 'R$ 149',
  imageSrc: '/assets/img/accessories/sample/gold-main.webp',
  images: [
    '/assets/img/accessories/sample/gold-main.webp',
    '/assets/img/accessories/sample/gold-1.webp',
    '/assets/img/accessories/sample/gold-2.webp',
  ],
  description:
    'Pulseira esportiva com acabamento premium. Confortável para uso diário e resistente à água. ' +
    'Compatível com múltiplos tamanhos de relógio e fácil de instalar.',
  specs: {
    screen: 'N/A',
    capacity: 'N/A',
    ram: 'N/A',
    battery: 'N/A',
    compatibility: 'Apple Watch, outros relógios compatíveis',
  },
  colorsAvailable: ['Dourado', 'Prata', 'Cinza'],
  capacityAvailable: ['N/A'],
  category: 'Acessórios',
  age: 999,
};
