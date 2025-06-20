export function dragOffsetCalc(
  clientVal: number,
  startVal: number,
  offset: number,
  clamp: boolean,
  coeff: number,
  infinite: boolean,
  width: number,
  length: number,
) {
  const rawDrag = clientVal - startVal;

  if (clamp) {
    const futureOffset = offset - rawDrag * coeff;
    const maxOffset = (infinite ? length + 1 : length - 1) * width;

    const disposition =
      futureOffset < 0
        ? offset / coeff
        : futureOffset > maxOffset
          ? (offset - maxOffset) / coeff
          : rawDrag;

    return disposition;
  }

  return rawDrag;
}
