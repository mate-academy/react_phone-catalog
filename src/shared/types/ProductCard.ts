import { Products } from './Products';

export interface ProductCard {
  id: string;
  category: Products;
  namespaceId: string;
  name: string;
  capacityAvailable: Capacity[];
  capacity: Capacity;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: DescriptionItem[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

interface DescriptionItem {
  title: string;
  text: string[];
}

type Capacity = '64GB' | '128GB' | '256GB';

/* {
    "id": "apple-iphone-11-256gb-white",
    "category": "phones",
    "namespaceId": "apple-iphone-11",
    "name": "Apple iPhone 11 256GB White",
    "capacityAvailable": ["64GB", "128GB", "256GB"],
    "capacity": "256GB",
    "priceRegular": 1172,
    "priceDiscount": 1115,
    "colorsAvailable": ["black", "green", "yellow", "white", "purple", "red"],
    "color": "white",
    "images": [
      "img/phones/apple-iphone-11/white/00.webp",
      "img/phones/apple-iphone-11/white/01.webp",
      "img/phones/apple-iphone-11/white/02.webp",
      "img/phones/apple-iphone-11/white/03.webp",
      "img/phones/apple-iphone-11/white/04.webp"
    ],
    "description": [
      {
        "title": "And then there was Pro",
        "text": [
          "A transformative triple-camera system that adds tons of capability without complexity.",
          "An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro."
        ]
      },
      {
        "title": "Camera",
        "text": [
          "Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it."
        ]
      },
      {
        "title": "Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.",
        "text": [
          "iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with."
        ]
      }
    ],
    "screen": "6.1' IPS",
    "resolution": "1792x828",
    "processor": "Apple A13 Bionic",
    "ram": "4GB",
    "camera": "12 Mp + 12 Mp + 12MP",
    "zoom": "Digital, 5x",
    "cell": ["GPRS", "EDGE", "WCDMA", "UMTS", "HSPA", "LTE"]
  }, */
