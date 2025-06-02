import { Link } from 'react-router-dom';
import './ProductCard.scss';

export const ProductCard = () => {
    return (
        <div className="ProductCard">
            <Link to="/" className="ProductCard_container"> 
                <div className="ProductCard_container-image">
                    <img src="img/phones/apple-iphone-14-pro/gold/00.webp" className="ProductCard_photo" alt="iphone" />
                </div>

                <div className="ProductCard_container-title">
                    <span className='ProductCard_title'>Apple iPhone 14 Pro <br/>128GB Silver (MQ023)</span>
                </div>

                <div className="ProductCard_container-price">
                    <span className='ProductCard_price'>$999</span>
                </div>
                <div className="ProductCard_devider"></div>
                <div className="ProductCard_specification">
                    
                </div>
                <div className="ProductCard_buttons"></div>
            </Link>
        </div>
    )
}