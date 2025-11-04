import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useFavorites } from '@/contexts/FavoritesContext';

const Account = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  const orders = [
    {
      id: '12345',
      date: '15 октября 2024',
      status: 'delivered',
      total: 450000,
      items: [
        { name: 'EcoTrike City Pro', quantity: 1, price: 450000 }
      ]
    },
    {
      id: '12344',
      date: '1 октября 2024',
      status: 'processing',
      total: 85000,
      items: [
        { name: 'E-Bike Mountain Pro', quantity: 1, price: 85000 }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      processing: { label: 'В обработке', className: 'bg-blue-500' },
      shipped: { label: 'Отправлено', className: 'bg-yellow-500' },
      delivered: { label: 'Доставлено', className: 'bg-green-500' },
      cancelled: { label: 'Отменено', className: 'bg-red-500' }
    };
    const { label, className } = statusMap[status] || statusMap.processing;
    return <Badge className={className}>{label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8">Личный кабинет</h1>
          
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="orders">Заказы</TabsTrigger>
              <TabsTrigger value="favorites">Избранное</TabsTrigger>
              <TabsTrigger value="profile">Профиль</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-4">
              {orders.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Icon name="Package" size={60} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-600 mb-4">У вас пока нет заказов</p>
                    <Button asChild>
                      <Link to="/">Начать покупки</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Заказ #{order.id}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{order.date}</p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{item.name} × {item.quantity}</span>
                            <span className="font-semibold">{item.price.toLocaleString('ru-RU')} ₽</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-3 flex justify-between items-center">
                        <span className="font-bold text-lg">Итого:</span>
                        <span className="font-bold text-xl text-primary">{order.total.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="favorites">
              {favorites.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Icon name="Heart" size={60} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-600 mb-4">В избранном пока ничего нет</p>
                    <Button asChild>
                      <Link to="/">Посмотреть каталог</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <Link to={`/product/${item.id}`}>
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full aspect-square object-cover rounded-lg mb-3 hover:opacity-80 transition-opacity"
                          />
                        </Link>
                        <Link to={`/product/${item.id}`} className="hover:text-primary">
                          <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>
                        </Link>
                        <p className="text-xl font-bold text-primary mb-3">
                          {item.price.toLocaleString('ru-RU')} ₽
                        </p>
                        <div className="flex gap-2">
                          <Button className="flex-1" asChild>
                            <Link to={`/product/${item.id}`}>
                              <Icon name="ShoppingCart" size={16} className="mr-2" />
                              В корзину
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => removeFromFavorites(item.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="User" size={24} />
                    Личная информация
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Имя</p>
                    <p className="font-semibold">Иван Иванов</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-semibold">ivan@example.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Телефон</p>
                    <p className="font-semibold">+7 (999) 123-45-67</p>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать профиль
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MapPin" size={24} />
                    Адреса доставки
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <p className="font-semibold mb-1">Основной адрес</p>
                      <p className="text-gray-600">г. Москва, ул. Примерная, д. 1, кв. 1</p>
                      <p className="text-gray-600">123456</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить адрес
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;
