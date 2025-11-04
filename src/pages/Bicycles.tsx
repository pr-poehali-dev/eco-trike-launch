import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const products = [
  {
    name: 'EcoBike City',
    price: '85 000 ₽',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '250 Вт' },
      { label: 'Макс. скорость', value: '25 км/ч' },
      { label: 'Запас хода', value: '60 км' },
      { label: 'Вес', value: '18 кг' }
    ],
    inStock: true
  },
  {
    name: 'EcoBike Mountain',
    price: '125 000 ₽',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '500 Вт' },
      { label: 'Макс. скорость', value: '30 км/ч' },
      { label: 'Запас хода', value: '80 км' },
      { label: 'Вес', value: '22 кг' }
    ],
    inStock: true
  },
  {
    name: 'EcoBike Road',
    price: '95 000 ₽',
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '250 Вт' },
      { label: 'Макс. скорость', value: '28 км/ч' },
      { label: 'Запас хода', value: '70 км' },
      { label: 'Вес', value: '15 кг' }
    ],
    inStock: true
  },
  {
    name: 'EcoBike Folding',
    price: '65 000 ₽',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '250 Вт' },
      { label: 'Макс. скорость', value: '25 км/ч' },
      { label: 'Запас хода', value: '50 км' },
      { label: 'Вес', value: '16 кг' }
    ],
    inStock: true
  },
  {
    name: 'EcoBike Cargo',
    price: '145 000 ₽',
    image: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '500 Вт' },
      { label: 'Макс. скорость', value: '25 км/ч' },
      { label: 'Грузоподъемность', value: '100 кг' },
      { label: 'Вес', value: '28 кг' }
    ],
    inStock: true
  },
  {
    name: 'EcoBike Fat',
    price: '135 000 ₽',
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '750 Вт' },
      { label: 'Макс. скорость', value: '32 км/ч' },
      { label: 'Запас хода', value: '90 км' },
      { label: 'Вес', value: '26 кг' }
    ],
    inStock: false
  }
];

const Bicycles = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Электрические велосипеды
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Электровелосипеды для города, гор и путешествий. Здоровье, экология и комфорт в одном решении.
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

export default Bicycles;
