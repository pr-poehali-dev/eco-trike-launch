import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
    comment: '',
  });

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Заказ оформлен!",
      description: "Мы свяжемся с вами в ближайшее время для подтверждения.",
    });
    
    clearCart();
    navigate('/account');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const deliveryPrice = formData.deliveryMethod === 'courier' ? 500 : 0;
  const totalWithDelivery = totalPrice + deliveryPrice;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8">Оформление заказа</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="User" size={24} />
                      Контактные данные
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">ФИО *</Label>
                      <Input 
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Иванов Иван Иванович"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Телефон *</Label>
                        <Input 
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="+7 (999) 123-45-67"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="MapPin" size={24} />
                      Адрес доставки
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="city">Город *</Label>
                      <Input 
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        placeholder="Москва"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Адрес *</Label>
                      <Input 
                        id="address"
                        required
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        placeholder="ул. Примерная, д. 1, кв. 1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Индекс</Label>
                      <Input 
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleChange('zipCode', e.target.value)}
                        placeholder="123456"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Truck" size={24} />
                      Способ доставки
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={formData.deliveryMethod} onValueChange={(value) => handleChange('deliveryMethod', value)}>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="courier" id="courier" />
                        <Label htmlFor="courier" className="flex-1 cursor-pointer">
                          <div className="font-semibold">Курьерская доставка</div>
                          <div className="text-sm text-gray-600">3-5 рабочих дней • 500 ₽</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                          <div className="font-semibold">Самовывоз</div>
                          <div className="text-sm text-gray-600">Готово через 1-2 дня • Бесплатно</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="CreditCard" size={24} />
                      Способ оплаты
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={formData.paymentMethod} onValueChange={(value) => handleChange('paymentMethod', value)}>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          <div className="font-semibold">Банковская карта</div>
                          <div className="text-sm text-gray-600">Visa, Mastercard, МИР</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex-1 cursor-pointer">
                          <div className="font-semibold">Наличными при получении</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Комментарий к заказу</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="Особые пожелания или уточнения..."
                      value={formData.comment}
                      onChange={(e) => handleChange('comment', e.target.value)}
                      rows={4}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Ваш заказ</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.quantity} шт.</p>
                          </div>
                          <p className="font-semibold">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Товары:</span>
                        <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Доставка:</span>
                        <span>{deliveryPrice > 0 ? `${deliveryPrice} ₽` : 'Бесплатно'}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-xl font-bold">
                      <span>Итого:</span>
                      <span className="text-primary">{totalWithDelivery.toLocaleString('ru-RU')} ₽</span>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Оформить заказ
                    </Button>

                    <p className="text-xs text-gray-600 text-center">
                      Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
