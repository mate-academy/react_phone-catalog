import { useAppState } from '../../../store/store';
import { motion } from 'motion/react';

export const CartFlyAnimation: React.FC = () => {
  const stateAni = useAppState((state) => state.cartAnimation);
  const finishCartAnimation = useAppState((state) => state.finishCartAnimation);

  if (!stateAni) {
    return null;
  }

  return (
    <motion.img
      src={stateAni.imageSrc}
      alt="product image flying to the cart"
      className="fixed z-50 object-contain pointer-events-none"
      style={{
        left: stateAni.start.x,
        top: stateAni.start.y,
        width: stateAni.start.width,
        height: stateAni.start.height,
        opacity: 1,
        scale: 1,
        rotate: 0,
      }}
      animate={{
        left: stateAni.end.x,
        top: stateAni.end.y,
        width: stateAni.end.width,
        height: stateAni.end.height,
        opacity: 1,
        scale: 0.35,
        rotate: 36,
      }}
      transition={{
        duration: 0.7,
        ease: 'easeIn',
      }}
      onAnimationComplete={finishCartAnimation}
    />
  );
};
