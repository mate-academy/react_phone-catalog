/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import { Product, ProductDetails } from '../../types/ProductTypes';
import './ProductInformation.scss';
import { fetchAllProducts, fetchProducts } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../BuyCard/CartContext';
import { useFavourites } from '../Favourites/FacouritesContext';

export const useInfoHook = () => {
  const { productId, category } = useParams<{
    productId: string;
    category: string;
  }>();
  const [phonesInfo, setPhonesInfo] = useState<ProductDetails[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<ProductDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // повернення на попередню сторінку
  const [mainImage, setMainImage] = useState<string>('');
  const [selecredColor, setSelectedColor] = useState<string | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { toggleCart } = useCart();
  const { toggleFavorite } = useFavourites();


  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const allProducts = await fetchProducts();

        const product = allProducts.find(
          (prod: Product) => String(prod.id) === productId,
        );

        if (product) {
          toggleCart(product);
          toggleFavorite(product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId, toggleCart, toggleFavorite]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      fetchAllProducts()
        .then(data => {
          setPhonesInfo(data);
          const foundPhone = data.find(phone => phone.id === productId);

          if (foundPhone) {
            setSelectedPhone(foundPhone);
            setMainImage(foundPhone.images[0]);
            setSelectedColor(foundPhone.color);
            setSelectedMemory(foundPhone.capacity);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [productId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();

        const filteredProducts = data.filter(
          (product: Product) => product.category === category,
        );

        setProducts(filteredProducts);

        const product = filteredProducts.find(
          (item: Product) => item.itemId === productId,
        );

        setSelectedPhone(product || null);
      } catch {
        setError(
          `Oops, something went wrong, please check your connection 🫶💻`,
        );
      }
    };

    fetchData();
  }, [category, productId, setSelectedPhone, setError]);

  const normalizeColor = (color: string) => {
    if (color.length > 1) {
      return color.split(' ').join('-');
    }

    return color;
  };

  // URL
  const updateUrl = (namespaceId: string, color: string, memory: string) => {
    const normalizedColor = normalizeColor(color);
    const newUrl = `/${category}/${namespaceId}-${memory.toLowerCase()}-${normalizedColor}`;

    navigate(newUrl);
  };

  // зміни кольору
  const handleChangeColor = (color: string) => {
    if (!selectedMemory || !selectedPhone) {
      return;
    }

    const normalizedColor = normalizeColor(color);

    setSelectedColor(normalizedColor);

    const newPhone = phonesInfo.find(
      phone =>
        phone.capacity === selectedMemory &&
        phone.namespaceId === selectedPhone?.namespaceId &&
        phone.color === normalizedColor,
    );

    if (newPhone) {
      setSelectedPhone(newPhone);
      setMainImage(newPhone.images[0]);
    }

    updateUrl(selectedPhone!.namespaceId, normalizedColor, selectedMemory!);
  };

  // зміни пам'яті
  const handleChangeMemory = (memory: string) => {
    if (!selecredColor || !selectedPhone) {
      return;
    }

    setSelectedMemory(memory);

    const newPhone = phonesInfo.find(
      phone =>
        phone.capacity === memory &&
        phone.namespaceId === selectedPhone?.namespaceId &&
        phone.color === selecredColor,
    );

    if (newPhone) {
      setSelectedPhone(newPhone);
      setMainImage(newPhone.images[0]);
    }

    updateUrl(selectedPhone!.namespaceId, selecredColor!, memory);
  };

  const techInfo = selectedPhone
    ? [
        { title: 'Screen', value: selectedPhone.screen },
        { title: 'Resolution', value: selectedPhone.resolution },
        { title: 'Processor', value: selectedPhone.processor },
        { title: 'RAM', value: selectedPhone.ram },
        { title: 'Built in memory', value: selectedPhone.capacity },
        { title: 'Camera', value: selectedPhone.camera || null },
        { title: 'Zoom', value: selectedPhone.zoom || null },
        { title: 'Cell', value: selectedPhone.cell },
      ]
    : [];

  return {
    productId,
    navigate,
    selectedPhone,
    mainImage,
    loading,
    selectedMemory,
    selecredColor,
    handleChangeMemory,
    handleChangeColor,
    setMainImage,
    techInfo,
    setSelectedPhone,
    setError,
    error,
    products,
    toggleCart,
    toggleFavorite,
  };
};
