import { Button } from '../../../../components/Button';
import { ProductCard } from '../../../../components/ProductCard';
import styles from './NewModels.module.scss';

const newModels = [
  {
    id: 'apple-iphone-11-128gb-black',
    category: 'phones',
    namespaceId: 'apple-iphone-11',
    name: 'Apple iPhone 11 128GB Black',
    capacityAvailable: ['64GB', '128GB', '256GB'],
    capacity: '128GB',
    priceRegular: 1100,
    priceDiscount: 1050,
    colorsAvailable: ['black', 'green', 'yellow', 'white', 'purple', 'red'],
    color: 'black',
    images: [
      'img/phones/apple-iphone-11/black/00.webp',
      'img/phones/apple-iphone-11/black/01.webp',
      'img/phones/apple-iphone-11/black/02.webp',
      'img/phones/apple-iphone-11/black/03.webp',
      'img/phones/apple-iphone-11/black/04.webp',
    ],
    description: [
      {
        title: 'And then there was Pro',
        text: [
          'A transformative triple-camera system ' +
            'that adds tons of capability without complexity.',
          'An unprecedented leap in battery life. And a mind-blowing' +
            'chip that doubles down on machine learning and pushes the ' +
            'boundaries of what a smartphone can do. Welcome to the first ' +
            'iPhone powerful enough to be called Pro.',
        ],
      },
      {
        title: 'Camera',
        text: [
          'Meet the first triple-camera system to combine cutting-edge ' +
            'technology with the legendary simplicity of iPhone. Capture up' +
            'to four times more scene. Get beautiful images in drastically' +
            'lower light. Shoot the highest-quality video in a smartphone — ' +
            'then edit with the same tools you love for photos. You’ve never ' +
            'shot with anything like it.',
        ],
      },
      {
        title:
          'Shoot it. Flip it. Zoom it. Crop it. ' +
          'Cut it. Light it. Tweak it. Love it.',
        text: [
          'iPhone 11 Pro lets you capture videos that are beautifully true ' +
            'to life, with greater detail and smoother motion. ' +
            'Epic processing power means it can shoot 4K video ' +
            'with extended dynamic range and cinematic video ' +
            'stabilization — all at 60 fps. You get more creative ' +
            'control, too, with four times more scene and powerful' +
            'new editing tools to play with.',
        ],
      },
    ],
    screen: "6.1' IPS",
    resolution: '1792x828',
    processor: 'Apple A13 Bionic',
    ram: '4GB',
    camera: '12 Mp + 12 Mp + 12MP',
    zoom: 'Digital, 5x',
    cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE'],
  },

  {
    id: 'apple-iphone-11-128gb-green',
    category: 'phones',
    namespaceId: 'apple-iphone-11',
    name: 'Apple iPhone 11 128GB Green',
    capacityAvailable: ['64GB', '128GB', '256GB'],
    capacity: '128GB',
    priceRegular: 1100,
    priceDiscount: 1050,
    colorsAvailable: ['black', 'green', 'yellow', 'white', 'purple', 'red'],
    color: 'green',
    images: [
      'img/phones/apple-iphone-11/green/00.webp',
      'img/phones/apple-iphone-11/green/01.webp',
      'img/phones/apple-iphone-11/green/02.webp',
      'img/phones/apple-iphone-11/green/03.webp',
      'img/phones/apple-iphone-11/green/04.webp',
    ],
    description: [
      {
        title: 'And then there was Pro',
        text: [
          'A transformative triple-camera system that ' +
            'adds tons of capability without complexity.',
          'An unprecedented leap in battery life. And a mind-blowing ' +
            'ne can do. Welcome terful enough to be called Pro.',
        ],
      },
      {
        title: 'Camera',
        text: [
          'Meet theartphophotos. You’ve never shot with anything like it.',
        ],
      },
      {
        title: 'Shoot it. Flip t it. Tweak it. Love it.',
        text: ['iPhone 11 all at 60 fpsg tools to play with.'],
      },
    ],
    screen: "6.1' IPS",
    resolution: '1792x828',
    processor: 'Apple A13 Bionic',
    ram: '4GB',
    camera: '12 Mp + 12 Mp + 12MP',
    zoom: 'Digital, 5x',
    cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE'],
  },

  {
    id: 'apple-iphone-11-128gb-purple',
    category: 'phones',
    namespaceId: 'apple-iphone-11',
    name: 'Apple iPhone 11 128GB Purple',
    capacityAvailable: ['64GB', '128GB', '256GB'],
    capacity: '128GB',
    priceRegular: 1100,
    priceDiscount: 1050,
    colorsAvailable: ['black', 'green', 'yellow', 'white', 'purple', 'red'],
    color: 'purple',
    images: [
      'img/phones/apple-iphone-11/purple/00.webp',
      'img/phones/apple-iphone-11/purple/01.webp',
      'img/phones/apple-iphone-11/purple/02.webp',
      'img/phones/apple-iphone-11/purple/03.webp',
      'img/phones/apple-iphone-11/purple/04.webp',
    ],
    description: [
      {
        title: 'And then there was Pro',
        text: [
          'A transformati without complexity.',
          'An unprecee powerful enough to be called Pro.',
        ],
      },
      {
        title: 'Camera',
        text: [
          'Meet thelig for photos. You’ve never shot with anything like it.',
        ],
      },
      {
        title: 'Shoot itt. Love it.',
        text: [
          'iPhone ic re creativd powerful new editing tools to play with.',
        ],
      },
    ],
    screen: "6.1' IPS",
    resolution: '1792x828',
    processor: 'Apple A13 Bionic',
    ram: '4GB',
    camera: '12 Mp + 12 Mp + 12MP',
    zoom: 'Digital, 5x',
    cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE'],
  },

  {
    id: 'apple-iphone-11-128gb-red',
    category: 'phones',
    namespaceId: 'apple-iphone-11',
    name: 'Apple iPhone 11 128GB Red',
    capacityAvailable: ['64GB', '128GB', '256GB'],
    capacity: '128GB',
    priceRegular: 1100,
    priceDiscount: 1050,
    colorsAvailable: ['black', 'green', 'yellow', 'white', 'purple', 'red'],
    color: 'red',
    images: [
      'img/phones/apple-iphone-11/red/00.webp',
      'img/phones/apple-iphone-11/red/01.webp',
      'img/phones/apple-iphone-11/red/02.webp',
      'img/phones/apple-iphone-11/red/03.webp',
      'img/phones/apple-iphone-11/red/04.webp',
    ],
    description: [
      {
        title: 'And then there was Pro',
        text: ['A transt complexity.', 'An unhe bough to be called Pro.'],
      },
      {
        title: 'Camera',
        text: [
          'Meet the five for photos. You’ve never shot with anything like it.',
        ],
      },
      {
        title: 'Shoot iteak it. Love it.',
        text: ['iPhone 1l, too, ting tools to play with.'],
      },
    ],
    screen: "6.1' IPS",
    resolution: '1792x828',
    processor: 'Apple A13 Bionic',
    ram: '4GB',
    camera: '12 Mp + 12 Mp + 12MP',
    zoom: 'Digital, 5x',
    cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE'],
  },

  // {
  //   id: 'apple-iphone-11-128gb-white',
  //   category: 'phones',
  //   namespaceId: 'apple-iphone-11',
  //   name: 'Apple iPhone 11 128GB White',
  //   capacityAvailable: ['64GB', '128GB', '256GB'],
  //   capacity: '128GB',
  //   priceRegular: 1100,
  //   priceDiscount: 1050,
  //   colorsAvailable: ['black', 'green', 'yellow', 'white', 'purple', 'red'],
  //   color: 'white',
  //   images: [
  //     'img/phones/apple-iphone-11/white/00.webp',
  //     'img/phones/apple-iphone-11/white/01.webp',
  //     'img/phones/apple-iphone-11/white/02.webp',
  //     'img/phones/apple-iphone-11/white/03.webp',
  //     'img/phones/apple-iphone-11/white/04.webp',
  //   ],
  //   description: [
  //     {
  //       title: 'And then there was Pro',
  //       text: [
  //         'A transformative triple-camera system that adds tons of capability without complexity.',
  //         'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
  //       ],
  //     },
  //     {
  //       title: 'Camera',
  //       text: [
  //         'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
  //       ],
  //     },
  //     {
  //       title:
  //         'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
  //       text: [
  //         'iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
  //       ],
  //     },
  //   ],
  //   screen: "6.1' IPS",
  //   resolution: '1792x828',
  //   processor: 'Apple A13 Bionic',
  //   ram: '4GB',
  //   camera: '12 Mp + 12 Mp + 12MP',
  //   zoom: 'Digital, 5x',
  //   cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE'],
  // },

  // {
  //   id: 'apple-iphone-11-128gb-yellow',
  //   category: 'phones',
  //   namespaceId: 'apple-iphone-11',
  //   name: 'Apple iPhone 11 128GB Yellow',
  //   capacityAvailable: ['64GB', '128GB', '256GB'],
  //   capacity: '128GB',
  //   priceRegular: 1100,
  //   priceDiscount: 1050,
  //   colorsAvailable: ['black', 'green', 'yellow', 'white', 'purple', 'red'],
  //   color: 'yellow',
  //   images: [
  //     'img/phones/apple-iphone-11/yellow/00.webp',
  //     'img/phones/apple-iphone-11/yellow/01.webp',
  //     'img/phones/apple-iphone-11/yellow/02.webp',
  //     'img/phones/apple-iphone-11/yellow/03.webp',
  //     'img/phones/apple-iphone-11/yellow/04.webp',
  //   ],
  //   description: [
  //     {
  //       title: 'And then there was Pro',
  //       text: [
  //         'A transformative triple-camera system that adds tons of capability without complexity.',
  //         'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
  //       ],
  //     },
  //     {
  //       title: 'Camera',
  //       text: [
  //         'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
  //       ],
  //     },
  //     {
  //       title:
  //         'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
  //       text: [
  //         'iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
  //       ],
  //     },
  //   ],
  //   screen: "6.1' IPS",
  //   resolution: '1792x828',
  //   processor: 'Apple A13 Bionic',
  //   ram: '4GB',
  //   camera: '12 Mp + 12 Mp + 12MP',
  //   zoom: 'Digital, 5x',
  //   cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE'],
  // },

  // {
  //   id: 'apple-iphone-11-256gb-black',
  //   category: 'phones',
  //   namespaceId: 'apple-iphone-11',
  //   name: 'Apple iPhone 11 256GB Black',
  //   capacityAvailable: ['64GB', '128GB', '256GB'],
  //   capacity: '256GB',
  //   priceRegular: 1172,
  //   priceDiscount: 1115,
  //   colorsAvailable: ['black', 'green', 'yellow', 'white', 'purple', 'red'],
  //   color: 'black',
  //   images: [
  //     'img/phones/apple-iphone-11/black/00.webp',
  //     'img/phones/apple-iphone-11/black/01.webp',
  //     'img/phones/apple-iphone-11/black/02.webp',
  //     'img/phones/apple-iphone-11/black/03.webp',
  //     'img/phones/apple-iphone-11/black/04.webp',
  //   ],
  //   description: [
  //     {
  //       title: 'And then there was Pro',
  //       text: [
  //         'A transformative triple-camera system that adds tons of capability without complexity.',
  //         'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
  //       ],
  //     },
  //     {
  //       title: 'Camera',
  //       text: [
  //         'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
  //       ],
  //     },
  //     {
  //       title:
  //         'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
  //       text: [
  //         'iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
  //       ],
  //     },
  //   ],
  //   screen: "6.1' IPS",
  //   resolution: '1792x828',
  //   processor: 'Apple A13 Bionic',
  //   ram: '4GB',
  //   camera: '12 Mp + 12 Mp + 12MP',
  //   zoom: 'Digital, 5x',
  //   cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE'],
  // },

  // {
  //   id: 'apple-iphone-11-256gb-green',
  //   category: 'phones',
  //   namespaceId: 'apple-iphone-11',
  //   name: 'Apple iPhone 11 256GB Green',
  //   capacityAvailable: ['64GB', '128GB', '256GB'],
  //   capacity: '256GB',
  //   priceRegular: 1172,
  //   priceDiscount: 1115,
  //   colorsAvailable: ['black', 'green', 'yellow', 'white', 'purple', 'red'],
  //   color: 'green',
  //   images: [
  //     'img/phones/apple-iphone-11/green/00.webp',
  //     'img/phones/apple-iphone-11/green/01.webp',
  //     'img/phones/apple-iphone-11/green/02.webp',
  //     'img/phones/apple-iphone-11/green/03.webp',
  //     'img/phones/apple-iphone-11/green/04.webp',
  //   ],
  //   description: [
  //     {
  //       title: 'And then there was Pro',
  //       text: [
  //         'A transformative triple-camera system that adds tons of capability without complexity.',
  //         'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
  //       ],
  //     },
  //     {
  //       title: 'Camera',
  //       text: [
  //         'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
  //       ],
  //     },
  //     {
  //       title:
  //         'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
  //       text: [
  //         'iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
  //       ],
  //     },
  //   ],
  //   screen: "6.1' IPS",
  //   resolution: '1792x828',
  //   processor: 'Apple A13 Bionic',
  //   ram: '4GB',
  //   camera: '12 Mp + 12 Mp + 12MP',
  //   zoom: 'Digital, 5x',
  //   cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE'],
  // },

  // {
  //   id: 'apple-iphone-11-256gb-purple',
  //   category: 'phones',
  //   namespaceId: 'apple-iphone-11',
  //   name: 'Apple iPhone 11 256GB Purple',
  //   capacityAvailable: ['64GB', '128GB', '256GB'],
  //   capacity: '256GB',
  //   priceRegular: 1172,
  //   priceDiscount: 1115,
  //   colorsAvailable: ['black', 'green', 'yellow', 'white', 'purple', 'red'],
  //   color: 'purple',
  //   images: [
  //     'img/phones/apple-iphone-11/purple/00.webp',
  //     'img/phones/apple-iphone-11/purple/01.webp',
  //     'img/phones/apple-iphone-11/purple/02.webp',
  //     'img/phones/apple-iphone-11/purple/03.webp',
  //     'img/phones/apple-iphone-11/purple/04.webp',
  //   ],
  //   description: [
  //     {
  //       title: 'And then there was Pro',
  //       text: [
  //         'A transformative triple-camera system that adds tons of capability without complexity.',
  //         'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
  //       ],
  //     },
  //     {
  //       title: 'Camera',
  //       text: [
  //         'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
  //       ],
  //     },
  //     {
  //       title:
  //         'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
  //       text: [
  //         'iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
  //       ],
  //     },
  //   ],
  //   screen: "6.1' IPS",
  //   resolution: '1792x828',
  //   processor: 'Apple A13 Bionic',
  //   ram: '4GB',
  //   camera: '12 Mp + 12 Mp + 12MP',
  //   zoom: 'Digital, 5x',
  //   cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE'],
  // },
];

export const NewModels = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.title__text}>Brand new models</h2>
        <div className={styles.title__buttons}>
          <Button direction="prev" />
          <Button direction="next" />
        </div>
      </div>
      <div className={styles.phone_list}>
        {newModels.map(card => {
          return <ProductCard key={card.id} card={card} discount={true} />;
        })}
      </div>
    </div>
  );
};
