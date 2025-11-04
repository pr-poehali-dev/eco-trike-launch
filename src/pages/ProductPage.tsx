import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { getProductById, Product } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { toast } from '@/hooks/use-toast';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    if (id) {
      getProductById(id).then(data => {
        setProduct(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-24 container mx-auto px-4 text-center">
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-24 container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Товар не найден</h1>
          <Button asChild>
            <Link to="/">На главную</Link>
          </Button>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(product.product_id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ 
        id: product.product_id, 
        name: product.name, 
        price: product.price, 
        image: product.image, 
        category: product.category 
      });
    }
    toast({
      title: "Добавлено в корзину",
      description: `${product.name} (${quantity} шт.)`,
    });
  };

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(product.product_id);
      toast({ title: "Удалено из избранного" });
    } else {
      addToFavorites({ 
        id: product.product_id, 
        name: product.name, 
        price: product.price, 
        image: product.image, 
        category: product.category 
      });
      toast({ title: "Добавлено в избранное" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="mb-6">
            <Link to={`/${product.category}`} className="text-primary hover:underline flex items-center gap-2">
              <Icon name="ChevronLeft" size={18} />
              Назад к каталогу
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="rounded-2xl overflow-hidden bg-white shadow-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>

            <div>
              <div className="mb-4 space-y-2">
                <Badge className="bg-blue-500">Под заказ</Badge>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon name="Clock" size={16} />
                  <span>Срок доставки: 30-50 дней</span>
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Icon name="Star" size={20} className="text-yellow-500 fill-current" />
                  <span className="text-lg font-semibold">{product.rating}</span>
                </div>
                <span className="text-gray-600">({product.reviews} отзывов)</span>
              </div>

              <div className="text-4xl font-bold text-primary mb-6">
                {product.price.toLocaleString('ru-RU')} ₽
              </div>

              <p className="text-gray-700 text-lg mb-4">{product.description}</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <div className="flex items-start gap-3">
                  <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Изготовление под заказ</p>
                    <p className="text-sm text-blue-800">Все товары производятся после оформления заказа. Срок доставки составляет от 30 до 50 дней с момента подтверждения.</p>
                  </div>
                </div>
              </div>

              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-xl mb-4">Характеристики</h3>
                  <div className="space-y-3">
                    {product.specs.map((spec, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-gray-600">{spec.label}</span>
                        <span className="font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Separator className="my-6" />

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border rounded-lg">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Icon name="Minus" size={18} />
                  </Button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Icon name="Plus" size={18} />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 text-lg"
                  onClick={handleAddToCart}
                  disabled={!product.in_stock}
                >
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  {product.in_stock ? 'Добавить в корзину' : 'Недоступно'}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handleToggleFavorite}
                  className={favorite ? 'text-red-500 border-red-500' : ''}
                >
                  <Icon name="Heart" size={20} className={favorite ? 'fill-current' : ''} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;