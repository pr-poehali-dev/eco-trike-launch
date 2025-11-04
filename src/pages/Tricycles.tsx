import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const products = [
  {
    name: 'EcoTrike Classic',
    price: '189 000 ₽',
    image: 'https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/0c06a269-7214-47a8-8c52-c93dd5dcb3d3.jpg',
    specs: [
      { label: 'Мощность', value: '800 Вт' },
      { label: 'Макс. скорость', value: '40 км/ч' },
      { label: 'Вместимость', value: '3 человека' },
      { label: 'Снаряж. масса', value: '30 кг' }
    ],
    inStock: true
  },
  {
    name: 'EcoTrike Cargo',
    price: '215 000 ₽',
    image: 'https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/a1901777-6743-4e3b-b0b2-be425de82e5a.jpg',
    specs: [
      { label: 'Мощность', value: '1000 Вт' },
      { label: 'Макс. скорость', value: '45 км/ч' },
      { label: 'Грузоподъемность', value: '200 кг' },
      { label: 'Объем багажника', value: '300 л' }
    ],
    inStock: true
  },
  {
    name: 'EcoTrike Family',
    price: '245 000 ₽',
    image: 'https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/4aeb11bf-a54c-4f61-b1ff-54e51e2faa03.jpg',
    specs: [
      { label: 'Мощность', value: '800 Вт' },
      { label: 'Макс. скорость', value: '40 км/ч' },
      { label: 'Вместимость', value: '3 человека' },
      { label: 'Запас хода', value: '60 км' }
    ],
    inStock: true
  },
  {
    name: 'EcoTrike Sport',
    price: '289 000 ₽',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    specs: [
      { label: 'Мощность', value: '1200 Вт' },
      { label: 'Макс. скорость', value: '50 км/ч' },
      { label: 'Вместимость', value: '2 человека' },
      { label: 'Запас хода', value: '80 км' }
    ],
    inStock: false
  }
];

const Tricycles = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Электрические трициклы
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Экологичные трехколесные транспортные средства для города. Комфорт, безопасность и экономия.
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

export default Tricycles;
