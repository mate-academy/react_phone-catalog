/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */

import { Category } from '../types/Category';
import {
  ProductDescription as Product,
} from '../types/ProductDescription';
import { Model } from '../types/Model';
import { Ram } from '../types/Ram';
import { Capacity } from '../types/Capacity';
import { ColorAvailable } from '../types/ColorAvailable';
import { Description } from '../types/Description';
import { Color } from '../types/Color';
import { Random } from '../types/Random';
import { saveToFile } from './saveToFile';

const random: Random = require('../../node_modules/lodash/random');

type ClassParams = {
  model: string;
  screen: string;
  resolution: string;
  processor: number;
  ram: Ram;
  colors: Color[];
  camera: string;
  basePrice: number;
  year: number;
  category: Category.Phones | Category.Tablets;
};

const tabletDescription: Description[] = [
  {
    title: 'Beauty all around',
    text: [
      'iPad lets you immerse yourself in whatever you’re reading, watching, or creating. The Liquid Retina display features advanced technologies like True Tone, P3 wide color, and an anti reflective coating.',
      'TouchID is built into the button, so you can use your fingerprint to unlock your iPad, sign in to apps, and make payments securely with Apple Pay. And iPad comes in gorgeous colors.',
    ],
  },
  {
    title: 'Fun at the speed',
    text: [
      'The breakthrough chip is now in iPad. It delivers up to 60 percent faster performance than the previous generation, making iPad a creative and mobile gaming powerhouse. Multitask smoothly between powerful apps and play graphics-intensive games. So you can go even further with your creativity with apps like SketchUp.',
    ],
  },
  {
    title: 'Camera',
    text: [
      'The 12MP Ultra Wide front camera enables Center Stage, making video calls more natural and content creation more fun. As you move around, the camera automatically pans to keep you centered in the shot. When others join or leave the frame, the view expands or zooms in. So you can focus on the conversation.',
      'The 12MP Wide back camera is perfect for capturing photos and 4K videos. And with the powerful ISP, iPad now features Smart HDR, so your photos look even more beautiful.',
    ],
  },
];

const phoneDescription: Description[] = [
  {
    title: 'Beyond',
    text: [
      'A magical new way to interact with iPhone. Groundbreaking safety features designed to save lives. An innovative camera for mind-blowing detail. All powered by the ultimate smartphone chip.',

      'iPhone is also designed from the ground up to protect your privacy and put you in control of what you share and who you share it with',
    ],
  },
  {
    title: 'Camera',
    text: [
      'Meet the first camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',

      'Give your camera direction with Photographic Styles. Choose a look — such as Warm or Cool — and iPhone selectively applies the adjustments, keeping skies and skin tones natural. So your photos will automatically have the look you love.',
    ],
  },
  {
    title: 'Big-time battery life',
    text: [
      'A highly efficient chip, an enhanced battery, and iOS 16 work together to boost battery life. When you do need to charge, just place iPhone on a wireless charger. Or connect a 20W or higher adapter to fast charge from zero to up to 50 percent charge in 30 minutes',
    ],
  },
  {
    title: 'Faster downloads. Faster streaming. Faster gaming. Less lag. More fun.',
    text: [
      'From live streaming to multiplayer gaming to video sharing, 5G really speeds things up. It even makes FaceTime in high definition and SharePlay feel smooth and seamless when you’re on the go.',
    ],
  },
];

export class ProductDescription implements Product {
  id: number;

  namespaceId: string;

  name: string;

  screen: string;

  resolution: string;

  processor: string;

  ram: Ram;

  camera: string;

  colors: Color[];

  capacities: Capacity[];

  models: Model[];

  description: Description[];

  year: number;

  category: Category.Phones | Category.Tablets;

  static idS: number[] = [];

  constructor({
    model,
    screen,
    resolution,
    processor,
    ram,
    camera,
    colors,
    basePrice,
    year,
    category,
  }: ClassParams) {
    this.id = this.getID();
    this.category = category;
    this.year = year;
    this.namespaceId = `apple-${category === 'phones' ? 'iphone' : 'ipad'}-${model.toLocaleLowerCase().split(' ').join('-')}`;
    this.name = `Apple ${category === 'phones' ? 'iPhone' : 'iPad'} ${model}`;
    this.screen = screen;
    this.resolution = resolution;
    this.processor = `Apple A${processor} Bionic`;
    this.ram = ram;
    this.camera = camera;
    this.colors = colors;
    this.capacities = this.getCapacity();
    this.models = this.getModels(basePrice);
    this.description = category === 'phones'
      ? phoneDescription
      : tabletDescription;
  }

  getCapacity(): Capacity[] {
    return this.namespaceId.includes('pro')
      ? ['128GB', '256GB', '512GB']
      : ['64GB', '128GB', '256GB'];
  }

