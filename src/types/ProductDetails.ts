export interface ProductDetails {
  id: string;
  category: Category;
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
  screen: Screen;
  resolution: Resolution;
  processor: Processor;
  ram: RAM;
  camera: Camera;
  zoom: Zoom;
  cell: Cell[];
}

export enum Camera {
  The12Mp12Mp = '12 Mp + 12 Mp',
  The12Mp12Mp12MP = '12 Mp + 12 Mp + 12MP',
  The12Mp12Mp12Mp = '12 Mp + 12 Mp + 12 Mp',
  The12Mp12Mp7MP = '12 Mp + 12 Mp + 7MP',
  The12Mp7MP = '12 Mp + 7 MP',
  The12Mp7Mp = '12 Mp + 7 Mp',
  The48Mp12Mp12MP12Mp = '48 Mp + 12 Mp + 12MP + 12Mp',
}

export enum Capacity {
  The128GB = '128GB',
  The1TB = '1TB',
  The256GB = '256GB',
  The32GB = '32GB',
  The512GB = '512GB',
  The64GB = '64GB',
}

export enum Category {
  Phones = 'phones',
}

export enum Cell {
  CDMA = 'CDMA',
  Edge = 'EDGE',
  Evdo = 'EVDO',
  GPRS = 'GPRS',
  GSM = 'GSM',
  Hspa = 'HSPA',
  LTE = 'LTE',
  The5G = '5G',
  UMTS = 'UMTS',
  Wcdma = 'WCDMA',
}

export enum Color {
  Black = 'black',
  Blue = 'blue',
  Coral = 'coral',
  Gold = 'gold',
  Graphite = 'graphite',
  Green = 'green',
  Midnight = 'midnight',
  Midnightgreen = 'midnightgreen',
  Pink = 'pink',
  Purple = 'purple',
  Red = 'red',
  Rosegold = 'rosegold',
  Sierrablue = 'sierrablue',
  Silver = 'silver',
  Spaceblack = 'spaceblack',
  Spacegray = 'spacegray',
  White = 'white',
  Yellow = 'yellow',
}

export interface Description {
  title: string;
  text: string[];
}

export enum Processor {
  AppleA10 = 'Apple A10',
  AppleA11Bionic = 'Apple A11 Bionic',
  AppleA12Bionic = 'Apple A12 Bionic',
  AppleA13Bionic = 'Apple A13 Bionic',
  AppleA14Bionic = 'Apple A14 Bionic',
  AppleA15Bionic = 'Apple A15 Bionic',
  AppleA16Bionic = 'Apple A16 Bionic',
}

export enum RAM {
  The2GB = '2GB',
  The3GB = '3GB',
  The4GB = '4GB',
  The6GB = '6GB',
}

export enum Resolution {
  The1334X750 = '1334x750',
  The1792X828 = '1792x828',
  The1792Х828 = '1792х828',
  The1920X1080 = '1920x1080',
  The2436Х1125 = '2436х1125',
  The2532X1170 = '2532x1170',
  The2556X1179 = '2556x1179',
  The2688Х1242 = '2688х1242',
  The2778X1284 = '2778x1284',
}

export enum Screen {
  The47IPS = "4.7' IPS",
  The54SuperRetinaXDR = "5.4' Super Retina XDR",
  The55IPS = "5.5' IPS",
  The58OLED = "5.8' OLED",
  The61IPS = "6.1' IPS",
  The61OLED = "6.1' OLED",
  The61OLEDSuperRetinaXDR = "6.1' OLED (Super Retina XDR)",
  The65OLED = "6.5' OLED",
  The65OLEDSuperRetinaHD = "6.5' OLED (Super Retina HD)",
  The67SuperRetinaXDRDisplay = "6.7' Super Retina XDR display",
}

export enum Zoom {
  Digital10XOptical2X = 'Digital, 10x / Optical, 2x',
  Digital5X = 'Digital, 5x',
  Digital5XOptical2X = 'Digital 5x, Optical 2x',
  Optical2XDigital5X = 'Optical, 2x; Digital, 5x',
  Optical3XDigitalUpTo15X = 'Optical, 3x; Digital, up to 15x',
}
