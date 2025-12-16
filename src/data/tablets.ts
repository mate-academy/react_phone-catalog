// src/data/tablets.ts
export interface TabletProduct {
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
    camera?: string;
    [k: string]: string | undefined;
  };
  colorsAvailable?: string[];
  capacityAvailable?: string[];
  category?: string;
  age?: number;
  detailsLink?: string;
  detailsAvailable?: boolean;
}

// Reaproveitando imagens (substitua pelos caminhos corretos)
import tabletGoldImg from '../assets/img/tablets/apple-ipad-10-2-2020/gold/00.webp';
import tabletSilverImg from '../assets/img/tablets/apple-ipad-10-2-2020/silver/00.webp';
import tabletSpaceImg from '../assets/img/tablets/apple-ipad-10-2-2020/spacegray/00.webp';
import tabletGreenImg from '../assets/img/tablets/apple-ipad-air-4th-gen/green/00.webp';

const baseImages = [
  tabletGoldImg,
  tabletSilverImg,
  tabletSpaceImg,
  tabletGreenImg,
];
const baseColorNames = ['Dourado', 'Prata', 'Cinza Espacial', 'Verde'];
const baseCapacities = ['64GB', '128GB', '256GB'];

export const tablets: TabletProduct[] = Array.from({ length: 42 }, (_, i) => {
  const colorIndex = i % baseImages.length;
  const capacityIndex = i % baseCapacities.length;

  const sku = `TB-${2000 + i}`;
  const title = `Apple iPad ${baseCapacities[capacityIndex]} ${baseColorNames[colorIndex]} (${sku})`;
  const priceNumber = 1999 + (i % 5) * 100;
  const price = `R$ ${priceNumber}`;

  const images = [
    baseImages[colorIndex],
    baseImages[(colorIndex + 1) % baseImages.length],
    baseImages[(colorIndex + 2) % baseImages.length],
  ];

  return {
    id: `tablet-${i + 1}`,
    sku,
    title,
    price,
    imageSrc: baseImages[colorIndex],
    images,
    description:
      'iPad com excelente desempenho para produtividade e entretenimento. ' +
      'Tela nítida, bateria duradoura e compatibilidade com acessórios.',
    specs: {
      screen: i % 2 === 0 ? '10.2" Retina' : '12.9" Liquid Retina',
      capacity: baseCapacities[capacityIndex],
      ram: i % 2 === 0 ? '3 GB' : '4 GB',
      battery: i % 2 === 0 ? '8827 mAh' : '7606 mAh',
      camera: i % 3 === 0 ? '12 MP (traseira)' : '8 MP (traseira)',
    },
    colorsAvailable: baseColorNames,
    capacityAvailable: baseCapacities,
    category: 'Tablets',
    age: i,
    detailsLink: '/not-found',
    detailsAvailable: false,
  };
});

// exemplo único para teste
export const sampleTablet: TabletProduct = {
  id: 'tablet-999',
  sku: 'TB-0999',
  title: 'iPad Teste 128GB Dourado (TB-0999)',
  price: 'R$ 2.199',
  imageSrc: '/assets/img/tablets/sample/ipad-main.webp',
  images: [
    '/assets/img/tablets/sample/ipad-main.webp',
    '/assets/img/tablets/sample/ipad-1.webp',
    '/assets/img/tablets/sample/ipad-2.webp',
  ],
  description:
    'iPad de teste com 128GB para validação de layout e interações. Ótimo para checar seleção de cor e capacidade.',
  specs: {
    screen: '10.2" Retina',
    capacity: '128GB',
    ram: '3 GB',
    battery: '8827 mAh',
    camera: '8 MP (traseira)',
  },
  colorsAvailable: ['Dourado', 'Prata', 'Cinza'],
  capacityAvailable: ['64GB', '128GB', '256GB'],
  category: 'Tablets',
  age: 999,
  detailsLink: '/not-found',
  detailsAvailable: false,
};
