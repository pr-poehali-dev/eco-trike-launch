import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import * as XLSX from 'xlsx';

interface ImportedProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  in_stock: boolean;
  delivery_days: string;
  brand?: string;
  model?: string;
  specs?: Record<string, string>;
}

interface ProductImportProps {
  onImport: (products: ImportedProduct[]) => void;
}

export default function ProductImport({ onImport }: ProductImportProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState<ImportedProduct[]>([]);
  const [error, setError] = useState<string>('');

  const parseExcelFile = (file: File) => {
    setIsProcessing(true);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        const products: ImportedProduct[] = jsonData.map((row: any) => ({
          name: row['Название'] || row['name'] || '',
          description: row['Описание'] || row['description'] || '',
          price: parseFloat(row['Цена'] || row['price'] || '0'),
          category: row['Категория'] || row['category'] || '',
          image: row['Изображение'] || row['image'] || 'https://placehold.co/600x600?text=No+Image',
          rating: parseFloat(row['Рейтинг'] || row['rating'] || '4.5'),
          reviews: parseInt(row['Отзывы'] || row['reviews'] || '0'),
          in_stock: row['В наличии'] !== 'Нет' && row['in_stock'] !== 'false',
          delivery_days: row['Срок доставки'] || row['delivery_days'] || '30-50',
          brand: row['Бренд'] || row['brand'],
          model: row['Модель'] || row['model'],
          specs: row['Характеристики'] ? JSON.parse(row['Характеристики']) : {}
        }));

        setPreview(products);
        setIsProcessing(false);
      } catch (err) {
        setError('Ошибка при чтении файла. Проверьте формат данных.');
        setIsProcessing(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      parseExcelFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv'))) {
      parseExcelFile(file);
    } else {
      setError('Поддерживаются только файлы Excel (.xlsx, .xls) и CSV');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleImport = () => {
    onImport(preview);
    setPreview([]);
  };

  const downloadTemplate = () => {
    const template = [
      {
        'Название': 'Пример товара',
        'Описание': 'Описание товара',
        'Цена': 15000,
        'Категория': 'Триммеры',
        'Изображение': 'https://example.com/image.jpg',
        'Рейтинг': 4.5,
        'Отзывы': 10,
        'В наличии': 'Да',
        'Срок доставки': '30-50',
        'Бренд': 'Брэнд',
        'Модель': 'Модель-123'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Товары');
    XLSX.writeFile(wb, 'шаблон_товаров.xlsx');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Импорт товаров из Excel/CSV</CardTitle>
        <CardDescription>
          Загрузите файл с товарами для массового добавления в каталог
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Icon name="Upload" size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-lg mb-2">Перетащите файл сюда</p>
          <p className="text-sm text-gray-500 mb-4">или</p>
          <label>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button variant="outline" asChild>
              <span>
                <Icon name="FileSpreadsheet" size={20} className="mr-2" />
                Выбрать файл
              </span>
            </Button>
          </label>
        </div>

        <Button variant="ghost" onClick={downloadTemplate} className="w-full">
          <Icon name="Download" size={20} className="mr-2" />
          Скачать шаблон Excel
        </Button>

        {isProcessing && (
          <div className="flex items-center justify-center py-4">
            <Icon name="Loader2" size={24} className="animate-spin mr-2" />
            <span>Обработка файла...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2">
            <Icon name="AlertCircle" size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {preview.length > 0 && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="CheckCircle" size={20} className="text-green-600" />
                <p className="font-semibold text-green-800">
                  Готово к импорту: {preview.length} товаров
                </p>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left">Название</th>
                    <th className="px-4 py-2 text-left">Категория</th>
                    <th className="px-4 py-2 text-right">Цена</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.map((product, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2">{product.category}</td>
                      <td className="px-4 py-2 text-right">{product.price.toLocaleString('ru-RU')} ₽</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleImport} className="flex-1">
                <Icon name="Upload" size={20} className="mr-2" />
                Импортировать {preview.length} товаров
              </Button>
              <Button variant="outline" onClick={() => setPreview([])}>
                Отмена
              </Button>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          <p className="font-semibold mb-2">Формат файла:</p>
          <ul className="space-y-1 text-gray-700">
            <li>• Колонки: Название, Описание, Цена, Категория, Изображение</li>
            <li>• Дополнительно: Рейтинг, Отзывы, В наличии, Срок доставки, Бренд, Модель</li>
            <li>• Можно использовать английские названия колонок</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}