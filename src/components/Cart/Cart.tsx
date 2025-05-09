import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { CartItem } from '@/components/Cart/CartItem';
import { clearCart } from '@/store/features/products/cartSlice';
import { useState } from 'react';
import { ConfirmModal } from '@/components/ConfirmModal';
import { Link } from 'react-router-dom';

export const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.items);
    const cart_num = useSelector((state: RootState) => state.cart.items.length);
    const totalPrice = cart.reduce((sum, product) => sum + (product.priceRegular || 0) * (product.quantity || 1), 0);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckoutClick = () => {
        setIsModalOpen(true);
    }

    const handleConfirm = () => {
        dispatch(clearCart());
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="font-mont px-4 sm:px-6 md:px-6 lg-1.5:px-8 xl:px-[152px]">

            <Link to={'/phones'} className='flex items-center pt-10 group'>
                <img
                    src="icons/arrow-left.svg"
                    alt="back"
                    className='transition-colors group-hover:hidden'
                />
                <img
                    src="icons/arrow-left-purple.svg"
                    alt="back-purple"
                    className="hidden transition-colors group-hover:block"
                />
                <p className='text-text-color-base-white text-xs font-bold group-hover:text-color-btn-purple'>Back</p>
            </Link>
            <h1 className="pt-4 text-text-color-base-white font-extrabold text-5xl leading-[56px] tracking-negative-1">
                Cart
            </h1>

            <ConfirmModal isOpen={isModalOpen} onConfirm={handleConfirm} onCancel={handleCancel} />

            {cart_num === 0 ? (
                <p className="pt-48 text-text-color-base-white text-5xl text-center uppercase font-semibold">Your cart is empty</p>
            ) : (
                <div className="pt-8 flex flex-col lg-1.5:flex-row gap-4">
                    <div className='flex flex-col gap-4'>
                        {cart.map(product => (
                            <CartItem key={product.id} product={product} />
                        ))}
                    </div>


                    <div className="w-full max-w-[752px] text-sm leading-[21px] border border-color-border flex flex-col items-center px-4 sm:px-6 py-6
                                    lg-1.5:w-[368px] h-[206px]"
                    >
                        <span className='font-extrabold text-[32px] leading-[41px] tracking-negative-1 text-text-color-base-white'>
                            ${totalPrice}
                        </span>
                        <span
                            className='font-semibold text-text-color-base-grey'>
                            {`Total for ${cart_num} items`}
                        </span>
                        <div className="mt-6 block max-w-[320px] w-full h-[1px] bg-color-border">&nbsp;</div>
                        <button
                            onClick={handleCheckoutClick}
                            className='bg-color-btn-purple w-[78vw] max-w-[550px] min-w-[240px]  lg-1.5:max-w-[320px] h-12 font-semibold text-text-color-base-white mt-6 transition-all hover:bg-color-btn-purple-hover'
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};