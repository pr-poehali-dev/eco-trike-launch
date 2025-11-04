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
];

export const getProductsByCategory = (category: string) => {
  return products.filter(p => p.category === category);
};

export const getProductById = (id: string) => {
  return products.find(p => p.id === id);
};
