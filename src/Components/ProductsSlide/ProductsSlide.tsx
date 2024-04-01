import classNames from "classnames";
import { useContext, useEffect, useState} from "react"
import { getBrandNewProducts, getHotPriceProducts } from "../../helper/api"
import { ProductCard } from "../ProductCard/ProductCard";
import './ProductSlide.scss';
import { ProductContext } from "../../helper/ProductContext";

interface Props {
  sectionType: 'hotPrices' | 'brandNew'
}

export const ProductsSlide:React.FC<Props> = ({ sectionType}) => {
  const { phones, setPhones } = useContext(ProductContext);
  const [scrollPosition, setScrollPosition] = useState(0);

  const slideParam = {
    itemWidth: 272,
    frameHeight: 1152,
  }
  
  const maxScrol = (phones.length * slideParam.itemWidth) - slideParam.frameHeight;
 
  const scrollRight = () => {
    const newPosition = scrollPosition - slideParam.frameHeight;
    setScrollPosition(newPosition)
  }

  const scrollLeft = () => {
    const newPosition = scrollPosition + slideParam.frameHeight;
    setScrollPosition(newPosition)
  }

  useEffect(() => {
    if (sectionType === 'hotPrices') {
      getHotPriceProducts().then((response) => {
        setPhones(response)
     });
    }
    
    if (sectionType === 'brandNew') {
      getBrandNewProducts().then((response) => {
        setPhones(response)
     });
    }

    const element = document.querySelector(`.${sectionType}Container`) as HTMLElement;
    element.style.transform = `translate(-${scrollPosition}px)`;
  }, [scrollPosition])

  return (
    <div className="slider">
      <div className="slider__items"> 
        <h1 className="slider__title"> {sectionType === 'hotPrices' ? 'Hot prices': 'Brand new'}</h1>
        <div className="slider__buttons">
            <button 
              className="slider__button slider__button--right"
              onClick={scrollRight}
              disabled={scrollPosition === 0}
            >
              <i 
                className={`slider__img slider__img--right ${scrollPosition === 0 ? 'disabled' : ''}`}
              />
            </button>
            <button 
              className="slider__button slider__button--left"
              onClick={scrollLeft}
              disabled={scrollPosition > maxScrol}
            >
              <i
                className={`slider__img slider__img--left ${scrollPosition > maxScrol ? 'disabled' : ''}`}
              />
          </button>
        </div>     
      </div>

      <div  className={classNames('cardsContainer', {
          'hotPricesContainer' : sectionType === 'hotPrices',
          'brandNewContainer' : sectionType === 'brandNew',
      })}>
        {phones.map(product => (
           <ProductCard 
              product={product}
              sectionType={sectionType}
              key={product.id}
            />
        ))}
      </div>
    </div>
  )
}