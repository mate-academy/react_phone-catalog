export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const mobileMenuSlide = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.4,
      ease: 'easeIn',
    },
  },
} as const;
