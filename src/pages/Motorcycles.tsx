import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const products = [
  {
    name: 'EcoMoto Urban',
    price: '285 000 ₽',
    image: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '4000 Вт' },
      { label: 'Макс. скорость', value: '90 км/ч' },
      { label: 'Запас хода', value: '120 км' },
      { label: 'Тип', value: 'Городской' }
    ],
    inStock: true
  },
  {
    name: 'EcoMoto Cruiser',
    price: '395 000 ₽',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '6000 Вт' },
      { label: 'Макс. скорость', value: '110 км/ч' },
      { label: 'Запас хода', value: '150 км' },
      { label: 'Тип', value: 'Круизер' }
    ],
    inStock: true
  },
  {
    name: 'EcoMoto Sport',
    price: '545 000 ₽',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '10000 Вт' },
      { label: 'Макс. скорость', value: '150 км/ч' },
      { label: 'Запас хода', value: '180 км' },
      { label: 'Тип', value: 'Спортбайк' }
    ],
    inStock: false
  },
  {
    name: 'EcoMoto Scooter',
    price: '145 000 ₽',
    image: 'https://images.unsplash.com/photo-1600431521340-491eca880813?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '2000 Вт' },
      { label: 'Макс. скорость', value: '60 км/ч' },
      { label: 'Запас хода', value: '80 км' },
      { label: 'Тип', value: 'Скутер' }
    ],
    inStock: true
  },
  {
    name: 'EcoMoto Adventure',
    price: '625 000 ₽',
    image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '8000 Вт' },
      { label: 'Макс. скорость', value: '130 км/ч' },
      { label: 'Запас хода', value: '200 км' },
      { label: 'Тип', value: 'Туристический' }
    ],
    inStock: true
  }
];

const Motorcycles = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Электрические мотоциклы
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Современные электромотоциклы для городских улиц и дальних путешествий. Мощность и экологичность.
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

export default Motorcycles;
