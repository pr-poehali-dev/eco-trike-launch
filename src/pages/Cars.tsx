import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const products = [
  {
    name: 'EcoSedan Pro',
    price: '2 890 000 ₽',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop',
    specs: [
      { label: 'Запас хода', value: '450 км' },
      { label: 'Мощность', value: '150 кВт' },
      { label: 'Макс. скорость', value: '180 км/ч' },
      { label: 'Время зарядки', value: '6 часов' }
    ],
    inStock: true
  },
  {
    name: 'EcoCity Compact',
    price: '1 590 000 ₽',
    image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&h=600&fit=crop',
    specs: [
      { label: 'Запас хода', value: '320 км' },
      { label: 'Мощность', value: '80 кВт' },
      { label: 'Макс. скорость', value: '140 км/ч' },
      { label: 'Время зарядки', value: '4 часа' }
    ],
    inStock: true
  },
  {
    name: 'EcoSUV Premium',
    price: '4 290 000 ₽',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=600&fit=crop',
    specs: [
      { label: 'Запас хода', value: '550 км' },
      { label: 'Мощность', value: '250 кВт' },
      { label: 'Макс. скорость', value: '200 км/ч' },
      { label: 'Время зарядки', value: '8 часов' }
    ],
    inStock: true
  },
  {
    name: 'EcoSport GT',
    price: '5 690 000 ₽',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    specs: [
      { label: 'Запас хода', value: '480 км' },
      { label: 'Мощность', value: '350 кВт' },
      { label: 'Макс. скорость', value: '250 км/ч' },
      { label: 'Время зарядки', value: '7 часов' }
    ],
    inStock: false
  },
  {
    name: 'EcoVan Family',
    price: '3 490 000 ₽',
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&h=600&fit=crop',
    specs: [
      { label: 'Запас хода', value: '400 км' },
      { label: 'Мощность', value: '120 кВт' },
      { label: 'Макс. скорость', value: '160 км/ч' },
      { label: 'Вместимость', value: '7 мест' }
    ],
    inStock: true
  },
  {
    name: 'EcoLux Executive',
    price: '7 990 000 ₽',
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&h=600&fit=crop',
    specs: [
      { label: 'Запас хода', value: '600 км' },
      { label: 'Мощность', value: '400 кВт' },
      { label: 'Макс. скорость', value: '240 км/ч' },
      { label: 'Время зарядки', value: '9 часов' }
    ],
    inStock: true
  }
];

const Cars = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Электромобили
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Современные электромобили для городских и загородных поездок. Экологично, экономично, комфортно.
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

export default Cars;
