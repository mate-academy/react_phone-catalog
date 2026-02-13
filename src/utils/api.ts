import { Product, RawProduct } from '../types';

const API_BASE = '/react_phone-catalog/api';

export const api = {
  async getProducts(): Promise<Product[]> {
    try {
      const [phones, tablets, accessories] = await Promise.all([
        this.getPhones(),
        this.getTablets(),
        this.getAccessories(),
      ]);

      const allProducts = [...phones, ...tablets, ...accessories];

      return allProducts.map(product => this.normalizeProduct(product));
    } catch (error) {
      try {
        const phones = await this.getPhones().catch(() => []);
        const tablets = await this.getTablets().catch(() => []);
        const accessories = await this.getAccessories().catch(() => []);

        const allProducts = [...phones, ...tablets, ...accessories];

        return allProducts.map(product => this.normalizeProduct(product));
      } catch {
        return [];
      }
    }
  },

  async getSuggestedProducts(
    currentProductId: string,
    limit: number = 4,
  ): Promise<Product[]> {
    try {
      const allProducts = await this.getProducts();

      const filteredProducts = allProducts.filter(
        product => product.id !== currentProductId,
      );

      const shuffled = [...filteredProducts].sort(() => 0.5 - Math.random());

      return shuffled.slice(0, limit);
    } catch (error) {
      return [];
    }
  },

  async getProductsList(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE}/products.json`);

      if (!response.ok) {
        return [];
      }

      return await response.json();
    } catch {
      return [];
    }
  },

  async getPhones(): Promise<RawProduct[]> {
    try {
      const response = await fetch(`${API_BASE}/phones.json`);

      if (!response.ok) {
        return [];
      }

      return await response.json();
    } catch {
      return [];
    }
  },

  async getTablets(): Promise<RawProduct[]> {
    try {
      const response = await fetch(`${API_BASE}/tablets.json`);

      if (!response.ok) {
        return [];
      }

      return await response.json();
    } catch {
      return [];
    }
  },

  async getAccessories(): Promise<RawProduct[]> {
    try {
      const response = await fetch(`${API_BASE}/accessories.json`);

      if (!response.ok) {
        return [];
      }

      return await response.json();
    } catch {
      return [];
    }
  },

  async getProductDetails(productId: string): Promise<Product | null> {
    try {
      const allProducts = await this.getProducts();

      const foundProduct = allProducts.find(
        product =>
          product.id === productId ||
          product.phoneId === productId ||
          product.itemId === productId,
      );

      return foundProduct || null;
    } catch (error) {
      return null;
    }
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    switch (category) {
      case 'phones':
        return this.getPhones().then(products =>
          products.map(p => this.normalizeProduct(p)),
        );
      case 'tablets':
        return this.getTablets().then(products =>
          products.map(p => this.normalizeProduct(p)),
        );
      case 'accessories':
        return this.getAccessories().then(products =>
          products.map(p => this.normalizeProduct(p)),
        );
      default:
        return this.getProducts();
    }
  },

  normalizeProduct(productData: RawProduct): Product {
    const isNewFormat = productData.priceRegular !== undefined;
    const isOldFormat = productData.fullPrice !== undefined;

    const baseProduct = {
      id: productData.id,
      category: productData.category,
      name: productData.name,
      color: productData.color,
      capacity: productData.capacity || '',
      screen: productData.screen || '',
      ram: productData.ram || '',
      year: productData.year || 2023,

      colorsAvailable: productData.colorsAvailable,
      capacityAvailable: productData.capacityAvailable,
      resolution: productData.resolution,
      processor: productData.processor,
      camera: productData.camera,
      zoom: productData.zoom,
      cell: productData.cell,
      images: productData.images,
      description: productData.description,
    };

    if (isNewFormat) {
      return {
        ...baseProduct,
        phoneId: productData.namespaceId || productData.id,
        itemId: productData.id,
        fullPrice: productData.priceRegular || 0,
        price: productData.priceDiscount || 0,
        image: productData.images?.[0] || '',
      };
    }

    if (isOldFormat) {
      return {
        ...baseProduct,
        phoneId: productData.phoneId || productData.itemId || productData.id,
        itemId: productData.itemId || productData.id,
        fullPrice: productData.fullPrice || 0,
        price: productData.price || 0,
        image: productData.image || '',
        images: productData.images || [productData.image].filter(Boolean),
      };
    }

    return {
      ...baseProduct,
      phoneId: productData.id,
      itemId: productData.id,
      fullPrice: productData.priceRegular || productData.fullPrice || 0,
      price: productData.priceDiscount || productData.price || 0,
      image: productData.images?.[0] || productData.image || '',
    };
  },
};
