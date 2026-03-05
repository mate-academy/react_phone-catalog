import { gsap } from 'gsap';
import {
  ANIM_SETTINGS,
  getAnimationSVG,
  type AnimateToTargetParams,
} from './animate-constants';
export const animateToTarget = ({
  sourceEl,
  targetRef,
  type = 'book',
}: AnimateToTargetParams) => {
  if (!sourceEl) return;

  const targetEl = targetRef?.current;
  const sourceRect = sourceEl.getBoundingClientRect();
  const targetRect = targetEl?.getBoundingClientRect();

  const isTargetVisible = !!(targetRect && targetRect.width > 0);

  const targetX =
    targetRect && isTargetVisible ?
      targetRect.left + targetRect.width / 2
    : window.innerWidth - ANIM_SETTINGS.mobileTarget.xOffset;

  const targetY =
    targetRect && isTargetVisible ?
      targetRect.top + targetRect.height / 2
    : ANIM_SETTINGS.mobileTarget.yOffset;

  const iconSize = ANIM_SETTINGS.sizes[type];
  const color = ANIM_SETTINGS.colors[type];
  const startX = sourceRect.left + sourceRect.width / 2;
  const startY = sourceRect.top + sourceRect.height / 2;

  const container = document.createElement('div');
  document.body.appendChild(container);

  gsap.set(container, {
    position: 'fixed',
    top: startY - iconSize / 2,
    left: startX - iconSize / 2,
    width: iconSize,
    height: iconSize,
    zIndex: 9999,
    pointerEvents: 'none',
    color: color,
    opacity: 0,
    filter: 'blur(0px)',
  });

  container.innerHTML = getAnimationSVG(type, iconSize, color);

  const tl = gsap.timeline({ onComplete: () => container.remove() });

  tl.to(container, {
    opacity: 1,
    duration: ANIM_SETTINGS.appearanceDuration,
    ease: 'sine.out',
  });

  tl.to(
    container,
    {
      duration: ANIM_SETTINGS.duration,
      x: targetX - startX,
      y: targetY - startY,
      rotation: ANIM_SETTINGS.rotations[type],
      opacity: ANIM_SETTINGS.opacityEnd,
      filter: `blur(${ANIM_SETTINGS.blurAmount}px)`,
      ease: 'power3.in',
    },
    `-=${ANIM_SETTINGS.appearanceDuration}`,
  );

  if (isTargetVisible && targetEl) {
    tl.to(
      targetEl,
      {
        duration: ANIM_SETTINGS.bounceDuration,
        scale: ANIM_SETTINGS.scale,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      },
      '-=0.25',
    );
  }
};
