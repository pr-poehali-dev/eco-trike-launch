export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  description: string;
  specs: { label: string; value: string }[];
  inStock: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: 'tri-1',
    name: 'EcoTrike City Pro',
    price: 450000,
    category: 'tricycles',
    image: 'https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/0c06a269-7214-47a8-8c52-c93dd5dcb3d3.jpg',
    images: [
      'https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/0c06a269-7214-47a8-8c52-c93dd5dcb3d3.jpg',
    ],
    description: 'Экологичный трехместный электротрицикл для города',
    specs: [
      { label: 'Макс. скорость', value: '40 км/ч' },
      { label: 'Мощность', value: '800 Вт' },
      { label: 'Вместимость', value: '3 человека' },
      { label: 'Запас хода', value: '60 км' },
    ],
    inStock: true,
    rating: 4.8,
    reviews: 127,
  },
  {
    id: 'tri-2',
    name: 'EcoTrike Delivery',
    price: 520000,
    category: 'tricycles',
    image: 'https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/0c06a269-7214-47a8-8c52-c93dd5dcb3d3.jpg',
    description: 'Трицикл для доставки с увеличенным грузовым отсеком',
    specs: [
      { label: 'Макс. скорость', value: '35 км/ч' },
      { label: 'Мощность', value: '1000 Вт' },
      { label: 'Грузоподъемность', value: '200 кг' },
      { label: 'Запас хода', value: '80 км' },
    ],
    inStock: true,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 'car-1',
    name: 'ElectroCar Urban',
    price: 1200000,
    category: 'cars',
    image: 'https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/0c06a269-7214-47a8-8c52-c93dd5dcb3d3.jpg',
    description: 'Компактный электромобиль для города',
    specs: [
      { label: 'Макс. скорость', value: '90 км/ч' },
      { label: 'Мощность', value: '30 кВт' },
      { label: 'Вместимость', value: '4 человека' },
      { label: 'Запас хода', value: '250 км' },
    ],
    inStock: true,
    rating: 4.7,
    reviews: 234,
  },
  {
    id: 'bike-1',
    name: 'E-Bike Mountain Pro',
    price: 85000,
    category: 'bicycles',
    image: 'https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/0c06a269-7214-47a8-8c52-c93dd5dcb3d3.jpg',
    description: 'Электровелосипед для бездорожья',
    specs: [
      { label: 'Макс. скорость', value: '32 км/ч' },
      { label: 'Мощность', value: '500 Вт' },
      { label: 'Запас хода', value: '70 км' },
      { label: 'Вес', value: '22 кг' },
    ],
    inStock: true,
    rating: 4.6,
    reviews: 312,
  },
  {
    id: 'moto-1',
    name: 'ElectroMoto Sport',
    price: 380000,
    category: 'motorcycles',
    image: 'https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/0c06a269-7214-47a8-8c52-c93dd5dcb3d3.jpg',
    description: 'Электромотоцикл спортивного класса',
    specs: [
      { label: 'Макс. скорость', value: '120 км/ч' },
      { label: 'Мощность', value: '8 кВт' },
      { label: 'Запас хода', value: '150 км' },
      { label: 'Вес', value: '95 кг' },
    ],
    inStock: true,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 'quad-1',
    name: 'ElectroQuad Adventure',
    price: 650000,
    category: 'quadricycles',
    image: 'https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/0c06a269-7214-47a8-8c52-c93dd5dcb3d3.jpg',
    description: 'Электроквадроцикл для активного отдыха',
    specs: [
      { label: 'Макс. скорость', value: '70 км/ч' },
      { label: 'Мощность', value: '5 кВт' },
      { label: 'Запас хода', value: '100 км' },
      { label: 'Вес', value: '180 кг' },
    ],
    inStock: true,
    rating: 4.8,
    reviews: 98,
  },
  {
    id: 'moto-cfmoto-675sr',
    name: 'CFMOTO 675 SR',
    price: 1908000,
    category: 'motorcycles',
    image: 'https://sc04.alicdn.com/kf/H29047e8f7d03452d9b4bff92a3f31207V.png',
    images: [
      'https://sc04.alicdn.com/kf/H29047e8f7d03452d9b4bff92a3f31207V.png',
      'https://sc04.alicdn.com/kf/H519f60191afa4e18a4a44f1bdbc9edd8w.jpg',
      'https://sc04.alicdn.com/kf/Hb44fce41db3f4d408af0ab985ef2725cw.jpg',
      'https://sc04.alicdn.com/kf/H771d75698c2e4cb78999862ced76a0acO.jpg',
      'https://sc04.alicdn.com/kf/H5b8d2dfeb4374e079ff3642c193a7162X.png',
      'https://sc04.alicdn.com/kf/Hd6b990512e1142f791502af46505f2d4T.png'
    ],
    description: 'Высокопроизводительный дорожный мотоцикл CFMOTO 675 SR с 675CC — идеален для взрослых гонщиков: мощность и манёвренность для соревнований.',
    specs: [
      { label: 'Бренд', value: 'CFMOTO' },
      { label: 'Модель', value: '675 SR' },
      { label: 'Объём двигателя', value: '675CC' },
      { label: 'Макс. мощность', value: '70 кВт @ 11000 об/мин' },
      { label: 'Макс. крутящий момент', value: '70 Нм @ 8250 об/мин' },
      { label: 'Вес', value: '195 кг' },
      { label: 'Колесная база', value: '1400 мм' },
      { label: 'Объём бака', value: '15 л' },
      { label: 'Размеры', value: '2020×728×1105 мм' },
      { label: 'Шины', value: 'Перед 120/70 R17, Зад 180/55 R17' },
    ],
    inStock: true,
    rating: 4.9,
    reviews: 24,
  },
];

export const getProductsByCategory = (category: string) => {
  return products.filter(p => p.category === category);
};

export const getProductById = (id: string) => {
  return products.find(p => p.id === id);
};