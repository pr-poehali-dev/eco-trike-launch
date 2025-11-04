import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';

const Header = () => {
  const { totalItems } = useCart();
  const { favorites } = useFavorites();

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

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Icon name="Zap" className="text-primary" size={28} />
          <span className="text-2xl font-bold text-primary">EcoTrike</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Icon name="Grid3x3" size={18} />
                Каталог
                <Icon name="ChevronDown" size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {categories.map((cat, idx) => (
                <DropdownMenuItem key={idx} asChild>
                  <Link to={cat.path} className="flex items-center gap-2 cursor-pointer">
                    <Icon name={cat.icon} size={18} />
                    {cat.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/account" className="text-gray-700 hover:text-primary transition-colors">
            Профиль
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to="/account">
              <Icon name="Heart" size={20} />
              {favorites.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {favorites.length}
                </Badge>
              )}
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to="/cart">
              <Icon name="ShoppingCart" size={20} />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="md:hidden">
            <Link to="/account">
              <Icon name="User" size={20} />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
