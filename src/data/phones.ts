// src/data/phones.ts
export interface PhoneProduct {
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
}

// Imagens reutilizáveis (substitua pelos caminhos corretos se necessário)
import phoneGreenImg from '../assets/img/phones/apple-iphone-11/green/00.webp';
import phoneBlackImg from '../assets/img/phones/apple-iphone-11/black/00.webp';
import phoneWhiteImg from '../assets/img/phones/apple-iphone-11/white/00.webp';
import phoneYellowImg from '../assets/img/phones/apple-iphone-11/yellow/00.webp';

const baseImages = [
  phoneGreenImg,
  phoneBlackImg,
  phoneWhiteImg,
  phoneYellowImg,
];
const baseColorNames = ['Verde', 'Preto', 'Branco', 'Amarelo'];
const baseCapacities = ['64GB', '128GB', '256GB'];

export const phones: PhoneProduct[] = Array.from({ length: 42 }, (_, i) => {
  const colorIndex = i % baseImages.length;
  const capacityIndex = i % baseCapacities.length;

  const sku = `PH-${1000 + i}`;
  const title = `Apple iPhone 11 ${baseCapacities[capacityIndex]} ${baseColorNames[colorIndex]} (${sku})`;
  const priceNumber = 699 + (i % 5) * 50;
  const price = `R$ ${priceNumber}`;

  const images = [
    baseImages[colorIndex],
    baseImages[(colorIndex + 1) % baseImages.length],
    baseImages[(colorIndex + 2) % baseImages.length],
  ];

  return {
    id: `phone-${i + 1}`,
    sku,
    title,
    price,
    imageSrc: baseImages[colorIndex],
    images,
    description:
      'iPhone com desempenho equilibrado, boa autonomia e câmeras versáteis. ' +
      'Ideal para uso diário e multimídia.',
    specs: {
      screen: i % 2 === 0 ? '6.1" OLED' : '6.5" OLED',
      capacity: baseCapacities[capacityIndex],
      ram: i % 2 === 0 ? '4 GB' : '6 GB',
      battery: i % 2 === 0 ? '3110 mAh' : '3300 mAh',
      camera: i % 3 === 0 ? '12 MP (dupla)' : '12 MP (simples)',
    },
    colorsAvailable: baseColorNames,
    capacityAvailable: baseCapacities,
    category: 'Celulares',
    age: i,
  };
});

// exemplo único para teste
export const samplePhone = {
  id: 'phone-999',
  sku: 'PH-0999',
  title: 'iPhone 11 Teste 128GB Preto (PH-0999)',
  price: 'R$ 899',
  imageSrc: '/assets/img/phones/sample/phone-main.webp',
  images: [
    '/assets/img/phones/sample/phone-main.webp',
    '/assets/img/phones/sample/phone-1.webp',
    '/assets/img/phones/sample/phone-2.webp',
  ],
  description:
    'Versão de teste do iPhone 11 com 128GB. Ideal para validar layout e interações na página de detalhes.',
  specs: {
    screen: '6.1" OLED',
    capacity: '128GB',
    ram: '4 GB',
    battery: '3110 mAh',
    camera: '12 MP (dupla)',
  },
  colorsAvailable: ['Preto', 'Branco', 'Verde'],
  capacityAvailable: ['64GB', '128GB', '256GB'],
  category: 'Celulares',
  age: 999,
};
