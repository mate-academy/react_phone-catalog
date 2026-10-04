// "6.1' OLED" -> "6.1” OLED"
export const formatScreen = (screen: string) => screen.replace("'", '”');

// "128GB" -> "128 GB", "38mm" -> "38 mm"
export const formatUnits = (value: string) =>
  value.replace(/(\d)([A-Za-z])/, '$1 $2');
