import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ProductImport from '@/components/ProductImport';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

const API_URL = 'https://functions.poehali.dev/b75a8978-1f7c-4bd9-9ef6-be18a3632462';

interface Product {
  id?: number;
  product_id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
  in_stock: boolean;
  rating: number;
  reviews: number;
}

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState<Product>({
    product_id: '',
    name: '',
    price: 0,
    category: 'tricycles',
    image: '',
    description: '',
    specs: [],
    in_stock: true,
    rating: 4.5,
    reviews: 0
  });

  const categories = [
    { value: 'cars', label: 'Машины' },
    { value: 'tricycles', label: 'Трициклы' },
    { value: 'quadricycles', label: 'Квадроциклы' },
    { value: 'motorcycles', label: 'Мотоциклы' },
    { value: 'motorboats', label: 'Моторные лодки' },
    { value: 'watercraft', label: 'Водные судна' },
    { value: 'robots', label: 'Роботы' },
    { value: 'bicycles', label: 'Велосипеды' }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast({ title: 'Ошибка загрузки товаров', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editProduct ? API_URL : API_URL;
      const method = editProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({ title: editProduct ? 'Товар обновлен' : 'Товар добавлен' });
        setIsDialogOpen(false);
        resetForm();
        loadProducts();
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      toast({ title: 'Ошибка сохранения', variant: 'destructive' });
    }
  };

  const handleDelete = async (product_id: string) => {
    if (!confirm('Удалить товар?')) return;
    
    try {
      const response = await fetch(`${API_URL}?id=${product_id}`, { method: 'DELETE' });
      if (response.ok) {
        toast({ title: 'Товар удален' });
        loadProducts();
      }
    } catch (error) {
      toast({ title: 'Ошибка удаления', variant: 'destructive' });
    }
  };

  const handleBulkImport = async (products: any[]) => {
    try {
      const responses = await Promise.all(
        products.map(product => 
          fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              product_id: product.name.toLowerCase().replace(/\s+/g, '-'),
              name: product.name,
              price: product.price,
              category: product.category,
              image: product.image,
              description: product.description,
              specs: product.specs ? Object.entries(product.specs).map(([label, value]) => ({ label, value: String(value) })) : [],
              in_stock: product.in_stock,
              rating: product.rating,
              reviews: product.reviews
            })
          })
        )
      );

      const successCount = responses.filter(r => r.ok).length;
      toast({ 
        title: `Импортировано ${successCount} из ${products.length} товаров`,
        variant: successCount === products.length ? 'default' : 'destructive'
      });
      
      loadProducts();
    } catch (error) {
      toast({ title: 'Ошибка импорта', variant: 'destructive' });
    }
  };

  const resetForm = () => {
    setFormData({
      product_id: '',
      name: '',
      price: 0,
      category: 'tricycles',
      image: '',
      description: '',
      specs: [],
      in_stock: true,
      rating: 4.5,
      reviews: 0
    });
    setEditProduct(null);
  };

  const startEdit = (product: Product) => {
    setEditProduct(product);
    setFormData(product);
    setIsDialogOpen(true);
  };

  const addSpec = () => {
    setFormData(prev => ({
      ...prev,
      specs: [...prev.specs, { label: '', value: '' }]
    }));
  };

  const updateSpec = (index: number, field: 'label' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      specs: prev.specs.map((spec, i) => 
        i === index ? { ...spec, [field]: value } : spec
      )
    }));
  };

  const removeSpec = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index)
    }));
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Управление товарами</h1>
            
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button size="lg">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить товар
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editProduct ? 'Редактировать товар' : 'Добавить товар'}</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="product_id">ID товара *</Label>
                    <Input
                      id="product_id"
                      required
                      value={formData.product_id}
                      onChange={(e) => setFormData(prev => ({ ...prev, product_id: e.target.value }))}
                      placeholder="tri-1"
                      disabled={!!editProduct}
                    />
                  </div>

                  <div>
                    <Label htmlFor="name">Название *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Цена *</Label>
                      <Input
                        id="price"
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Категория *</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">Ссылка на изображение *</Label>
                    <Input
                      id="image"
                      required
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Характеристики</Label>
                    {formData.specs.map((spec, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          placeholder="Название"
                          value={spec.label}
                          onChange={(e) => updateSpec(index, 'label', e.target.value)}
                        />
                        <Input
                          placeholder="Значение"
                          value={spec.value}
                          onChange={(e) => updateSpec(index, 'value', e.target.value)}
                        />
                        <Button type="button" variant="outline" size="icon" onClick={() => removeSpec(index)}>
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addSpec}>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить характеристику
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rating">Рейтинг</Label>
                      <Input
                        id="rating"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating}
                        onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="reviews">Отзывов</Label>
                      <Input
                        id="reviews"
                        type="number"
                        value={formData.reviews}
                        onChange={(e) => setFormData(prev => ({ ...prev, reviews: parseInt(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    {editProduct ? 'Сохранить изменения' : 'Добавить товар'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mb-8">
            <ProductImport onImport={handleBulkImport} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Список товаров ({products.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Название</TableHead>
                    <TableHead>Категория</TableHead>
                    <TableHead>Цена</TableHead>
                    <TableHead>Рейтинг</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.product_id}>
                      <TableCell className="font-mono text-sm">{product.product_id}</TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{categories.find(c => c.value === product.category)?.label}</TableCell>
                      <TableCell>{product.price.toLocaleString('ru-RU')} ₽</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
                          {product.rating}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => startEdit(product)}>
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(product.product_id)} className="text-red-500">
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;