export const getColorHex = (color: string) => {
  switch (color) {
    case 'black': return '#201D24';
    case 'rosegold': return '#B76E79';
    case 'gold': return '#f6e0c9';
    case 'silver': return '#E4E4E2';
    case 'spacegray': return '#25282A';
    case 'green': return '#364935';
    case 'yellow': return '#F3D060';
    case 'white': return '#F9F6EF';
    case 'purple': return '#B8AFE6';
    case 'red': return '#E23636';
    default: throw Error(`Unexpected color: ${color}`); // only for develop
  }
}
