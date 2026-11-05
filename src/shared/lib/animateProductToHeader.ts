type HeaderTarget = 'cart' | 'favourites';

export const animateProductToHeader = (
  productId: number,
  target: HeaderTarget,
) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targetElement = Array.from(
    document.querySelectorAll<HTMLElement>(`[data-fly-target="${target}"]`),
  ).find((element) => {
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);

    return (
      rect.width > 0 &&
      rect.height > 0 &&
      rect.right > 0 &&
      rect.left < window.innerWidth &&
      style.visibility !== 'hidden' &&
      style.display !== 'none'
    );
  });
  const productImages = Array.from(
    document.querySelectorAll<HTMLImageElement>(
      `[data-product-image="${productId}"]`,
    ),
  );
  const isVisible = (image: HTMLImageElement) => {
    const rect = image.getBoundingClientRect();

    return (
      rect.width > 0 &&
      rect.height > 0 &&
      rect.bottom > 0 &&
      rect.top < window.innerHeight &&
      rect.right > 0 &&
      rect.left < window.innerWidth
    );
  };
  const sourceImage =
    productImages.find(
      (image) =>
        image.closest('.swiper-slide-active') !== null && isVisible(image),
    ) ??
    productImages.find(isVisible) ??
    productImages[0];

  if (!sourceImage || !targetElement) return;

  const sourceRect = sourceImage.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();
  if (!sourceRect.width || !sourceRect.height) return;

  const image = sourceImage.cloneNode() as HTMLImageElement;
  const offsetX =
    targetRect.left +
    targetRect.width / 2 -
    (sourceRect.left + sourceRect.width / 2);
  const offsetY =
    targetRect.top +
    targetRect.height / 2 -
    (sourceRect.top + sourceRect.height / 2);
  const scale = Math.min(
    targetRect.width / sourceRect.width,
    targetRect.height / sourceRect.height,
    0.45,
  );

  Object.assign(image.style, {
    position: 'fixed',
    top: `${sourceRect.top}px`,
    left: `${sourceRect.left}px`,
    width: `${sourceRect.width}px`,
    height: `${sourceRect.height}px`,
    margin: '0',
    objectFit: 'contain',
    pointerEvents: 'none',
    zIndex: '10000',
    transformOrigin: 'center',
    willChange: 'transform, opacity',
  });

  document.body.append(image);
  const animation = image.animate(
    [
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      {
        transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
        opacity: 0.35,
      },
    ],
    {
      duration: 650,
      easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
    },
  );

  animation.onfinish = () => image.remove();
  animation.oncancel = () => image.remove();
};
