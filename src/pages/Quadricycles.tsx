import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const products = [
  {
    name: 'EcoQuad Adventure',
    price: '425 000 ₽',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '3000 Вт' },
      { label: 'Макс. скорость', value: '70 км/ч' },
      { label: 'Запас хода', value: '100 км' },
      { label: 'Тип', value: 'Внедорожный' }
    ],
    inStock: true
  },
  {
    name: 'EcoQuad City',
    price: '315 000 ₽',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '2000 Вт' },
      { label: 'Макс. скорость', value: '50 км/ч' },
      { label: 'Запас хода', value: '80 км' },
      { label: 'Тип', value: 'Городской' }
    ],
    inStock: true
  },
  {
    name: 'EcoQuad Sport',
    price: '565 000 ₽',
    image: 'https://images.unsplash.com/photo-1600431521340-491eca880813?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '5000 Вт' },
      { label: 'Макс. скорость', value: '90 км/ч' },
      { label: 'Запас хода', value: '120 км' },
      { label: 'Тип', value: 'Спортивный' }
    ],
    inStock: true
  },
  {
    name: 'EcoQuad Utility',
    price: '389 000 ₽',
    image: 'https://images.unsplash.com/photo-1580310614729-ccd69652491d?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '2500 Вт' },
      { label: 'Макс. скорость', value: '60 км/ч' },
      { label: 'Грузоподъемность', value: '150 кг' },
      { label: 'Тип', value: 'Грузовой' }
    ],
    inStock: true
  }
];

const Quadricycles = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Электрические квадроциклы
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Мощные и экологичные квадроциклы для города и бездорожья. Свобода передвижения без вреда природе.
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

export default Quadricycles;
