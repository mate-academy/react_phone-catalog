/* eslint-disable @typescript-eslint/indent */
import { useState, useEffect } from 'react';
import { Product, ProductDetails } from '../../types/ProductTipes';
import './ProductInfo.scss';
import { fetchAllProducts, fetchProducts } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../BoughtCard/CartContext';
import { useFavourites } from '../Favourites/FavouritesContext';

export const useInfoHook = () => {
  const { productId, category } = useParams<{
    productId: string;
    category: string;
  }>();
  const [phonesInfo, setPhonesInfo] = useState<ProductDetails[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<ProductDetails | null>(
    null,
  );
  const [selectedPProducts, setSelectedPProducts] = useState<Product | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [mainImg, setMainImg] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { cart, toggleCart } = useCart();
  const { favourites, toggleFavourite } = useFavourites();

  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      fetchAllProducts()
        .then(data => {
          setPhonesInfo(data);
          const foundPhone = data.find(p => p.id === productId);

          if (foundPhone) {
            setSelectedPhone(foundPhone);
            setMainImg(foundPhone.images[0]);
            setSelectedColor(foundPhone.color);
            setSelectedMemory(foundPhone.capacity);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [productId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();

        const filteredProducts = data.filter(
          (p: Product) => p.category === category,
        );

        setProducts(filteredProducts);

        const product = filteredProducts.find(
          (item: Product) => item.itemId === productId,
        );

        setSelectedPProducts(product || null);
      } catch {
        setError('Something went wrong...Please, check your connection');
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

  useEffect(() => {
    if (selectedPhone) {
      setIsAdded(cart.some(item => String(item.itemId) === selectedPhone.id));
      setIsFav(
        favourites.some(item => String(item.itemId) === selectedPhone.id),
      );
    }
  }, [selectedPhone, cart, favourites]);

  const handleToggleCart = () => {
    if (!selectedPhone) {
      return;
    }

    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    let updatedCart;

    if (isAdded) {
      updatedCart = savedCart.filter(
        (item: ProductDetails) => String(item.id) !== selectedPhone.id,
      );
    } else {
      updatedCart = [...savedCart, selectedPhone];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    if (selectedPProducts) {
      toggleCart(selectedPProducts);
      setIsAdded(!isAdded);
    }
  };

  const handleToggleFavourite = () => {
    if (!selectedPhone) {
      return;
    }

    if (selectedPProducts) {
      toggleFavourite(selectedPProducts);
      setIsFav(!isFav);
    }
  };

  const updateUrl = (namespaceId: string, color: string, memory: string) => {
    const normalizedColor = normalizeColor(color);
    const newUrl = `/${category}/${namespaceId}-${memory.toLowerCase()}-${normalizedColor}`;

    navigate(newUrl);
  };

  const handleColorChange = (color: string) => {
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
      setMainImg(newPhone.images[0]);
    }

    updateUrl(selectedPhone!.namespaceId, normalizedColor, selectedMemory!);
  };

  const handleMemoryChange = (memory: string) => {
    if (!selectedColor || !selectedPhone) {
      return;
    }

    setSelectedMemory(memory);

    const newPhone = phonesInfo.find(
      phone =>
        phone.capacity === memory &&
        phone.namespaceId === selectedPhone?.namespaceId &&
        phone.color === selectedColor,
    );

    if (newPhone) {
      setSelectedPhone(newPhone);
      setMainImg(newPhone.images[0]);
    }

    updateUrl(selectedPhone!.namespaceId, selectedColor!, memory);
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
      ].filter(item => item.value)
    : [];

  return {
    productId,
    navigate,
    selectedPhone,
    mainImg,
    loading,
    selectedMemory,
    selectedColor,
    handleMemoryChange,
    handleColorChange,
    setMainImg,
    techInfo,
    setSelectedPhone,
    setError,
    error,
    products,
    isFav,
    isAdded,
    handleToggleFavourite,
    handleToggleCart,
  };
};
