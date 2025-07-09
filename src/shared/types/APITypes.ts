const enum Category {
  Accessories = 'acessories',
  Phones = 'phones',
  Products = 'products',
  Tablets = 'tablets',
  Banners = 'banners',
}

const enum Processors {
  S3 = 'Apple S3',
  S4 = 'Apple S4',
  S5 = 'Apple S5',
  S6 = 'Apple S6',
  A10 = 'Apple A10',
  A11 = 'Apple A11 Bionic',
  A12 = 'Apple A12 Bionic',
  A13 = 'Apple A13 Bionic',
  A14 = 'Apple A14 Bionic',
  A15 = 'Apple A15 Bionic',
  A16 = 'Apple A16 Bionic',
  M1 = 'Apple M1',
}

const enum Resolutions {
  Res1 = '272x340',
  Res2 = '324x394',
  Res3 = '368x448',
  Res4 = '1334x750',
  Res5 = '1792x828',
  Res6 = '1920x1080',
  Res7 = '2048x1536',
  Res8 = '2160x1620',
  Res9 = '2266x1488',
  Res10 = '2360x1640',
  Res11 = '2388x1668',
  Res12 = '2436x1125',
  Res13 = '2532x1170',
  Res14 = '2556x1179',
  Res15 = '2688x1242',
  Res16 = '2778x1284',
}

const enum Ram {
  R07 = '768MB',
  R1 = '1GB',
  R075 = '0.75GB',
  R4 = '4GB',
  R2 = '2GB',
  R3 = '3GB',
  R6 = '6GB',
  R8 = '8GB',
  R16 = '16GB',
}

const enum Colors {
  sg = 'spacegray',
  sg1 = 'space-gray',
  sg2 = 'space gray',
  sv = 'silver',
  rg = 'rose gold',
  gr = 'green',
  sb = 'sky blue',
  sl = 'starlight',
  pi = 'pink',
  blc = 'black',
  prp = 'purple',
  rd = 'red',
  wh = 'white',
  ylw = 'yellow',
  gld = 'gold',
  mng = 'midnightgreen',
  crl = 'coral',
  mn = 'midnight',
  spb = 'spaceblack',
  bl = 'blue',
  srb = 'sierrablue',
  grp = 'graphite',
}

const enum Screens {
  OLED_13 = "1.3' OLED",
  OLED_157 = "1.57' OLED",
  OLED_178 = "1.78' OLED",
  OLED_58 = "5.8' OLED",
  OLED_61 = "6.1' OLED",
  OLED_65 = "6.5' OLED",
  OLED_SR_56 = "6.5' OLED (Super Retina HD)",
  OLED_SR_61 = "6.1' OLED (Super Retina XDR)",
  LTPO_OLED_178 = "1.78' LTPO OLED",
  LIQ_RET_11 = "11' Liquid Retina",
  LIQ_RET_109 = "10.9' Liquid Retina",
  LIQ_RET_83 = "8.3' Liquid Retina",
  RET_102 = "10.2' Retina",
  RET_79 = "7.9' Retina",
  IPS_47 = "4.7' IPS",
  IPS_55 = "5.5' IPS",
  IPS_61 = "6.1' IPS",
  SUP_RET_54 = "5.4' Super Retina XDR",
  SUP_RET_67 = "6.7' Super Retina XDR display",
}

const enum Cells {
  GPRS = 'GPRS',
  EDGE = 'EDGE',
  WCDMA = 'WCDMA',
  UMTS = 'UMTS',
  HSPA = 'HSPA',
  LTE = 'LTE',
  g5G = '5G',
  GSM = 'GSM',
  CDMA = 'CDMA',
  EVDO = 'EVDO',
  WIFI = 'Wi-Fi',
  BLUETOOTH = 'Bluetooth',
  NA = 'Not applicable',
}

const enum Cameras {
  mn8 = '8MP',
  mn12 = '12MP',
  tr12_12_12 = '12 Mp + 12 Mp + 12 Mp',
  tr12_12_12_1 = '12 Mp + 12 Mp + 12MP',
  db12_7 = '12 Mp + 7 Mp',
  db12_7_1 = '12 Mp + 7 MP',
  db12_12 = '12 Mp + 12 Mp',
  db12_12_1 = '12MP + 12MP',
  tr12_12_7 = '12 Mp + 12 Mp + 7MP',
  qd48_12_12_12 = '48 Mp + 12 Mp + 12MP + 12Mp',
}

const enum Capacity {
  g32 = '32GB',
  g64 = '64GB',
  g128 = '128GB',
  g256 = '256GB',
  g512 = '512GB',
  t1 = '1TB',
  t2 = '2TB',
  mm38 = '38mm',
  mm40 = '40mm',
  mm42 = '42mm',
  mm44 = '44mm',
}

type Description = {
  title: string;
  text: string;
};

interface BaseProduct {
  id: number;
  category: Category;
  itemId: string;
  name: string;
  capacity: Capacity;
  fullPrice: number;
  price: number;
  color: Colors;
  image: string;
  screen: Screens;
  ram: Ram;
  year: number;
}

interface Product {
  id: string;
  category: Category;
  namespaceId: string;
  name: string;
  capacityAvailable: Capacity[];
  capacity: Capacity;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: Colors[];
  color: Colors;
  images: string[];
  description: Description[];
  screen: Screens;
  resolution: Resolutions;
  processor: Processors;
  ram: Ram;
  cell: Cells[];
  camera?: Cameras;
}
export {
  Category,
  Processors,
  Resolutions,
  Ram,
  Colors,
  Screens,
  Cells,
  Cameras,
  Capacity,
};

export { type Description, type BaseProduct, type Product };
