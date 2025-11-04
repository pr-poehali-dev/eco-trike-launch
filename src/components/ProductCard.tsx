import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  specs: { label: string; value: string }[];
  inStock?: boolean;
}

const ProductCard = ({ name, price, image, specs, inStock = true }: ProductCardProps) => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in overflow-hidden group">
      <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {!inStock && (
          <Badge className="absolute top-3 right-3 bg-red-500">Нет в наличии</Badge>
        )}
        {inStock && (
          <Badge className="absolute top-3 right-3 bg-green-500">В наличии</Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="text-2xl font-bold text-primary">{price}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {specs.map((spec, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-gray-600">{spec.label}:</span>
              <span className="font-semibold">{spec.value}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button className="flex-1">
            <Icon name="ShoppingCart" size={18} className="mr-2" />
            В корзину
          </Button>
          <Button variant="outline" size="icon">
            <Icon name="Heart" size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
