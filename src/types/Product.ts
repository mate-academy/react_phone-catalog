// src/types/Product.ts

export interface Product {
  id: string;
  sku?: string; // usado em ProductsList
  title: string;
  price: string;
  imageSrc?: string; // imagem principal
  images?: string[]; // galeria de imagens
  description?: string; // descrição do produto
  category?: string; // Phones, Tablets, Accessories...

  // especificações técnicas
  specs?: {
    screen?: string;
    capacity?: string;
    ram?: string;
    battery?: string;
    camera?: string;
    [key: string]: string | undefined; // permite campos extras
  };

  // opções de variação
  colorsAvailable?: string[];
  capacityAvailable?: string[];
}
