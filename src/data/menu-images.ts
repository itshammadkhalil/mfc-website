// Lightweight flat-illustration icons per category, encoded inline as SVG data URIs.
// No network calls — instant load, tiny payload.

const PRIMARY = "#ea580c"; // warm orange
const DARK = "#7c2d12"; // maroon outline
const ACCENT = "#fbbf24"; // gold
const CREAM = "#fff7ed";

const wrap = (inner: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='none' stroke-linecap='round' stroke-linejoin='round'>
      <rect width='200' height='200' fill='${CREAM}'/>${inner}</svg>`,
  );

const ICONS: Record<string, string> = {
  Pizza: wrap(`
    <path d='M100 30 L170 165 Q100 195 30 165 Z' fill='${ACCENT}' stroke='${DARK}' stroke-width='5'/>
    <path d='M100 30 L170 165 Q100 195 30 165 Z' fill='none' stroke='${PRIMARY}' stroke-width='2' stroke-dasharray='2 4'/>
    <circle cx='80' cy='100' r='9' fill='${PRIMARY}' stroke='${DARK}' stroke-width='2'/>
    <circle cx='120' cy='115' r='9' fill='${PRIMARY}' stroke='${DARK}' stroke-width='2'/>
    <circle cx='95' cy='145' r='8' fill='${PRIMARY}' stroke='${DARK}' stroke-width='2'/>
    <circle cx='70' cy='140' r='5' fill='#16a34a'/>
    <circle cx='130' cy='150' r='5' fill='#16a34a'/>`),
  Burgers: wrap(`
    <path d='M35 90 Q100 30 165 90 Z' fill='${ACCENT}' stroke='${DARK}' stroke-width='5'/>
    <circle cx='80' cy='75' r='3' fill='${CREAM}'/><circle cx='110' cy='70' r='3' fill='${CREAM}'/><circle cx='135' cy='80' r='3' fill='${CREAM}'/>
    <rect x='35' y='95' width='130' height='10' fill='#16a34a' stroke='${DARK}' stroke-width='2'/>
    <rect x='35' y='108' width='130' height='14' fill='${PRIMARY}' stroke='${DARK}' stroke-width='2'/>
    <path d='M35 125 Q100 165 165 125 L165 140 Q100 175 35 140 Z' fill='${ACCENT}' stroke='${DARK}' stroke-width='5'/>`),
  "French Fries": wrap(`
    <path d='M60 80 L55 175 L145 175 L140 80 Z' fill='${PRIMARY}' stroke='${DARK}' stroke-width='5'/>
    <rect x='70' y='40' width='12' height='75' fill='${ACCENT}' stroke='${DARK}' stroke-width='3'/>
    <rect x='88' y='30' width='12' height='85' fill='${ACCENT}' stroke='${DARK}' stroke-width='3'/>
    <rect x='106' y='35' width='12' height='80' fill='${ACCENT}' stroke='${DARK}' stroke-width='3'/>
    <rect x='124' y='45' width='12' height='70' fill='${ACCENT}' stroke='${DARK}' stroke-width='3'/>`),
  "Chicken Rolls": wrap(`
    <rect x='40' y='70' width='120' height='65' rx='30' fill='${ACCENT}' stroke='${DARK}' stroke-width='5'/>
    <path d='M55 90 L145 90 M55 115 L145 115' stroke='${PRIMARY}' stroke-width='3'/>
    <circle cx='75' cy='102' r='4' fill='#16a34a'/><circle cx='125' cy='102' r='4' fill='${PRIMARY}'/>`),
  "Hot Wings": wrap(`
    <path d='M60 130 Q40 90 80 65 Q100 50 120 65 L140 90 Q150 120 120 140 Q90 155 60 130 Z' fill='${PRIMARY}' stroke='${DARK}' stroke-width='5'/>
    <path d='M120 140 L150 170' stroke='${DARK}' stroke-width='6'/>
    <circle cx='95' cy='95' r='4' fill='${ACCENT}'/>`),
  Pasta: wrap(`
    <ellipse cx='100' cy='130' rx='75' ry='25' fill='${CREAM}' stroke='${DARK}' stroke-width='5'/>
    <path d='M45 125 Q70 60 100 110 Q130 60 155 125' fill='none' stroke='${ACCENT}' stroke-width='4'/>
    <path d='M55 125 Q85 50 100 115 Q115 50 145 125' fill='none' stroke='${PRIMARY}' stroke-width='4'/>
    <circle cx='80' cy='115' r='5' fill='#dc2626'/><circle cx='120' cy='110' r='5' fill='#dc2626'/>`),
  Sandwich: wrap(`
    <path d='M40 70 L100 40 L160 70 L160 90 L100 65 L40 90 Z' fill='${ACCENT}' stroke='${DARK}' stroke-width='5'/>
    <rect x='40' y='90' width='120' height='15' fill='#16a34a' stroke='${DARK}' stroke-width='3'/>
    <rect x='40' y='105' width='120' height='15' fill='${PRIMARY}' stroke='${DARK}' stroke-width='3'/>
    <rect x='40' y='120' width='120' height='30' fill='${ACCENT}' stroke='${DARK}' stroke-width='5'/>`),
  "Broast Chicken": wrap(`
    <path d='M60 80 Q100 30 140 80 Q160 130 100 170 Q40 130 60 80 Z' fill='${PRIMARY}' stroke='${DARK}' stroke-width='5'/>
    <path d='M100 50 L100 170' stroke='${DARK}' stroke-width='3' opacity='0.5'/>
    <circle cx='85' cy='100' r='3' fill='${ACCENT}'/><circle cx='115' cy='110' r='3' fill='${ACCENT}'/><circle cx='100' cy='130' r='3' fill='${ACCENT}'/>`),
  "Fruit Chaat": wrap(`
    <path d='M30 110 Q100 80 170 110 L160 160 Q100 175 40 160 Z' fill='${CREAM}' stroke='${DARK}' stroke-width='5'/>
    <circle cx='65' cy='105' r='12' fill='${PRIMARY}' stroke='${DARK}' stroke-width='3'/>
    <circle cx='100' cy='95' r='14' fill='${ACCENT}' stroke='${DARK}' stroke-width='3'/>
    <circle cx='135' cy='105' r='12' fill='#16a34a' stroke='${DARK}' stroke-width='3'/>
    <circle cx='80' cy='130' r='10' fill='#dc2626' stroke='${DARK}' stroke-width='3'/>
    <circle cx='120' cy='130' r='10' fill='#a855f7' stroke='${DARK}' stroke-width='3'/>`),
  "Shakes & Cold Coffee": wrap(`
    <path d='M65 60 L135 60 L125 175 L75 175 Z' fill='${CREAM}' stroke='${DARK}' stroke-width='5'/>
    <ellipse cx='100' cy='60' rx='35' ry='12' fill='${ACCENT}' stroke='${DARK}' stroke-width='4'/>
    <rect x='95' y='25' width='6' height='45' fill='${PRIMARY}' stroke='${DARK}' stroke-width='2'/>
    <circle cx='85' cy='55' r='5' fill='#dc2626'/>
    <path d='M75 100 L125 100 L120 170 L80 170 Z' fill='${PRIMARY}' opacity='0.4'/>`),
  "Ice Cream": wrap(`
    <path d='M75 95 L100 175 L125 95 Z' fill='${ACCENT}' stroke='${DARK}' stroke-width='5'/>
    <circle cx='100' cy='75' r='28' fill='${PRIMARY}' stroke='${DARK}' stroke-width='5'/>
    <circle cx='85' cy='55' r='20' fill='#ec4899' stroke='${DARK}' stroke-width='4'/>
    <circle cx='115' cy='55' r='20' fill='${CREAM}' stroke='${DARK}' stroke-width='4'/>`),
  Margarita: wrap(`
    <path d='M50 50 L150 50 L110 110 L110 165 L130 175 L70 175 L90 165 L90 110 Z' fill='${CREAM}' stroke='${DARK}' stroke-width='5'/>
    <path d='M55 55 L100 100 L145 55' fill='#16a34a' opacity='0.5'/>
    <circle cx='100' cy='80' r='6' fill='${ACCENT}' stroke='${DARK}' stroke-width='2'/>
    <path d='M115 60 L130 45' stroke='#16a34a' stroke-width='3'/>`),
  Cake: wrap(`
    <rect x='40' y='90' width='120' height='75' rx='5' fill='${PRIMARY}' stroke='${DARK}' stroke-width='5'/>
    <path d='M40 110 Q60 95 80 110 T120 110 T160 110' fill='${CREAM}' stroke='${DARK}' stroke-width='3'/>
    <rect x='95' y='60' width='4' height='30' fill='${DARK}'/>
    <path d='M97 55 Q90 50 95 45 Q100 50 97 55' fill='${ACCENT}'/>
    <circle cx='65' cy='140' r='5' fill='${ACCENT}'/><circle cx='135' cy='140' r='5' fill='${ACCENT}'/>`),
  Drinks: wrap(`
    <path d='M75 40 L125 40 L125 55 L120 175 L80 175 L75 55 Z' fill='${PRIMARY}' stroke='${DARK}' stroke-width='5'/>
    <rect x='80' y='80' width='40' height='30' fill='${CREAM}' opacity='0.85'/>
    <text x='100' y='100' text-anchor='middle' font-family='Arial,sans-serif' font-size='11' fill='${DARK}' font-weight='700'>MFC</text>`),
  Deals: wrap(`
    <path d='M30 100 L100 30 L170 100 L100 170 Z' fill='${ACCENT}' stroke='${DARK}' stroke-width='5'/>
    <circle cx='100' cy='100' r='35' fill='${PRIMARY}' stroke='${DARK}' stroke-width='4'/>
    <text x='100' y='110' text-anchor='middle' font-family='Arial,sans-serif' font-size='28' font-weight='800' fill='${CREAM}'>%</text>`),
};

export const FALLBACK_IMAGE = ICONS.Pizza;

export function getCategoryIcon(category: string): string {
  return ICONS[category] ?? FALLBACK_IMAGE;
}
