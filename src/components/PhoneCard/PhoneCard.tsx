import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './phoneCard.scss';

type ProductInfo = {
  id: string; // строка, например "apple-iphone-14-pro-1tb-gold"
  category: string; // строка, например "phones"
  namespaceId: string; // строка
  name: string; // строка, полное имя товара
  capacityAvailable: string[]; // массив строк, доступные объёмы
  capacity: string; // строка, текущий объём
  priceRegular: number; // обычная цена
  priceDiscount: number; // скидочная цена
  colorsAvailable: string[]; // доступные цвета
  color: string; // текущий цвет
  images: string[]; // массив ссылок на картинки
  description: ProductDescription[]; // массив объектов с заголовком и текстом
  screen: string; // описание экрана
  resolution: string; // разрешение экрана
  processor: string; // процессор
  ram: string; // оперативная память
  camera: string; // описание камеры
  zoom: string; // описание зума
  cell: string[]; // массив поддерживаемых сетей
};

type ProductDescription = {
  title: string;
  text: string[];
};

export const PhoneCard: React.FC = () => {
  const [products, setProducts] = useState<ProductInfo[]>([]);

  useEffect(() => {
    fetch('/api/phones.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        // setIsLoading(false);
      })
      .catch(error => {
        console.error('Ошибка при загрузке:', error);
        // setIsLoading(false);
      });
  }, []);

  // if (!products) {
  //   return null;
  // }

  const arrModel14Pro = products.filter(model => model.id.includes('14-pro'));

  return (
    <>
      {arrModel14Pro.map(model => {
        const screen = model.screen.split(' ').slice(0, 2).join(' ');
        const capacity = model.capacity.replace(/(\d)([A-Za-z])/g, '$1 $2');
        const ram = model.ram.replace(/(\d)([A-Za-z])/g, '$1 $2');
        const titleModelPhoto = model.images[0];
        const modelName = model.name;
        const modelPriceRegular = `$${model.priceRegular}`;
        const modelId = model.id;

        return (
          <div className="phone-card-container" key={modelId}>
            <Link to='/' className="photo-name-container">
              <div className="device-photo">
                <img
                  className="photo"
                  src={titleModelPhoto}
                  alt="device photo"
                />
              </div>

              <div className="name">{modelName}</div>
            </Link>

            <div className="price">{modelPriceRegular}</div>

            <div className="info">
              <div className="screen">
                <div className="spec-name">Screen</div>
                <div className="spec-value">{screen}</div>
              </div>

              <div className="capacity">
                <div className="spec-name">Capacity</div>
                <div className="spec-value">{capacity}</div>
              </div>

              <div className="ram">
                <div className="spec-name">RAM</div>
                <div className="spec-value">{ram}</div>
              </div>
            </div>

            <div className="add-favourites-container">
              <div className="add-button">
                <div className="button-text">Add to card</div>
              </div>
              <div className="favourites-button">
                <img
                  className="icon"
                  src="/img/icons/Heart.svg"
                  alt="favourites img"
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
