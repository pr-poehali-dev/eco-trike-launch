import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-24 pb-12 px-4">
          <div className="container mx-auto text-center">
            <Icon name="ShoppingCart" size={80} className="mx-auto mb-6 text-gray-300" />
            <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
            <p className="text-gray-600 mb-8">Добавьте товары из каталога</p>
            <Button size="lg" asChild>
              <Link to="/">Перейти в каталог</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8">Корзина</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <Link to={`/product/${item.id}`} className="flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-32 h-32 object-cover rounded-lg hover:opacity-80 transition-opacity"
                        />
                      </Link>
                      
                      <div className="flex-1">
                        <Link to={`/product/${item.id}`} className="hover:text-primary">
                          <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                        </Link>
                        <p className="text-2xl font-bold text-primary mb-4">
                          {item.price.toLocaleString('ru-RU')} ₽
                        </p>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border rounded-lg">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={16} />
                            </Button>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={16} className="mr-2" />
                            Удалить
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xl font-bold">
                          {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Итого</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Товаров:</span>
                      <span>{totalItems} шт.</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Сумма:</span>
                      <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl font-bold">
                      <span>К оплате:</span>
                      <span className="text-primary">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>

                  <Button size="lg" className="w-full mb-4" asChild>
                    <Link to="/checkout">
                      Оформить заказ
                    </Link>
                  </Button>
                  
                  <Button size="lg" variant="outline" className="w-full" asChild>
                    <Link to="/">
                      Продолжить покупки
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
