import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    type: 'test-drive' as 'test-drive' | 'consultation'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setFormData({ name: '', phone: '', email: '', message: '', type: 'test-drive' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Zap" className="text-primary" size={28} />
            <span className="text-2xl font-bold text-primary">EcoTrike</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 hover:text-primary transition-colors">Преимущества</a>
            <a href="#specs" className="text-gray-700 hover:text-primary transition-colors">Характеристики</a>
            <a href="#legal" className="text-gray-700 hover:text-primary transition-colors">Документы</a>
            <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Контакты</a>
          </div>
          <Button asChild className="hidden md:inline-flex">
            <a href="#contact">Заказать тест-драйв</a>
          </Button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-secondary text-white">Инновации в городской мобильности</Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Новая эра городской мобильности
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Экологичный трехместный электротрицикл, сочетающий комфорт автомобиля с экономичностью и маневренностью мопеда
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <a href="#contact">Заказать тест-драйв</a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <a href="#specs">Узнать больше</a>
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">40</div>
                  <div className="text-sm text-gray-600">км/ч макс. скорость</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">3</div>
                  <div className="text-sm text-gray-600">человека</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">800</div>
                  <div className="text-sm text-gray-600">Вт мощность</div>
                </div>
              </div>
            </div>
            <div className="animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/0c06a269-7214-47a8-8c52-c93dd5dcb3d3.jpg" 
                alt="EcoTrike электротрицикл"
                className="rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Каталог продукции</h2>
            <p className="text-xl text-gray-600">Выберите категорию товаров</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { path: '/cars', name: 'Машины', icon: 'Car', color: 'bg-blue-500' },
              { path: '/tricycles', name: 'Трициклы', icon: 'Bike', color: 'bg-green-500' },
              { path: '/quadricycles', name: 'Квадроциклы', icon: 'Truck', color: 'bg-orange-500' },
              { path: '/motorcycles', name: 'Мотоциклы', icon: 'Bike', color: 'bg-red-500' },
              { path: '/motorboats', name: 'Моторные лодки', icon: 'Ship', color: 'bg-cyan-500' },
              { path: '/watercraft', name: 'Водные судна', icon: 'Anchor', color: 'bg-teal-500' },
              { path: '/robots', name: 'Роботы', icon: 'Bot', color: 'bg-purple-500' },
              { path: '/bicycles', name: 'Велосипеды', icon: 'Bike', color: 'bg-emerald-500' }
            ].map((category, idx) => (
              <Link key={idx} to={category.path}>
                <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group animate-fade-in border-2 hover:border-primary">
                  <CardHeader className="text-center">
                    <div className={`w-20 h-20 mx-auto rounded-2xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon name={category.icon} className="text-white" size={36} />
                    </div>
                    <CardTitle className="text-2xl">{category.name}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Преимущества EcoTrike</h2>
            <p className="text-xl text-gray-600">Идеальное решение для города и бизнеса</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'Leaf',
                title: 'Экологичность',
                description: 'Нулевые выбросы CO₂ и бесшумная работа. Забота о планете и городской среде.'
              },
              {
                icon: 'Wallet',
                title: 'Экономия',
                description: 'Низкая стоимость зарядки, отсутствие налогов и регистрации в ГИБДД.'
              },
              {
                icon: 'Navigation',
                title: 'Маневренность',
                description: 'Компактные размеры позволяют легко парковаться и передвигаться в городе.'
              },
              {
                icon: 'Shield',
                title: 'Безопасность',
                description: 'Закрытая кабина, трехколесная устойчивость и система безопасности.'
              },
              {
                icon: 'Users',
                title: 'Комфорт',
                description: 'Вместимость 3 человека, защита от погоды, автомобильное управление.'
              },
              {
                icon: 'Briefcase',
                title: 'Универсальность',
                description: 'Для B2C и B2B: доставка, курорты, промышленные объекты, семейные поездки.'
              }
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary animate-fade-in">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={feature.icon} className="text-primary" size={28} />
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="specs" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Технические характеристики</h2>
              <div className="space-y-6">
                {[
                  { label: 'Тип ТС', value: 'Электрический трицикл (мопед)' },
                  { label: 'Мощность', value: '800 Вт (0.8 кВт)' },
                  { label: 'Макс. скорость', value: '40 км/ч' },
                  { label: 'Вместимость', value: '1 водитель + 2 пассажира' },
                  { label: 'Снаряженная масса', value: '~30 кг' },
                  { label: 'Количество колес', value: '3' },
                  { label: 'Управление', value: 'Автомобильного типа (руль + педали)' },
                  { label: 'Конструкция', value: 'Закрытая кабина' },
                  { label: 'Экологичность', value: 'Нулевые выбросы, бесшумность' }
                ].map((spec, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">{spec.label}</span>
                    <span className="font-semibold text-lg">{spec.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-secondary/10 rounded-2xl">
                <div className="flex items-start gap-3">
                  <Icon name="Info" className="text-secondary mt-1" size={24} />
                  <p className="text-sm leading-relaxed">
                    Возможность использования педалей для мускульной силы. Идеально для городских поездок, дачи и коммерческого использования.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src="https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/a1901777-6743-4e3b-b0b2-be425de82e5a.jpg" 
                alt="Салон EcoTrike"
                className="rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Сферы применения</h2>
            <p className="text-xl text-gray-600">Решение для B2B и B2C сегментов</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: 'Building2',
                title: 'B2B: Логистика "последней мили"',
                description: 'Эффективная доставка небольших грузов и документов по городу'
              },
              {
                icon: 'Palmtree',
                title: 'Курорты и парки',
                description: 'Комфортная перевозка гостей, экскурсии по территории'
              },
              {
                icon: 'Factory',
                title: 'Промышленные объекты',
                description: 'Передвижение персонала на складах и производстве'
              },
              {
                icon: 'Home',
                title: 'Семьи и частные лица',
                description: 'Ежедневные поездки, шоппинг, досуг, дачные участки'
              },
              {
                icon: 'GraduationCap',
                title: 'Университеты и кампусы',
                description: 'Удобное перемещение по большой территории'
              },
              {
                icon: 'Hotel',
                title: 'Гостиничные комплексы',
                description: 'Транспорт для гостей и персонала'
              }
            ].map((useCase, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={useCase.icon} className="text-primary" size={24} />
                    </div>
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{useCase.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="legal" className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Правовой статус</h2>
            <p className="text-xl text-gray-600">Вся информация о требованиях и документах</p>
          </div>
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Icon name="FileText" className="text-primary" />
                Документы и регистрация
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold">
                    Классификация транспортного средства
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed">
                    Согласно ПДД РФ, EcoTrike относится к категории <strong>"мопед"</strong> — транспортное средство с максимальной конструктивной скоростью не более 50 км/ч.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-semibold">
                    Требуется ли регистрация в ГИБДД?
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed">
                    <strong>Нет, не требуется.</strong> Мопеды не подлежат обязательной регистрации в ГИБДД согласно действующему законодательству РФ.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-semibold">
                    Какие водительские права необходимы?
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed">
                    Для управления требуются водительские права категории <strong>"М"</strong> или любой другой категории (А, В, С, D). Управление без прав запрещено.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-semibold">
                    Требования к оснащению для дорог общего пользования
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed">
                    <p className="mb-3">Для движения по дорогам общего пользования необходимо наличие системы световой сигнализации:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Фары ближнего и дальнего света</li>
                      <li>Задние габаритные огни</li>
                      <li>Стоп-сигналы</li>
                      <li>Указатели поворотов</li>
                      <li>Звуковой сигнал</li>
                      <li>Зеркала заднего вида</li>
                      <li>Световозвращатели</li>
                    </ul>
                    <p className="mt-3 text-amber-700 font-medium">⚠️ Текущая базовая комплектация может требовать дооснащения.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-lg font-semibold">
                    Статус сертификации
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed">
                    Продукт находится в процессе получения сертификата соответствия ТР ТС 018/2011 для категории мопедов. Предварительные испытания показывают соответствие требованиям.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Свяжитесь с нами</h2>
              <p className="text-xl text-gray-600 mb-8">
                Закажите тест-драйв или получите консультацию по EcoTrike
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Телефон</div>
                    <div className="text-gray-600">+7 (xxx) xxx-xx-xx</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Email</div>
                    <div className="text-gray-600">info@ecotrike.ru</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Адрес</div>
                    <div className="text-gray-600">г. Москва, ул. Примерная, д. 1</div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <img 
                  src="https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/4aeb11bf-a54c-4f61-b1ff-54e51e2faa03.jpg" 
                  alt="EcoTrike в городе"
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Оставить заявку</CardTitle>
                <CardDescription className="text-base">Мы свяжемся с вами в ближайшее время</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={formData.type === 'test-drive' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setFormData({ ...formData, type: 'test-drive' })}
                    >
                      Тест-драйв
                    </Button>
                    <Button
                      type="button"
                      variant={formData.type === 'consultation' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setFormData({ ...formData, type: 'consultation' })}
                    >
                      Консультация
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="+7 (xxx) xxx-xx-xx"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Расскажите о ваших целях..."
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full text-lg py-6">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
              <h4 className="font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Преимущества</a></li>
                <li><a href="#specs" className="hover:text-white transition-colors">Характеристики</a></li>
                <li><a href="#legal" className="hover:text-white transition-colors">Документы</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Партнерам</a></li>
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

export default Index;