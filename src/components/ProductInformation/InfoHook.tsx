/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import './ProductInformation.scss';
import { fetchAllProducts } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';

export const useInfoHook = () => {
  const { productId } = useParams<{ productId: string }>(); // Отримуємо productId з URL
  const [phonesInfo, setPhonesInfo] = useState<ProductDetails[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<ProductDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  // const { pathname } = useLocation(); // URL
  const navigate = useNavigate(); // повернення на попередню сторінку
  const [mainImage, setMainImage] = useState<string>('');
  const [selecredColor, setSelectedColor] = useState<string | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);
  // const urlArr = pathname.split('-'); // URL

  // const colorFrom = urlArr[urlArr.length - 1]; // URL

  useEffect(() => {
    setLoading(true);
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
  }, [productId]);

  // URL
  const updateUrl = (namespaceId: string, color: string, memory: string) => {
    const newUrl = `/phones/${namespaceId}-${memory.toLowerCase()}-${color}`;

    navigate(newUrl);
  };

  const handleChangeColor = (color: string) => {
    if (!selectedMemory || !selectedPhone) {
      return;
    }

    setSelectedColor(color);

    // const newPhone = phonesInfo.find(phone => phone.color === color);

    // if (newPhone) {
    //   setSelectedPhone(newPhone);
    // }

    const newPhone = phonesInfo.find(
      phone =>
        phone.capacity === selectedMemory &&
        phone.namespaceId === selectedPhone?.namespaceId &&
        phone.color === selecredColor,
    );

    if (newPhone) {
      setSelectedPhone(newPhone);
      setMainImage(newPhone.images[0]);
    }

    updateUrl(selectedPhone.namespaceId, color, selectedMemory);
  };

  const handleChangeMemory = (memory: string) => {
    // const newPhone = phonesInfo.find(phone => phone.capacity === memory);

    // if (newPhone) {
    //   setSelectedPhone(newPhone);
    // }

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

    if (selecredColor && memory) {
      updateUrl(selectedPhone!.namespaceId, selecredColor, memory);
    }
  };

  const techInfo = selectedPhone
    ? [
        { title: 'Screen', value: selectedPhone.screen },
        { title: 'Resolution', value: selectedPhone.resolution },
        { title: 'Processor', value: selectedPhone.processor },
        { title: 'RAM', value: selectedPhone.ram },
        { title: 'Built in memory', value: selectedPhone.capacity },
        { title: 'Camera', value: selectedPhone.camera },
        { title: 'Zoom', value: selectedPhone.zoom },
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
  };
};
