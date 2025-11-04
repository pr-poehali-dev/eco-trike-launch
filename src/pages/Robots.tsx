import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const products = [
  {
    name: 'EcoBot Delivery',
    price: '1 250 000 ₽',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
    specs: [
      { label: 'Макс. скорость', value: '20 км/ч' },
      { label: 'Запас хода', value: '50 км' },
      { label: 'Грузоподъемность', value: '30 кг' },
      { label: 'Тип', value: 'Доставка' }
    ],
    inStock: true
  },
  {
    name: 'EcoBot Patrol',
    price: '2 890 000 ₽',
    image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&h=600&fit=crop',
    specs: [
      { label: 'Макс. скорость', value: '15 км/ч' },
      { label: 'Запас хода', value: '80 км' },
      { label: 'Камеры', value: '360° обзор' },
      { label: 'Тип', value: 'Патрулирование' }
    ],
    inStock: true
  },
  {
    name: 'EcoBot Cleaner',
    price: '985 000 ₽',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=600&fit=crop',
    specs: [
      { label: 'Макс. скорость', value: '10 км/ч' },
      { label: 'Запас хода', value: '60 км' },
      { label: 'Площадь уборки', value: '5000 м²/ч' },
      { label: 'Тип', value: 'Уборка' }
    ],
    inStock: true
  },
  {
    name: 'EcoBot Cargo',
    price: '3 450 000 ₽',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    specs: [
      { label: 'Макс. скорость', value: '25 км/ч' },
      { label: 'Запас хода', value: '100 км' },
      { label: 'Грузоподъемность', value: '200 кг' },
      { label: 'Тип', value: 'Грузоперевозки' }
    ],
    inStock: false
  },
  {
    name: 'EcoBot Assistant',
    price: '685 000 ₽',
    image: 'https://images.unsplash.com/photo-1561144257-e32e8eaf5265?w=800&h=600&fit=crop',
    specs: [
      { label: 'Макс. скорость', value: '5 км/ч' },
      { label: 'Запас хода', value: '30 км' },
      { label: 'ИИ-функции', value: 'Да' },
      { label: 'Тип', value: 'Помощник' }
    ],
    inStock: true
  }
];

const Robots = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Автономные роботы
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Умные роботизированные решения для доставки, уборки, патрулирования и логистики. Будущее уже здесь!
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 items-center justify-between">
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Icon name="SlidersHorizontal" size={18} className="mr-2" />
              Фильтры
            </Button>
            <Select defaultValue="popular">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">По популярности</SelectItem>
                <SelectItem value="price-asc">Сначала дешевые</SelectItem>
                <SelectItem value="price-desc">Сначала дорогие</SelectItem>
                <SelectItem value="new">Новинки</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-gray-600">
            Найдено товаров: <span className="font-semibold">{products.length}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Robots;
