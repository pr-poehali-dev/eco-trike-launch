import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const products = [
  {
    name: 'EcoYacht Comfort',
    price: '8 500 000 ₽',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '100 кВт' },
      { label: 'Макс. скорость', value: '40 км/ч' },
      { label: 'Вместимость', value: '12 человек' },
      { label: 'Длина', value: '12 м' }
    ],
    inStock: true
  },
  {
    name: 'EcoCatamaran',
    price: '5 200 000 ₽',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '80 кВт' },
      { label: 'Макс. скорость', value: '35 км/ч' },
      { label: 'Вместимость', value: '10 человек' },
      { label: 'Длина', value: '10 м' }
    ],
    inStock: true
  },
  {
    name: 'EcoJetski Pro',
    price: '485 000 ₽',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '20 кВт' },
      { label: 'Макс. скорость', value: '65 км/ч' },
      { label: 'Вместимость', value: '2 человека' },
      { label: 'Запас хода', value: '90 км' }
    ],
    inStock: true
  },
  {
    name: 'EcoSail Hybrid',
    price: '12 500 000 ₽',
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '150 кВт' },
      { label: 'Макс. скорость', value: '30 км/ч' },
      { label: 'Вместимость', value: '16 человек' },
      { label: 'Длина', value: '18 м' }
    ],
    inStock: false
  },
  {
    name: 'EcoFerry Eco',
    price: '25 000 000 ₽',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '300 кВт' },
      { label: 'Макс. скорость', value: '25 км/ч' },
      { label: 'Вместимость', value: '50 человек' },
      { label: 'Длина', value: '25 м' }
    ],
    inStock: true
  }
];

const Watercraft = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Водные электросудна
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Яхты, катамараны, гидроциклы и паромы на электротяге. Роскошь и экология на воде.
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

export default Watercraft;
