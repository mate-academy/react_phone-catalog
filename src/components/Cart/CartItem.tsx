import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, toggleCart } from '@/store/features/products/cartSlice';
import { CartItemProps } from '@/types/Product';
import { Link } from 'react-router-dom';

export const CartItem = ({ product }: CartItemProps) => {
    const dispatch = useDispatch();

    return (
        <div className="w-full max-w-[752px] min-h-[128px] flex flex-col sm:flex-row items-center gap-6 bg-color-btn-pagin font-mont pb-4 pt-6 px-4 sm:py-0 sm:px-6">
            <div className='flex items-center gap-6'>
                <button
                    onClick={() => dispatch(toggleCart(product))}
                    className='transition-all hover:scale-150 flex justify-center items-center flex-shrink-0'
                >
                    <img src="icons/close-grey.svg" className='w-4 h-4' alt="close" />
                </button>

                <Link to={`/phones/${product.id}`} className='w-[66px] h-[66px]'>
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full transition-all object-contain hover:scale-110 flex-shrink-0"
                    />
                </Link>

                <p className="text-text-color-base-white font-semibold text-sm leading-[21px] w-max-[176px] md:w-[336px] ">{product.name}</p>
            </div>
            <div className="flex items-center gap-[14px] ">
                <button
                    onClick={() => dispatch(decreaseQuantity(product.id))}
                    disabled={product.quantity === 1}
                    className={`border border-color-border w-8 h-8 flex items-center justify-center ${product.quantity === 1
                        ? 'border border-color-border opacity-70 cursor-not-allowed'
                        : 'bg-background-color-btn hover:bg-background-color-btn-hover'
                        }`}>
                    <img src="icons/minus.svg" alt="minus" className='h-4 w-4' />
                </button>

                <p className="text-text-color-base-white">{product.quantity}</p>

                <button
                    onClick={() => dispatch(increaseQuantity(product.id))}
                    disabled={product.quantity === 30}
                    className={`border border-color-border w-8 h-8 flex items-center justify-center ${product.quantity === 30
                        ? 'border border-color-border opacity-70 cursor-not-allowed'
                        : 'bg-background-color-btn hover:bg-background-color-btn-hover'
                        }`}>
                    <img src="icons/plus.svg" alt="plus" />
                </button>
                <p className="text-text-color-base-white text-[22px] font-extrabold w-20 text-right">
                    ${product.priceRegular * (product.quantity || 1)}
                </p>
            </div>
        </div>
    );
};

