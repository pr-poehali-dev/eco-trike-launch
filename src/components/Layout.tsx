import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const categories = [
  { path: '/cars', name: 'Машины', icon: 'Car' },
  { path: '/tricycles', name: 'Трициклы', icon: 'Bike' },
  { path: '/quadricycles', name: 'Квадроциклы', icon: 'Truck' },
  { path: '/motorcycles', name: 'Мотоциклы', icon: 'Bike' },
  { path: '/motorboats', name: 'Моторные лодки', icon: 'Ship' },
  { path: '/watercraft', name: 'Водные судна', icon: 'Anchor' },
  { path: '/robots', name: 'Роботы', icon: 'Bot' },
  { path: '/bicycles', name: 'Велосипеды', icon: 'Bike' }
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center gap-2">
              <Icon name="Zap" className="text-primary" size={28} />
              <span className="text-2xl font-bold text-primary">EcoTrike</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Icon name="Search" size={18} className="mr-2" />
                Поиск
              </Button>
              <Button asChild>
                <a href="/#contact">Связаться</a>
              </Button>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Link key={category.path} to={category.path}>
                <Button
                  variant={location.pathname === category.path ? 'default' : 'outline'}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  <Icon name={category.icon} size={16} className="mr-2" />
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <main className="pt-36 pb-20">
        {children}
      </main>
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Zap" className="text-primary" size={24} />
                <span className="text-xl font-bold">EcoTrike</span>
              </div>
              <p className="text-gray-400 text-sm">
                Инновационные решения для городской мобильности
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {categories.slice(0, 4).map((cat) => (
                  <li key={cat.path}>
                    <Link to={cat.path} className="hover:text-white transition-colors">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Еще категории</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {categories.slice(4).map((cat) => (
                  <li key={cat.path}>
                    <Link to={cat.path} className="hover:text-white transition-colors">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>+7 (xxx) xxx-xx-xx</li>
                <li>info@ecotrike.ru</li>
                <li>г. Москва</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 EcoTrike. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
