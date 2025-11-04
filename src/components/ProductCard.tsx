import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  rating?: number;
  reviews?: number;
}

const ProductCard = ({ id, name, price, image, category, inStock, rating = 4.5, reviews = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorite = isFavorite(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, price, image, category });
    toast({
      title: "Товар добавлен в корзину",
      description: name,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(id);
      toast({ title: "Удалено из избранного" });
    } else {
      addToFavorites({ id, name, price, image, category });
      toast({ title: "Добавлено в избранное" });
    }
  };

  return (
    <Link to={`/product/${id}`}>
      <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group h-full flex flex-col">
        <CardHeader className="relative p-0">
          <div className="relative overflow-hidden rounded-t-lg aspect-[4/3]">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <Badge className="absolute top-3 left-3 bg-blue-500">Под заказ • 30-50 дней</Badge>
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-3 right-3 bg-white/90 hover:bg-white ${favorite ? 'text-red-500' : ''}`}
              onClick={handleToggleFavorite}
            >
              <Icon name={favorite ? "Heart" : "Heart"} size={20} className={favorite ? "fill-current" : ""} />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 pt-4">
          <CardTitle className="text-lg mb-2 line-clamp-2">{name}</CardTitle>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Icon name="Star" size={16} className="text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({reviews} отзывов)</span>
          </div>
          <div className="text-2xl font-bold text-primary">
            {price.toLocaleString('ru-RU')} ₽
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Button 
            className="w-full" 
            disabled={!inStock}
            onClick={handleAddToCart}
          >
            <Icon name="ShoppingCart" size={18} className="mr-2" />
            {inStock ? 'В корзину' : 'Недоступно'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;