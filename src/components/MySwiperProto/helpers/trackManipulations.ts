export function toggleClass(prop: HTMLUListElement, dragFlag: boolean) {
  prop.classList.toggle('swiper__track--dragging', dragFlag);
  prop.classList.toggle('swiper__track--animated', !dragFlag);
}

export function positionSet(
  dragFlag: boolean,
  offset: number,
  drag: number,
  coeff: number,
) {
  const transformValue = dragFlag
    ? `translateX(${-offset + drag * coeff}px)`
    : `translateX(${-offset}px)`;

  return transformValue;
}
