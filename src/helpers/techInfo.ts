export const techInfo = (
  goodInfo: Product,
  goodDetails: ProdactDetails,
  param: string,
  order: string,
) => {
  let value = '';

  if (order === 'info') {
    switch (param) {
      case 'Screen':
        value = goodInfo?.screen || '';
        break;

      case 'RAM':
        value = goodInfo?.ram || '';
        break;

      case 'Built in memory':
        value = goodInfo?.capacity || '';
        break;
      default:
    }
  }

  if (order === 'detail') {
    switch (param) {
      case 'Resolution':
        value = goodDetails?.display.screenResolution || '';
        break;

      case 'Processor':
        value = goodDetails?.hardware.cpu || '';
        break;

      case 'Camera':
        value = goodDetails?.camera.primary || '';
        break;

      case 'Zoom':
        value = goodDetails?.camera.zoom || '';
        break;

      case 'Cell':
        value = goodDetails?.connectivity.cell || '';
        break;
      default:
    }
  }

  return value || 'unknown';
};
