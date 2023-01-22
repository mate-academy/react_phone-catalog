export function getRenderedRam(ram: string) {
  const ramValue = +ram.slice(0, -2);
  let ramInGB = '';

  if (ramValue >= 1000) {
    ramInGB = `${Math.round(ramValue / 1000)}GB`;
  }

  return ramValue < 1000
    ? ram
    : ramInGB;
}
