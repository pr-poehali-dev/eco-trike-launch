import rawProducts from '../data/raw-products.json';
import { Product } from '../data/products';

interface RawProduct {
  ссылка_на_товар: string;
  категория: string;
  название_товара: string;
  диапазон_цен: string;
  валюта: string;
  описание: string;
  все_изображения: string[];
  все_характеристики: {
    'Основные характеристики'?: Array<{ название: string; значение: string }>;
    'Дополнительные характеристики'?: Array<{ название: string; значение: string }>;
    'Ключевые отраслевые характеристики'?: Array<{ название: string; значение: string }>;
  };
  базовая_информация: {
    id_товара: number;
    минимальный_заказ: number;
  };
}

const categoryMap: Record<string, string> = {
  'Мотоциклы и скутеры': 'motorcycles',
  'Квадроциклы и UTV': 'quadricycles',
  'Снегоход': 'snowmobiles',
  'Трициклы': 'tricycles',
  'Велосипеды': 'bicycles',
  'Электромобили': 'cars',
  'ATV': 'quadricycles',
  'UTV': 'quadricycles',
};

function mapCategory(categoryPath: string): string {
  for (const [key, value] of Object.entries(categoryMap)) {
    if (categoryPath.includes(key)) return value;
  }
  return 'motorcycles';
}

function parsePrice(priceStr: string, currency: string): number {
  const cleanPrice = priceStr.replace(/[$,]/g, '').split('-')[0];
  const usdPrice = parseFloat(cleanPrice);
  const rubRate = 95;
  return Math.round(usdPrice * rubRate);
}

function convertProduct(raw: RawProduct, index: number): Product {
  const mainSpecs = raw.все_характеристики['Основные характеристики'] || [];
  const additionalSpecs = raw.все_характеристики['Дополнительные характеристики'] || [];
  const allSpecs = [...mainSpecs, ...additionalSpecs];

  const specs = allSpecs
    .filter((spec) => spec.название && spec.значение)
    .slice(0, 10)
    .map((spec) => ({
      label: spec.название,
      value: spec.значение,
    }));

  return {
    id: `product-${raw.базовая_информация.id_товара}`,
    name: raw.название_товара,
    price: parsePrice(raw.диапазон_цен, raw.валюта),
    category: mapCategory(raw.категория),
    image: raw.все_изображения[0] || '',
    images: raw.все_изображения,
    description: raw.описание,
    specs,
    inStock: true,
    rating: 4.5 + Math.random() * 0.5,
    reviews: Math.floor(Math.random() * 150) + 10,
  };
}

export function convertAllProducts(): Product[] {
  return (rawProducts as RawProduct[]).map((raw, index) => 
    convertProduct(raw, index)
  );
}

if (import.meta.env.DEV) {
  const converted = convertAllProducts();
  console.log('✅ Конвертировано товаров:', converted.length);
  console.log('📊 По категориям:', 
    Object.entries(
      converted.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    )
  );
}
