import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const products = [
  {
    name: 'EcoBoat Fisherman',
    price: '685 000 ₽',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '15 кВт' },
      { label: 'Макс. скорость', value: '25 км/ч' },
      { label: 'Вместимость', value: '4 человека' },
      { label: 'Длина', value: '4.5 м' }
    ],
    inStock: true
  },
  {
    name: 'EcoBoat Sport',
    price: '1 250 000 ₽',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '30 кВт' },
      { label: 'Макс. скорость', value: '45 км/ч' },
      { label: 'Вместимость', value: '6 человек' },
      { label: 'Длина', value: '6 м' }
    ],
    inStock: true
  },
  {
    name: 'EcoBoat Cruiser',
    price: '2 890 000 ₽',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '50 кВт' },
      { label: 'Макс. скорость', value: '35 км/ч' },
      { label: 'Вместимость', value: '8 человек' },
      { label: 'Длина', value: '8.5 м' }
    ],
    inStock: false
  },
  {
    name: 'EcoBoat Mini',
    price: '345 000 ₽',
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '8 кВт' },
      { label: 'Макс. скорость', value: '20 км/ч' },
      { label: 'Вместимость', value: '2 человека' },
      { label: 'Длина', value: '3 м' }
    ],
    inStock: true
  }
];

const Motorboats = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Электрические моторные лодки
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Бесшумные и экологичные лодки для рыбалки, прогулок и водного спорта. Наслаждайтесь природой!
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

export default Motorboats;
