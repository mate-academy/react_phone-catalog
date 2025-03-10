import { useEffect, useState } from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import './ProductInformation.scss';
import { getPhones } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';

export const InfoHook = () => {
  const { productId } = useParams<{ productId: string }>(); // Отримуємо productId з URL
  const [phonesInfo, setPhonesInfo] = useState<ProductDetails[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<ProductDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // повернення на попередню сторінку
  const [mainImage, setMainImage] = useState<string>('');
  const [selecredColor, setSelectedColor] = useState<string | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getPhones()
      .then(data => {
        setPhonesInfo(data);

        const foundPhone = data.find(phone => phone.name === productId);

        if (foundPhone) {
          setSelectedPhone(foundPhone);
          setMainImage(foundPhone.images[0]);
          setSelectedColor(foundPhone.color);
          setSelectedMemory(foundPhone.capacityAvailable);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  const updateUrl = (color: string, memory: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    // const baseUrl = selectedPhone?.namespaceId;
    // const currentPath = location.pathname;
    // const pathSegment = currentPath.split('/');
    // const model = pathSegment[pathSegment.length - 1]
    //   .split('-')[0]
    //   .toLowerCase();
    // const colors = searchParams.get('color') || '';
    // const capacity = searchParams.get('capacity') || '';

    searchParams.set('color', color);
    searchParams.set('capacity', memory);
    // const newItemId = `${searchParams}${model}?capacity=${capacity}&color=${colors}`;

    navigate(`/phones/${productId}?${searchParams.toString()}`);
  };

  const handleChangeColor = (color: string) => {
    if (!selectedMemory) {
      return;
    }

    setSelectedColor(color);
    const newPhone = phonesInfo.find(phone => phone.color === color);

    if (newPhone) {
      setSelectedPhone(newPhone);
      setMainImage(newPhone.images[0]);
    }

    updateUrl(color, selectedMemory);
  };

  const handleChangeMemory = (mamory: string) => {
    if (!selecredColor) {
      return;
    }

    setSelectedMemory(mamory);
    updateUrl(selecredColor, mamory);
  };

  // const techInfo = [
  //   { title: 'Screen', value: selectedPhone.screen },
  //   { title: 'Resolution', value: selectedPhone.resolution },
  //   { title: 'Processor', value: selectedPhone.processor },
  //   { title: 'RAM', value: selectedPhone.ram },
  //   { title: 'Built in memory', value: selectedPhone.capacity },
  //   { title: 'Camera', value: selectedPhone.camera },
  //   { title: 'Zoom', value: selectedPhone.zoom },
  //   { title: 'Cell', value: selectedPhone.cell },
  // ];

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
  };
};
