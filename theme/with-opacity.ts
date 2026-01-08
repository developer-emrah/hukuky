// theme/with-opacity.ts

/**
 * Renk koduna opaklık (alpha) ekler.
 * @param hexOrRgb - "#RRGGBB", "#RGB" veya "rgb(r,g,b)" formatında renk.
 * @param opacity - 0 ile 1 arasında opaklık değeri.
 * @returns rgba() formatında string döner.
 */
export function withOpacity(hexOrRgb: string, opacity: number): string {
  if (hexOrRgb.startsWith('rgb')) {
    // rgb() formatında geldiyse direkt alpha ekle
    return hexOrRgb.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
  }

  // #RGB veya #RRGGBB formatını işler
  let hex = hexOrRgb.replace('#', '');

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((x) => x + x)
      .join('');
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