  getID(): number {
    const id = random(1, 999999);

    if (!ProductDescription.idS.includes(id)) {
      ProductDescription.idS.push(id);

      return id;
    }

    return this.getID();
  }

  getPrice(basePrice: number): [number, number][] {
    let price = basePrice;
    const discount = 10;
    const coefficient = 1.2;
    const prices: [number, number][] = [];

    this.capacities.forEach(() => {
      const discountPrice = this.year === 2022
        ? price
        : Math.trunc(price - (price * discount) / 100);

      prices.push([price, discountPrice]);

      price = Math.trunc(price * coefficient);
    });

    return prices;
  }

  getModels(basePrice: number): Model[] {
    const getRemain = () => (random(0, 100) >= 80 ? 0 : random(1, 100));
    const models: Model[] = [];
    const colorsAvailable = () => (this.colors.reduce(
      (acc, color) => (
        { ...acc, [color]: getRemain() }
      ),
      {} as ColorAvailable,
    ));

    this.capacities.forEach((capacity, index) => {
      const model = {
        capacity,
        fullPrice: this.getPrice(basePrice)[index][0],
        discountPrice: this.getPrice(basePrice)[index][1],
        colorsAvailable: colorsAvailable(),
      };

      models.push(model);
    });

    return models;
  }
}

const phoneModels: ClassParams[] = [
  {
    model: '11',
    screen: "6.1' IPS",
    resolution: '1792x828',
    processor: 13,
    ram: '4GB',
    camera: '12 Mp + 12 Mp',
    colors: [
      'black',
      'white',
      'green',
      'yellow',
      'purple',
      'red',
    ],
    basePrice: 500,
    year: 2019,
    category: Category.Phones,
  },
  {
    model: '12',
    screen: "6.1' IPS",
    resolution: '2532x1170',
    processor: 14,
    ram: '4GB',
    camera: '12 Mp + 12 Mp',
    colors: [
      'black',
      'blue',
      'green',
      'red',
      'white',
      'purple',
    ],
    basePrice: 682,
    year: 2020,
    category: Category.Phones,
  },
  {
    model: '13 Mini',
    screen: "5,4' IPS",
    resolution: '2340 x 1080',
    processor: 15,
    ram: '4GB',
    camera: '12 Mp + 12 Mp',
    colors: [
      'black',
      'blue',
      'green',
      'pink',
      'red',
      'white',
    ],
    basePrice: 750,
    year: 2021,
    category: Category.Phones,
  },
  {
    model: '14 Pro',
    screen: "6,1' IPS",
    resolution: '2556 x 1179',
    processor: 16,
    ram: '6GB',
    camera: '48 Mp + 12 Mp + 12MP',
    colors: [
      'black',
      'gold',
      'purple',
      'silver',
    ],
    basePrice: 1355,
    year: 2022,
    category: Category.Phones,
  },
  {
    model: 'SE 2',
    screen: "4,7' IPS",
    resolution: '1334 x 750',
    processor: 13,
    ram: '3GB',
    camera: '12 Mp',
    colors: [
      'black',
      'red',
      'white',
    ],
    basePrice: 425,
    year: 2020,
    category: Category.Phones,
  },
  {
    model: 'XR',
    screen: "6,1' IPS",
    resolution: '1792 x 828',
    processor: 12,
    ram: '4GB',
    camera: '12 Mp',
    colors: [
      'black',
      'blue',
      'coral',
      'red',
      'white',
    ],
    basePrice: 380,
    year: 2018,
    category: Category.Phones,
  },
];

const tabletModels: ClassParams[] = [
  {
    model: 'Mini 6',
    screen: "8,3' IPS",
    resolution: '2266 x 1488',
    processor: 15,
    ram: '4GB',
    camera: '12 Mp',
    colors: [
      'gold',
      'gray',
      'pink',
      'purple',
    ],
    basePrice: 675,
    year: 2021,
    category: Category.Tablets,
  },
  {
    model: 'Air 4',
    screen: "10,9' IPS",
    resolution: '2360 x 1640',
    processor: 14,
    ram: '4GB',
    camera: '12 Mp',
    colors: [
      'gold',
      'gray',
      'blue',
      'green',
      'silver',
    ],
    basePrice: 620,
    year: 2020,
    category: Category.Tablets,
  },
];

export const phones = phoneModels.map((phone) => new ProductDescription(phone));

export const tablets = tabletModels.map((tablet) => new ProductDescription(tablet));

phones.forEach((product) => {
  saveToFile({
    fileName: `${product.namespaceId}.json`,
    data: product,
  });
});

tablets.forEach((product) => {
  saveToFile({
    fileName: `${product.namespaceId}.json`,
    data: product,
  });
});
