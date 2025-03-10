import { useEffect, useState } from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import './ProductInformation.scss';
import { getPhones } from '../../utils/api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const InfoHook = () => {
  const { productId } = useParams<{ productId: string }>(); // Отримуємо productId з URL
  const [phonesInfo, setPhonesInfo] = useState<ProductDetails[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<ProductDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation(); // URL
  const navigate = useNavigate(); // повернення на попередню сторінку
  const [mainImage, setMainImage] = useState<string>('');
  const [selecredColor, setSelectedColor] = useState<string | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);
  const urlArr = pathname.split('-'); // URL

  const colorFrom = urlArr[urlArr.length - 1]; // URL

  useEffect(() => {
    setLoading(true);
    getPhones()
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
  const updateUrl = (color: string, memory: string) => {
    if (colorFrom.split(' ').length > 1) {
      urlArr.pop();
    }

    urlArr.pop();
    navigate(`${urlArr.join('-')}-${color}-${memory}`);
  };

  const handleChangeColor = (color: string) => {
    if (!selectedMemory) {
      return;
    }

    setSelectedColor(color);
    const newPhone = phonesInfo.find(phone => phone.color === color);

    if (newPhone) {
      setSelectedPhone(newPhone);
    }

    updateUrl(color, selectedMemory);
  };

  const handleChangeMemory = (memory: string) => {
    const newPhone = phonesInfo.find(phone => phone.capacity === memory);

    if (newPhone) {
      setSelectedPhone(newPhone);
    }

    if (selecredColor && memory) {
      updateUrl(selecredColor, memory);
    }
  };

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
